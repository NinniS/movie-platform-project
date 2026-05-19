import { DB_CLASS } from "./db.js";
import { MOVIES } from "./movies.js";

class USERS_CLASS{
    constructor(){
        this.db = new DB_CLASS("../../../assets/database/users.json");
    }
    getAllUsers(){
        const users = this.db.readDatabase();
        return users;
    }
    getUserById(id){
        const users = this.getAllUsers();
        for (let user of users){
            if(user.id == id){
                return user;
            }
        }
        return null;
    }
    getReviewsByUserId(id){
        return REVIEWS.getReviewsByUserId(id);
    }
    getFavoriteMoviesByUserId(id){
        let foundUser = this.getUserById(id);
        if(foundUser == null){
            return null;
        }
        const favorieMoviesIds = foundUser.favoriteMovies;
        let favorieMovies = [];
        for(let movieId of favorieMoviesIds){
            favorieMovies.push(MOVIES.getMovieById(movieId));
        }
        return favorieMovies;
    }
    getWatchlistMoviesByUserId(id){
        let foundUser = this.getUserById(id);
        if(foundUser == null){
            return null;
        }
        const watchlistMoviesIds = foundUser.watchlistMovies;
        let watchlistMovies = [];
        for(let movieId of watchlistMoviesIds){
            watchlistMovies.push(MOVIES.getMovieById(movieId));
        }
        return watchlistMovies;
    }
    createUser(data){
        if(data.profilePicture == undefined){}
    }
}

class REVIEW_CLASS{
    constructor() {
        this.db = new DB_CLASS("../../../assets/database/reviews.json");
    }
    getAllReviews(){
        const reviews = this.db.readDatabase();
        return reviews;
    }
    
    getAllReviewsByMovieId(id){
        const reviews = this.getAllReviews();
        let foundReviews = []
        for (let review of reviews){
            if(review.movieId == id){
                foundReviews.push(review);
            }
        }
        return foundReviews;
    }
    getReviewsByUserId(id){
        const reviews = this.getAllReviews();
        let foundReviews = []
        for (let review of reviews){
            if(review.userId == id){
                foundReviews.push(review);
            }
        }
        return foundReviews;
    }

    createReview(data){

    }
}

export const USERS = new USERS_CLASS();
export const REVIEWS = new REVIEW_CLASS();