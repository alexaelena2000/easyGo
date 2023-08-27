import react, {useState, useRef, setState, useEffect} from "react";
import Link from "next/link";
import Router, { useRouter } from 'next/router';
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { At, Lock } from 'tabler-icons-react';
import { signInWithUsernameAndPassword } from "../../util/auth";

export default function LoginForm() {

    const [loginError, setLoginError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
      //Need to rework error handling to accommodate Spring Boot
        event.preventDefault();
        signInWithUsernameAndPassword(username,password)
        .then((token) => {
          if(token) {
            Router.push("/");
            return token
          }
          throw e;
        })
        .catch((e) => {
          setLoginError("Error Logging In.")
        })
    }

    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }

    return(        
    <div className="card w-96 bg-base-100 shadow-xl">
    <div className="min-h-full flex items-center justify-center py-8 px-4">
        <div className="max-w-md w-full space-y-2">
            <div>
                <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">EasyGo Admin Portal</h2>
            </div>
            <a>{loginError}</a>
            <form className="mt-8 mx-5" onSubmit={handleLogin}>
                <div className="form-control w-full max-w-xs mt-5">
                  <TextInput
                    label="Username:"
                    id="login-username"
                    icon={<At size={14} />}
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    autoComplete="username"
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
                </div>
            </form>
        </div>
    </div>
</div>
)
}