import { useState } from 'react'
import '../App.css'

function WriteReviewModal(props: {closeModal: (e: React.MouseEvent) => void, addReview: (snackName: string, snackImage: string, snackRate: number, snackText: string) => void}) {
	const [snackName, setSnackName] = useState("");
	const [snackImage, setSnackImage] = useState("");
	const [snackRate, setSnackRate] = useState(0);
	const [snackText, setSnackText] = useState("");
	const [preview, setPreview] = useState("");
	const [writeButtonActive, setWriteButtonActive] = useState(true);

	const handleTimeout = () => {
		console.log(snackImage);
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
					<input type="text" id="imageURLInput" className="scrollRight" onChange={handleImage}></input>
					<br/>
					<label htmlFor="nameInput">과자 이름</label><br/>
					<input type="text" id="nameInput" className="lineInput" onChange={handleName}></input>
					<br/>
					<label htmlFor="rateInput">평점</label><br/>
					<input type="number" id="rateInput" className="lineInput" onChange={handleRate}></input>
					<br/>
					<label htmlFor="reviewtextInput">내용</label><br/>
					<textarea id="reviewtextInput" className="scrollDown" onChange={handleText}></textarea>
				</div>
				<div className="modal-footer">
					{writeButtonActive && (
						<>
							<button className="writeReviewButton" onClick={()=>props.addReview(snackName, snackImage, snackRate, snackText)}>
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