//En egen fil med funktioner för att läsa in och läsa av databasen
export class DB_CLASS {
    constructor(){
        //skapar en url instans för sökvägen
        //import.meta.url är till så att deno hittar sökvägen oavsett ifall vi startar programmet(demo) från rotmappen 
        this.dbUrl = new URL("../../assets/database/movies.json", import.meta.url);
    }
    
    readDatabase() {
        try {
            const json = Deno.readTextFileSync(this.dbUrl);
            return JSON.parse(json);
        } catch (error) {
            console.error("Could not read database:", error);
            return { products: [], brands: [] };
        }
    }

    writeDatabase(data) {
        try {
            Deno.writeTextFileSync(this.dbUrl, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Could not save to database:", error);
        }
    }
}