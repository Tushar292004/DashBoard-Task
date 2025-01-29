import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {

    // auth0 hook for login funcitonality
    const { loginWithRedirect, isAuthenticated, user } = useAuth0()
    return (

    <span className="flex space-x-2 items-center text-ld text-orange-500 font-semibold">
      {/* Login button check and styles */}
      {isAuthenticated? (<UsernameMenu/>) : (
        <Button 
        variant="outline" className="font-bold border-orange-200 text-orange-500 hover:text-white hover:bg-orange-500 text-xl"
        // login function is called here
        onClick={async ()=> await loginWithRedirect()}>
            Log In
        </Button>
      )}
    </span>
    );
}

export default MainNav;