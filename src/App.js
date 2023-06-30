import './styles/App.css';
import './styles/components.css' 
import { Route, Routes, Link } from 'react-router-dom';
import { IndexPage, RegisterPage, LoginPage } from './Pages';
import { UserContext } from './context/UserContext';
import { useState, useEffect } from 'react';


function App() {

  function getTokenFromLocalStorage() {
    try{
    return localStorage.getItem('token');
  } catch(error){
    console.log(error)
    return null
  }
  }

  function validateToken(){
    const token=getTokenFromLocalStorage()
    console.log(token)
    fetch("http://localhost:4000/validateToken", {
      method: "POST",
      headers: {
        "Content-type": "appliction/json",
        "Authorization": token
      }
    })
    .then(response =>{
      if(response.ok){
        return response.json()
      }else{
        //do nothing
      }
    })
    .then(data =>{
      if(data === "there is no token"){

      }else{
        console.log(data.username, data.authorization)
        setLogin(data.authorization)
        setUsername(data.username)
        setTodoList(data.getTodo)
      }
    })
    .catch(error =>{
      console.log("cannot fetch")
    })
  }

  useEffect(()=>{
    validateToken()
  }, [])
  //put try block

  //to use in file import usecontext and Usercontext from ./context, infile  const {variable} = useContext(UserContext)
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [todoList, setTodoList] = useState([])


  return (
    <UserContext.Provider value={{login, setLogin, username,setUsername, todoList, setTodoList}}>
      <Routes>
        <Route index element={<IndexPage/>}/>
        <Route path="/Register" element={<RegisterPage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
      </Routes>
    </UserContext.Provider>


  );
}

export default App;
