import { Link } from "react-router-dom";
import MainNav from './MainNav';

const Header = () => {
  return (
    <div className=" p-5 border-b-2 border-b-orange-500 py-6">
        <div className="container mx-auto  flex justify-between items-center">
            <Link className=" text-2xl font-bold tracking-tight text-orange-500" to={"/"}>DASHBOARD TASK</Link>
            <div className="">
              <MainNav/>
            </div>
        </div>
    </div>
  );
}

export default Header;