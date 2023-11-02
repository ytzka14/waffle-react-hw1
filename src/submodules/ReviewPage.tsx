import { useState, useEffect, useRef } from "react";
import Header from "./Header.tsx";
import WriteReviewModal from "./WriteReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import iconDelete from "../assets/icon_delete.svg";
import iconEdit from "../assets/icon_edit.svg";
import iconQuit from "../assets/icon_quit.svg";
import iconSave from "../assets/icon_save.svg";
import iconSnack from "../assets/icon_snack.svg";
import { Snack, Review, useSnackContext } from "../contexts/SnackContext.tsx";
import { Link } from "react-router-dom";
import "./css/ReviewPage.css";

const ReviewPage = () => {
  const [ isWriteModalVisible, setIsWriteModalVisible ] = useState(false);
	const [ isNewMenuVisible, setIsNewMenuVisible ] = useState(false);
  const [ editId, setEditId ] = useState<number | null>(null);
  const [ deleteId, setDeleteId ] = useState<number | null>(null);
  const [ editText, setEditText ] = useState("");
  const [ editTextError, setEditTextError ] = useState("");
	
	const { snacks, getSnackById, getSnackByName, filterSnacksByName, addSnack, reviews, getReviewById, addReview, removeReview, editReview } = useSnackContext();

	/*
	const useOutsideClick = (callback: () => void) => {
		const ref = useRef<HTMLButtonElement | null>(null);

		useEffect(() => {
			const handleClick = (e: MouseEvent) => {
				callback();
			};

			document.addEventListener("click", handleClick);

			return () => {
				document.removeEventListener("click", handleClick);
			};
		}, []);

		return ref;
	}
	*/

	const openNewMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsNewMenuVisible(true);
	}

	const closeNewMenu = () => {
		setIsNewMenuVisible(false);
	}

  const openWriteModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWriteModalVisible(true);
  };

  const closeWriteModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWriteModalVisible(false);
  };

  function openDeleteModal(id: number) {
    return (e: React.MouseEvent) => {
      setDeleteId(id);
      e.preventDefault();
    };
  }

  const closeDeleteModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setDeleteId(null);
  };

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

	const reviewBox = (review: Review) => {
		const snack = getSnackById(review.snackId)!;

		return (
			<>
				<div className="review-box">
					<div className="image-box">
						<img src={snack.snackImageUrl} alt={snack.snackName} className="snack-image"/>
					</div>
					<div className="review-title">
						<span className="snack-name-text">{snack.snackName}</span>
						<span className="grey-text"> / </span>
						<span className="rate-span">★{review.reviewScore.toFixed(1)}</span>
					</div>
					{editId !== review.reviewId && <p>{review.reviewText}</p>}
          {editId === review.reviewId && (
            <textarea
              rows={5}
              className="edit-text-area"
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
              onClick={openDeleteModal(review.reviewId)}
            />
          </div>
        )}
        {editId === review.reviewId && (
          <div className="always-hover-box">
            <img
              src={iconSave}
              className="small-icon"
              onClick={trySave}
            />
            <img
              src={iconQuit}
              className="small-icon"
              onClick={quitEdit}
            />
          </div>
        )}
			</>
		)
	}

  const saveReview = (
    snack: Snack,
    reviewScore: number,
    reviewText: string,
  ) => {
		addReview({snackId: snack.snackId, reviewScore: reviewScore, reviewText: reviewText});
		setIsWriteModalVisible(false);
  };

  const deleteReview = (review: Review) => {
    removeReview(review);
		setDeleteId(null);
  };

  return (
    <>
			<Header pageType="review"/>
      <ul className="review-list" data-testid="review-list">
        {reviews.map((review) => (
          <div className="block" key={review.reviewId} data-testid="review">
            {reviewBox(review)}
          </div>
        ))}
      </ul>
      {isWriteModalVisible && (
        <div className="overlay">
          <WriteReviewModal
            closeModal={closeWriteModal}
            saveReview={saveReview}
          />
        </div>
      )}
      {deleteId !== null && (
        <div className="overlay">
          <DeleteReviewModal
            closeModal={closeDeleteModal}
            deleteReviewId={deleteId}
            deleteName={getSnackById(getReviewById(deleteId)!.snackId)!.snackName}
          />
        </div>
      )}
      {!isNewMenuVisible && (
				<button
					className="open-new-menu-button"
					onClick={openNewMenu}
				>
					+
				</button>
			)}
			{isNewMenuVisible && (
				<>
					<div className="new-menu-modal">
						<div className="new-menu-item">
							<Link
								to="/snacks/new"
								className="invisible-link"
							>
								<span>새 과자</span>
								<img src={iconSnack} className="small-icon"/>
							</Link>
						</div>
						<div className="new-menu-item">
							<div onClick={openWriteModal}>
								<span>새 리뷰</span>
								<img src={iconEdit} className="small-icon"/>
							</div>
						</div>
						<button
							className="close-new-menu-button"
							// ref={useOutsideClick(closeNewMenu)}
							onClick={(e: React.MouseEvent) => {
								e.preventDefault();
								closeNewMenu();
							}}
						>
							X
						</button>
					</div>
				</>
			)}
    </>
  );
}

export default ReviewPage;
