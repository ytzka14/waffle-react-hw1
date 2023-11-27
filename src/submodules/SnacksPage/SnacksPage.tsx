import Header from "../Header/Header.tsx";
import LoginPage from "../LoginPage/LoginPage.tsx";
import { useSnackContext } from "../../contexts/SnackContext.tsx";
import { useLoginContext } from "../../contexts/LoginContext.tsx";
import { Link } from "react-router-dom";
import "./SnacksPage.css";

const SnacksPage = () => {
	const { snacks } = useSnackContext();
	const { loggedIn } = useLoginContext();

	if (loggedIn) {
		return (
			<>
				<Header pageType="snack"/>
				<ul className="snk-snack-list">
					{
						snacks.map((snack) => (
							<div className="snk-snack-block" key={snack.snackId} data-testid="snack-card">
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
							</div>
						))
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