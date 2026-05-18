// import { MOVIES } from "./movies.js";
import { Review, User} from "../users.js";

async function handler(request) {
    const URL = new URL(request.url);
    const HEADERS = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept"
    }
    const ACCEPT_HEADER = request.headers.get("accept");
    const CONTENT_TYPE_HEADER = request.headers.get("Content-Type");
    const MOVIE_ID_PATTERN = new URLPattern({ pathname: "/movies/:id" });

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: HEADERS
        });
    }


    if (URL.pathname == "/movies") {
        //om url är movies, ska vi ha detta som bas url? Här får man alla filmer
    }

    if (URL.pathname == "/movies/genres") {
        //kod om att ta ut alla genres
    }

    if (url.pathname == "/movies/search") {
        let searchQuery = url.searchParams.get("q");
        //Vill vi ha liknade koller efter felkoder som i U?
        if (!searchQuery) {
            return new Response({ error: "Bad Request" }, {
                status: 400,
                headers: HEADERS
            });
        }

    }

}


// console.log(db.users);
// console.log(db.reviews);

// console.log(User.getAllUsers());
// console.log(Review.getAllReviews());

console.log(Review.getAllReviewsByMovieId(6));

Deno.serve(handler);