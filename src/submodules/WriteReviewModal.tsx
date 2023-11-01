import { useState } from "react";
import { Snack, useSnackContext } from "../contexts/SnackContext.tsx";

const WriteReviewModal = (props: {
  closeModal: (e: React.MouseEvent) => void;
  saveReview: (
    snack: Snack,
    reviewScore: number,
    reviewText: string,
  ) => void;
}) => {
  const [snackName, setSnackName] = useState("");
  const [snackRate, setSnackRate] = useState(0);
  const [snackText, setSnackText] = useState("");
  const [nameError, setNameError] = useState("");
  const [rateError, setRateError] = useState("");
  const [textError, setTextError] = useState("");

	const { snacks, getSnackById, getSnackByName, filterSnacksByName, addSnack, reviews, getReviewById, addReview, removeReview, editReview } = useSnackContext();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnackName(e.target.value);
  };

  const handleRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnackRate(Number(e.target.value));
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSnackText(e.target.value);
  };

  function tryWrite() {
    let invalid = false;
    if (snackName.length < 1 || snackName.length > 20) {
      setNameError("첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요");
      invalid = true;
    } else if (snackName !== snackName.trim()) {
      setNameError("첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요");
      invalid = true;
    } else {
      setNameError("");
    }

    if (snackRate < 1 || snackRate > 5 || !Number.isInteger(snackRate)) {
      setRateError("평점은 1 ~ 5 사이의 숫자로 써주세요");
      invalid = true;
    } else {
      setRateError("");
    }

    if (snackText.length < 5 || snackText.length > 1000) {
      setTextError("첫글자와 끝글자가 공백이 아닌 5~1000자 문자열로 써주세요");
      invalid = true;
    } else if (snackText !== snackText.trim()) {
      setTextError("첫글자와 끝글자가 공백이 아닌 5~1000자 문자열로 써주세요");
      invalid = true;
    } else {
      setTextError("");
    }

    if (!invalid) {
      props.saveReview(getSnackByName(snackName)!, snackRate, snackText);
    }
  }

  return (
    <>
      <div className="modal-box" data-testid="write-review-modal">
        <div className="modal-header">
          <h2>리뷰 쓰기</h2>
        </div>
        <div className="modal-content">
          <label htmlFor="nameInput">과자 이름</label>
          <br />
          <input
            type="text"
            id="nameInput"
            className="lineInput"
            onChange={handleName}
            data-testid="name-input"
          ></input>
          <br />
          <span className="errorMessage" data-testid="name-input-message">
            {nameError}
          </span>
          <br />
          <label htmlFor="rateInput">평점</label>
          <br />
          <input
            type="number"
            id="rateInput"
            className="lineInput"
            onChange={handleRate}
            data-testid="rating-input"
          ></input>
          <br />
          <span className="errorMessage" data-testid="rating-input-message">
            {rateError}
          </span>
          <br />
          <label htmlFor="reviewtextInput">내용</label>
          <br />
          <textarea
            id="reviewtextInput"
            className="scrollDown"
            onChange={handleText}
            data-testid="content-input"
          ></textarea>
          <br />
          <span className="errorMessage" data-testid="content-input-message">
            {textError}
          </span>
          <br />
        </div>
        <div className="modal-footer">
          <button
            className="writeReviewButton"
            onClick={tryWrite}
            data-testid="submit-review"
          >
            작성
          </button>
          <button
            className="closeModalButton"
            onClick={props.closeModal}
            data-testid="cancel-review"
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

export default WriteReviewModal;
