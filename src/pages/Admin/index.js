import "./admin.css";
import { useState, useEffect } from "react";

import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export default function Admin() {
	const [tarefaInput, setTarefaInput] = useState("");
	const [user, setUser] = useState({});

	useEffect(() => {
		async function loadTarefas() {
			const userDetail = localStorage.getItem("@detailUser");
			setUser(JSON.parse(userDetail));
		}

		loadTarefas();
	}, []);

	async function handleRegister(event) {
		event.preventDefault();

		if (tarefaInput === "") {
			alert("Por favor, digite sua tarefa!");
			return;
		}

		await addDoc(collection(db, "tarefas"), {
			tarefa: tarefaInput,
			created: new Date(),
			userUid: user?.uid,
		})
			.then(() => {
				console.log("Tarefa adicionada com sucesso!");
				setTarefaInput("");
			})
			.catch((error) => {
				console.log("Erro ao registrar tarefa: " + error);
			});
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
