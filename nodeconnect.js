const http = require("http");
const { MongoClient } = require('mongodb');
const cors = require("cors");


const server = http.createServer((req, res) => {
    cors()(req, res, () => {})
    if (req.url === '/') {



    }
    else if (req.url === '/api') {
        async function findsomedata(client ){
            const cursor = client.db("movieshub").collection("movies").find({});
            const results = await cursor.toArray();
            //console.log(results);
            const js= (JSON.stringify(results));
            console.log(js);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(js);
        
        };
        async function main() {

            const uri = "mongodb+srv://sudheer:Kotesh%40123@cluster0.nsky9l1.mongodb.net/?retryWrites=true&w=majority"

            const client = new MongoClient(uri);

            try {
                // Connect to the MongoDB cluster
                await client.connect();
                console.log("MongoDB connection happened here")
                await findsomedata(client);


            } catch (e) {
                console.error(e);
            } finally {
                await client.close();
                console.log("We closed the connection ")
            }
        }

        main();
        
    }
    else {
        res.end("<h1> 404 NOT FOUND</h1>");

    }
});

const PORT = process.env.PORT || 3797;
server.listen(PORT, () => console.log(`Great our server is running on port ${PORT} `));