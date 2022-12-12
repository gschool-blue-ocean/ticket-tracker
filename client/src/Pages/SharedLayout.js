import { Outlet, Link } from "react-router-dom";
import Header from "../Components/Admin/Header";

const SharedLayout = () => {
return (
    <div>
    <Header />
    <Outlet />
    </div>
)
}

export default SharedLayout