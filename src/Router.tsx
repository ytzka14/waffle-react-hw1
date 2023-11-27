import { Navigate, createBrowserRouter } from "react-router-dom";
import ReviewPage from "./submodules/ReviewPage/ReviewPage.tsx";
import SnacksPage from "./submodules/SnacksPage/SnacksPage.tsx";
import NewSnackPage from "./submodules/NewSnackPage/NewSnackPage.tsx";
import SingleSnackPage from "./submodules/SingleSnackPage/SingleSnackPage.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <ReviewPage />,
			},
			{
				path: "snacks",
				element: <SnacksPage />,
			},
			{
				path: "snacks/new",
				element: <NewSnackPage />,
			},
			{
				path: "snacks/:id",
				element: <SingleSnackPage />,
			}
		]
	},
	{
		path: "*",
		element: <Navigate to="/" />
	}
]);

export default router;