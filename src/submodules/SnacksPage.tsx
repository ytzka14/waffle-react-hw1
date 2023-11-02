import Header from "./Header.tsx";
import { useSnackContext } from "../contexts/SnackContext.tsx";
import { Link } from "react-router-dom";
import "./css/SnacksPage.css";

const SnacksPage = () => {
	const { snacks, getSnackById, getSnackByName, filterSnacksByName, addSnack, reviews, getReviewById, addReview, removeReview, editReview } = useSnackContext();

	return (
		<>
			<Header pageType="snack"/>
			<ul className="snack-list">
				{
					snacks.map((snack) => (
						<div className="snack-block" key={snack.snackId}>
							<div className="image-box">
								<Link to={"snacks/" + snack.snackId}>
									<img src={snack.snackImageUrl} alt={snack.snackName} className="snack-image"/>
								</Link>
							</div>
							<div className="text-box">
								<Link to={"snacks/" + snack.snackId} className="invisible-link">
									<span className="snack-name-text">{snack.snackName}</span>
								</Link>
								<span className="rate-span">★{snack.snackRate.toFixed(1)}</span>
							</div>
						</div>
					))
				}
			</ul>
		</>
	)
};

export default SnacksPage;