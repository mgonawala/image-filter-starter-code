import express from 'express';
import bodyParser from 'body-parser';
import {IndexRouter} from './controllers/v0/IndexRouter';
import {sequelize} from './sequalize';
import { V0MODELS } from './controllers/v0/model.index';

(async () => {

  await sequelize.addModels(V0MODELS);
  await sequelize.sync();
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

    //CORS Should be restricted
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8100");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      next();
    });
  // Use index router
  app.use('/api/v0/', IndexRouter);
  
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /api/v0/filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();