import Header from "./Header.tsx";
import { useParams } from "react-router-dom";
import { useSnackContext, Review } from "../contexts/SnackContext.tsx";
import { useState } from "react";
import iconDelete from "../assets/icon_delete.svg";
import iconEdit from "../assets/icon_edit.svg";
import iconQuit from "../assets/icon_quit.svg";
import iconSave from "../assets/icon_save.svg";

const SingleSnackPage = () => {
	const { snacks, getSnackById, getSnackByName, filterSnacksByName, addSnack, reviews, getReviewById, addReview, removeReview, editReview } = useSnackContext();
	const [ editId, setEditId ] = useState<number | null>(null);
	const [ editText, setEditText ] = useState("");
	const [ editTextError, setEditTextError ] = useState("");

	const { snackParam } = useParams();
	const snack = getSnackById(Number(snackParam));

	const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditText(e.target.value);
	}

	const trySave = () => {
		if(editId === null) return;

		setEditText(editText.trim());
		if (editText.length < 5 || editText.length > 1000) {
			setEditTextError("내용은 5자 이상 1000자 이하여야 합니다.");
			return;
		}
		setEditTextError("");
		editReview(editId, editText);
		setEditId(null);
		setEditText("");
	}

	const quitEdit = () => {
		setEditId(null);
		setEditText("");
	}

	const rateBox = (review: Review) => {
		return (
			<>
			<div className="text-box">
        <span className="rate-span">★{review.reviewScore.toFixed(1)}</span>
        {editId !== review.reviewId && <p>{review.reviewText}</p>}
        {editId === review.reviewId && (
          <textarea
            rows={5}
            className="edit-textarea"
            onChange={handleText}
            value={editText}
          ></textarea>
        )}
        {editId === review.reviewId && editTextError !== "" && (
          <span className="error-message">{editTextError}</span>
        )}
      </div>
      {editId === null && (
        <div className="hover-box">
					<img
						src={iconEdit}
						className="small-icon"
						onClick={() => {
							setEditId(review.reviewId);
							setEditText(review.reviewText);
						}}
					/>
					<img
						src={iconDelete}
						className="small-icon"
						onClick={() => {
							removeReview(review);
						}}
					/>
				</div>
			)}
			{editId === review.reviewId && (
				<div className="alwaysHoverBox">
					<img
						src={iconSave}
						className="smallIcon"
						onClick={trySave}
						data-testid="edit-review-save"
					/>
					<img
						src={iconQuit}
						className="smallIcon"
						onClick={quitEdit}
						data-testid="edit-review-cancel"
					/>
				</div>
			)}
			</>
		)
	}

	return (
		<>
			<Header/>
			<div className="snack-block" key={snack?.snackId}>
				<div className="image-box">
					<img src={snack?.snackImageUrl} alt={snack?.snackName} className="snack-image"/>
				</div>
				<div className="text-box">
					<span className="snack-name-text">{snack?.snackName}</span>
					<span className="rate-span">★{snack?.snackRate.toFixed(1)}</span>
				</div>
			</div>
		</>
	)
};

export default SingleSnackPage;