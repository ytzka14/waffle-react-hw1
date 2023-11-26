import { ReactNode, createContext, useContext, useState } from "react";

const generateId = () => {
	let counter = 1;

	return function () {
		return counter++;
	}
}

const generateSnackId = generateId();
const generateReviewId = generateId();

export type SnackInput = {
	snackName: string;
	snackImageUrl: string;
};
export type Snack = {
	snackId: number;
	snackName: string;
	snackImageUrl: string;
	snackRate: number;
};
export type ReviewInput = {
	snackId: number;
	reviewScore: number;
	reviewText: string;
};
export type Review = {
	reviewId: number;
	snackId: number;
	reviewScore: number;
	reviewText: string;
};
export type SnackContextData = {
  snacks: Snack[];
  getSnackById: (id: number) => Snack | null;
  getSnackByName: (name: string) => Snack | null;
  filterSnacksByName: (name: string) => Snack[];
  addSnack: (snack: SnackInput) => Snack | null;

  reviews: Review[];
	getReviewById: (id: number) => Review | null;
	addReview: (review: ReviewInput) => Review;
	removeReview: (review: Review) => number | null;
	editReview: (id: number, text: string) => Review | null;
};

const emptyReview = {
	reviewId: 0,
	snackId: 0,
	reviewScore: 0,
	reviewText: ""
}

const SnackContext = createContext<SnackContextData>({
	snacks: [],
	getSnackById: () => null,
	getSnackByName: () => null,
	filterSnacksByName: () => [],
	addSnack: () => null,

	reviews: [],
	getReviewById: () => null,
	addReview: () => emptyReview,
	removeReview: () => null,
	editReview: () => null
})

export function SnackProvider({ children }: { children: ReactNode }) {
	const [ snacks, setSnacks ] = useState<Snack[]>([]);
	const getSnackById = (id: number) => {
		return snacks.find((snack: Snack) => snack.snackId === id) || null;
	};
	const getSnackByName = (name: string) => {
		return snacks.find((snack: Snack) => snack.snackName === name) || null;
	};
	const filterSnacksByName = (query: string) => {
		return snacks.filter((snack: Snack) => snack.snackName.replace(' ', '').includes(query.replace(' ', '')));
	}
	const addSnack = (snack: SnackInput) => {
		if (getSnackByName(snack.snackName) === null) {
			const newSnack = {snackId: generateSnackId(), snackName: snack.snackName, snackImageUrl: snack.snackImageUrl, snackRate: 5};
			setSnacks([newSnack, ...snacks]);
			return newSnack;
		}
		return null;
	}

	const [ reviews, setReviews ] = useState<Review[]>([]);
	const getReviewById = (id: number) => {
		return reviews.find((review: Review) => review.reviewId === id) || null;
	}
	const addReview = (review: ReviewInput) => {
		const newReview = {reviewId: generateReviewId(), snackId: review.snackId, reviewScore: review.reviewScore, reviewText: review.reviewText};
		setReviews([newReview, ...reviews]);
		return newReview;
	}
	const removeReview = (review: Review) => {
		const targetReview = getReviewById(review.reviewId);
		if (targetReview === null) {
			return null;
		}
		setReviews(reviews.filter(({reviewId}) => reviewId !== targetReview.reviewId));
		return review.reviewId;
	}
	const editReview = (id: number, text: string) => {
		const targetReview = getReviewById(id);
		if (targetReview === null) {
			return null;
		}
		const fixedReview = {reviewId: id, snackId: targetReview.snackId, reviewScore: targetReview.reviewScore, reviewText: text};
		setReviews(reviews.map(review => review.reviewId === id ? fixedReview : review));
		return fixedReview;
	}

	return (
		<SnackContext.Provider
			value={{
				snacks,
				getSnackById,
				getSnackByName,
				filterSnacksByName,
				addSnack,
				reviews,
				getReviewById,
				addReview,
				removeReview,
				editReview
			}}
		>
			{children}
		</SnackContext.Provider>
	);
}
export const useSnackContext = () => useContext(SnackContext);