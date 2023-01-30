import axios from 'axios';

export const logout = async () => {
    try {
        const response = await axios.get("https://auth0.secret_firma.net/realms/Recruitment/protocol/openid-connect/logout")
        return response.data
    } catch (error) {
        alert(error)
    }
}

export const getData = async () => {
    try {
        const response = await axios.get("https://api.rec.devel.secret_firma.net/data.json")
        return response.data
    } catch (error) {
        alert(error)
    }
}

export const getToken = async (email: string, password: string) => {
    try {
        const response = await axios.post("https://auth0.secret_firma.net/realms/Recruitment/protocol/openid-connect/token", 
        "grant_type=password&client_id=oauth-proxy-rec&username=" + email + "&password=" + password, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        return response.data
    } catch (error) {
        alert(error)
    }
}

export const handleAuth0Auth = async (access_token: string, 
                                      token_type:string,
                                      expires_in: number,
                                      refresh_token: string,
                                      scope: string,
                                      session_state: string) : Promise<any> => {
    try {
        const response = await axios.post("https://auth0.secret_firma.net/realms/Recruitment/protocol/openid-connect/auth",
        "client_id=oauth-proxy-rec" +
        "&redirect_uri=" + "https://api.rec.devel.secret_firma.net/data.json" +
        "&expires_in=" + expires_in +
        "&refresh_token=" + refresh_token +
        "&session_state=" + session_state +
        "&response_mode=" + "fragment" +
        "&response_type=" + "code" +
        "&scope=" + "web-origins", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": token_type + " " + access_token,
            }
        })
        return response.data;
      } catch (error) {
        console.error(error);
    }
}