import react, { useState, useRef } from "react";
import Link from "next/link";
import Router from 'next/router';
import { useRouter } from "next/router";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { At, Lock } from 'tabler-icons-react';
import { signUpWithEmail } from "../util/auth";


// TODO: Rework Signup Form
export default function SignupForm() {

    const [signupError, setSignupError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSignup = (event) => {
        //Need to rework error handling to accommodate Spring Boot
        event.preventDefault();
        signUpWithEmail(email, password) // This needs to be reworked
            .then((status) => {
                if (status == 200) {
                    setSignupError("User Registered. Please Go To Login Page.")
                } else {
                    throw e;
                }
            })
            .catch((e) => {
                setSignupError("Error signing up.")
            })
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="min-h-full flex items-center justify-center py-8 px-4">
                <div className="max-w-md w-full space-y-2">
                    <div>
                        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">Register</h2>
                    </div>
                    <a>{signupError}</a>
                    <form className="mt-8 mx-5" onSubmit={handleSignup}>
                        <div className="form-control w-full max-w-xs mt-5">
                            <TextInput
                                label="Email Address:"
                                id="signup-email"
                                icon={<At size={14} />}
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                autoComplete="email"
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="form-control w-full max-w-xs mt-5">
                            <PasswordInput
                                label="Password:"
                                id="signup-password"
                                placeholder=""
                                value={password}
                                onChange={handlePasswordChange}
                                icon={<Lock size={16} />}
                                required
                            />
                        </div>
                        <div className="mt-5">
                            <Button type="submit" className="h-10 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign up
                            </Button>

                            <div className="text-sm justify-center items-center text-center mt-3">
                                <Link href="/login">
                                    <a className="font-medium text-indigo-600 hover:text-indigo-500">Already a member? Login here.</a>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}