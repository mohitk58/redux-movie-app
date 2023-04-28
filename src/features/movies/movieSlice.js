import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { MovieApiKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await MovieApi.get(
      `?apiKey=${MovieApiKey}&s=${term}&type=movie`
    ).catch((err) => {
      console.log("error", err);
    });
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await MovieApi.get(
      `?apiKey=${MovieApiKey}&s=${term}&type=series`
    ).catch((err) => {
      console.log("error", err);
    });
    return response.data;
  }
);

export const fetchAsyncMoviesOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMoviesOrShowDetail",
  async (id) => {
    const response = await MovieApi.get(
      `?apiKey=${MovieApiKey}&i=${id}&Plot=full`
    ).catch((err) => {
      console.log("error", err);
    });
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loading: true,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // addMovies: (state, { payload }) => {
    //   state.movies = payload;
    // },
    removeSelectedMovieOrShow: (state) => {
        state.selectedMovieOrShow = {};
    }
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      console.log("pending");
      state.loading = true;
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("fetched movies");
      return { ...state, movies: payload, loading: false };
    },
    [fetchAsyncMovies.rejected]: (state) => {
      state.loading = false;
      console.log("rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("fetched shows");
      return { ...state, shows: payload, loading: false };
    },
    [fetchAsyncMoviesOrShowDetail.fulfilled]: (state, { payload }) => {
        console.log("fetched movie or show details");
        return { ...state, selectedMovieOrShow: payload, loading: false };
      },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const isLoading = (state) => state.movies.loading;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
