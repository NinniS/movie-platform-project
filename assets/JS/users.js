export class User{
    static getAllUsers(){

    }
    
    constructor(data) {
        this.id = data.id;
        this.userName = data.userName;
        this.profilePicture = data.profilePicture;
        this.cookie = data.cookie;
        this.password = data.password;
  }
}

export class Review{
    constructor(data) {
        this.id = data.id;
        this.movieId = data.movieId;
        this.score = data.score;
        this.reviewText = data.reviewText;
    }
    
    static getAllReviewsByMovieId(id){

    }
}

const db = {
    users: [],
    reviews: [],
    initUsers(){
        const data = JSON.parse(Deno.readTextFileSync("./database/users.json"));
        const users = [];
        for (let oneUser of data) {
            const userInstance = new User(oneUser);
            users.push(userInstance);
        }
        return users;
    }
}