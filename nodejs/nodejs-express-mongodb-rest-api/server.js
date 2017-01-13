// server.js

// BASE SETUP
// =============================================================================

// Call the packages we need
var express     = require('express');       // Call express
var app         = express();                // define app using express
var bodyParser  = require('body-parser');   // require body-parser package

// connecting to mongo db
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/animal');

// Loading Bear Schema
var Bear        = require('./app/model/bear');

// configure app to use body-parser
// this will let us get data from POST
app.use(bodyParser.urlencoded({ extended: true })); //returns middleware that parses only urlencoded bodies
app.use(bodyParser.json()); // returns middleware that only parses json

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of express Router

// all routes pass through this. write it before all routes
router.use(function(req, res, next) {
  // logging
  console.log('Something is happening');
  next();
});

// api home
router.get('/', function(req, res){
  res.json({ message : "hooray! welcome to our api!" });
});

// REST api routes for bear CRUD operation
router.route('/bears').get(function(req, res){
  Bear.find(function(err, bears){
    if(err) {
      res.send(err);
    }
    res.json(bears);
  });
}).post(function(req, res){

  // Create new instance of bear model
  var bear = new Bear();
  bear.name = req.body.name; // set bear name from post body

  // Save bear
  bear.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Bear created!' });
  });

});

router.route('/bears/:bear_id')
      .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
      })
      // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
      .put(function(req, res) {

          // use our bear model to find the bear we want
          Bear.findById(req.params.bear_id, function(err, bear) {

              if (err)
                  res.send(err);

              bear.name = req.body.name;  // update the bears info

              // save the bear
              bear.save(function(err) {
                  if (err)
                      res.send(err);

                  res.json({ message: 'Bear updated!' });
              });

          });
      })
      // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
      .delete(function(req, res) {
          Bear.remove({
              _id: req.params.bear_id
          }, function(err, bear) {
              if (err)
                  res.send(err);

              res.json({ message: 'Successfully deleted' });
          });
      });

// all routes will be prefixed with /api
app.use('/api', router);

// START SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
