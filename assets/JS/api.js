const DOM_LOGIN_FORM = document.getElementById("log-in");
const FILTER_FORM = document.getElementById("movie-filter");

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

if (DOM_LOGIN_FORM) {
    DOM_LOGIN_FORM.addEventListener("submit", async function (event) {
        event.preventDefault();

        let username = DOM_LOGIN_FORM.elements.username.value;
        let password = DOM_LOGIN_FORM.elements.password.value;

        let url = "http://localhost:8000/login";
        let response = await fetch(url, { method: "POST", body: JSON.stringify({ "username": `${username}`, "password": `${password}` }), headers: { "Content-Type": "application/json" } });
    });
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

