import { MOVIES } from "./movies.js";

function makeResponse(type) {
    if (type == "authorization") {
        return new Response(
            JSON.stringify({ error: "Not Authorized" }),
            {
                status: 401,
                headers: { "Content-Type": "application/json" }
            }
        );
    } else if (type == "accept") {
        return new Response(
            JSON.stringify({ error: "Not Accepted Header" }),
            {
                status: 406,
                headers: { "Content-Type": "application/json" }
            }
        );
    } else if (type == "not found") {
        return new Response(
            JSON.stringify({ error: "Not Found" }),
            {
                status: 404,
                headers: { "Content-Type": "application/json" }
            }
        );
    } else if (type == "bad request") {
        return new Response(
            JSON.stringify({ error: "Bad Request" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" }
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
        if (ACCEPT_HEADER != "application/json") {
            return makeResponse("accept");
        }
    }

    if (URL.pathname == "/movies/genres") {
        //kod om att ta ut alla genres
        if (ACCEPT_HEADER != "application/json") {
            return makeResponse("accept");
        }
    }

    if (url.pathname == "/movies/search") {
        let searchQuery = url.searchParams.get("q");
        //Vill vi ha liknade koller efter felkoder som i U?
        if (ACCEPT_HEADER != "application/json") {
            return makeResponse("accept");
        }
        if (!searchQuery) {
            return makeResponse("not found");
        }

    }

}
