import { useState } from "react";
import Header from "../Header/Header.tsx";
import WriteReviewModal from "../WriteReviewModal/WriteReviewModal.tsx";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal.tsx";
import iconDelete from "../assets/icon_delete.svg";
import iconEdit from "../assets/icon_edit.svg";
import iconQuit from "../assets/icon_quit.svg";
import iconSave from "../assets/icon_save.svg";
import iconSnack from "../assets/icon_snack.svg";
import { Snack, Review, useSnackContext } from "../../contexts/SnackContext.tsx";
import { Link } from "react-router-dom";
import "./ReviewPage.css";

const ReviewPage = () => {
  const [ isWriteModalVisible, setIsWriteModalVisible ] = useState(false);
	const [ isNewMenuVisible, setIsNewMenuVisible ] = useState(false);
  const [ editId, setEditId ] = useState<number | null>(null);
  const [ deleteId, setDeleteId ] = useState<number | null>(null);
  const [ editText, setEditText ] = useState("");
  const [ editTextError, setEditTextError ] = useState("");
	
	const { getSnackById, reviews, getReviewById, addReview, editReview } = useSnackContext();

	const openNewMenu = () => {
		if(isWriteModalVisible) return;
		setIsNewMenuVisible(true);
	};

	const closeNewMenu = () => {
		setIsNewMenuVisible(false);
	};

  const openWriteModal = () => {
		setIsNewMenuVisible(false);
    setIsWriteModalVisible(true);
  };

  const closeWriteModal = () => {
    setIsWriteModalVisible(false);
  };

  const openDeleteModal = (id: number) => () => {
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
  };

	const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditText(e.target.value);
	};

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
	};

	const quitEdit = () => {
		setEditId(null);
		setEditText("");
	};

	const reviewBox = (review: Review) => {
		const snack = getSnackById(review.snackId);
		
		if(snack === null){
			return (
				<></>
			);
		}

		return (
			<>
				<div className="rev-review-box" data-testid="review" key={review.reviewId}>
					<div className="rev-image-box">
						<Link to={"/snacks/" + review.snackId}>
							<img src={snack.snackImageUrl} alt={snack.snackName} className="rev-snack-image" data-testid="snack-image"/>
						</Link>
					</div>
					<div className="rev-review-title">
						<Link to={"/snacks/" + review.snackId} className="rev-invisible-link">
							<span className="rev-snack-name-text" data-testid="snack-name">{snack.snackName}</span>
						</Link>
						<span className="rev-grey-text"> / </span>
						<span className="rev-rate-span">★</span>
						<span className="rev-rate-span" data-testid="rating">{review.reviewScore.toFixed(1)}</span>
					</div>
					{editId !== review.reviewId && <p>{review.reviewText}</p>}
          {editId === review.reviewId && (
            <textarea
              rows={5}
              className="rev-edit-text-area"
              onChange={handleText}
              value={editText}
							data-testid="edit-review-content-input"
            ></textarea>
          )}
          {editId === review.reviewId && editTextError !== "" && (
            <span className="rev-error-message">{editTextError}</span>
          )}
					{editId === null && (
						<div className="rev-hover-box">
							<img
								src={iconEdit}
								className="rev-small-icon"
								onClick={() => {
									setEditId(review.reviewId);
									setEditText(review.reviewText);
								}}
								data-testid="edit-review"
							/>
							<img
								src={iconDelete}
								className="rev-small-icon"
								onClick={openDeleteModal(review.reviewId)}
								data-testid="delete-review"
							/>
						</div>
					)}
					{editId === review.reviewId && (
						<div className="rev-always-hover-box">
							<img
								src={iconSave}
								className="rev-small-icon"
								onClick={trySave}
								data-testid="edit-review-save"
							/>
							<img
								src={iconQuit}
								className="rev-small-icon"
								onClick={quitEdit}
								data-testid="edit-review-cancel"
							/>
						</div>
					)}
				</div>
			</>
		)
	};

  const saveReview = (
    snack: Snack,
    reviewScore: number,
    reviewText: string,
  ) => {
		addReview({snackId: snack.snackId, reviewScore: reviewScore, reviewText: reviewText});
		setIsWriteModalVisible(false);
  };

	const getSnackNameByReviewId = (id: number) => {
		const review = getReviewById(id);
		if (!review) return "";
		const snack = getSnackById(review.snackId);
		if (!snack) return "";
		return snack.snackName;
	};

  return (
    <>
			<Header pageType="review"/>
      <ul className="rev-review-list" data-testid="review-list">
        {reviews.map((review) => 
          reviewBox(review)
				)}
      </ul>
      {isWriteModalVisible && (
        <div className="rev-overlay">
          <WriteReviewModal
            closeModal={closeWriteModal}
            saveReview={saveReview}
          />
        </div>
      )}
      {deleteId !== null && (
        <div className="rev-overlay">
          <DeleteReviewModal
            closeModal={closeDeleteModal}
            deleteReviewId={deleteId}
            deleteName={getSnackNameByReviewId(deleteId)}
          />
        </div>
      )}
      {!isNewMenuVisible && !isWriteModalVisible && (
				<button
					className="rev-open-new-menu-button"
					onClick={openNewMenu}
					data-testid="open-menu"
				>
					+
				</button>
			)}
			{!isNewMenuVisible && isWriteModalVisible && (
				<button
					className="rev-open-new-menu-button"
					onClick={closeWriteModal}
				>
					+
				</button>
			)}
			{isNewMenuVisible && (
				<>
					<div className="rev-new-menu-modal">
						<div className="rev-new-menu-item">
							<Link
								to="/snacks/new"
								className="rev-invisible-link-wide"
								data-testid="new-snack"
							>
								<span className="rev-auto-margin-text">새 과자</span>
								<img src={iconSnack} className="rev-small-icon"/>
							</Link>
						</div>
						<div onClick={openWriteModal} className="rev-new-menu-item" data-testid="new-review">
							<span className="rev-auto-margin-text">새 리뷰</span>
							<img src={iconEdit} className="rev-small-icon"/>
						</div>
						<button
							className="rev-close-new-menu-button"
							onClick={(e: React.MouseEvent) => {
								e.preventDefault();
								closeNewMenu();
							}}
							data-testid="open-menu"
						>
							X
						</button>
					</div>
					<div
        		className="rev-backdrop"
        		onClick={(e: React.MouseEvent) => {
          		e.preventDefault();

          		setIsNewMenuVisible(false);
        		}}
      		/>
				</>
			)}
    </>
  );
}

export default ReviewPage;
