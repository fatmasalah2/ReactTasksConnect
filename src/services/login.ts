export type request = {
    username: string;
    password: string;
};

export type jwtToken = {
    token: string;
    // expiresIn: number;
    // refreshToken: string;
};

export function login(req: request): Promise<jwtToken> {
    return new Promise((resolve, reject) => {
        // Simulate an API call
        setTimeout(() => {
            if (req.username === "admin" && req.password === "password") {
                const token: jwtToken = { token: "jwt-token" };
                resolve(token);
            } else {
                reject(new Error("Invalid username or password"));
            }
        }, 1000);
    });
}
