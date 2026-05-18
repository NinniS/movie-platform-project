// Jag tog inspiration från lektioner/uppgifter som vi
// hade med employees och departments, där vi hade en register
// konstant som vi sparade alla departments och employees i.
// import {db} from "./Backend/server.js";

export class User{
    constructor(data){
        this.id = data.id;
        this.userName = data.userName;
        this.reviews = data.reviews;
        this.profilePicture = data.profilePicture;
        this.favoriteMovies = data.favoriteMovies;
        this.cookie = data.cookie;
        this.password = data.password;
    }
    static getAllUsers(){
        return db.users;
    }
    static getUserById(id){
        for (let user of db.users){
            if(user.id == id){
                return user;
            }
        }
        return null;
    }
    getFavoriteMovies(){

    }

}

export class Review{
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.movieId = data.movieId;
        this.score = data.score;
        this.reviewText = data.reviewText;
    }
    static getAllReviews(){
        return db.reviews;
    }
    
    static getAllReviewsByMovieId(id){
        let foundReviews = []
        for (let review of db.reviews){
            if(review.movieId == id){
                foundReviews.push(review);
            }
        }
        return foundReviews;
    }
}


export const db = {
    users: [],
    reviews: [],
    initUsers(){
        const data = JSON.parse(Deno.readTextFileSync("../../database/users.json"));
        for (let oneUser of data) {
            const userInstance = new User(oneUser);
            db.users.push(userInstance);
        }
    },
    initReviews(){
        const data = JSON.parse(Deno.readTextFileSync("../../database/reviews.json"));
        for (let oneReview of data) {
            const reviewInstance = new Review(oneReview);
            db.reviews.push(reviewInstance);
        }
    }
}

db.initUsers();
db.initReviews();

