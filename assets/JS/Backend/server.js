class BACKEND_SERVER {
    async handler(request) {
        //mste man ha en construktor? I tidigare uppgifter använde jag this för att definera olika url, nu la jag allt inut handler funktionen
        const URL = new URL(request.url);
        const HEADERS = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept"
        }
        const ACCEPT_HEADER = request.headers.get("accept");
        const CONTENT_TYPE_HEADER = request.headers.get("Content-Type");
        const MOVIE_ID = new URLPattern({ pathname: "/movies/:id" });


        if(URL == "/movies"){
            //om url är movies, ska vi ha detta som bas url? Här får man alla filmer
        }
    }
}

const BACKEND = new BACKEND_SERVER();