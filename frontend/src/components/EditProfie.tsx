import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, SubmitButton } from "../components/Input";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineEdit } from "react-icons/md";
import { useUpdateUserMutation } from "@/lib/mutations/auth.mutations";
import { TypeUser } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EditProfile() {
  const queryClient = useQueryClient(),
    authUser: TypeUser = queryClient.getQueryData(["authUser"])!;

  const location = useLocation();
  const navigate = useNavigate();

  const { mutateAsync: handleUpdate, isPending } = useUpdateUserMutation();

  const [userFields, setUserFields] = useState(authUser);
  const pfpRef = useRef<HTMLInputElement>(null);
  const [changed, setChanged] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserFields((prevUserFields) => ({
      ...prevUserFields,
      [e.target.id]:
        e.target.id === "fullname"
          ? e.target.value.trimStart()
          : e.target.value.replace(/\s+/g, ""),
    }));
    setChanged(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const pfp = e.target.files?.[0];
    if (!pfp) return;

    URL.revokeObjectURL(userFields.profilePicture);
    setUserFields((prevUserFields) => ({
      ...prevUserFields,
      profilePicture: URL.createObjectURL(pfp),
    }));

    e.target.value = "";
    setChanged(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!userFields.fullname || !userFields.username || !userFields.email)
        throw new Error("All fields are required");

      if (!/.+@.+\..+/.test(userFields.email))
        throw new Error("Invalid email address");

      if (userFields.username.length > 20)
        throw new Error("Maximum username length is 20");

      if (
        userFields.fullname.split(" ").length > 5 ||
        !userFields.fullname.split(" ").every((part) => part.length <= 20)
      )
        throw new Error(
          "Only 5 words of max length 20 are allowed in full name",
        );

      const newProfilePicture =
        !userFields.profilePicture ||
        userFields.profilePicture === authUser.profilePicture
          ? null
          : await fetch(userFields.profilePicture).then((res) => res.blob());

      const formData = new FormData();

      if (newProfilePicture)
        formData.append("profilePicture", newProfilePicture);

      formData.append("userFields", JSON.stringify(userFields));

      await handleUpdate({ formData });
      URL.revokeObjectURL(userFields.profilePicture);
      setChanged(false);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }

  return (
    <Dialog
      defaultOpen
      onOpenChange={() =>
        navigate(location.state?.bgLocation.pathname || "/dashboard")
      }
    >
      <DialogContent
        aria-describedby={undefined}
        className="h-screen max-h-screen w-screen max-w-screen-lg overflow-y-auto rounded-none md:h-fit md:max-w-screen-sm"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col justify-between border-[5px] border-none"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <div className="relative mx-auto mb-3 w-fit cursor-pointer rounded-full border-8 border-double border-gray-600">
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute right-0 z-10 rounded-full bg-black/50 p-1 text-white">
                  <MdOutlineEdit size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="right"
                  className="min-w-40"
                >
                  <DropdownMenuItem onClick={() => pfpRef.current?.click()}>
                    Change photo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={!userFields.profilePicture}
                    onClick={() =>
                      setUserFields((prevUserFields) => {
                        setChanged(true);
                        return { ...prevUserFields, profilePicture: "" };
                      })
                    }
                  >
                    Remove photo
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <label className="flex size-28">
                <Avatar className="mr-3 size-28 cursor-pointer">
                  <AvatarImage src={userFields?.profilePicture} />
                  <AvatarFallback>
                    <span className="text-5xl">{userFields?.username[0]}</span>
                  </AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  ref={pfpRef}
                  onInput={handleImageUpload}
                  hidden
                />
              </label>
            </div>
            <Input
              field="email"
              value={userFields.email}
              onChange={handleChange}
            />
            <Input
              field="username"
              value={userFields.username}
              onChange={handleChange}
            />
            <Input
              field="full name"
              value={userFields.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="mt-12 mb-4 flex items-center overflow-clip rounded-2xl">
            <SubmitButton
              type="update"
              processing={isPending}
              disabled={!changed}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
