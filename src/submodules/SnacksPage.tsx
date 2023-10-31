import Header from "./Header.tsx";
import { useSnackContext } from "../contexts/SnackContext.tsx";

const SnacksPage = () => {
	const { snacks, getSnackById, getSnackByName, filterSnacksByName, addSnack, reviews } = useSnackContext();

	return (
		<>
			<ul className="snack-list">
				{
					snacks.map((snack) => (
						<div className="snack-block" key={snack.snackId}>
							<div className="image-box">
								<img src={snack.snackImageUrl} alt={snack.snackName} className="snack-image"/>
							</div>
							<div className="text-box">
								<span className="snack-name-text">{snack.snackName}</span>
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