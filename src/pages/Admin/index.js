import "./admin.css";
import { useState, useEffect } from "react";

import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import {
	addDoc,
	collection,
	onSnapshot,
	query,
	orderBy,
	where,
	doc,
	deleteDoc,
} from "firebase/firestore";

export default function Admin() {
	const [tarefaInput, setTarefaInput] = useState("");
	const [user, setUser] = useState({});
	const [tarefas, setTarefas] = useState([]);

	useEffect(() => {
		async function loadTarefas() {
			const userDetail = localStorage.getItem("@detailUser");
			setUser(JSON.parse(userDetail));

			if (userDetail) {
				const data = JSON.parse(userDetail);

				const tarefaRef = collection(db, "tarefas");
				const q = query(
					tarefaRef,
					where("userUid", "==", data?.uid),
					orderBy("created", "desc")
				);
				const unsub = onSnapshot(q, (snapshot) => {
					let lista = [];

					snapshot.forEach((doc) => {
						lista.push({
							id: doc.id,
							tarefa: doc.data().tarefa,
							userUid: doc.data().userUid,
						});
					});

					setTarefas(lista);
				});
			}
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

	async function deleteTarefa(id) {
		const docRef = doc(db, "tarefas", id);
		await deleteDoc(docRef);
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

			{tarefas.map((item) => (
				<article key={item.id} className="list">
					<p> {item.tarefa} </p>

					<div>
						<button> Editar </button>
						<button
							onClick={() => deleteTarefa(item.id)}
							className="button-concluir"
						>
							{" "}
							Concluir{" "}
						</button>
					</div>
				</article>
			))}

			<button className="button-logout" onClick={handleLogout}>
				Sair
			</button>
		</div>
	);
}
