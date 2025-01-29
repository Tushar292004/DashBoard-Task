import { useAuth0 } from "@auth0/auth0-react";

import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {
    const { user, logout } = useAuth0();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="flex  outline-none items-center px-3 font-bold gap-2">
                <CircleUserRound
                    className="" />
                {user?.email ? user.email.split('@')[0] : ''}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Button
                        className="flex flex-1 font-bold bg-orange-500 text-white hover:bg-slate-200 hover:text-orange-500"
                        //logout inbuilt auth0 function called
                        onClick={() => logout()}
                    >Log Out</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UsernameMenu;