// Jag tog inspiration från lektioner/uppgifter som vi
// hade med employees och departments, där vi hade en register
// konstant som vi sparade alla departments och employees i.
// import {db} from "./Backend/server.js";

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
        const users = this.db.readDatabase();
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
        const users = this.db.readDatabase();
        let foundUser = null;
        for (let user of users){
            if(user.id == id){
                foundUser = user;
                break;
            }
        }
        const favorieMoviesId = foundUser.favoriteMovies;
        let favorieMovies = [];
        for(let movieId of favorieMoviesId){
            favorieMovies.push(MOVIES.getMovieById(movieId));
        }
        return favorieMovies;
    }
    getWatchlistMoviesByUserId(id){

    }
    createUser(data){

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
        const reviews = this.db.readDatabase();
        let foundReviews = []
        for (let review of reviews){
            if(review.movieId == id){
                foundReviews.push(review);
            }
        }
        return foundReviews;
    }
    getReviewsByUserId(id){
        const reviews = this.db.readDatabase();
        let foundReviews = []
        for (let review of reviews){
            if(review.userId == id){
                foundReviews.push(review);
            }
        }
        return foundReviews;
    }
}


export const USERS = new USERS_CLASS();
export const REVIEWS = new REVIEW_CLASS();


// export const db = {
//     users: [],
//     reviews: [],
//     initUsers(){
//         const data = JSON.parse(Deno.readTextFileSync("../../database/users.json"));
//         for (let oneUser of data) {
//             const userInstance = new User(oneUser);
//             db.users.push(userInstance);
//         }
//     },
//     initReviews(){
//         const data = JSON.parse(Deno.readTextFileSync("../../database/reviews.json"));
//         for (let oneReview of data) {
//             const reviewInstance = new Review(oneReview);
//             db.reviews.push(reviewInstance);
//         }
//     }
// }

// db.initUsers();
// db.initReviews();

