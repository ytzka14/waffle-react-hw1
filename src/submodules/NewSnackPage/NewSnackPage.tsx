import Header from "../Header/Header.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useSnackContext } from "../../contexts/SnackContext.tsx";
import { useState } from "react";
import "./NewSnackPage.css"

const NewSnackPage = () => {
	const { getSnackByName, addSnack } = useSnackContext();
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
			setSnackNameError("이미 존재하는 과자 이름입니다");
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
			if (!newSnack) {
				setSnackNameError("이미 존재하는 과자 이름입니다");
				return;
			}
			navigate("/snacks/" + newSnack.snackId);
    }
  }

	return (
		<>
			<Header pageType="snack"/>
			<div className="nsp-new-snack-page">
				<div className="nsp-body-title">
					<h2>
						새 과자
					</h2>
				</div>
				<div className="nsp-body-body">
					<div className="nsp-image-box">
						<img src={snackImageUrl} alt={snackName} className="nsp-snack-image"/>
					</div>
					<br/>
					<div className="nsp-input-section">
						<label htmlFor="image-url-input">이미지</label>
						<input
							type="text"
							id="image-url-input"
							className="nsp-scroll-right"
							onChange={handleImageUrl}
							data-testid="image-input"
						/>
						<br/>
						<span className="nsp-error-message">
							{snackImageUrlError}
						</span>
						<br/>
						<label htmlFor="name-input">과자 이름</label>
						<input
							type="text"
							id="name-input"
							className="nsp-line-input"
							onChange={handleName}
							data-testid="name-input"
						/>
						<br/>
						<span className="nsp-error-message" data-testid="snack-name-error">
							{snackNameError}
						</span>
					</div>
					<div className="nsp-modal-footer">
						{!isButtonDisabled && (
							<button
								className="nsp-write-review-button"
								onClick={tryWrite}
								data-testid="add-button"
							>
								작성
							</button>
						)}
						{isButtonDisabled && (
							<button className="nsp-inactive-button">
								작성
							</button>
						)}
						<Link to="/">
							<button className="nsp-quit-review-button" data-testid="cancel-button">
								취소
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
};

export default NewSnackPage;