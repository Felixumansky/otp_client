import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtp, selectCode, selectMessage, selectError } from "./store";

const App: React.FC = () => {
	const [textInput, setTextInput] = useState("");
	const dispatch = useDispatch<any>();
	const message = useSelector(selectMessage);
	const errorMessage = useSelector(selectError);
	const code = useSelector(selectCode);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextInput(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(fetchOtp(textInput));
		setTextInput("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<p>Enter Email address</p>
				</div>
				<input type="text" value={textInput} onChange={handleChange} />

				<button type="submit">Submit</button>
			</form>
			{message && (
				<div>
					<p>Message: {message}</p>
				</div>
			)}
			{errorMessage && (
				<div>
					<p>Message: {errorMessage}</p>
				</div>
			)}
		</div>
	);
};

export default App;
