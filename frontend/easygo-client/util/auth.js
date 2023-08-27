export async function signInWithUsernameAndPassword(username, password) {

    //TEMP FOR EMAIL
    const requestBody = {
        username : username.match(/^([^@]*)@/)[1],
        password : password
    }

    const requestOptions= {
        method: 'POST',
        headers: {'Content-Type': 'application/json', withCredentials: true, credentials: "include"},
        body: JSON.stringify(requestBody)
    }

    const res = await fetch('http://localhost:8080/api/auth/signin', requestOptions)


    const token = await res.json();

    const status = await res.status;

    console.log(status);

    if(status == 401) {
        return null;
    } else {
        localStorage.setItem("user",JSON.stringify(token));
        console.log(token);
        console.log(res.headers);
        return token;
    }

}

export async function signUpWithEmail(email, password) {
    const requestBody = {
        username: email.match(/^([^@]*)@/)[1],
        email: email,
        password: password
    }

    const requestOptions= {
        method: 'POST',
        headers: {'Content-Type': 'application/json', withCredentials: true, credentials: "include"},
        body: JSON.stringify(requestBody)
    }

    const res = await fetch('http://localhost:8080/api/auth/signup', requestOptions)

    const status = await res.status;

    return status;
}


export function signOut() {

    localStorage.removeItem("user");
    
}