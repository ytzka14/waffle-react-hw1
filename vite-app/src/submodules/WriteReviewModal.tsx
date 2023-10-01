// import { useState } from 'react'
import '../App.css'

function WriteReviewModal() {

	return (
		<>
			<div className="modal-content">
				<label htmlFor="nameInput">과자 이름</label>
				<input id="nameInput" className="lineInput"></input>
				<br/>
				<label htmlFor="imageURLInput">이미지</label>
				<input id="imageURLInput" className="scrollRight"></input>
				<br/>
				<label htmlFor="rateInput">평점</label>
				<input type="number" id="rateInput" className="lineInput"></input>
				<br/>
				<label htmlFor="reviewtextInput">내용</label>
				<textarea id="reviewtextInput" className="scrollDown"></textarea>
			</div>
		</>
	)
}

export default WriteReviewModal;