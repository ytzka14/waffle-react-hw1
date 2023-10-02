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
	const [items, setItems] = useState<[number, string, string, number, string][]>(InitialData());

	const openModal = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsModalVisible(true);
		console.log(isModalVisible);
	};

	const closeModal = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsModalVisible(false);
	};

	function makeJSX(sName: string, sImage: string, sRate: number, sText: string) {
		return (
			<>
				<div className="imageBox">
					<img src={sImage} alt={sName} className="snackImage"/>
				</div>
				<div className="textBox">
					<span className="snackNameText">{sName}</span>
					<span className="greyText"> / </span>
					<span className="rateSpan">★{sRate.toFixed(1)}</span>
					<p>{sText}</p>
				</div>
			</>
		)
	}

	const addReview = (snackName: string, snackImage: string, snackRate: number, snackText: string) => {
		const newID = getNewId();
		
		setItems([...items, [newID, snackName, snackImage, snackRate, snackText]]);
		setIsModalVisible(false);
	}

	return (
		<>
			<ul className="review-list" data-testid="review-list">
				{items.map(item => <div className="block" key={item[0]}>{makeJSX(item[1], item[2], item[3], item[4])}</div>)}	
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