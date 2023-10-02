import { useState } from 'react'
import InitialData from './InitialData'
import WriteReviewModal from './WriteReviewModal'
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

	const openModal = (e: React.MouseEvent) => {
		e.preventDefault();
		console.log("opened Modal");
		setIsModalVisible(true);
		console.log(isModalVisible);
	};

	const closeModal = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsModalVisible(false);
	};

	const addReview = (snackName: string, snackImage: string, snackRate: number, snackText: string) => {
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
			<ul className="review-list" data-testid="review-list">
				{items.map(item => <div key={item[0]}>{item[1]}</div>)}	
			</ul>
			{isModalVisible && (
				<div className="overlay">
					<WriteReviewModal closeModal={closeModal} addReview={addReview}/>
				</div>
			)}
			<button className="addReviewButton" onClick={openModal}>
				+
			</button>
		</>
	)
}

export default AddReviewButton;