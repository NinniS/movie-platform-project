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
            profilePicture: data.profilePicture,
            password: data.password
        }
        users.push(newUser);
        this.db.writeDatabase(users);
        return id;
    }
    getUsername(id) {
        const user = this.getUserById(id);
        return user.username;
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

    getReviewById(id) {
        const reviews = this.getAllReviews();
        let reviewById;
        for (let review of reviews) {
            if (review.id == id) {
                reviewById = review;
                break;
            }
        }
        return reviewById;
    }

    createReview(data) {
        console.log(data)
        if (data.userId == null || data.movieId == null || data.score == null || data.reviewText == null) {
            return null;
        }

        let dataBase = this.getAllReviews();
        console.log(dataBase);
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
        this.db.writeDatabase(dataBase);
        return true;
    }

    editReview(data, id) {
        let dataBase = this.getAllReviews();

        let reviewToEdit;

        for (let review of dataBase) {
            if (review.id == id) {
                reviewToEdit = review;
                break;
            }
        }

        if (!reviewToEdit) { return null };

        for (let key in data) {
            reviewToEdit[key] = data[key];
        }

        this.db.writeDatabase(dataBase);
        return true;
    }

    deleteReview(id) {
        const reviews = this.getAllReviews();
        let found = false;

        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].id == id) {
                reviews.splice(i, 1);
                found = true;
                break;
            }
        }
        if (!found) { return false };

        this.db.writeDatabase(reviews);
        return true;
    }
}

export const USERS = new USERS_CLASS();
export const REVIEWS = new REVIEW_CLASS();