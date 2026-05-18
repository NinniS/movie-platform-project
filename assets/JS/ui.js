import { MOVIES_CLASS } from "./Backend/movies.js";

export class UI_CLASS{ 

    fillAllMovies() {
        const movieSection = document.querySelector("#all-movies");
        const allMovies = movies.getAllMovies();

        for (let movie of allMovies) {
            let divDM = document.createElement("div");
            divDM.innerHTML = `
            <div>
            <img src="${movie.imageURL}">
            <h2>${movie.title}</h2>
            </div>
            `;
            divDM.classList.add("movie");
            movieSection.appendChild(divDM);
        }
    }
}

const movies = new MOVIES_CLASS;

