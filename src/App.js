import React,{useState,useEffect} from "react"
import "./App.css"
import ToDoLi from "./components/ToDoLi.js"
import {connect} from "react-redux"
import {addTodo, toggle, clearIsDone, loadTodos} from "./actions"
import firebase from "firebase/app"
import "firebase/database"

const App = (props) => {

	const [description, setDescription] = useState("")

	useEffect(()=>{
		props.loadTodos()
	},[])

	console.log("props: ", props)

	return (
		<div className="container">
			<div className="row mt-2">
				<div className="col-lg-4 m-auto">
					<h4 className="text-center">YAPILACAKLAR</h4>
					<div className="input-group mb-3">
						<input type="text" onChange={e=>setDescription(e.target.value)} onKeyUp={(e)=>{
								console.log("e:",e)
								if (e.key==="Enter") {
									setDescription("")
									props.addTodo(description)
								}
							}
						} value={description} className="form-control" placeholder="Yapılacak işini yaz"/>
						<div className="input-group-append">
							<button className="btn btn-outline-primary" type="button" onClick={()=>{setDescription(""); props.addTodo(description)}}>EKLE</button>
						</div>
					</div>
					<ul>
						{
							props.todos.map(listItem => (
								<ToDoLi key={listItem.id} id={listItem.id} toggle={()=>props.toggle(listItem.id)} description = {listItem.description} isDone = {listItem.isDone} />
							))
						}
					</ul>
					<button className="btn btn-outline-success btn-block" onClick={()=>props.clearIsDone()}>Yapılmışları Temizle</button>
				</div>
			</div>
		</div>
	);
}

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyBUX_HzUZysC9iZ0-BvKcCUD8pPAAnpvxY",
	authDomain: "davetlimiz.firebaseapp.com",
	projectId: "davetlimiz",
	storageBucket: "davetlimiz.appspot.com",
	messagingSenderId: "858977878125",
	appId: "1:858977878125:web:f3bc8bc40bb3e30ec33f64"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const mapStateToProps = state =>{
	return { todos: state }
}

export default connect(mapStateToProps, {addTodo, toggle, clearIsDone, loadTodos})(App);
