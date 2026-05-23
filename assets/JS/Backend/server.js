import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { MOVIES } from "./movies.js";
import { USERS, REVIEWS } from "./users.js";

const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

const COOKIES = [];

function makeResponse(type) {
    if (type == "authorization") {
        return new Response(
            JSON.stringify({ error: "Not Authorized" }),
            {
                status: 401,
                headers: HEADERS
            }
        );
    } else if (type == "not found") {
        return new Response(
            JSON.stringify({ error: "Not Found" }),
            {
                status: 404,
                headers: HEADERS
            }
        );
    } else if (type == "bad request") {
        return new Response(
            JSON.stringify({ error: "Bad Request" }),
            {
                status: 400,
                headers: HEADERS
            }
        );
    } else if (type == "no content") {
        return new Response(null, {
            status: 204,
        });
    } else if (type == "created") {
        return new Response(null, {
            status: 201,
        });
    }
}

function contentTypeCheck(ContentType) {
    if (!ContentType || !ContentType.includes("application/json")) {
        return new Response(JSON.stringify({ error: "Not acceptable" }), {
            status: 406,
            headers: HEADERS
        });
    }
}

async function handler(request) {
    const url = new URL(request.url);
    const CONTENT_TYPE_HEADER = request.headers.get("Content-Type");
    const AVERAGE_MOVIE_SCORE_PATTERN = new URLPattern({ pathname: "/movies/reviews/score/:id" });
    const REVIEW_BY_ID_PATTERN = new URLPattern({ pathname: "/movies/reviews/:id" });
    const REVIEW_BY_MOVIE_ID_PATTERN = new URLPattern({ pathname: "/movie/:id/reviews" });
    const MOVIE_ID_PATTERN = new URLPattern({ pathname: "/movies/:id" });
    const REVIEW_BY_USER_ID_PATTERN = new URLPattern({ pathname: "/user/reviews/:id" });
    const WATCHLIST_BY_USER_ID_PATTERN = new URLPattern({ pathname: "/user/watchlist/:id" });
    const MOVIE_ID_PAGE_PATTERN = new URLPattern({ pathname: "/movie=:id" });
    const USER_BY_ID_PATTERN = new URLPattern({ pathname: "/user/:id"});

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: HEADERS
        });
    }

    if (url.pathname == "/homepage") {
        return serveFile(request, "../../../frontend/homepage.html");
    }

    if (url.pathname == "/login/cookie"){
        if (request.method == "GET") {
            let currentCookie = request.headers.get("cookie");
            if(currentCookie == undefined){
                return new Response(JSON.stringify({found: false}), {headers: HEADERS});
            }
            let found = false;
            for(let i = 0; i< COOKIES.length; i++){
                if(COOKIES[i].cookie == currentCookie){
                    found = true;
                }
            }
            return new Response(JSON.stringify({found: found}), {headers: HEADERS});
        }
    }

    if (url.pathname == "/login") {
        if (request.method == "GET") {
            return serveFile(request, "../../../frontend/log-in.html");
        }
        if (request.method == "POST") {
            let loginUser = await request.json();
            let allUsers = USERS.getAllUsers();

            for (let oneUser of allUsers) {
                if (oneUser.username == loginUser.username && oneUser.password == loginUser.password) {
                    let sessionId = crypto.randomUUID();
                    HEADERS["Set-Cookie"] = `session_id=${sessionId}; Max-Age=86400; Path=/`;

                    let newCookie = { "cookie": `session_id=${sessionId}`, "userId": oneUser.id };
                    COOKIES.push(newCookie);
                    // console.log("my new cookie", newCookie, "hela COOKIES", cookies);
                    // return Response.redirect("http://localhost:8000/homepage", 302);
                    return new Response(JSON.stringify({ success: true }), { headers: HEADERS });
                    // return serveFile(request, "../../../frontend/homepage.html");
                }
            }
            return makeResponse("authorization");
        }
        //fetch("/login", {method:"POST", body: `{"username":"fat yoshi","password": "babyFat123!"}`, headers:{"Content-Type":"application/json"}})
        //fetch("/logout", {method:"POST", headers:{"Content-Type":"application/json"}})
    }

    if (url.pathname == "/signup") {
        if (request.method == "POST") {
            let signupUser = await request.json();
            let newUser = { "username": signupUser.username, "password": signupUser.password };
            let userId = USERS.createUser(newUser);


            let sessionId = crypto.randomUUID();
            HEADERS["Set-Cookie"] = `session_id=${sessionId}; Max-Age=86400; Path=/`;

            let newCookie = { "cookie": `session_id=${sessionId}`, "userId": userId };
            COOKIES.push(newCookie);
            return new Response(JSON.stringify({ success: true }), { headers: HEADERS });
            // return new Response(JSON.stringify({"welcome": "Welcome!"}), {headers: HEADERS});
        }
    }

    if (url.pathname == "/logout") {
        if (request.method == "POST") {
            let currentCookie = request.headers.get("cookie");
            for (let i = 0; i < COOKIES.length; i++) {
                if (COOKIES[i].cookie == currentCookie) {
                    COOKIES.splice(i, 1);
                }
            }
            HEADERS["Set-Cookie"] = `session_id=deleted; Max-Age=0`;
            return new Response(JSON.stringify({ "goodbye": "Goodbye!" }), { headers: HEADERS });
        }
    }

    if (url.pathname == "/movies") {
        if (request.method == "GET") {
            let selectedGenre = url.searchParams.get("genre");
            let minYear = url.searchParams.get("minYear");
            let maxYear = url.searchParams.get("maxYear");
            let minDuration = url.searchParams.get("minDuration");
            let maxDuration = url.searchParams.get("maxDuration");

            if (!selectedGenre && !minYear && !maxYear && !minDuration && !maxDuration) {
                let allMovies = MOVIES.getAllMovies();
                return new Response(JSON.stringify(allMovies), { headers: HEADERS });
            }

            let filteredMovies = MOVIES.filterMovies(selectedGenre, minYear, maxYear, minDuration, maxDuration);
            return new Response(JSON.stringify(filteredMovies), { headers: HEADERS });
        }

    }

    if (url.pathname == "/movies/genres") {
        if (request.method == "GET") {
            let allGenres = MOVIES.getGenres();
            return new Response(JSON.stringify(allGenres), { headers: HEADERS });
        }

    }

    if (url.pathname == "/movies/search") {
        let searchQuery = url.searchParams.get("q");
        let foundMovies = MOVIES.searchMovies(searchQuery);

        if (!searchQuery) {
            return makeResponse("not found");
        }
        return new Response(JSON.stringify(foundMovies), { headers: HEADERS });
    }

    if (REVIEW_BY_MOVIE_ID_PATTERN.test(url)) {
        let match = REVIEW_BY_MOVIE_ID_PATTERN.exec(url);
        let id = match.pathname.groups.id;

        if (request.method == "GET") {
            let reviewByMovieId = REVIEWS.getAllReviewsByMovieId(id);

            if (reviewByMovieId.length == 0) {
                return makeResponse("not found");
            }
            return new Response(JSON.stringify(reviewByMovieId), { headers: HEADERS });
        }
    }

    if (AVERAGE_MOVIE_SCORE_PATTERN.test(url)) {
        let match = AVERAGE_MOVIE_SCORE_PATTERN.exec(url);
        let id = match.pathname.groups.id;

        if (request.method == "GET") {
            let averageScore = REVIEWS.getAverageScoreByMovieId(id);

            if (!averageScore) {
                return makeResponse("not found");
            }
            return new Response(JSON.stringify(averageScore), { headers: HEADERS });
        }
    }

    if (MOVIE_ID_PATTERN.test(url)) {
        let match = MOVIE_ID_PATTERN.exec(url);
        let id = match.pathname.groups.id;

        if (request.method == "GET") {
            let movieById = MOVIES.getMovieById(id);

            if (!movieById) {
                return makeResponse("not found");
            }
            return new Response(JSON.stringify(movieById), { headers: HEADERS });
        }

        if (request.method == "POST") {
            let CT = contentTypeCheck(CONTENT_TYPE_HEADER);
            if (CT) { return CT };
            let foundUserId;

            let currentCookie = request.headers.get("cookie");

            if (!currentCookie) {
                return makeResponse("authorization");
            }

            for (let i = 0; i < COOKIES.length; i++) {
                if (COOKIES[i].cookie == currentCookie) {
                    foundUserId = COOKIES[i].userId;
                    break;
                }
            }
            if (!foundUserId) {
                return makeResponse("authorization");
            }

            try {
                let body = await request.json();

                body.userId = foundUserId;
                body.movieId = parseInt(id);

                let newReview = REVIEWS.createReview(body);

                if (!newReview) {
                    console.log("new review skapades ej")
                    return makeResponse("bad request");
                }
                return makeResponse("created");
            } catch (error) {
                console.log(error.message);
                return makeResponse("bad request");
            }
        }
    }

    if (REVIEW_BY_USER_ID_PATTERN.test(url)) {
        let match = REVIEW_BY_USER_ID_PATTERN.exec(url);
        let id = match.pathname.groups.id;

        if (request.method == "GET") {
            let reviewsByUserId = REVIEWS.getReviewsByUserId(id);

            if (reviewsByUserId.length == 0) {
                return makeResponse("not found");
            }
            return new Response(JSON.stringify(reviewsByUserId), { headers: HEADERS });
        }
    }

    if (REVIEW_BY_ID_PATTERN.test(url)) {
        let match = REVIEW_BY_ID_PATTERN.exec(url);
        let id = match.pathname.groups.id;

        if (request.method == "GET") {
            let reviewById = REVIEWS.getReviewById(id);

            if (!reviewById) {
                return makeResponse("not found");
            }
            return new Response(JSON.stringify(reviewById), { headers: HEADERS });
        }

        if (request.method == "PATCH") {
            let CT = contentTypeCheck(CONTENT_TYPE_HEADER);
            if (CT) { return CT };

            try {
                let body = await request.json();

                let editedReview = REVIEWS.editReview(body, id);

                if (!editedReview) {
                    return makeResponse("bad request");
                }
                return makeResponse("no content");
            } catch (error) {
                return makeResponse("bad request");
            }
        }

        if (request.method == "DELETE") {
            let deleteReview = REVIEWS.deleteReview(id);

            if (!deleteReview) {
                return makeResponse("bad request");
            }
            return makeResponse("no content");
        }
    }

    if (WATCHLIST_BY_USER_ID_PATTERN.test(url)) {
        let match = WATCHLIST_BY_ID_PATTERN.exec(url);
        let id = match.pathname.groups.id;

        if (request.method == "GET") {
            let watchlistById = USERS.getWatchlistMoviesByUserId(id);

            if (!watchlistById) {
                return makeResponse("not found");
            }
            return new Response(JSON.stringify(watchlistById), { headers: HEADERS });
        }
    }

    if (USER_BY_ID_PATTERN.test(url)) {
        let match = USER_BY_ID_PATTERN.exec(url);
        let id = match.pathname.groups.id;

        if (request.method == "GET") {
            let user = USERS.getUserById(id);
            if (user == null) {
                return makeResponse("not found");
            }
            return new Response(JSON.stringify(user), { headers: HEADERS });
        }
    }

    if (MOVIE_ID_PAGE_PATTERN.test(url)) {
        return serveFile(request, "../../../frontend/movie-page.html");
    }
    return serveDir(request, { fsRoot: "../../../" });

}

Deno.serve(handler);