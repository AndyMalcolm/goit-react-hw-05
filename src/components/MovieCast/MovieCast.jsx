import { fetchMovieCast } from "../../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();

  const [castMovie, setCastMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function getCast() {
      try {
        setLoading(true);
        const fetchedCast = await fetchMovieCast(movieId);
        setCastMovie(fetchedCast);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getCast();
  }, [movieId]);

  const defaultImage =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  const scrollToBottom = () => {
    window.scrollBy({
      top: 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [loading]);

  return (
    <>
      {loading && <Loader />}
      {error && (
        <div>
          {error && (
            <p className={css.errorMessage}>
              Oops! Something went wrong! Please reload the page!
            </p>
          )}
        </div>
      )}

      <ul className={css.castList}>
        {castMovie.length > 0 ? (
          castMovie.map(({ profile_path, name, character, id }) => (
            <li className={css.castMovies} key={id}>
              <img
                className={css.castImage}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : defaultImage
                }
                alt={name}
                width={250}
                height={375}
              />
              <h2 className={css.moviesName}>{name}</h2>
              <p className={css.moviesCharacter}>{`Character: ${character}`}</p>
            </li>
          ))
        ) : (
          <p className={css.errorMessage}>
            We don`t have any information about the actors.
          </p>
        )}
      </ul>
    </>
  );
};

export default MovieCast;
