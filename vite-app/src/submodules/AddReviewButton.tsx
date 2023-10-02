import { useState } from 'react'
import InitialData from './InitialData'
import WriteReviewModal from './WriteReviewModal'
import '../App.css'

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
				<div className="textBox">
					<span className="snackNameText">{snackName}</span>
					<span className="greyText"> / </span>
					<span className="rateSpan">★{snackRate.toFixed(1)}</span>
					<p>{snackText}</p>
				</div>
			</>
		)
		const newID = getNewId();

		setItems([...items, [newID, newItem]]);
		setIsModalVisible(false);
	}

	return (
		<>
			<ul className="review-list" data-testid="review-list">
				{items.map(item => <div className="block" key={item[0]}>{item[1]}</div>)}	
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