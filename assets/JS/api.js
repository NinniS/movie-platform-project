const DOM_LOGIN_FORM = document.getElementById("log-in");
const DOM_SIGN_UP_FORM = document.getElementById("sign-up");

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

    let endpoint = "/login";
    let response = await fetch(endpoint, {method:"POST", body: JSON.stringify({"username":`${username}`,"password": `${password}`}), headers:{"Content-Type":"application/json"}});
});


DOM_SIGN_UP_FORM.addEventListener("submit", async function(event){
    event.preventDefault();

    let username = DOM_SIGN_UP_FORM.elements.username.value;
    let password = DOM_SIGN_UP_FORM.elements.password.value;

    let endpoint = "/signup";
    let response = await fetch(endpoint, {method:"POST", body: JSON.stringify({"username":`${username}`,"password": `${password}`}), headers:{"Content-Type":"application/json"}});
});
