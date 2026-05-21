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
        <img style="height: 300px" src="${movie.imageURL}">
        
        <div>
            <div>
                <p>${movie.title}</p>
                <p>${movie.year}</p>
            </div>
            <p>${movie.description}</p>
        </div>
    `;
    parentDiv.appendChild(movieDiv);
}