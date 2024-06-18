import image from "../assets/login.jpg";
import Button from "../components/button";
import Wrapper from "../components/wrapper";
import { AiOutlineUser, AiOutlineMail, AiFillLock } from "react-icons/ai";
import { ReactSVG } from "react-svg";
import Line from "../assets/svg/line.svg";
import Google from "../assets/svg/google-icon.svg";
import Facebook from "../assets/svg/facebook-icon.svg";
import ExternalSignIn from "../components/externalSignin";
import LoginBg from "../assets/svg/login-bg.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { notification } from "antd";
import useAuth from "../context/authContext";

export default function SignUp() {
    const Navigate = useNavigate("");
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest(
            data.firstName,
            data.lastName,
            data.email,
            data.password,
        );
    };
    async function sendRequest(
        firstName,
        lastName,
        email,
        password,
    ) {
        const api = await axios
            .post("http://localhost:8000/api/v1/users/createAccount", {
                firstName,
                lastName,
                email,
                password,
            })
            .then(({ data }) => {
                Navigate("/");
                notification.success({ message: "Registered successfully!" });
            }).catch((err) => {
                notification.error({
                    message: err.response.data.message || "Error Occured!",
                });
            });
    }

    return (
        <div className="flex w-full h-[100vh] font-quicksand">
            <div className="w-full h-full overflow-hidden">
                <img className="w-full h-full" src={image}></img>
                <div className="absolute w-[60%] h-full top-0 flex-row flex items-center justify-center z-50">
                    <p className="font-bold text-white text-3xl text-center z-50">
                        Library Management Portal
                    </p>
                </div>
                <div className="w-full h-full z-0 absolute top-0 left-0 bg-[#022140] opacity-55"></div>
            </div>
            <div className="w-[45%] absolute h-full overflow-hidden bg-white rounded-l-2xl font-quicksand right-0">
                <div className="w-full h-full p-16 flex flex-col  items-center gap-8 absolute z-50">
                    <h3 className="text-center text-xl font-semibold font-quicksand">
                        Welcome On Board!
                    </h3>
                    <p className="text-[#C0C0C0] text-center">
                        Please enter your information to create account!
                    </p>
                    <form className="w-[70%] flex flex-col gap-8" onSubmit={handleSubmit}>
                    <Wrapper
                            label="First Name"
                            name="firstName"
                            required={true}
                            handleChange={(e) => setData({ ...data, firstName: e.target.value })}
                            placeholder="Enter your first name"
                            value={data.firstName}
                            icon={
                                <AiOutlineUser className="text-darkb text-lg font-extrabold" />
                            }
                        />
                        <Wrapper
                            label="Last Name"
                            name="lastName"
                            required={true}
                            handleChange={(e) => setData({ ...data, lastName: e.target.value })}
                            placeholder="Enter your last name"
                            value={data.lastName}
                            icon={
                                <AiOutlineUser className="text-darkb text-lg font-extrabold" />
                            }
                        />
                        <Wrapper
                            label="Email"
                            name="email"
                            required={true}
                            handleChange={(e) => setData({ ...data, email: e.target.value })}
                            placeholder="Enter your email"
                            value={data.email}
                            icon={
                                <AiOutlineUser className="text-darkb text-lg font-extrabold" />
                            }
                        />

                        <Wrapper
                            label="Password"
                            name="password"
                            required={true}
                            handleChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            value={data.password}
                            placeholder="Enter your password"
                            icon={
                                <AiFillLock className="text-darkb text-lg font-extrabold" />
                            }
                        />
                        {/* <Link to="/view"> */}
                        <Button className="mt-4 w-full" content={"Sign up"} type="submit" />
                        {/* </Link> */}

                        <div className="flex gap-4 justify-center">
                            <p>Already have an account?</p>
                            <Link to="/">
                            <p className="text-darkb">Sign In</p>
                            </Link>
                        </div>

                        <div className="flex flex-row items-center">
                            <ReactSVG src={Line}></ReactSVG>
                            <p className="opacity-50">OR</p>
                            <ReactSVG src={Line}></ReactSVG>
                        </div>

                        <div className="flex gap-2">
                            <ExternalSignIn src={Google} text="Sign In With Google" />
                            <ExternalSignIn src={Facebook} text="Sign In With Facebook" />
                        </div>
                    </form>
                </div>
                <ReactSVG
                    src={LoginBg}
                    className="absolute top-0 left-0 overflow-hidden z-0"
                ></ReactSVG>
            </div>
        </div>
    );
}
