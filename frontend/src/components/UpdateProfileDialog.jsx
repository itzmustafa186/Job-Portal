import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { USER_API_END_POINT } from "@/utills/constant";
import { toast } from "sonner";
import axios from "axios";
import { setLoading, setUser } from "@/redux/authSlice/authSlice";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user } = useSelector((store) => store.auth);
    let [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        resume: null,
        profilePhoto: null
    });

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const dispatch = useDispatch();
    const resumeHandler = (e) => {
        setInput({
            ...input,
            resume: e.target.files[0],
        });
    };

    const profileHandler = (e) => {
        setInput({
            ...input,
            profilePhoto: e.target.files[0],
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const formData = new FormData();

            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("bio", input.bio);
            formData.append("skills", input.skills);

            if (input.resume) {
                formData.append("resume", input.resume);
            }

            if (input.profilePhoto) {
                formData.append("profilePhoto", input.profilePhoto);
            }
            console.log([...formData.entries()]);

            // API Call Here
            const response = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            if (response.data.message) {
                dispatch(setUser(response.data.userData));
                toast.success(response.data.message, {
                    className: "!bg-green-500 !text-white !border-green-500",
                })
            };

            // navigate("/login")
            setOpen(false)

        } catch (error) {
            console.log(error?.response?.data?.message);
           toast.error(error.response?.data?.message || "Something went wrong", {
    className: "!bg-red-500 !text-white !border-red-500",
});

        } finally {
            setLoading(false)
        }


    }




    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="mb-1 block font-medium">
                            Full Name
                        </label>
                        <input
                            name="fullname"
                            value={input.fullname}
                            type="text"
                            onChange={changeEventHandler}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Phone Number
                        </label>
                        <input
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={input.bio}
                            onChange={changeEventHandler}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            Skills
                        </label>
                        <input
                            name="skills"
                            value={input.skills}
                            onChange={changeEventHandler}
                            placeholder="React, Node.js, MongoDB"
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block font-medium">
                            profile Photo
                        </label>
                        <input
                            type="file"
                            onChange={profileHandler}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block font-medium">
                            Resume
                        </label>
                        <input
                            type="file"
                            onChange={resumeHandler}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>
                    {
                        loading ? (
                            <button
                                disabled
                                className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-medium text-white"
                            >
                                <Loader2 className="h-4 w-4 animate-spin" />  <span className="pl-2">Please Wait</span>
                            </button>
                        ) :
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
                            >
                                Update Profile
                            </button>
                    }
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;