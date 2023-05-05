import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleClick = () => {

		const options = {
			method: ['POST'],
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			})
		}
		fetch('https://benbungle-laughing-disco-w6g4q49x5wrhg49v-3000.preview.app.github.dev/api/login', options)
		.then(resp => {
			if (resp.status === 200) return resp.json();
			else alert("There is an error");
		})
		.then()
		.catch(error => {
			console.error('there was an error',error)
		})
	}

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
				<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				<input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
				<button onClick={handleClick}>Login</button>
			</div>
			
		</div>
	);
};
