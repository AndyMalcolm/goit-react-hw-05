import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
// import MovieCast from "./components/MovieCast/MovieCast";
// import MovieReviews from "./components/MovieReviews/MovieReviews";

// import Navigation from "./components/Navigation/Navigation";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
// import HomePage from "./pages/HomePage/HomePage";
// import MoviesPage from "./pages/MoviesPage/MoviesPage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const MovieDetailsPage = lazy(() =>
	import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
	import("./components/MovieReviews/MovieReviews")
);
// API Key: ebb3ed9b1409881e5c8a20b8bb23e7bc

function App() {
	return (
		<>
			<Navigation />
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movies" element={<MoviesPage />} />
					<Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
						<Route path="cast" element={<MovieCast />} />
						<Route path="reviews" element={<MovieReviews />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
