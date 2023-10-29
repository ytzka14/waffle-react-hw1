import { ReactNode, createContext, useContext, useState } from "react";

export type SnackInput = {
	snackName: string;
	snackImageURL: string;
};
export type Snack = {
	snackID: number;
	snackName: string;
	snackImageURL: string;
};
export type ReviewInput = {
	reviewScore: number;
	reviewText: string;
};
export type Review = {
	reviewID: number;
	reviewScore: number;
	reviewText: string;
};
export type SnackContextData = {
  snacks: Snack[];
  getSnackById: (id: number) => Snack | null;
  getSnackByName: (name: string) => Snack | null;
  filterSnacksByName: (query: string) => Snack[];
  addSnack: (snack: SnackInput) => Snack | null;

  reviews: Review[];
};

const SnackContext = createContext<SnackContextData>({
	snacks: [],
	getSnackById: (id: number) => null,
	getSnackByName: (name: string) => null,
	filterSnacksByName: (query: string) => [],
	addSnack: (snack: SnackInput) => null,

	reviews: [],
})

export function SnackProvider({ children }: { children: ReactNode }) {
	const [snacks, setSnacks] = useState<Snack[]>([]);
	const getSnackById = (id: number) => {
		return snacks.find((snack: Snack) => snack.snackID === id) || null;
	};
	const getSnackByName = (name: string) => {
		return snacks.find((snack: Snack) => snack.snackName === name) || null;
	};
	const filterSnacksByName = (query: string) => {
		return snacks.filter((snack: Snack) => snack.snackName.replace(' ', '').includes(query.replace(' ', '')));
	}
	const addSnack = (snack: SnackInput) => {
		/// todo
		return null;
	}

	const reviews: Review[] = [];

	return (
		<SnackContext.Provider
			value={{
				snacks,
				getSnackById,
				getSnackByName,
				filterSnacksByName,
				addSnack,
				reviews,
			}}
		>
			{children}
		</SnackContext.Provider>
	);
}
export const useSnackContext = () => useContext(SnackContext);