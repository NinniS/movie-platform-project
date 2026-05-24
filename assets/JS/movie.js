const url = new URL(window.location.href);
const pat = new URLPattern({ pathname: "/movie=:id" });

let id;
let addReviewButton;

if (pat.test(url)) {
    let match = pat.exec(url);
    id = match.pathname.groups.id;
    renderMovie(id);
}

async function renderMovie(id) {
    try {
        const parentDiv = document.querySelector("#movie");
        let movie = await API.getResource(`/movies/${id}`);
        let movieDiv = document.createElement("div");
        movieDiv.setAttribute("id", "movie-info")
        movieDiv.innerHTML = `
        <div id="movie-section">
            <img style="height: 500px" src="${movie.imageURL}">
            <div>
                <div style="border-bottom: 1px solid var(--main-yellow-color); display: flex; justify-content: space-between">
                    <h2>${movie.title}</h2>
                    <h2>${movie.year}</h2>
                </div>
                <div style="opacity: 40%">
                    <h4 style="margin: 15px 10px 0px 10px">Directed by: ${movie.director}</h4>
                </div>
                <div style="border-bottom: 1px solid var(--main-yellow-color); padding: 10px">
                    <p id="movie-description">${movie.description}</p>
                </div>
                <div>
                    <div id="all-genres"></div>
                </div>
                <div style="opacity: 40%; margin: 10px">
                    <h4>Duration: ${movie.duration} min</h4>
                </div>
            </div>
            <div id="all-reviews">
                <h2>Reviews:</h2>
            </div>
        </div>
    `;
    parentDiv.appendChild(movieDiv);
    getGenres(movie.genre);
    renderMovieReviews();
    } catch (error) {
        movieDiv.innerHTML = `<div>Couldn't render movie, try again!</div`;
    }

}

async function renderMovieReviews() {
    let reviews = await getReviews();
    let reviewSection = document.querySelector("#all-reviews");
    let movieScore = await getMovieScore();
    if (movieScore == null || !movieScore.ok) {
        reviewSection.innerHTML += `<p style="margin: 20px 0px" class="review-text">No rating yet!</p>`
    } else {
        let scoreDM = document.createElement("div");
        scoreDM.textContent = `Rating: ${movieScore}/5`;
        reviewSection.appendChild(scoreDM);
    }
    if (reviews == null || !reviews.ok) {
        reviewSection.innerHTML += `<p style="margin: 20px 0px" class="review-text">No reviews yet!</p>`
    } else {
        for (let review of reviews) {
            let divDM = document.createElement("div");
            let username = await API.getResource(`/user/${review.userId}`);
            divDM.innerHTML = `
            <div class="review">
                <h4>${username.username}</h4>
                <div>
                    <p class="review-text">"${review.reviewText}"</p>
                </div>
            </div>
        `
            reviewSection.appendChild(divDM);
        }
    }
    let addReview = document.createElement("div");
    addReview.setAttribute("id", "add-review");
    addReview.classList.add("button");
    addReview.textContent = "Add Review";
    reviewSection.appendChild(addReview);
    addReviewButton = document.getElementById("add-review");

    addReview.addEventListener("click", async function (event) {
        let loggedIn = await API.loggedIn();
        if (loggedIn) {
            window.location.href = "/movie=" + id + "/review-page";
        } else {
            window.location.href = "/login";
        }
    });
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

async function getReviews() {
    try {
        let reviews = await API.getResource("/movie/" + id + "/reviews");
        return reviews;
    } catch (error) {
        return null;
    }

}

async function getMovieScore() {
    try {
        let score = await API.getResource("/movies/reviews/score/" + id);
        return score;
    } catch (error) {
        return null;
    }
}