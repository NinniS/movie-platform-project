const url = new URL(window.location.href);
const pat = new URLPattern({ pathname: "/movie=:id" });
const API = new API_CLASS();

if (pat.test(url)) {
    let match = pat.exec(url);
    let id = match.pathname.groups.id;
    renderMovie(id);

}

async function renderMovie(id) {
    const parentDiv = document.querySelector("#movie");
    let movie = await API.getResource(`/movies/${id}`);
    let movieDiv = document.createElement("div");
    movieDiv.setAttribute("id", "movie-info")
    movieDiv.innerHTML = `
        <div id="movie-section">
            <img style="height: 500px" src="${movie.imageURL}">
            <div>
                <div style="border-bottom: 1px solid var(--main-yellow-color)">
                    <h2>${movie.title}</h2>
                    <h2>${movie.year}</h2>
                </div>
                <div style="border-bottom: 1px solid var(--main-yellow-color)">
                    <p id="movie-description">${movie.description}</p>
                </div>
                <div>
                    <div id="all-genres"></div>
                </div>
            </div>
        </div>
    `;
    parentDiv.appendChild(movieDiv);
    getGenres(movie.genre);
}

function getGenres(genres) {
    const parentDiv = document.querySelector("#all-genres");
    for (let genre of genres) {
        let pDM = document.createElement("p");
        pDM.classList.add("genres");
        pDM.textContent = genre;
        parentDiv.appendChild(pDM);
    }
}