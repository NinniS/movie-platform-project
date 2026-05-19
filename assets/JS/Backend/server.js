import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { MOVIES } from "./movies.js";
import { USERS } from "./users.js";
import { REVIEWS } from "./users.js";

const HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

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

async function handler(request) {
    const url = new URL(request.url);
    const ACCEPT_HEADER = request.headers.get("accept");
    const CONTENT_TYPE_HEADER = request.headers.get("Content-Type");
    const MOVIE_ID_PATTERN = new URLPattern({ pathname: "/movies/:id" });

    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: HEADERS
        });
    }

    if (url.pathname == "/homepage") {
       return serveFile(request, "../../../frontend/homepage.html");
    }

    if (url.pathname == "/movies") {
        if (request.method == "GET") {
            let allMovies = MOVIES.getAllMovies();
            return new Response(JSON.stringify(allMovies), { headers: HEADERS });
        }

    }

    if (url.pathname == "/movies/genres") {
        //kod om att ta ut alla genres
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
    }
     return serveDir(request, { fsRoot: "../../../"});

}

Deno.serve(handler);