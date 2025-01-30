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
	updateDoc,
} from "firebase/firestore";

export default function Admin() {
	const [tarefaInput, setTarefaInput] = useState("");
	const [user, setUser] = useState({});
	const [tarefas, setTarefas] = useState([]);
	const [edit, setEdit] = useState({});

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

		if (edit?.id) {
			handleUpdateTarefa();

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

	function editTarefa(item) {
		setTarefaInput(item.tarefa);
		setEdit(item);
	}

	async function handleUpdateTarefa() {
		const docRef = doc(db, "tarefas", edit?.id);
		await updateDoc(docRef, {
			tarefa: tarefaInput,
		})
			.then(() => {
				alert("Tarefa atualizada com sucesso!");
				console.log("Tarefa atualizada com sucesso!");

				setTarefaInput("");
				setEdit({});
			})
			.catch(() => {
				alert("Erro ao atualizar tarefa");
				console.log("Erro ao atualizar tarefa");

				setTarefaInput("");
				setEdit({});
			});
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

				{Object.keys(edit).length > 0 ? (
					<button className="button-register" type="submit">
						Atualizar tarefa
					</button>
				) : (
					<button className="button-register" type="submit">
						Registrar tarefa
					</button>
				)}
			</form>

			{tarefas.map((item) => (
				<article key={item.id} className="list">
					<p> {item.tarefa} </p>

					<div>
						<button onClick={() => editTarefa(item)}> Editar </button>
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
