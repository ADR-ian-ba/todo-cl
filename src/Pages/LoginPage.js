import { Link } from "react-router-dom"
import { Header, Succes, Failed } from "../components"
import { UserContext } from "../context/UserContext"
import { useContext, useState, useEffect } from "react"

const LoginPage = () => {
  const {setLogin, setUsername, login} = useContext(UserContext)
  const [succes, setSucces] = useState(false)
  const [failed, setFailed] = useState(false)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (succes || failed) {
      // Set the timer to revert the state back to false after 5 seconds
      const timer = setTimeout(() => {
        setSucces(false);
        setFailed(false);
      }, 1000);

      // Clean up the timer when the component unmounts or when success/failed changes
      return () => clearTimeout(timer);
    }
  }, [succes, failed]);

  function logging(e){
    e.preventDefault()

    const data={
      name :name,
      password:password
    }

    fetch ("https://todo-api-a8yb.onrender.com/login",{
      method:"POST",
      headers :{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response =>{
      if(response.ok){
        return response.json()
      }else{
        setFailed(true)
      }
    })

    .then(data =>{
      if(data === "failed"){
        setFailed(true)
      }else{
      console.log(data.token, data.authorized, data.username)
      localStorage.setItem("token", data.token)
      setLogin(data.authorized)
      setUsername(data.username)

      setSucces(true)

      setTimeout(() => {
        window.location.href = "/"
      }, 1500);
      }
    })
  }


  return (
    <main>
        <Header/>
            <form onSubmit={logging}>
                <h1>Log<span>In</span></h1>
                {succes && <Succes what="Login" />}
                {failed && <Failed what="Login" />}
                <input 
                  type="text"  
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  pattern=".{0, 6}" 
                  title="Input should not exceed 6 characters"/><br />
                <input 
                  type="password"  
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}/><br />
                <button>Submit</button>
                <div className="question" >not yet <Link to='/Register' className="question-link">register?</Link></div>

            </form>
    </main>
  )
}
export default LoginPage




{/* example */}
