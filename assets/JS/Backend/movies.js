import { DB_CLASS } from "./db.js";

class MOVIES_CLASS {
    constructor() {
        this.db = new DB_CLASS("../../../assets/database/movies.json");
    }

    getAllMovies() {
        const movies = this.db.readDatabase();
        return movies;
    }

    searchMovies(searchQuery) {
        const movies = this.db.readDatabase();
        let foundMovies = [];

        for (let movie of movies) {
            const queryLower = searchQuery.toLowerCase(); //gör om så man kan söka på shrek och få fram Shrek (stora bokstäver)
            const titleLower = movie.title.toLowerCase();
            const genresLower = movie.genre.join(" ").toLowerCase(); //join för att slå ihop array till en sträng
            const descLower = movie.description.toLowerCase();

            if (titleLower.includes(queryLower) || genresLower.includes(queryLower) || descLower.includes(queryLower)) {
                foundMovies.push(movie);
            }
        }
        return foundMovies;
    }

    getMovieById(id) {
        const movies = this.db.readDatabase();
        let movieById;

        for (let movie of movies) {
            if (movie.id === id) {
                movieById = movie;
                return movieById;
            }
        }
        return null;
    }

    getGenres() {
        const movies = this.db.readDatabase();
        let genres = [];

        for (let movie of movies) {
            for (let genre of movie.genre) { //loopar igenom genre-array för varje film(movie)
                if (!genres.includes(genre)) {
                    genres.push(genre);
                }
            }
        }
        return genres;
    }

    getMovieByGenre(){
        
    }

    filterMovies(selectedGenre, minYear, maxYear, minDuration, maxDuration) {
        const movies = this.db.readDatabase();
        let filteredMovies = [];
        //kollar om filmen är inom filtreringen, om inte så continue; annars push

        for (let movie of movies) {
            if (selectedGenre && !movie.genre.includes(selectedGenre)) {
                continue;
            }
            if (minYear && movie.year < minYear) {
                continue;
            }
            if (maxYear && movie.year > maxYear) {
                continue;
            }
            if(minDuration && movie.duration < minDuration){
                continue;
            }
            if(maxDuration && movie.duration > maxDuration){
                continue;
            }
            filteredMovies.push(movie);
        }
        return filteredMovies;
    }
}

export const MOVIES = new MOVIES_CLASS();
