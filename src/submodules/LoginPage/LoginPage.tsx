import { useState } from 'react';
import "./LoginPage.css";
import { useLoginContext } from '../../contexts/LoginContext';

const LoginPage = () => {
	const { login } = useLoginContext();
	const [ idInput, setIdInput ] = useState("");
	const [ pwInput, setPwInput ] = useState("");

	const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIdInput(e.target.value);
	};

	const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPwInput(e.target.value);
	};

	const submitLogin = () => {
		fetch("https://seminar-react-api.wafflestudio.com/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: idInput,
				password: pwInput,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if(!res.user) {
					throw Error("Login Failed!");
				}
				return res;
			})
			.then((res) => {
				login(res);
			});
	};

  return (
    <div className="log-main">
      <h2 className="log-text">로그인</h2>
			<label htmlFor="id-input">ID</label>
			<br />
			<input
				type="text"
				id="id-input"
				onChange={handleId}
			/>
			<br />
			<label htmlFor="pw-input">비밀번호</label>
			<br />
			<input
				type="password"
				id="pw-input"
				onChange={handlePw}
			/>
			<br />
			{( idInput !== "" && pwInput !== "" ) && (
				<button onClick={submitLogin} className="log-active-login-button">
					로그인
				</button>
			)}
			{( idInput === "" || pwInput === "" ) && (
				<button className="log-inactive-login-button">
					로그인
				</button>
			)}
    </div>
  );
}

export default LoginPage;
