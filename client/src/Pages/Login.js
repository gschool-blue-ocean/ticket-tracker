import LoginForm from "../Components/Login/loginForm"
// import logo  from '../CssFiles/Athena.svg'
import logo  from '../CssFiles/AthenaShadow.svg'

const Login = () => {

    return (
        <>

            {/* <h1 className="logo-header">ATHENA</h1> */}
            <img className='login-athena' height='350px' src={logo}/>
            <LoginForm />

        </>
    )
}

export default Login