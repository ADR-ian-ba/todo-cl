import { Link } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"

const Header = () => {

  const {setLogin, setUsername, login, username, setTodoList} = useContext(UserContext)

  function logout(){
    setLogin(false)
    setUsername("")
    localStorage.clear()
    setTodoList([])
  }

  return (
    <header>
        <Link to="/" className="react-link">
            <h2>
                ADR- <br />
                <span>ian</span>
            </h2>
        </Link>


        <nav>
          {login ? (
          <>
            <div className="username">{username}</div>
            <div style={{ cursor: 'pointer' }} onClick={logout}>LogOut</div>
          </>
          ) :
          <>
            <Link to='/login' className="react-link"><span className="login-header">Login</span></Link>
            <Link to='/Register' className="react-link">Register</Link>
          </>
          }
        </nav>
    </header>
  )
}
export default Header