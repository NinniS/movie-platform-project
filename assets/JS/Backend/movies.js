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
            const queryLower = searchQuery.toLowerCase(); 
            const titleLower = movie.title.toLowerCase();
            const genresLower = movie.genre.join(" ").toLowerCase(); 
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
        let stringId = parseInt(id);

        for (let movie of movies) {
            if (movie.id === stringId) {
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
            for (let genre of movie.genre) { 
                if (!genres.includes(genre)) {
                    genres.push(genre);
                }
            }
        }
        return genres;
    }

    filterMovies(selectedGenre, minYear, maxYear, minDuration, maxDuration) {
        const movies = this.db.readDatabase();
        let filteredMovies = [];
        let numberMinYear = parseInt(minYear);
        let numberMaxYear = parseInt(maxYear);
        let numberMinDuration = parseInt(minDuration);
        let numberMaxDuration = parseInt(maxDuration);

        for (let movie of movies) {
            if (selectedGenre && !movie.genre.includes(selectedGenre)) {
                continue;
            }
            if (numberMinYear && movie.year < numberMinYear) {
                continue;
            }
            if (numberMaxYear && movie.year > numberMaxYear) {
                continue;
            }
            if (numberMinDuration && movie.duration < numberMinDuration) {
                continue;
            }
            if (numberMaxDuration && movie.duration > numberMaxDuration) {
                continue;
            }
            filteredMovies.push(movie);
        }
        return filteredMovies;
    }
}

export const MOVIES = new MOVIES_CLASS();