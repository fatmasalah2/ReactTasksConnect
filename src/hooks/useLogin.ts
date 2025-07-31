import { useState } from "react";
import { login } from "../services/login";

export function useLogin() {
    // custom hook 
    // can be used anywhere
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (onSuccess: () => void) => {
        // lmfrud eni bfdi el msgs ladema
        // abl ma agrb login tani
        // bs msh zabtaaaa
        setMessage("");
        setError("");

        try {
            const res = await login({ username, password });
            // estna lma func login t3rfni ana dkhlt ela fail
            // we khzn el natega fy var res
            // mn el akhr object
            // fy shakl pair value
            // zy type req 
            // li fy login.ts
            setMessage(`Login successful! Token: ${res.token}`);
            // fen 
            onSuccess();
            // wllahy success
            // navigate to homepage
        } catch (err: any) {
            setError(err.message);
        }
    };
    return {
        username,
        setUsername,
        password,
        setPassword,
        message,
        error,
        handleLogin,
    };
}
