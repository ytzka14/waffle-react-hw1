import { useState } from "react";
import { Snack } from "../../contexts/SnackContext.tsx";
import { useLoginContext } from "../../contexts/LoginContext.tsx";
import "./WriteReviewModal.css";

const WriteReviewModal = (props: {
  closeModal: (e: React.MouseEvent) => void;
  saveReview: (
    snack: Snack,
    reviewScore: number,
    reviewText: string,
  ) => void;
}) => {
  const [snackName, setSnackName] = useState("");
  const [snackRate, setSnackRate] = useState(0);
  const [snackText, setSnackText] = useState("");
  const [nameError, setNameError] = useState("");
  const [rateError, setRateError] = useState("");
  const [textError, setTextError] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [targetSnack, setTargetSnack] = useState<Snack | null>(null);
	const [snacks, setSnacks] = useState<Snack[]>([]);
	const { getAccessToken } = useLoginContext();

	const getSnackByName = (name: string) => {
		fetch("https://seminar-react-api.wafflestudio.com/snacks/"+name, {
			method: "GET",
			headers: {
				"Content-Type": "applications/json",
				"Authorization": "Bearer " + getAccessToken(),
			},
		})
			.then((res) => res.json())
			.then((reslist) => {
				if(reslist.length > 1){
					setTargetSnack(reslist[0]);
				} else {
					setTargetSnack(null);
				}
			})
			.catch(() => {
				alert("Cannot get snack by name!");
			});
	};

	const getSnacks = () => {
		fetch("https://seminar-react-api.wafflestudio.com/snacks/", {
			method: "GET",
			headers: {
				"Content-Type": "applications/json",
				"Authorization": "Bearer " + getAccessToken(),
			},
		})
			.then((res) => res.json())
			.then((reslist) => {
				return reslist.map((res) => {
					const retrieved: Snack = {
						snackId: res.id,
						snackName: res.name,
						snackImageUrl: res.image,
						snackRate: res.rating
					};
					return retrieved;
				});
			})
			.then((res) => {
				setSnacks(res);
			})
			.catch(() => {
				alert("Cannot get snacks!");
			});
	};

	const filterSnacksByName = (query: string) => {
		getSnacks();
		return snacks.filter((snack: Snack) => snack.snackName.replace(' ', '').includes(query.replace(' ', '')));
	}

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnackName(e.target.value);
  };

  const handleRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSnackRate(Number(e.target.value));
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSnackText(e.target.value);
  };

	const handleFocus = () => {
		setShowDropdown(true);
	}

	const handleBlur = () => {
		setTimeout(() => setShowDropdown(false), 200);
	}

	const handleOptionClick = (value: string) => {
		setSnackName(value);
		setShowDropdown(false);
	}

  function tryWrite(e: React.MouseEvent) {
    let invalid = false;
		getSnackByName(snackName);
    if (targetSnack === null) {
			setNameError("해당 과자를 찾을 수 없습니다");
			invalid = true;
    } else {
      setNameError("");
    }

    if (snackRate < 1 || snackRate > 5 || !Number.isInteger(snackRate)) {
      setRateError("평점은 1 ~ 5 사이의 숫자로 써주세요");
      invalid = true;
    } else {
      setRateError("");
    }

    if (snackText.length < 5 || snackText.length > 1000) {
      setTextError("첫글자와 끝글자가 공백이 아닌 5~1000자 문자열로 써주세요");
      invalid = true;
    } else if (snackText !== snackText.trim()) {
      setTextError("첫글자와 끝글자가 공백이 아닌 5~1000자 문자열로 써주세요");
      invalid = true;
    } else {
      setTextError("");
    }

    if (!invalid) {
			if (!targetSnack) {
				setNameError("해당 과자를 찾을 수 없습니다");
				return;
			}
      props.saveReview(targetSnack, snackRate, snackText);
			props.closeModal(e);
		}
  }

  return (
    <>
      <div className="wrm-modal-box" data-testid="write-review-modal">
        <div className="wrm-modal-header">
          <h2>리뷰 쓰기</h2>
        </div>
        <div className="wrm-modal-content">
          <label htmlFor="name-input">과자 이름</label>
          <br />
          <input
            type="text"
            id="name-input"
            className="wrm-line-input"
						value={snackName}
            onChange={handleName}
						onFocus={handleFocus}
						onBlur={handleBlur}
						autoComplete="off"
						data-testid="name-input"
					/>
					{showDropdown && (
        		<div className="wrm-dropdown" data-testid="snack-name-compl-list">
          	{filterSnacksByName(snackName)
            	.map((snack) => (
              	<div
                	key={snack.snackId}
                	className="wrm-dropdown-option"
                	onClick={() => handleOptionClick(snack.snackName)}
              	>
                	{snack.snackName}
              	</div>
            	))}
        		</div>
      		)}
          <br />
          <span className="wrm-error-message" data-testid="name-input-message">
            {nameError}
          </span>
          <br />
          <label htmlFor="rateInput">평점</label>
          <br />
          <input
            type="number"
            id="rateInput"
            className="wrm-line-input"
            onChange={handleRate}
            data-testid="rating-input"
          ></input>
          <br />
          <span className="wrm-error-message" data-testid="rating-input-message">
            {rateError}
          </span>
          <br />
          <label htmlFor="reviewtextInput">내용</label>
          <br />
          <textarea
            id="reviewtextInput"
            className="wrm-scroll-down"
            onChange={handleText}
            data-testid="content-input"
          ></textarea>
          <br />
          <span className="wrm-error-message" data-testid="content-input-message">
            {textError}
          </span>
          <br />
        </div>
        <div className="wrm-modal-footer">
          <button
            className="wrm-write-review-button"
            onClick={tryWrite}
            data-testid="submit-review"
          >
            작성
          </button>
          <button
            className="wrm-close-modal-button"
            onClick={props.closeModal}
            data-testid="cancel-review"
          >
            취소
          </button>
        </div>
      </div>
      <div
        className="wrm-backdrop"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          props.closeModal(e);
        }}
      />
    </>
  );
}

export default WriteReviewModal;
