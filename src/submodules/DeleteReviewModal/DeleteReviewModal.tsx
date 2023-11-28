import { useLoginContext } from "../../contexts/LoginContext.tsx";
import "./DeleteReviewModal.css";

const DeleteReviewModal = (props: {
  closeModal: (e: React.MouseEvent) => void;
  deleteReviewId: number;
	reload: () => void;
}) => {
	const { getAccessToken } = useLoginContext();

	const removeReview = (id: number) => {
		fetch("https://seminar-react-api.wafflestudio.com/reviews/"+id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getAccessToken(),
			},
			body: JSON.stringify({
				"id": id,
			}),
		})
			.catch(() => {
				alert("Cannot remove review!");
			});
	}

	const removeAndClose = (e: React.MouseEvent) => {
		removeReview(props.deleteReviewId);
		props.reload();
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
            리뷰를 삭제하시겠습니까?
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
