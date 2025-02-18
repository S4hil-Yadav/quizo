import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLogoutMutation } from "@/lib/mutations/auth.mutations";
import { useQueryClient } from "@tanstack/react-query";
import { TypeUser } from "@/lib/types";

export default function ProfileDropDown() {
  const queryClient = useQueryClient();
  const authUser: TypeUser | undefined = queryClient.getQueryData(["authUser"]);
  const { mutate: handleLogout } = useLogoutMutation();
  const location = useLocation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="mr-3 cursor-pointer">
          <AvatarImage
            src={authUser?.profilePicture}
            className="m-auto size-9"
          />
          <AvatarFallback className="m-auto size-9 border border-black">
            {authUser?.username[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem asChild className="py-1 text-base">
          <Link to="/profile" state={{ bgLocation: location }}>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-1 text-base">
          <Link to="#">Add account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="py-1 text-base">
          <button onClick={() => handleLogout()} className="w-full">
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
