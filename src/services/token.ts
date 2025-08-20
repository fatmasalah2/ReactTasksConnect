export type JwtToken = {
    token: string;
    expiresIn: number;
    refreshToken: string;
    refreshExpiresIn: number;
    // de kul ma ye7tagu ltoken bta3i
};

export function isAuthenticated(): boolean {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return false;

    try {
        const tokenData = JSON.parse(authToken);
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if token is expired
        if (tokenData.expiresIn && currentTime > tokenData.expiresIn) {
            localStorage.removeItem("authToken");
            return false;
        }

        return true;
    } catch (error) {
        // If token is invalid, remove it
        localStorage.removeItem("authToken");
        return false;
    }
}

export function getAuthToken(): JwtToken | null {
    if (!isAuthenticated()) return null;

    try {
        return JSON.parse(localStorage.getItem("authToken") || "");
    } catch (error) {
        return null;
    }
}

export function updateToken(token: JwtToken): Promise<JwtToken> {
    // lfunc de bta5ud object of type JwtToken
    // btrg3 promise btrg3 token gded be nfs lnu3
    return new Promise((resolve, reject) => {
        if (!token || !token.token || !token.refreshToken) {
            // ana hena bt2kd mn se7t el token bta3i
            // mmkn ybaa msh mwgud asln
            // kman lazem refresh token 34n d li by3ml lupdate
            return reject(new Error("Invalid token object"));
            // lw kda ybaa 3ndi mushkla fy lpromise bta3y
        }
        setTimeout(() => {
            // bnt25r shwyaa 1000
            resolve({
                // resolve ybaa kul haga tmm
                // rg3li ltoken
                ...token,
                expiresIn: token.expiresIn + 3600,
                refreshExpiresIn: token.refreshExpiresIn + 7200,
            });
        }, 1000);
    });
}
