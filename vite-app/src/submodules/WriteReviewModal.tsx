import { useState } from 'react'
import '../App.css'

async function isImageUrlValid(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);

    if (response.status === 200) {
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.startsWith('image/')) {
        return true; // It's a valid image
      }
    }
  } catch (error) {
    // Handle any fetch errors or network issues here
    console.error('Error checking image URL:', error);
  }

  return false; // Not a valid image or an error occurred
}


function WriteReviewModal(props: {closeModal: (e: React.MouseEvent) => void, addReview: (snackName: string, snackImage: string, snackRate: number, snackText: string) => void}) {
	const [snackName, setSnackName] = useState("");
	const [snackImage, setSnackImage] = useState("");
	const [snackRate, setSnackRate] = useState(0);
	const [snackText, setSnackText] = useState("");
	const [preview, setPreview] = useState("");
	const [writeButtonActive, setWriteButtonActive] = useState(true);
	const [nameError, setNameError] = useState("");
	const [imageError, setImageError] = useState("");
	const [rateError, setRateError] = useState("");
	const [textError, setTextError] = useState("");

	const handleTimeout = () => {
		setPreview(snackImage);
		setWriteButtonActive(true);
	}

	let previewTimeout = setTimeout(handleTimeout, 1000);

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSnackName(e.target.value);		
	}

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWriteButtonActive(false);
		setSnackImage(e.target.value);
		clearTimeout(previewTimeout);
		previewTimeout = setTimeout(handleTimeout, 3000);
	}

	const handleRate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSnackRate(Number(e.target.value));
	}

	const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setSnackText(e.target.value);
	}

	async function tryWrite() {
		setSnackName(snackName.trim());
		setSnackText(snackText.trim());
		const isValidImage = await isImageUrlValid(snackImage);
		if(snackName.length < 1 || snackName.length > 20) {
			setNameError("과자 이름은 1자 이상 20자 이하여야 합니다.");
		} else {
			setNameError("");
			if(!isValidImage) {
				setImageError("유효한 이미지 URL이 아닙니다.");
			} else {
				setImageError("");
				if(snackRate < 1 || snackRate > 5 || !Number.isInteger(snackRate)) {
					setRateError("평점은 1 이상 5 이하의 정수여야 합니다.");
				} else {
					setRateError("");
					if(snackText.length < 5 || snackText.length > 1000) {
						setTextError("내용은 5자 이상 1000자 이하여야 합니다.");
					} else{
						setTextError("");
						props.addReview(snackName, snackImage, snackRate, snackText);
					}
				}
			}
		}
	}
	return (
		<>
			<div className="modal-box">
				<div className="modal-header">
					<h2>리뷰 쓰기</h2>
				</div>
				<div className="modal-content">
					<div className="modalImageBox">
						<img src={preview} alt={snackName} className="snackImage"/>
					</div>
					<label htmlFor="imageURLInput">이미지</label><br/>
					<input type="text" id="imageURLInput" className="scrollRight" onChange={handleImage}></input><br/>
					{imageError != "" && (
						<>
							<span className="errorMessage">{imageError}</span><br/>
						</>
					)}
					<label htmlFor="nameInput">과자 이름</label><br/>
					<input type="text" id="nameInput" className="lineInput" onChange={handleName}></input><br/>
					{nameError != "" && (
						<>
							<span className="errorMessage">{nameError}</span><br/>
						</>
					)}
					<label htmlFor="rateInput">평점</label><br/>
					<input type="number" id="rateInput" className="lineInput" onChange={handleRate}></input><br/>
					{rateError != "" && (
						<>
							<span className="errorMessage">{rateError}</span><br/>
						</>
					)}
					<label htmlFor="reviewtextInput">내용</label><br/>
					<textarea id="reviewtextInput" className="scrollDown" onChange={handleText}></textarea><br/>
					{textError != "" && (
						<>
							<span className="errorMessage">{textError}</span><br/>
						</>
					)}
				</div>
				<div className="modal-footer">
					{writeButtonActive && (
						<>
							<button className="writeReviewButton" onClick={tryWrite}>
								작성	
							</button>
						</>
					)}
					{!writeButtonActive && (
						<>
							<button className="inactiveButton">
								작성
							</button>
						</>
					)}
					<button className="closeModalButton" onClick={props.closeModal}>
						취소
					</button>
				</div>
			</div>
			<div className="backdrop" onClick={(e: React.MouseEvent) => {
				e.preventDefault();

				props.closeModal(e);
			}} />
		</>
	)
}

export default WriteReviewModal;