import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./reviewsDAO.js";
import dotenv from "dotenv";
dotenv.config();

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.DB_USERNAME;
const mongo_password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.yindok8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port = 8000;

MongoClient.connect(uri, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });

//   import app from "./server.js";
//   import ReviewsDAO from "./dao/reviewsDAO.js";

//   const port = 8000;

//   async function main() {
//       try {
//           // Get the active MongoDB connection from the extension
//           const connection = await global.db;
//           // Get the database from the connection
//           const db = connection.db("your-database-name");
//           // Inject the database into the DAO
//           await ReviewsDAO.injectDB(db);
//           // Start the server
//           app.listen(port, () => {
//               console.log(`listening on port ${port}`);
//           });
//       } catch (err) {
//           console.error(err.stack);
//           process.exit(1);
//       }
//   }

//   main();

// import app from "./server.js";
// import { MongoClient } from "mongodb";
// import ReviewsDAO from "./dao/reviewsDAO.js";

// const port = 8000;

// async function main() {
//   try {
//     // Get the active MongoDB connection from the extension
//     const connection = await MongoClient.connect("mongodb://localhost:27017");

//     // Get the database and client from the connection
//     const db = connection.db("your-database-name");
//     const client = connection.client;

//     // Inject the database into the DAO
//     await ReviewsDAO.injectDB(db);

//     // Start the server
//     app.listen(port, () => {
//       console.log(`listening on port ${port}`);
//     });
//   } catch (err) {
//     console.error(err.stack);
//     process.exit(1);
//   }
// }

// main();
