import Header from "./Header.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useSnackContext } from "../contexts/SnackContext.tsx";
import { useState } from "react";
import "./css/NewSnackPage.css"

const NewSnackPage = () => {
	const { snacks, getSnackById, getSnackByName, filterSnacksByName, addSnack, reviews } = useSnackContext();
	const [ snackName, setSnackName ] = useState("");
	const [ snackNameError, setSnackNameError ] = useState("");
	const [ snackImageUrl, setSnackImageUrl ] = useState("");
	const [ snackImageUrlError, setSnackImageUrlError ] = useState("");
	const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);

	const navigate = useNavigate();

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsButtonDisabled(true);
    setSnackName(e.target.value);
		setTimeout(() => setIsButtonDisabled(false), 1000);
  };

  const handleImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsButtonDisabled(true);
    setSnackImageUrl(e.target.value);
		setTimeout(() => setIsButtonDisabled(false), 1000);
  };

  const tryWrite = () => {
    let invalid = false;
    if (snackName.length < 1 || snackName.length > 20) {
      setSnackNameError("첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요");
      invalid = true;
    } else if (snackName !== snackName.trim()) {
      setSnackNameError("첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요");
      invalid = true;
    } else if (getSnackByName(snackName) !== null) {
			setSnackNameError("이미 등록된 과자입니다")
			invalid = true;
		} else {
      setSnackNameError("");
    }

		if (snackImageUrl.length < 1) {
			setSnackImageUrlError("반드시 1자 이상의 문자열로 작성해야 합니다");
			invalid = true;
		} else {
			setSnackImageUrlError("");
		}

    if (!invalid) {
      const newSnack = addSnack({snackName: snackName, snackImageUrl: snackImageUrl});
			navigate("/snacks/" + newSnack!.snackId);
    }
  }

	return (
		<>
			<Header pageType="snack"/>
			<div className="body-title">
				<h2>
					새 과자
				</h2>
			</div>
			<div className="image-box">
				<img src={snackImageUrl} alt={snackName} className="snack-image"/>
			</div>
			<label htmlFor="image-url-input">이미지</label>
      <br/>
      <input
        type="text"
				id="image-url-input"
				className="scroll-right"
				onChange={handleImageUrl}
				data-testid="image-input"
			/>
			<br/>
			<span className="error-message">
        {snackImageUrlError}
      </span>
			<br/>
			<label htmlFor="name-input">과자 이름</label>
			<br/>
			<input
				type="text"
				id="name-input"
				className="line-input"
				onChange={handleName}
				data-testid="name-input"
			/>
			<br/>
			<span className="error-message" data-testid="snack-name-error">
        {snackNameError}
      </span>
			<br/>
			<div className="modal-footer">
				{!isButtonDisabled && (
					<button
						className="write-review-button"
						onClick={tryWrite}
						data-testid="add-button"
					>
						작성
					</button>
				)}
				{isButtonDisabled && (
					<button className="inactive-button" data-testid="add-button">
						작성
					</button>
				)}
				<Link to="/">
					<button className="quit-review-button" data-testid="cancel-button">
						취소
					</button>
				</Link>
			</div>
		</>
	)
};

export default NewSnackPage;