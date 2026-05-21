const url = new URL(window.location.href);
const pat = new URLPattern({ pathname: "/movie=:id"});
const API = new API_CLASS();

if (pat.test(url)) {
    let match = pat.exec(url);
    let id = match.pathname.groups.id;
    renderMovie(id);
    
}

async function renderMovie(id) {
    const parentDiv = document.querySelector("#movie");
    let movie = await API.getResource(`/movies/${id}`);
    console.log(movie);
    let movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <div>
            <img style="height: 200px" src="${movie.imageURL}">
        </div>
        <div>
            <h2>${movie.title}</h2>
            <h3>${movie.year}</h3>
        </div>
        <p>${movie.description}</p>
    `;
    parentDiv.appendChild(movieDiv);
}