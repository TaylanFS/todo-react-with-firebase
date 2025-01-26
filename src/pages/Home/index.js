import { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleLogin(event) {
		event.preventDefault();

		if (email !== "" && password !== "") {
			alert("Teste");
		} else {
			alert("Por favor, preencha todos os campos");
		}

		setEmail("");
		setPassword("");
	}

	return (
		<div className="home-container">
			<h1> Lista de tarefas </h1>
			<span> Gerencie suas tarefas de forma fácil. </span>

			<form className="form" onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="Digite seu email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>

				<input
					autoComplete="false"
					type="password"
					placeholder="*******"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>

				<button type="submit"> Acessar </button>
			</form>

			<Link className="button-link" to="/register">
				{" "}
				Não possui uma conta? Cadastre-se{" "}
			</Link>
		</div>
	);
}
