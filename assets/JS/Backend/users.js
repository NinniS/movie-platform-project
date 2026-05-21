import { DB_CLASS } from "./db.js";
import { MOVIES } from "./movies.js";

class USERS_CLASS {
    constructor() {
        this.db = new DB_CLASS("../../../assets/database/users.json");
    }
    getAllUsers() {
        const users = this.db.readDatabase();
        return users;
    }
    getUserById(id) {
        const users = this.getAllUsers();
        for (let user of users) {
            if (user.id == id) {
                return user;
            }
        }
        return null;
    }
    getFavoriteMoviesByUserId(id){
        let foundUser = this.getUserById(id);
        if (foundUser == null) {
            return null;
        }
        const favorieMoviesIds = foundUser.favoriteMovies;
        let favorieMovies = [];
        for (let movieId of favorieMoviesIds) {
            favorieMovies.push(MOVIES.getMovieById(movieId));
        }
        return favorieMovies;
    }
    getWatchlistMoviesByUserId(id) {
        let foundUser = this.getUserById(id);
        if (foundUser == null) {
            return null;
        }
        const watchlistMoviesIds = foundUser.watchlistMovies;
        let watchlistMovies = [];
        for (let movieId of watchlistMoviesIds) {
            watchlistMovies.push(MOVIES.getMovieById(movieId));
        }
        return watchlistMovies;
    }
    createUser(data) {
        if (data.profilePicture == undefined) {
            data.profilePicture == "https://cdn.mos.cms.futurecdn.net/Mmp8BWEmWGCnGSgV2kRFVU.jpg";
        }
        const users = this.db.readDatabase();
        let id = 0;
        for (let user of users) {
            if (user.id > id) {
                id = user.id;
            }
        }
        id++;

        let newUser = {
            id: id,
            username: data.username,
            reviews: [],
            profilePicture: data.profilePicture,
            favoriteMovies: [],
            watchlistMovies: [],
            password: data.password
        }
        users.push(newUser);
        this.db.writeDatabase(users);
        return id;
    }
}

class REVIEW_CLASS {
    constructor() {
        this.db = new DB_CLASS("../../../assets/database/reviews.json");
    }
    getAllReviews() {
        const reviews = this.db.readDatabase();
        return reviews;
    }

    getAllReviewsByMovieId(id) {
        const reviews = this.getAllReviews();
        let foundReviews = []
        for (let review of reviews) {
            if (review.movieId == id) {
                foundReviews.push(review);
            }
        }
        return foundReviews;
    }
    getReviewsByUserId(id) {
        const reviews = this.getAllReviews();
        let foundReviews = []
        for (let review of reviews) {
            if (review.userId == id) {
                foundReviews.push(review);
            }
        }
        return foundReviews;
    }
    getAverageScoreByMovieId(id) {
        let allReviewsByMovieId = this.getAllReviewsByMovieId(id);
        let totalScore = 0;
        for (let score of allReviewsByMovieId) {
            totalScore += score.score;
        }

        let averageScore = totalScore / allReviewsByMovieId.length;
        return averageScore;
    }

    createReview(data) { //data = objekt med nycklar
        if (data.userId == null || data.movieId == null || data.score == null || data.reviewText == null) {
            return null;
        }

        let dataBase = this.getAllReviews();
        let id = 0;
        for (let review of dataBase) {
            if (review.id > id) {
                id = review.id;
            }
        }
        id++;

        let newReview = {
            id: id,
            userId: data.userId,
            movieId: data.movieId,
            score: data.score,
            reviewText: data.reviewText
        }

        dataBase.push(newReview);
        this.writeDatabase(dataBase);
        return true;
    }
}

export const USERS = new USERS_CLASS();
export const REVIEWS = new REVIEW_CLASS();