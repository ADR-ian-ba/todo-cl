const Todo = (props) => {

  function handleClick(){
    props.deleteTodo(props.id)
  }

  return (
    <div className="todo">
        <p>{props.what}</p>
        <div className="edit">
            <p className="delete-p" onClick={handleClick}>Delete</p>
        </div>
    </div>
  )
}
export default Todo