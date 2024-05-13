import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "./types";

//const API_URL = "https://otp-api-o3w1.onrender.com/api/otp";
const API_URL = "http://localhost:3020/api/otp";

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
			state.error = "";
		},
		fetchOtpFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			state.message = "";
		},
	},
});

export const { fetchOtpStart, fetchOtpSuccess, fetchOtpFailure } =
	apiSlice.actions;

const config = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
	},
};

export const fetchOtp =
	(text: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(fetchOtpStart());
			const response = await axios.post<ApiResponse>(
				API_URL,
				{ email: text },
				config
			);
			console.log("response", response);
			dispatch(fetchOtpSuccess(response.data));
		} catch (error) {
			console.log("response catch error: ", error.response.data.message);
			dispatch(fetchOtpFailure(error.response.data.message));
		}
	};

export const selectMessage = (state: { api: State }) => state.api.message;
export const selectCode = (state: { api: State }) => state.api.code;
export const selectError = (state: { api: State }) => state.api.error;

export const store = configureStore({
	reducer: {
		api: apiSlice.reducer,
	},
});
