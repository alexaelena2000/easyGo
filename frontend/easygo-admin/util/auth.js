export async function signInWithUsernameAndPassword(username, password) {

    const requestBody = {
        username : username,
        password : password
    }

    const requestOptions= {
        method: 'POST',
        headers: {'Content-Type': 'application/json', withCredentials: true, credentials: "include"},
        body: JSON.stringify(requestBody)
    }

    const res = await fetch('http://localhost:8080/api/auth/signin', requestOptions)


    const token = await res.json();

    localStorage.setItem("user",JSON.stringify(token));

    console.log(token);
    console.log(res.headers);

    return token;

}

export function signOut() {

    localStorage.removeItem("user");
    
}