import "./admin.css";
import { useState } from "react";

import { auth } from "../../firebaseConnection";
import { signOut } from "firebase/auth";

export default function Admin() {
	const [tarefaInput, setTarefaInput] = useState("");

	async function handleRegister(event) {
		event.preventDefault();

		alert("sldkjflskdfjlksdjf");
	}

	async function handleLogout() {
		await signOut(auth);
	}

	return (
		<div className="admin-container">
			<h1> Minhas tarefas </h1>

			<form className="form" onSubmit={handleRegister}>
				<textarea
					placeholder="Digite sua tarefa..."
					value={tarefaInput}
					onChange={(event) => setTarefaInput(event.target.value)}
				/>

				<button className="button-register" type="submit">
					Adicionar tarefa
				</button>
			</form>

			<article className="list">
				<p> Estudar React + Firebase </p>

				<div>
					<button> Editar </button>
					<button className="button-concluir"> Concluir </button>
				</div>
			</article>

			<button className="button-logout" onClick={handleLogout}>
				{" "}
				Sair{" "}
			</button>
		</div>
	);
}
