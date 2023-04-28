import React from "react";
import { useSelector } from "react-redux";
import {
  getAllMovies,
  getAllShows,
  isLoading,
} from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import Slider from "react-slick";
import { Settings } from "../../common/settings";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  const loading = useSelector(isLoading);

  let renderMovies,
    renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie} />;
      })
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie} />;
      })
    ) : (
      <div className="shows-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      {loading ? (
        <div className="loading"><h3>Loading...</h3></div>
      ) : (
        <>
          <div className="movie-list">
            <h2>Movies</h2>
            <div className="movie-container">
              <Slider {...Settings}>{renderMovies}</Slider>
            </div>
          </div>
          <div className="show-list">
            <h2>Shows</h2>
            <div className="movie-container">
              <Slider {...Settings}>{renderShows}</Slider>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieListing;
