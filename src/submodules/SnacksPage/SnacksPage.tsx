import Header from "../Header/Header.tsx";
import LoginPage from "../LoginPage/LoginPage.tsx";
import { Snack } from "../../contexts/SnackContext.tsx";
import { useLoginContext } from "../../contexts/LoginContext.tsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./SnacksPage.css";

const SnacksPage = () => {
	const { loggedIn, getAccessToken } = useLoginContext();
	const [ snacks, setSnacks ] = useState<Snack[]>([]);

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
				return reslist.map((res: { id: any; name: any; image: any; rating: any; }) => {
					let remNull = res.rating;
					if(!res.rating) remNull = 0;
					const retrieved: Snack = {
						snackId: res.id,
						snackName: res.name,
						snackImageUrl: res.image,
						snackRate: remNull
					};
					return retrieved;
				});
			})
			.then((res) => {
				setSnacks(res);
			})
			.catch(() => {
				alert("Cannot get snacks!");
				setSnacks([]);
			});
	};

	useEffect(() => {
		getSnacks();
	}, []);

	const snackBox = (snack: Snack) => {
		if(snack === null){
			return (
				<></>
			);
		}

		console.log(snack.snackRate);

		return (
			<li className="snk-snack-block" key={snack.snackId} data-testid="snack-card">
								<div className="snk-image-box">
									<Link to={"/snacks/" + snack.snackId}>
										<img src={snack.snackImageUrl} alt={snack.snackName} className="snk-snack-image" data-testid="snack-image"/>
									</Link>
								</div>
								<div className="snk-text-box">
									<Link to={"/snacks/" + snack.snackId} className="snk-invisible-link" data-testid="snack-name">
										<span className="snk-snack-name-text">{snack.snackName}</span>
									</Link>
									<br/>
									<span className="snk-rate-span">★</span>
									<span className="snk-rate-span" data-testid="rating">{snack.snackRate.toFixed(1)}</span>
								</div>
							</li>
		)
	}

	if (loggedIn) {
		return (
			<>
				<Header pageType="snack"/>
				<ul className="snk-snack-list">
					{
						snacks.map((snack) => snackBox(snack))
					}
				</ul>
			</>
		);
	} else {
		return (
			<LoginPage/>
		);
	}
};

export default SnacksPage;