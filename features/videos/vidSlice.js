import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vidService from "../../lib/Videos";

const initialState = {
  movies: [],
  musics: [],
  watched: [],
  moreVideos: [],
  video: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const errMessage = (err, thunkAPI) => {
  const message =
    (err.response && err.response && err.response.data.message) ||
    err.message ||
    err.toString();
  return thunkAPI.rejectWithValue(message);
};

export const getMovieVideos = createAsyncThunk(
  "vid/movies",
  async (_, thunkAPI) => {
    try {
      return await vidService.getYTVideos("movie");
    } catch (error) {
      errMessage(error, thunkAPI);
    }
  }
);
export const getMusicVideos = createAsyncThunk(
  "vid/musics",
  async (_, thunkAPI) => {
    try {
      return await vidService.getYTVideos("music");
    } catch (error) {
      errMessage(error, thunkAPI);
    }
  }
);
export const getWatchedVideos = createAsyncThunk(
  "vid/watched",
  async (user, thunkAPI) => {
    try {
      return await vidService.getUserVideos(user);
    } catch (error) {
      errMessage(error, thunkAPI);
    }
  }
);
export const getMoreVideos = createAsyncThunk(
  "vid/moreVideos",
  async (_, thunkAPI) => {
    try {
      return await vidService.getMoreVideos();
    } catch (error) {
      errMessage(error, thunkAPI);
    }
  }
);

export const getVideoById = createAsyncThunk(
  "vid/video",
  async (data, thunkAPI) => {
    try {
      return await vidService.getVideoById(data.id, data.user);
    } catch (error) {
      errMessage(error, thunkAPI);
    }
  }
);

const vidSlice = createSlice({
  name: "vid",
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      isLoading: false,
      isError: false,
      isSuccess: false,
    }),
    resetVideo: (state) => ({
      ...state,
      video: {},
    }),
    resetWatched: (state) => ({
      ...state,
      watched: [],
    }),
    resetMoreVideos: (state) => ({
      ...state,
      moreVideos: [],
    }),
    resetAll: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getMovieVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMusicVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMusicVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.musics = action.payload;
      })
      .addCase(getMusicVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getWatchedVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWatchedVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.watched = action.payload;
      })
      .addCase(getWatchedVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getVideoById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.video = action.payload;
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMoreVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoreVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.moreVideos = action.payload;
      })
      .addCase(getMoreVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVideo, resetAll, resetWatched, resetMoreVideos } =
  vidSlice.actions;
export default vidSlice.reducer;
