const ToDoLi = ({id, toggle, isDone, description}) => {
	return(<li key={id} onClick={()=>toggle(id)} className={isDone?"done":null}>{description}</li>)
}

export default ToDoLi