import { useState } from 'react'
import InitialData from './InitialData'
import '../App.css'
import './AddReviewButton.css'

function createIncrementer() {
	let counter = 104;

	return function (){
		return counter++;
	};
}

const getNewId = createIncrementer();

function AddReviewButton() {	
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [items, setItems] = useState<[number, JSX.Element][]>(InitialData());
	const [snackName, setSnackName] = useState("");
	const [snackImage, setSnackImage] = useState("");
	const [snackRate, setSnackRate] = useState(0);
	const [snackText, setSnackText] = useState("");

	const openModal = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsModalVisible(true);
	};

	const closeModal = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsModalVisible(false);
	};

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

	const addReview = () => {
		const newItem = (
			<>
				<div className="imageBox">
					<img src={snackImage} alt={snackName} className="snackImage"/>
				</div>
				<br/>
				<span className="snackNameText">{snackName}</span>
				<span className="greyText">/</span>
				<span className="rateSpan">★{snackRate.toFixed(1)}</span>
				<br/>
				<p>{snackText}</p>
			</>
		)
		const newID = getNewId();

		setItems([...items, [newID, newItem]]);
		setIsModalVisible(false);
	}

	return (
		<>
			<ul data-testid="review-list">
				{items.map(item => <div key={item[0]}>{item[1]}</div>)}	
			</ul>
			<button className="addReviewButton" onClick={openModal}>
				+
			</button>

			{isModalVisible && (
				<div className="overlay" onClick={closeModal}>
					<div className="modal active">
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
							<button className="writeReviewButton" onClick={addReview}>
								작성	
							</button>
							<button className="closeModalButton" onClick={closeModal}>
								취소
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default AddReviewButton;