import { Outlet, Link } from "react-router-dom";
import Header from "../Components/Admin/header";

const SharedLayout = () => {
return (
    <div>
    <Header />
    <Outlet />
    </div>
)
}

export default SharedLayout