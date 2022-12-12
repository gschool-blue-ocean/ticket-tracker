import { NavLink } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../../Contexts/loginContext";
import { BiLogOut } from 'react-icons/bi'
import { IoTicketOutline } from 'react-icons/io5'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { Link } from "react-router-dom";
import logo  from '../../CssFiles/Athena.svg'


const Header = () => {
    const  handleLogOut  = useContext(LoginContext)

    return (
        <div className="NavBarContainer">
            <div class='nav-bar-container'>
            <img height='250px' src={logo}/>
            <nav className="NavBar">
                <NavLink to="/admin/CreateAccount" className="NavBarComp"><AiOutlineUser /> Create Accout</NavLink>
                <NavLink to="/admin/ManageAccounts" className="NavBarComp"><MdOutlineManageAccounts /> ManageAccounts</NavLink>
                <NavLink to="/admin/TicketHistory" className="NavBarComp"><IoTicketOutline /> TicketHistory</NavLink>
                <NavLink to="/" className="NavBarComp" onClick={handleLogOut}>
                        <BiLogOut /> Sign Out
                </NavLink>
            </nav>
            </div>
        </div>
    )
}

export default Header 
