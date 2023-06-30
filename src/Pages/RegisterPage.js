import { useState, useEffect } from "react"
import { Header, Succes, Failed } from "../components"
import { Link } from "react-router-dom"

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [succes, setSucces] = useState(false)
  const [failed, setFailed] = useState(false)

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

  function register(e){
    e.preventDefault()

    const data = {
      name : name,
      email : email,
      password : password
    }

    if(data.name === '' || data.name.length>6 || data.password < 1){
      setFailed(true)
    }else{
      fetch("http://localhost:4000/register", {
      method: "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
      })
      .then(response => {
        if(response.ok){
          return response.json()
        } else{
          setFailed(true)
          throw new Error("Something went wrong")
        }
      })
      .then(data => {
        console.log(data)
        if(data === "succes"){
          setSucces(true)
        }else{
          setFailed(true)
        }
      })
      .catch(error =>{
        console.log(error)
      })
    }
  }

  return (
    

    <main>
        <Header/>
        
        <form onSubmit={register}>
            <h1>Reg<span>Ister</span></h1>
            {succes && <Succes what="Register"/>}
            {failed && <Failed what="Register"/>}

            <input 
              type="text"  
              placeholder="Name (1-6 Character)"
              value={name}
              onChange={e => setName(e.target.value)}
              title="Input should not be less than 1 and exceed 6 characters"/><br />

            <input 
              type="email"  
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}/><br />

            <input 
              type="password"  
              placeholder="Password (>1 Character)"
              value={password}
              onChange={e => setPassword(e.target.value)}/><br />
            <button>Submit</button>
            <div className="question">Already Registered Go <Link to='/login' className="question-link">Login</Link></div>
        </form>
    </main>
  )
}
export default RegisterPage