import { useState } from "react";
import { signInWithUsernameAndPassword } from "../util/auth";
import { useRouter } from "next/router";
import { At, Lock } from 'tabler-icons-react';
import { TextInput, PasswordInput, Button } from "@mantine/core";
import Link from "next/link";


export default function LoginForm() {
    const [loginError, setLoginError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = (event) => {
        //Need to rework error handling to accommodate Spring Boot
        event.preventDefault();
        signInWithUsernameAndPassword(email, password) // This needs to be reworked
            .then((token) => {
                if (token == null) {
                  throw e;
                } else {
                  router.push("/");
                  return token
                }
            })
            .catch((e) => {
                setLoginError("Error Logging In.")
            })
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="min-h-full flex items-center justify-center py-8 px-4">
                <div className="max-w-md w-full space-y-2">
                    <div>
                        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">Login</h2>
                    </div>
                    <a>{loginError}</a>
                    <form className="mt-8 mx-5" onSubmit={handleLogin}>
                        <div className="form-control w-full max-w-xs mt-5">
                          <TextInput
                            label="Email Address:"
                            id="login-email"
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
                            id="login-password"
                            placeholder="" 
                            value={password}
                            onChange={handlePasswordChange}
                            icon={<Lock size={16} />}
                            required
                          />
                        </div>
                        <div className="mt-5">
                          <Button type="submit" className="h-10 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Login
                          </Button>
        
                          <div className="text-sm justify-center items-center text-center mt-3">
                            <Link href="/signup">
                                <a className="font-medium text-indigo-600 hover:text-indigo-500">Not a member? Sign up here.</a>
                            </Link>
                          </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )


}