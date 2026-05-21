class UI_CLASS {
    async fillAllMovies() {
        const movieSection = document.querySelector("#all-movies");
        try {
            const movies = await API.getResource("/movies");

            for (let movie of movies) {
                let divDM = document.createElement("div");
                divDM.innerHTML = `
            <a href="/movie=${movie.id}"><div>
            <img src="${movie.imageURL}">
            <h3>${movie.title}</h3>
            </div></a>
            `;
                divDM.classList.add("movie");
                movieSection.appendChild(divDM);
            }
        } catch (error) {
            //Säg till användaren att det inte funkade
            console.log("Didn't work");
            return;
        }
    }
    async fillGenres() {
        const genreSection = document.querySelector("#genre");
        try {
            const genres = await API.getResource("/movies/genres");
            console.log(genres);
            for (let genre of genres) {
                genreSection.innerHTML += `<option value="${genre}">${genre}</option>`;
            }
        } catch (error) {
            //Säg till användaren att det inte funkade
            console.log("Didn't work");
            return;
        }
    }
}

const UI = new UI_CLASS();
const API = new API_CLASS();
UI.fillAllMovies();
UI.fillGenres();