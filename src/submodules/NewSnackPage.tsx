import Header from "./Header.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useSnackContext } from "../contexts/SnackContext.tsx";
import { useState } from "react";

const NewSnackPage = () => {
	const { snacks, getSnackById, getSnackByName, filterSnacksByName, addSnack, reviews } = useSnackContext();
	const [ snackName, setSnackName ] = useState("");
	const [ snackNameError, setSnackNameError ] = useState("");
	const [ snackImageUrl, setSnackImageUrl ] = useState("");
	const [ snackImageUrlError, setSnackImageUrlError ] = useState("");

	const navigate = useNavigate();

	const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnackName(e.target.value);
  };

  const handleImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnackImageUrl(e.target.value);
  };

  const tryWrite = () => {
    let invalid = false;
    if (snackName.length < 1 || snackName.length > 20) {
      setSnackNameError("첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요");
      invalid = true;
    } else if (snackName !== snackName.trim()) {
      setSnackNameError("첫글자와 끝글자가 공백이 아닌 1~20자 문자열로 써주세요");
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
			/>
			<br/>
			<span className="error-message">
        {snackNameError}
      </span>
			<br/>
			<div className="modal-footer">
				<button
					className="write-review-button"
					onClick={tryWrite}
				>
					작성
				</button>
				<Link to="/">
					<button className="quit-review-button">
						취소
					</button>
				</Link>
			</div>
		</>
	)
};

export default NewSnackPage;