import { useState } from "react";
import "../App.css";

/*
async function isImageUrlValid(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.startsWith("image/")) {
        return true; // It's a valid image
      }
    }
  } catch (error) {
    // Handle any fetch errors or network issues here
    console.error("Error checking image URL:", error);
  }

  return false; // Not a valid image or an error occurred
}
*/

function WriteReviewModal(props: {
  closeModal: (e: React.MouseEvent) => void;
  addReview: (
    snackName: string,
    snackImage: string,
    snackRate: number,
    snackText: string,
  ) => void;
}) {
  const [snackName, setSnackName] = useState("");
  const [snackImage, setSnackImage] = useState("");
  const [snackRate, setSnackRate] = useState(0);
  const [snackText, setSnackText] = useState("");
  const [preview, setPreview] = useState("");
  // const [writeButtonActive, setWriteButtonActive] = useState(true);
  const [nameError, setNameError] = useState("");
  // const [imageError, setImageError] = useState("");
  const [rateError, setRateError] = useState("");
  const [textError, setTextError] = useState("");

  const handleTimeout = () => {
    setPreview(snackImage);
    // setWriteButtonActive(true);
  };

  let previewTimeout = setTimeout(handleTimeout, 1000);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnackName(e.target.value);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setWriteButtonActive(false);
    setSnackImage(e.target.value);
    clearTimeout(previewTimeout);
    previewTimeout = setTimeout(handleTimeout, 1000);
  };

  const handleRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnackRate(Number(e.target.value));
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSnackText(e.target.value);
  };

  function tryWrite() {
    /*
		const isValidImage = await isImageUrlValid(snackImage);
		*/
		let invalid: boolean = false;
    if (snackName.length < 1 || snackName.length > 20) {
      setNameError("첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요");
			invalid = true;
    } else if (snackName != snackName.trim()) {
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
    }	else if (snackText != snackText.trim()) {
			setTextError("첫글자와 끝글자가 공백이 아닌 5~1000자 문자열로 써주세요");
			invalid = true;
		} else {
      setTextError("");
		}

		if(!invalid) {
			props.addReview(snackName, snackImage, snackRate, snackText);
		}
  }

  return (
    <>
      <div className="modal-box" data-testid="write-review-modal">
        <div className="modal-header">
          <h2>리뷰 쓰기</h2>
        </div>
        <div className="modal-content">
          <div className="modalImageBox">
            <img src={preview} alt={snackName} className="snackImage" />
          </div>
          <label htmlFor="imageURLInput">이미지</label>
          <br />
          <input
            type="text"
            id="imageURLInput"
            className="scrollRight"
            onChange={handleImage}
            data-testid="image-input"
          ></input>
          <br />
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
					<span
						className="errorMessage"
						data-testid="content-input-message"
					>
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
