import { useState } from 'react'
import '../App.css'
import './AddReviewButton.css'

function WriteReviewModal(props: {closeModal: (e: React.MouseEvent) => void, addReview: (snackName: string, snackImage: string, snackRate: number, snackText: string) => void}) {
	const [snackName, setSnackName] = useState("");
	const [snackImage, setSnackImage] = useState("");
	const [snackRate, setSnackRate] = useState(0);
	const [snackText, setSnackText] = useState("");

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSnackName(e.target.value);		
	}

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSnackImage(e.target.value);
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
					<h4>리뷰 쓰기</h4>
				</div>
				<div className="modal-content">
					<label htmlFor="nameInput">과자 이름</label>
					<input type="text" id="nameInput" className="lineInput" onChange={handleName}></input>
					<br/>
					<label htmlFor="imageURLInput">이미지</label>
					<input type="text" id="imageURLInput" className="scrollRight" onChange={handleImage}></input>
					<br/>
					<label htmlFor="rateInput">평점</label>
					<input type="number" id="rateInput" className="lineInput" onChange={handleRate}></input>
					<br/>
					<label htmlFor="reviewtextInput">내용</label>
					<textarea id="reviewtextInput" className="scrollDown" onChange={handleText}></textarea>
				</div>
				<div className="modal-footer">
					<button className="writeReviewButton" onClick={()=>props.addReview(snackName, snackImage, snackRate, snackText)}>
						작성	
					</button>
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