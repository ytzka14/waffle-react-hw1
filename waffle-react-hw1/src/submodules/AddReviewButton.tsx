import { useState } from 'react'
import InitialData from './InitialData'
import WriteReviewModal from './WriteReviewModal'
import DeleteReviewModal from './DeleteReviewModal'
import iconDelete from '../assets/icon_delete.png'
import iconEdit from '../assets/icon_edit.png'
import iconQuit from '../assets/icon_quit.png'
import iconSave from '../assets/icon_save.png'
import '../App.css'

function createIncrementer() {
	let counter = 104;

	return function (){
		return counter++;
	};
}

const getNewId = createIncrementer();

function AddReviewButton() {	
	const [isWriteModalVisible, setIsWriteModalVisible] = useState(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [items, setItems] = useState<[number, string, string, number, string][]>(InitialData());
	const [editID, setEditID] = useState(0);
	const [deleteID, setDeleteID] = useState(0);
	const [snackText, setSnackText] = useState("");
	const [editError, setEditError] = useState("");

	const openWriteModal = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsWriteModalVisible(true);
	};

	const closeWriteModal = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsWriteModalVisible(false);
	};

	function openDeleteModal(id: number) {
		return (e: React.MouseEvent) => {
			setDeleteID(id);
			e.preventDefault();
			setIsDeleteModalVisible(true);
		}
	}

	const closeDeleteModal = (e: React.MouseEvent) => {
		e.preventDefault();
		setDeleteID(0);
		setIsDeleteModalVisible(false);
	}

	function makeJSX(sID: number, sName: string, sImage: string, sRate: number, sText: string) {
		
		const editText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setSnackText(e.target.value);
		}

		function saveEdit() {
			setSnackText(snackText.trim());
			if(snackText.length < 5 || snackText.length > 1000) {
				setEditError("내용은 5자 이상 1000자 이하여야 합니다.");
				return;
			}
			setEditError("");
			let newItems: [number, string, string, number, string][] = [];
			for (const [sID, sName, sImage, sRate, sText] of items) {
				if (sID != editID) {
					newItems = [...newItems, [sID, sName, sImage, sRate, sText]];
				} else {
					newItems = [...newItems, [sID, sName, sImage, sRate, snackText]];
				}
			}
			setItems(newItems);
			setEditID(0);
			setSnackText("");
		}

		function quitEdit() {
			setEditID(0);
			setSnackText("");
		}

		return (
			<>
				<div className="imageBox">
					<img src={sImage} alt={sName} className="snackImage" data-testid="snack-image"/>
				</div>
				<div className="textBox">
					<span className="snackNameText">{sName}</span>
					<span className="greyText"> / </span>
					<span className="rateSpan">★{sRate.toFixed(1)}</span>
					{editID != sID && (
						<p>{sText}</p>
					)}
					{editID == sID && (
						<textarea rows={5} className="editTextarea" onChange={editText} value={snackText} data-testid="edit-review-content-input"></textarea>
					)}
					{editID == sID && editError != "" && (
						<span className="errorMessage">{editError}</span>
					)}
				</div>
				{editID == 0	&& (	
					<div className="hoverBox">
						<img src={iconEdit} className="smallIcon" onClick={(e: React.MouseEvent)=>{e.preventDefault; setEditID(sID); setSnackText(sText);}} data-testid="edit-review"/>
						<img src={iconDelete} className="smallIcon" onClick={openDeleteModal(sID)} data-testid="delete-review"/>
					</div>
				)}
				{editID == sID && (
					<div className="alwaysHoverBox">
						<img src={iconSave} className="smallIcon" onClick={(e: React.MouseEvent)=>{e.preventDefault; saveEdit()}} data-testid="edit-review-save"/>
						<img src={iconQuit} className="smallIcon" onClick={(e: React.MouseEvent)=>{e.preventDefault; quitEdit()}} data-testid="edit-review-cancel"/>
					</div>
				)}
			</>
		)
	}

	const addReview = (snackName: string, snackImage: string, snackRate: number, snackText: string) => {
		const newID = getNewId();
		
		setItems([...items, [newID, snackName, snackImage, snackRate, snackText]]);
		setIsWriteModalVisible(false);
	}

	const deleteReview = () => {
		let newItems: [number, string, string, number, string][] = [];
		for (const [sID, sName, sImage, sRate, sText] of items) {
			if (sID != deleteID) {
				newItems = [...newItems, [sID, sName, sImage, sRate, sText]];
			}
		}
		setItems(newItems);
		setDeleteID(0);
		setIsDeleteModalVisible(false);
	}

	function getDeleteName() {
		if(deleteID == 0) return "";
		for (const [sID, sName,,] of items) {
			if (sID == deleteID) {
				return sName;
			}
		}
		return "";
	}

	return (
		<>
			<ul className="review-list" data-testid="review-list">
				{items.map(item => <div className="block" key={item[0]} data-testid="review">{makeJSX(item[0], item[1], item[2], item[3], item[4])}</div>)}	
			</ul>
			{isWriteModalVisible && (
				<div className="overlay">
					<WriteReviewModal closeModal={closeWriteModal} addReview={addReview}/>
				</div>
			)}
			{isDeleteModalVisible && (
				<div className="overlay">
					<DeleteReviewModal closeModal={closeDeleteModal} deleteReview={deleteReview} deleteName={getDeleteName()}/>
				</div>
			)}
			<button className="addReviewButton" onClick={openWriteModal} data-testid="write-review">
				+
			</button>
		</>
	)
}

export default AddReviewButton;