import { ReactNode, SetStateAction, createContext, useContext, useState } from "react";

export type LoginContextData = {
	loggedIn: boolean;
	login: (res: { user: { id: SetStateAction<number | null>; name: SetStateAction<string>; }; access_token: SetStateAction<string>; }) => void;
	getAuthorId: () => number | null;
	getAuthorName: () => string | null;
	getAccessToken: () => string | null;
}

const LoginContext = createContext<LoginContextData>({
	loggedIn: false,
	login: () => null,
	getAuthorId: () => null,
	getAuthorName: () => null,
	getAccessToken: () => null
})

export const LoginProvider = ({ children }: { children: ReactNode }) => {
	const [ loggedIn, setLoggedIn ] = useState(false);
	const [ authorId, setAuthorId ] = useState<number|null>(null);
	const [ authorName, setAuthorName ] = useState("");
	const [ accessToken, setAccessToken ] = useState("");

	const login = (res: { user: { id: SetStateAction<number | null>; name: SetStateAction<string>; }; access_token: SetStateAction<string>; }) => {
		setAuthorId(res.user.id);
		setAuthorName(res.user.name);
		setAccessToken(res.access_token);
		setLoggedIn(true);
	}
	const getAuthorId = () => {
		return authorId;
	}
	const getAuthorName = () => {
		return authorName;
	}
	const getAccessToken = () => {
		return accessToken;
	}

	return (
		<LoginContext.Provider
			value={{
				loggedIn,
				login,
				getAuthorId,
				getAuthorName,
				getAccessToken
			}}
		>
			{children}
		</LoginContext.Provider>
	);
}
export const useLoginContext = () => useContext(LoginContext);
