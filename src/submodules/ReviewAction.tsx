import { useState } from "react";
import InitialData from "./InitialData";
import WriteReviewModal from "./WriteReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import iconDelete from "../assets/icon_delete.svg";
import iconEdit from "../assets/icon_edit.svg";
import iconQuit from "../assets/icon_quit.svg";
import iconSave from "../assets/icon_save.svg";

function createIncrementer() {
  let counter = 104;

  return function () {
    return counter++;
  };
}

const getNewId = createIncrementer();

function ReviewAction() {
  const [isWriteModalVisible, setIsWriteModalVisible] = useState(false);
  const [items, setItems] = useState<
    [number, string, string, number, string][]
  >(InitialData());
  const [editID, setEditID] = useState<number | null>(null);
  const [deleteID, setDeleteID] = useState<number | null>(null);
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
    };
  }

  const closeDeleteModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setDeleteID(null);
  };

  function makeJSX(
    sID: number,
    sName: string,
    sImage: string,
    sRate: number,
    sText: string,
  ) {
    const editText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setSnackText(e.target.value);
    };

    function saveEdit() {
      setSnackText(snackText.trim());
      if (snackText.length < 5 || snackText.length > 1000) {
        setEditError("내용은 5자 이상 1000자 이하여야 합니다.");
        return;
      }
      setEditError("");
      setItems(items.map(it => it[0] === editID ? [it[0], it[1], it[2], it[3], sText] : it));
      setEditID(null);
      setSnackText("");
    }

    function quitEdit() {
      setEditID(null);
      setSnackText("");
    }

    return (
      <>
        <div className="imageBox">
          <img
            src={sImage}
            alt={sName}
            className="snackImage"
            data-testid="snack-image"
          />
        </div>
        <div className="textBox">
          <span className="snackNameText">{sName}</span>
          <span className="greyText"> / </span>
          <span className="rateSpan">★{sRate.toFixed(1)}</span>
          {editID !== sID && <p>{sText}</p>}
          {editID === sID && (
            <textarea
              rows={5}
              className="editTextarea"
              onChange={editText}
              value={snackText}
              data-testid="edit-review-content-input"
            ></textarea>
          )}
          {editID === sID && editError !== "" && (
            <span className="errorMessage">{editError}</span>
          )}
        </div>
        {editID === null && (
          <div className="hoverBox">
            <img
              src={iconEdit}
              className="smallIcon"
              onClick={() => {
                setEditID(sID);
                setSnackText(sText);
              }}
              data-testid="edit-review"
            />
            <img
              src={iconDelete}
              className="smallIcon"
              onClick={openDeleteModal(sID)}
              data-testid="delete-review"
            />
          </div>
        )}
        {editID === sID && (
          <div className="alwaysHoverBox">
            <img
              src={iconSave}
              className="smallIcon"
              onClick={saveEdit}
              data-testid="edit-review-save"
            />
            <img
              src={iconQuit}
              className="smallIcon"
              onClick={quitEdit}
              data-testid="edit-review-cancel"
            />
          </div>
        )}
      </>
    );
  }

  const addReview = (
    snackName: string,
    snackImage: string,
    snackRate: number,
    snackText: string,
  ) => {
    const newID = getNewId();

    setItems([[newID, snackName, snackImage, snackRate, snackText], ...items]);
    setIsWriteModalVisible(false);
  };

  const deleteReview = () => {
    setItems(items.filter(([id]) => id !== deleteID));
    setDeleteID(null);
  };

  return (
    <>
      <ul className="review-list" data-testid="review-list">
        {items.map((item) => (
          <div className="block" key={item[0]} data-testid="review">
            {makeJSX(item[0], item[1], item[2], item[3], item[4])}
          </div>
        ))}
      </ul>
      {isWriteModalVisible && (
        <div className="overlay">
          <WriteReviewModal
            closeModal={closeWriteModal}
            addReview={addReview}
          />
        </div>
      )}
      {deleteID !== null && (
        <div className="overlay">
          <DeleteReviewModal
            closeModal={closeDeleteModal}
            deleteReview={deleteReview}
            deleteName={items.find(([id, _]) => id === deleteID)?.[1] ?? ""}
          />
        </div>
      )}
      <button
        className="addReviewButton"
        onClick={openWriteModal}
        data-testid="write-review"
      >
        +
      </button>
    </>
  );
}

export default ReviewAction;
