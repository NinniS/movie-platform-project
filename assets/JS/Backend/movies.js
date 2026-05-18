class MOVIES_CLASS {
    constructor() {
        this.db = new DB_CLASS();
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

    filterMovies(genre, minYear, maxYear) {
        const movies = this.db.readDatabase();
        let filteredMovies = [];

        for (let movie of movies) {

            if (selectedGenre && moive.genre.includes(selectedGenre)) {
                continue;
            }
            if (minYear && movie.year < minYear) {
                continue;
            }
            if (maxYear && movie.year > maxYear) {
                continue;
            }
            filteredMovies.push(movie);
        }
        return filteredMovies;
    }
}

export const MOVIES = new MOVIES_CLASS();