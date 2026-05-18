import { serveDir, serveFile } from "jsr:@std/http/file-server";
import { MOVIES } from "./movies.js";
import { USERS } from "./users.js";
import { REVIEWS } from "./users.js";

async function handler(request) {
    const url = new URL(request.url);
    const HEADERS = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept"
    }
    const ACCEPT_HEADER = request.headers.get("accept");
    const CONTENT_TYPE_HEADER = request.headers.get("Content-Type");
    const MOVIE_ID_PATTERN = new URLPattern({ pathname: "/movies/:id" });

    function makeResponse(type) {
        if (type == "authorization") {
            return new Response(
                JSON.stringify({ error: "Not Authorized" }),
                {
                    status: 401,
                    headers: HEADERS
                }
            );
        } else if (type == "accept") {
            return new Response(
                JSON.stringify({ error: "Not Accepted Header" }),
                {
                    status: 406,
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


    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: HEADERS
        });
    }


    if (url.pathname == "/movies") {
        // if (ACCEPT_HEADER != "application/json") {
        //     return makeResponse("accept");
        // } 

        if (request.method == "GET") {
            let allMovies = MOVIES.getAllMovies();
            return new Response(JSON.stringify(allMovies), { headers: HEADERS });
        }

    }

    if (url.pathname == "/movies/genres") {
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

Deno.serve(handler);