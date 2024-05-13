import { Action, ThunkAction } from "@reduxjs/toolkit";
import { State } from "./store";

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	State,
	unknown,
	Action<string>
>;
