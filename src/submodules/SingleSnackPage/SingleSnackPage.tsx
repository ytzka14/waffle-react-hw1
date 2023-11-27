import Header from "../Header/Header.tsx";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal.tsx";
import LoginPage from "../LoginPage/LoginPage.tsx";
import { useParams } from "react-router-dom";
import { useSnackContext, Review } from "../../contexts/SnackContext.tsx";
import { useLoginContext } from "../../contexts/LoginContext.tsx";
import { useState } from "react";
import iconDelete from "../../assets/icon_delete.svg";
import iconEdit from "../../assets/icon_edit.svg";
import iconQuit from "../../assets/icon_quit.svg";
import iconSave from "../../assets/icon_save.svg";
import "./SingleSnackPage.css";

const SingleSnackPage = () => {
	const { getSnackById, reviews, getReviewById, editReview } = useSnackContext();
	const { loggedIn } = useLoginContext();
	const [ editId, setEditId ] = useState<number | null>(null);
	const [ deleteId, setDeleteId ] = useState<number | null>(null);
	const [ editText, setEditText ] = useState("");
	const [ editTextError, setEditTextError ] = useState("");

	const { id } = useParams();
	const snack = getSnackById(Number(id));

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

	const handleDelete = (review: Review) => {
		return function (e: React.MouseEvent) {
			e.preventDefault();
			setDeleteId(review.reviewId);
		}
	}

	const closeDeleteModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setDeleteId(null);
  };

	const getSnackNameByReviewId = (id: number) => {
		const review = getReviewById(id);
		if (!review) return "";
		const snack = getSnackById(review.snackId);
		if (!snack) return "";
		return snack.snackName;
	}

	const rateBox = (review: Review) => {
		return (
			<>
				<div className="ssp-review-box" data-testid="review">
					<div className="ssp-rate-box">
						<span className="ssp-rate-span">★</span>
						<span className="ssp-rate-span" data-testid="rating">{review.reviewScore.toFixed(1)}</span>
						{editId !== review.reviewId && <p>{review.reviewText}</p>}
						{editId === review.reviewId && (
							<textarea
								rows={5}
								className="ssp-edit-text-area"
								onChange={handleText}
								value={editText}
								data-testid="edit-review-content-input"
							></textarea>
						)}
						{editId === review.reviewId && editTextError !== "" && (
							<span className="ssp-error-message">{editTextError}</span>
						)}
					</div>
					{editId === null && (
						<div className="ssp-hover-box">
							<img
								src={iconEdit}
								className="ssp-small-icon"
								onClick={() => {
									setEditId(review.reviewId);
									setEditText(review.reviewText);
								}}
								data-testid="edit-review"
							/>
							<img
								src={iconDelete}
								className="ssp-small-icon"
								onClick={handleDelete(review)}
								data-testid="delete-review"
							/>
						</div>
					)}
					{editId === review.reviewId && (
						<div className="ssp-always-hover-box">
							<img
								src={iconSave}
								className="ssp-small-icon"
								onClick={trySave}
								data-testid="edit-review-save"
							/>
							<img
								src={iconQuit}
								className="ssp-small-icon"
								onClick={quitEdit}
								data-testid="edit-review-cancel"
							/>
						</div>
					)}
				</div>
			</>
		)
	}

	if (loggedIn) {
		return (
			<>
				<Header pageType="snack"/>
				<div className="ssp-snack-block" key={snack?.snackId} data-testid="snack-card">
					<div className="ssp-image-box">
						<img src={snack?.snackImageUrl} alt={snack?.snackName} className="ssp-snack-image" data-testid="snack-image"/>
					</div>
					<div className="ssp-text-box">
						<span className="ssp-snack-name-text" data-testid="snack-name">{snack?.snackName}</span>
						<br/>
						<span className="ssp-rate-span">★</span>
						<span className="ssp-rate-span" data-testid="rating">{snack?.snackRate.toFixed(1)}</span>
					</div>
				</div>
				<ul className="ssp-review-list" data-testid="review-list">
					{ reviews.filter((review) => (review.snackId === snack?.snackId)).map((review) => (rateBox(review))) }
				</ul>
				{deleteId && (
					<div className="ssp-overlay">
						<DeleteReviewModal
							closeModal={closeDeleteModal}
							deleteReviewId={deleteId}
							deleteName={getSnackNameByReviewId(deleteId)}
						/>
					</div>
				)}
			</>
		);
	} else {
		return (
			<LoginPage/>
		);
	}
};

export default SingleSnackPage;