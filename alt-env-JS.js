
            //
            //Chris  Kayode Samuel
            //ksamuel.chris@me.com
            //
            //github: github.com/alayode



            //6. Can JavaScript run in any other environment other than browser?

                    /*
                    * JS was created for communicating with servers in the browser.
                    * This means that there was not much thought on where javascript could be used until recently.
                    *
                    * NodeJS is a good exzample of running JavaScript on the Server Side.
                    *
                    *   With Node the user uses JS to work with Node's V8 engine built by google written in C .
                    *
                    * */




                                // Examples of JS Code writtern for server-side development


            var express = require('express')
                , app = express() // Web framework to handle routing requests
                , cons = require('consolidate') // Templating library adapter for Express
                , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
                , routes = require('./routes'); // Routes for our application

            MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
                "use strict";
                if(err) throw err;

                // Register our templating engine
                app.engine('html', cons.swig);
                app.set('view engine', 'html');
                app.set('views', __dirname + '/views');

                // Express middleware to populate 'req.cookies' so we can access cookies
                app.use(express.cookieParser());

                // Express middleware to populate 'req.body' so we can access POST variables
                app.use(express.bodyParser());

                // Application routes
                routes(app, db);

                //using MongoDB and Express I am able to execute a server connecting to port 8082!!!
                app.listen(8082);
                console.log('Express server listening on port 8082');
            });
