import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	async function handleRegister(event) {
		event.preventDefault();

		if (email !== "" && password !== "") {
			await createUserWithEmailAndPassword(auth, email, password)
				.then(() => {
					navigate("/admin", { replace: true });
				})
				.catch(() => {
					console.log("Erro ao criar conta");
				});
		} else {
			alert("Por favor, preencha todos os campos");
		}

		setEmail("");
		setPassword("");
	}

	return (
		<div className="home-container">
			<h1> Cadastre-se </h1>
			<span> Vamos criar sua conta. </span>

			<form className="form" onSubmit={handleRegister}>
				<input
					type="text"
					placeholder="Digite seu email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>

				<input
					type="password"
					placeholder="*******"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>

				<button type="submit"> Cadastrar </button>
			</form>

			<Link className="button-link" to="/">
				Já possui uma conta? Faça login!
			</Link>
		</div>
	);
}
