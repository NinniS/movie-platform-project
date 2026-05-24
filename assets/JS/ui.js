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
            for (let genre of genres) {
                genreSection.innerHTML += `<option value="${genre}">${genre}</option>`;
            }
        } catch (error) {
            //Säg till användaren att det inte funkade
            console.log("Didn't work");
            return;
        }
    }
    fillFilteredMovies(movies) {
        const movieSection = document.querySelector("#all-movies");
        movieSection.innerHTML = "";
        if (movies.length == 0) {
            movieSection.innerHTML = `<p>Couldn't find any movies!</p>`
        } else {
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
        }
    }
    async loginButton() {
        let loggedIn = await API.loggedIn();
        const loginButton = document.getElementById("login");
        console.log("är den logged in:", loggedIn);
        if (loggedIn) {
            loginButton.innerHTML = `<span>LOG OUT</span>`;
        }
        else {
            loginButton.innerHTML = `<span>LOG IN</span>`;
        }
    }

    async myReviewsButton() {
        const userReviewButton = document.getElementById("user-review-button");
        try {
            let loggedIn = await API.loggedIn();
            if (loggedIn) {
                userReviewButton.innerHTML = `<span> My reviews </span>`;
                userReviewButton.classList.add("logged-in");
                userReviewButton.addEventListener("click", function (event) {
                    window.location.href = "/user/reviews";
                });
            }
        } catch (error) {
            console.log("could not verify log in:", error);
        }
    }

    async fillUserReviews() {
        const myReviewsContainer = document.getElementById("my-reviews");

        try {
            const userId = await API.getResource("/user");
            if (!userId) {
                myReviewsContainer.innerHTML = `<p> You need to be logged in </p>`
                return;
            }

            const endpoint = `/user/reviews/${userId}`;
            const userReviews = await API.getResource(endpoint);

            myReviewsContainer.innerHTML = "";

            for (let oneReview of userReviews) {
                const movie = await API.getResource(`/movies/${oneReview.movieId}`);

                let movieDiv = document.createElement("div");
                movieDiv.innerHTML = `
                <h3>${movie.title}</h3>
                <img src="${movie.imageURL}">
                `;
                let divDom = document.createElement("div");
                divDom.innerHTML = `
                <p> Score: ${oneReview.score}</p>
                <p> Review: ${oneReview.reviewText}</p>
                `;
                myReviewsContainer.appendChild(movieDiv);
                myReviewsContainer.appendChild(divDom);
            }

        } catch (error) {
            myReviewsContainer.innerHTML = "<p> You have not written any reviews</p>";
            return;

        }
    }
}

const UI = new UI_CLASS();
const API = new API_CLASS();