import { useSnackContext } from "../contexts/SnackContext.tsx";

function DeleteReviewModal (props: {
  closeModal: (e: React.MouseEvent) => void;
  deleteReviewId: number;
  deleteName: string;
}) {
	const { snacks, getSnackById, getSnackByName, filterSnacksByName, addSnack, reviews, getReviewById, addReview, removeReview, editReview } = useSnackContext();

  return (
    <>
      <div className="modal-box-short">
        <div className="modal-header">
          <h2>리뷰 삭제</h2>
        </div>
        <div className="modal-content">
          <span className="text-with-margin-bottom">
            "{props.deleteName}"에 대한 리뷰를 삭제하시겠습니까?
          </span>
        </div>
        <div className="modal-footer">
          <button
            className="closeModalButton"
            onClick={() => removeReview(getReviewById(props.deleteReviewId)!)}
            data-testid="delete-review-delete"
          >
            삭제
          </button>
          <button
            className="inactiveButton"
            onClick={props.closeModal}
            data-testid="delete-review-cancel"
          >
            취소
          </button>
        </div>
      </div>
      <div
        className="backdrop"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          props.closeModal(e);
        }}
      />
    </>
  );
}

export default DeleteReviewModal;
