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
        if (loggedIn) {
            loginButton.innerHTML = `<span>LOG OUT</span>`;
        }
        else {
            loginButton.innerHTML = `<span>LOG IN</span>`;
        }
    }

    async myReviewsButton() {
        const userReviewButton = document.getElementById("user-review-button");
        if (!userReviewButton) {
            return;
        }
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
                movieDiv.classList.add("one-review");

                let pictureDiv = document.createElement("div");
                pictureDiv.classList.add("picture-div");
                pictureDiv.innerHTML = `
                    <h3>${movie.title}</h3>
                    <img src="${movie.imageURL}">
                `;
                let textDiv = document.createElement("div");
                textDiv.innerHTML = `
                    <h4> Score: ${oneReview.score}</h4>
                    <p> Review: ${oneReview.reviewText}</p>
                `;

                movieDiv.appendChild(pictureDiv);
                movieDiv.appendChild(textDiv);

                myReviewsContainer.appendChild(movieDiv);
            }

        } catch (error) {
            myReviewsContainer.innerHTML = `<img src="../frontend/images/idk.png" height=400px><p> You have not written any reviews</p>`;
            return;

        }
    }

    async fillSelectReview() {
        const editForm = document.getElementById("edit-review-form");
        if (!editForm) return;
        const selectElement = editForm["select-review"];

        try {
            const userId = await API.getResource("/user");
            if (!userId) {
                console.log("User not logged in");
                return;
            }

            const userReviews = await API.getResource(`/user/reviews/${userId}`);
            selectElement.innerHTML = '<option value=""> Select review </option>';

            for (let oneReview of userReviews) {
                let movie = await API.getResource(`/movies/${oneReview.movieId}`);

                let optionDom = document.createElement("option");
                optionDom.value = oneReview.id;
                optionDom.textContent = movie.title;
                selectElement.appendChild(optionDom);
            }

        } catch (error) {
            console.log("Could not load edit form:", error);
        }
    }

    async fillEditForm() {
        const editForm = document.getElementById("edit-review-form");
        if (!editForm) return;

        let reviewId = editForm["select-review"].value;
        if (!reviewId) {
            editForm.score.value = "";
            editForm.reviewText.value = "";
            return;
        }

        try {
            const review = await API.getResource(`/movies/reviews/${reviewId}`);

            editForm.score.value = review.score;
            editForm.reviewText.value = review.reviewText;
        } catch (error) {
            console.log(error);
        }
    }

    async editReview() {
        const editForm = document.getElementById("edit-review-form");
        if (!editForm) return;

        const reviewId = editForm["select-review"].value;
        if (!reviewId) {
            alert("Please select a review to edit");
            return;
        }

        const editedData = {
            score: parseInt(editForm.score.value),
            reviewText: editForm.reviewText.value
        };

        try {
            const response = await fetch(`/movies/reviews/${reviewId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedData)
            });

            if (response.status === 204 || response.ok) {
                alert("Review updated successfully!");
                editForm.score.value = "";
                editForm.reviewText.value = "";
                window.location.reload();
            } else {
                alert("Could not update review. Bad request.");
            }
        } catch (error) {
            console.log(("Error updating review:", error));
        }
    }

    async deleteReview() {
        const editForm = document.getElementById("edit-review-form");
        if (!editForm) return;

        const reviewId = editForm["select-review"].value;
        if (!reviewId) {
            alert("Please select a review to delete");
            return;
        }

        try {
            const response = await fetch(`/movies/reviews/${reviewId}`, {
                method: "DELETE"
            });

            if (response.status === 204 || response.ok) {
                alert("Review deleted successfully!");

                editForm.score.value = "";
                editForm.reviewText.value = "";
                window.location.reload();
            }
            else {
                alert("Could not delete review. Server error.");
            }
        } catch (error) {
            console.log("Error deleting review:", error);
        }
    }
}

const UI = new UI_CLASS();
const API = new API_CLASS();