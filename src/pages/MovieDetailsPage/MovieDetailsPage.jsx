import { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
	Link,
	// Routes,
	// Route,
	useParams,
	useLocation,
	Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/apiMovieDetails.js";

import css from "./MovieDetailsPage.module.css";
// import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";
// import Loader from "../../components/Loader/Loader.jsx";

// import MovieCast from "../../components/MovieCast/MovieCast.jsx";
// import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";

// const MovieCast = lazy(() =>
// 	import("../../components/MovieCast/MovieCast.jsx")
// );
// const MovieReviews = lazy(() =>
// 	import("../../components/MovieReviews/MovieReviews.jsx")
// );

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const [movieDetails, setMovieDetails] = useState(null);
	const location = useLocation();
	const backLinkRef = useRef(location.state ?? "/");

	useEffect(() => {
		async function fetchMovies() {
			try {
				const response = await fetchMovieDetails(movieId);
				setMovieDetails(response);
			} catch (error) {
				console.log(error);
			}
		}
		fetchMovies();
	}, [movieId]);

	return (
		movieDetails && (
			<div>
				<div>
					<div className={css.wrap}>
						<img
							src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
							alt={movieDetails.title}
							width={300}
						/>
						<Link to={backLinkRef.current} className={css.btnBack}>
							◀ Go back
						</Link>
					</div>
					<h1>Title {movieDetails.title}</h1>
					<h2>Overview: </h2>
					<p>{movieDetails.overview}</p>
					<h2>Genres</h2>
					<p>{movieDetails.genres.map(genre => genre.name).join(", ")}</p>
				</div>
				<div>
					<h2>Additional information</h2>
					<ul>
						<li>
							<Link to="cast">Cast</Link>
						</li>
						<li>
							<Link to="reviews">Reviews</Link>
						</li>
					</ul>
				</div>
				<Outlet />
				{/* <Suspense fallback={<Loader />}>
					<Routes>
						<Route path="cast" element={<MovieCast />} />
						<Route path="reviews" element={<MovieReviews />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Suspense> */}
			</div>
		)
	);
};

export default MovieDetailsPage;

{
	/* <ul>
		<li>
			<Link to={`/movies/${movieDetails.id}/cast`}>Cast</Link>
		</li>
		<li>
			<Link>Reviews</Link>
		</li>
	</ul>
	<Routes>
		<Route path="/movies/:movieId/cast" element={<MovieCast />} />
		роуте ревью....
	</Routes> 
*/
}
