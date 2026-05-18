class API_CLASS{
    async getResource (endpoint) {
        let url = "http://localhost:8000/";
        let response = await fetch(url + endpoint, {headers: {"Accept": "application/json"}});

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }
        
        let resource = await response.json();
        return resource;
    }
}

export const API = new API_CLASS;