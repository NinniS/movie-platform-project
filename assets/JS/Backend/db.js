export class DB_CLASS {
    constructor(url){
        this.dbUrl = new URL(url, import.meta.url);
    }
    
    readDatabase() {
        try {
            const json = Deno.readTextFileSync(this.dbUrl);
            return JSON.parse(json);
        } catch (error) {
            console.error("Could not read database:", error);
            return [];
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