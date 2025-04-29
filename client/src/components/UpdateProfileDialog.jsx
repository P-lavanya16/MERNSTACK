import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);

    const [loading, setLoading] = useState(false);
    const [fileError, setFileError] = useState("");

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        file: null, // set to null initially
    });

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type !== "application/pdf" && !file.type.startsWith("image/")) {
            setFileError("Only PDF or image files are allowed (.pdf, .jpeg, .png, .webp)");
            setInput((prev) => ({ ...prev, file: null }));
        } else {
            setFileError("");
            setInput((prev) => ({ ...prev, file }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!input.fullname || !input.email || !input.phoneNumber) {
            toast.error("Please fill all required fields");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", JSON.stringify(input.skills.split(",").map(skill => skill.trim())));

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false); // Close dialog after successful update
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler} className="flex flex-col gap-3">
                        {/* Name */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                required
                                disabled // Disable email editing
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="number">Phone Number</Label>
                            <Input
                                id="number"
                                name="phoneNumber"
                                type="text"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* Bio */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="bio">Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                type="text"
                                value={input.bio}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {/* Skills */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="skills">Skills (comma separated)</Label>
                            <Input
                                id="skills"
                                name="skills"
                                type="text"
                                value={input.skills}
                                onChange={changeEventHandler}
                                placeholder="e.g. JavaScript, React, Node.js"
                            />
                        </div>

                        {/* Resume Upload */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="file">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf,image/jpeg,image/png,image/webp"
                                onChange={fileChangeHandler}
                            />
                            {/* Show selected file name */}
                            {input.file && typeof input.file !== "string" && (
                                <div className="text-sm text-gray-500 mt-1">
                                    Selected file: {input.file.name}
                                </div>
                            )}
                        </div>

                        {/* File Error */}
                        {fileError && (
                            <div className="text-red-500 text-sm">
                                {fileError}
                            </div>
                        )}

                        <DialogFooter>
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
};

export default UpdateProfileDialog;
