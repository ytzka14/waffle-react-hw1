import { useSnackContext } from "../../contexts/SnackContext.tsx";
import "./DeleteReviewModal.css";

function DeleteReviewModal (props: {
  closeModal: (e: React.MouseEvent) => void;
  deleteReviewId: number;
  deleteName: string;
}) {
	const { getReviewById, removeReview } = useSnackContext();

	const removeAndClose = (e: React.MouseEvent) => {
		const targetReview = getReviewById(props.deleteReviewId);
		if (!targetReview) {
			alert("Review with target deleteReviewId doesn't exist");
			return;
		}
		removeReview(targetReview);
		return props.closeModal(e);
	}

  return (
    <>
      <div className="del-modal-box-short">
        <div className="del-modal-header">
          <h2>리뷰 삭제</h2>
        </div>
        <div className="del-modal-content">
          <span className="del-text-with-margin-bottom">
            "{props.deleteName}"에 대한 리뷰를 삭제하시겠습니까?
          </span>
        </div>
        <div className="del-modal-footer">
          <button
            className="del-close-modal-button"
            onClick={removeAndClose}
						data-testid="delete-review-delete"
          >
            삭제
          </button>
          <button
            className="del-inactive-button"
            onClick={props.closeModal}
            data-testid="delete-review-cancel"
          >
            취소
          </button>
        </div>
      </div>
      <div
        className="del-backdrop"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          props.closeModal(e);
        }}
      />
    </>
  );
}

export default DeleteReviewModal;
