const cors = require('cors-express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5420;
const options = {
  allow: {
    origin: '*',
    methods: 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS',
    headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
  }
}
//require db connection
require('./models');

// import save db
const Save = require('./save');


app.use(cors(options));
// configure app to use bady parser to extract JSON from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Make static assets available to UI
app.use(express.static('./client/build'));
// app.use(express.static('./client/build'));

const router = express.Router();
// Serve the UI over express server
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './client/public/index.html'))
});

//Initialize API
router.get('/api', function (req, res) {
  res.send('API initialized');
})

//Register API routes
app.use('/api', router);

// Route for all records in collection
router.route('/saved')

  // Add a favortie entry to the database
  .post(function (req, res) {
    // Create an entry
    const save = new Save();
    save.title = req.body.title,
      save.authors = req.body.authors,
      save.rating = req.body.rating,
      save.publisher = req.body.publisher,
      save.publishedDate = req.body.publishedDate,
      description = req.body.description,
      save.thumbnail = req.body.thumbnail,
      save.price = req.body.price,
      save.purchase = req.body.purchase;

    // Save the entry and check for errors
    save.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: 'Save added',
          save: save
        });
      }
    })
  })

  // Retrieve all saves from the database
  .get(function (req, res) {
    Save.find(function (err, saved) {
      if (err) {
        res.send(err);
      } else {
        res.json(saved);
      }
    });
  })

// Route for specific records
router.route('/saved/:id')

  // Remove a record permanently
  .delete(function (req, res) {
    Save.remove({ _id: req.params.id }, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Record Removed");
      }
    })
    res.status(204).end();
  })

// Start the API server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});