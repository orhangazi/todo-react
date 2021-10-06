import firebase from "firebase/app"
import "firebase/database"

export const LOAD_TODOS = "LOAD_TODOS"
export const ADD_TODO = "ADD_TODO"
export const TOGGLE = "TOGGLE"
export const CLEAR_IS_DONE = "CLEAR_IS_DONE"

export const addTodo = description => dispatch => {
	if (description==null || description === "") {
		console.info("hiçbir şey yazılmadığı için yapılacak listesine eklenmedi")
		return
	}

	let childRef = firebase.database().ref("/todos").push();
	childRef.set({
		description: description,
		isDone: false
	}, (error)=>{
		if (!error) {
			getTodos().then(todoList => {
				dispatch({type: ADD_TODO, payload: todoList})
			})
		} else {
			console.error("Veri tabanına eklenemedi")
		}
	})
}

const getTodos = (id=null) =>{

	let idPath = ""
	if (id!=null) {
		idPath = "/"+id
	}

	return firebase.database().ref("/todos"+idPath).once("value").then(snapshot => {

		let newTodoList = []
		if (snapshot.val()!=null) {

			let todoList = snapshot.val()

			console.log("todoList::", todoList)

			if (id == null) {
				Object.keys(todoList).forEach(function (key, index) {
					console.log("key", key)
					console.log("todoList[key]", todoList[key])
					todoList[key].id = key
					newTodoList.push(todoList[key])
				})
			} else {
				newTodoList.push(todoList)
			}

		}

		console.log("todoList:::", newTodoList)

		return newTodoList
	})
}

export const loadTodos = () => dispatch => {
	getTodos().then(todoList => {
		dispatch({type:LOAD_TODOS, payload: todoList})
	})
}

export const toggle = id => dispatch => {
	if (id!=null && id!=="") {
		getTodos(id).then(todo => {
			console.log("todo:", todo)
			let updatedTodo = {...todo[0], isDone:!todo[0].isDone}
			console.log("Güncellenecek id: ", id)
			let updateData = {}
			updateData[id] = updatedTodo

			console.log("updateData", updateData)
			//return
			firebase.database().ref().child("/todos/").update(updateData).then(r => {
				getTodos().then(todoList => {
					dispatch({type:TOGGLE, payload: todoList})
				})
			})
		})

	}
}

export const clearIsDone = () => dispatch => {
	getTodos().then(todoList => {
		console.log("todoList..:", todoList)
		let newTodoList = todoList.filter(f=>f.isDone === true)

		console.log("new todo list after delete: ",newTodoList)

		let deletingArray = {}
		newTodoList.forEach(todo=>{
			console.log("todo:", todo)
			deletingArray[todo.id] = null
		})

		firebase.database().ref().child("/todos/").update(deletingArray, (error) => {
			if (!error) {
				getTodos().then(todoList => {
					dispatch({type: CLEAR_IS_DONE, payload: todoList})
				})
			} else {
				console.error("Silme işlemi başarısız")
			}
		})
	})
}