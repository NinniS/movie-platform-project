const DOM_LOGIN_FORM = document.getElementById("log-in");
const FILTER_FORM = document.getElementById("movie-filter");

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

    DOM_LOGIN_FORM.addEventListener("submit", async function(event){
        event.preventDefault();

        let username = DOM_LOGIN_FORM.elements.username.value;
        let password = DOM_LOGIN_FORM.elements.password.value;

        let url = "http://localhost:8000/login";
        let response = await fetch(url, {method:"POST", body: JSON.stringify({"username":`${username}`,"password": `${password}`}), headers:{"Content-Type":"application/json"}});
    });

    FILTER_FORM.addEventListener("submit", async function(event) {
        event.preventDefault();
    })