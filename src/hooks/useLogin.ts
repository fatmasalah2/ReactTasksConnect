import { useState, useRef } from "react";
import { login } from "../services/login";
import { updateToken } from "../services/token";
import type { JwtToken } from "../services/token";


export function useLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [, setToken] = useState<JwtToken | null>(null);
    // grbt hena ab3t token 
    // bs gali warning 34n mst5dmthush
    // fa msh me7tagenu hena
    // ana bs me7taga a3ml update
    // kman guz2 el null da fy lawl abl ma a3ml login mfesh token
    // l2ma token l2ma mfesh

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // hook le value mkmla m3aya
    // mn gher ma y7sl re-render
    // kmn grbt ast5md .Node.js mzbbttsh
    // f return type bl mnzr da
    // typescript heya lms2ula 3n ltype baa ayn kn 
    // number aw object

    const scheduleTokenRefresh = (newToken: JwtToken) => {
        // .current da mu2kt a2dr a3dl lrefresh bta3i
        if (timerRef.current) clearTimeout(timerRef.current);
// offset validity of token 
// expiresat ahsn mn in 
// epoch mainly time format
// 
        const refreshTime = (newToken.expiresIn - 60) * 1000;
        console.log(`🔁 Token will refresh in ${(refreshTime / 1000 / 60).toFixed(2)} minutes`);

        timerRef.current = setTimeout(async () => {
            try {
                const updated = await updateToken(newToken);
                setToken(updated);
                setMessage("🔄 Token refreshed!");
                scheduleTokenRefresh(updated);
            } catch (err: any) {
                setError("Failed to refresh token");
            }
        }, refreshTime);
    };
    const handleLogin = async (onSuccess: () => void) => {
        setMessage("");
        setError("");

        try {
            const res = await login({ username, password });
            setMessage(`Login successful! Token: ${res.token}`);
            setToken(res);
            scheduleTokenRefresh(res);
            onSuccess();
        } catch (err: any) {
            setError(err.message || "Login failed");
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


// b3ml save lldetails li user byktbha username and password
// bndh login func 
// in case of login successfully b3ml save lltoken 
// bgdd el token before it ends bw2t mu3yn
// t5zen msg swa2 nga7 aw error