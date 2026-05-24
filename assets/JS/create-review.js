const ADD_REVIEW_FORM = document.querySelector("#review-form");
const chosenMovie = document.querySelector("#chosen-movie");
let url = new URL(window.location.href);
let pat = new URLPattern({ pathname: "/movie=:id/review-page" });
let id;

if (pat.test(url)) {
    let match = pat.exec(url);
    id = match.pathname.groups.id;
}

async function fillMovieTitle() {
    try {
        let movieOption = document.createElement("option");
        let movie = await API.getResource("/movies/" + id);
        if (!movie.ok) {
            movieOption.textContent = "Couldn't find movie";
        }
        movieOption.textContent = movie.title;
        movieOption.setAttribute("value", id);
        chosenMovie.appendChild(movieOption);
    } catch (error) {

    }
}

ADD_REVIEW_FORM.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formElements = event.target.elements;
    let userId;
    try {
        userId = await API.getResource("/user");
    } catch (error) {
        console.log("You have to log in");
        return;
    }

    const reviewValues = {
        userId: userId,
        movieId: parseInt(formElements["chosen-movie"].value),
        score: parseInt(formElements.score.value),
        reviewText: formElements["review-text"].value
    }

    let response = await API.postReview("/movies/" + id, reviewValues);
    if (!response.ok) {
        alert("Couldn't add review");
    } else {
        alert("Review successfully added!");
        window.location.href = `/movie=${id}`;
    }

});

fillMovieTitle();