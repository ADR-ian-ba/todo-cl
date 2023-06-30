import { Header, Todo } from "../components"
import notFound from "../assests/notFound.svg"
import { UserContext } from "../context/UserContext"
import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"

const IndexPage = () => {

  const {login, username, todoList, setTodoList} = useContext(UserContext)
  const [todo, setTodo] = useState("")

  function deletingTodo(id){
    let deleteData = {
      id : id,
      username: username
    }

    fetch("http://localhost:4000/deleteTodo",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body : JSON.stringify(deleteData)
    })
    .then(response =>{
      if(response.ok){
        return response.json()
      }else{

      }
    })
    .then(data =>{
      console.log(data)
      const todoData = data

      setTodoList(todoData)
      console.log(todoList)
    })
    .catch(error =>{
      console.log(error)
    })

  }

  function addTodo(e){
    e.preventDefault()
    let todoData = {
      todo : todo,
      username: username
    }

    fetch("http://localhost:4000/addTodo", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todoData)
    })
    .then(response =>{
      if(response.ok){
        return response.json()
      } else{
        console.log("something is wrong")
      }
    })
    .then(data =>{
      console.log(data)
      const todoData = data

      setTodoList(todoData)
      console.log(todoList)
    })
    .catch(error =>{
      console.log(error)
    })

    setTodo("")
  }

  return (

    <main>
        <Header/>
        <div className="container">

            {!login &&
            <>
              <img src={notFound} alt="not found user" className="not-found"/>
              <h2>User Not Found Please <Link to='/login' className="not-found-login">Login</Link></h2>
            </>
            }
            <div className="todo-container">
                {login && 
                <>
                <div className="todo-greet"><span>{username}</span> Todo List</div>

                <form className="todo-form" onSubmit={addTodo}>
                  <input 
                    type="text" 
                    className="todo-input"
                    placeholder="Todo: (max 20 char)"
                    value={todo}
                    onChange={e => setTodo(e.target.value)}/>
                  <button className="todo-button">add</button>
                </form>
                {todoList && todoList.map((todo) => {
                  return (
                    <Todo
                      key={todo._id}
                      id={todo._id}
                      what={todo.task}
                      deleteTodo={deletingTodo}
                    />
                  );
                })}
                </>}
            </div>
        </div>
    </main>
    
    
  )
}
export default IndexPage
