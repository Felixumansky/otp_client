import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "./types";

const API_URL = "https://api.restful-api.dev/objects";

interface ApiResponse {
	message: string;
	code: string;
}

export interface State {
	message: string | null;
	code: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: State = {
	message: null,
	code: null,
	loading: false,
	error: null,
};

const apiSlice = createSlice({
	name: "api",
	initialState,
	reducers: {
		fetchOtpStart(state) {
			state.loading = true;
			state.error = null;
		},
		fetchOtpSuccess(state, action: PayloadAction<ApiResponse>) {
			state.loading = false;
			state.message = action.payload.message;
			state.code = action.payload.code;
		},
		fetchOtpFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchOtpStart, fetchOtpSuccess, fetchOtpFailure } =
	apiSlice.actions;

export const fetchOtp =
	(text: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(fetchOtpStart());
			console.log("fetchOtp text", text);
			const response = await axios.post<ApiResponse>(API_URL, { text });
			dispatch(fetchOtpSuccess(response.data));
		} catch (error) {
			dispatch(fetchOtpFailure(error.message));
		}
	};

export const selectMessage = (state: { api: State }) => state.api.message;
export const selectCode = (state: { api: State }) => state.api.code;

export const store = configureStore({
	reducer: {
		api: apiSlice.reducer,
	},
});
