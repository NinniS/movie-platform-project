const DOM_LOGIN_FORM = document.getElementById("log-in");
const DOM_SIGN_UP_FORM = document.getElementById("sign-up");
const FILTER_FORM = document.getElementById("movie-filter");
const LOGIN_BUTTON = document.getElementById("login");

class API_CLASS {
    async getResource(endpoint) {
        let url = "http://localhost:8000/";
        let response = await fetch(url + endpoint, { headers: { "Accept": "application/json" } });

        if (!response.ok) {
            throw new Error("API Error: " + response.status);
        }

        let resource = await response.json();
        return resource;
    }
}

function buildQuery(filterValues) {
    let query = "";

    if (filterValues.genre) {
        query += "genre=" + filterValues.genre;
    }
    if (filterValues.yearMin) {
        if (query != "") {
            query += "&";
        }
        query += "minYear=" + filterValues.yearMin;
    }
    if (filterValues.yearMax) {
        if (query != "") {
            query += "&";
        }
        query += "maxYear=" + filterValues.yearMax;
    }
    if (filterValues.inStock) {
        if (query != "") {
            query += "&";
        }
        query += "inStock=1";
    }
    if (filterValues.durationMin) {
        if (query != "") {
            query += "&";
        }
        query += "minDuration=" + filterValues.durationMin;
    }
    if (filterValues.durationMax) {
        if (query != "") {
            query += "&";
        }
        query += "maxDuration=" + filterValues.durationMax;
    }
    return query;
}

if (FILTER_FORM) {
    FILTER_FORM.addEventListener("submit", async function (event) {
        event.preventDefault();
        const formElements = event.target.elements;

        const filterValues = {
            genre: formElements.genre.value,
            filter: formElements.filter.value,
            yearMin: formElements.year_min.value,
            yearMax: formElements.year_max.value,
            durationMin: formElements.duration_min.value,
            durationMax: formElements.duration_max.value,
        };

        let url = buildQuery(filterValues);

        let movies = await API.getResource("/movies?" + url);
        UI.fillFilteredMovies(movies);

    });
}

if (DOM_LOGIN_FORM) {
    DOM_LOGIN_FORM.addEventListener("submit", async function (event) {
        event.preventDefault();

        let username = DOM_LOGIN_FORM.elements.username.value;
        let password = DOM_LOGIN_FORM.elements.password.value;
        let endpoint = "/login";
        let response = await fetch(endpoint, {method:"POST", body: JSON.stringify({"username":`${username}`,"password": `${password}`}), headers:{"Content-Type":"application/json"}});
        if (response.ok) {
            window.location.href = "/homepage";
        }
    });
}

if (DOM_SIGN_UP_FORM) {
    DOM_SIGN_UP_FORM.addEventListener("submit", async function (event) {
        event.preventDefault();

        let username = DOM_SIGN_UP_FORM.elements.username.value;
        let password = DOM_SIGN_UP_FORM.elements.password.value;

        let endpoint = "/signup";
        let response = await fetch(endpoint, {method:"POST", body: JSON.stringify({"username":`${username}`,"password": `${password}`}), headers:{"Content-Type":"application/json"}});
        if (response.ok) {
            window.location.href = "/homepage";
        }
    });
}

if(LOGIN_BUTTON){
    LOGIN_BUTTON.addEventListener("click", async function (event) {
        console.log("du klickade");
        let endpoint = "/login/cookie";
        let response = await fetch(endpoint);
        console.log("response:", response);
        let foundCookie = await response.json();
        console.log("efter json parse:", foundCookie);

        if(foundCookie.found == true){
            endpoint = "/logout";
            let secondResponse = await fetch(endpoint, {method:"POST", headers:{"Content-Type":"application/json"}});
            window.location.href = "/login";
            console.log("succsessful logout");
        }
        else{
            window.location.href = "/login";
            console.log("du behöver logga in");
        }
    });
}