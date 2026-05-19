class UI_CLASS {
    async fillAllMovies() {
        const movieSection = document.querySelector("#all-movies");
        try {
            const movies = await API.getResource("/movies")

            for (let movie of movies) {
                let divDM = document.createElement("div");
                divDM.innerHTML = `
            <div>
            <img src="${movie.imageURL}">
            <h3>${movie.title}</h3>
            </div>
            `;
                divDM.classList.add("movie");
                movieSection.appendChild(divDM);
            }
        } catch (error) {
            console.log("Didn't work");
            return;
        }
    }
}

const UI = new UI_CLASS();
const API = new API_CLASS();
UI.fillAllMovies();