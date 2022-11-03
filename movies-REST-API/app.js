const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/movieDB", {
  useNewUrlParser: true
});

const movieSchema = {
  title: String,
  description: String
};

const Movie = mongoose.model("Movie", movieSchema);

///////////////////////////////////Requests Targetting all Articles////////////////////////

app.route("/movies")

  .get(function(req, res) {
    Movie.find(function(err, foundMovies) {
      if (!err) {
        res.send(foundMovies);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {

    const newMovie = new Movie({
      title: req.body.title,
      description: req.body.description
    });

    newMovie.save(function(err) {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {

    Movie.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.route("/movies/:movieTitle")

  .get(function(req, res) {

    Movie.findOne({
      title: req.params.movieTitle
    }, function(err, foundMovie) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found.");
      }
    });
  })

  .put(function(req, res) {

    Movie.update({
        title: req.params.movieTitle
      }, {
        title: req.body.title,
        description: req.body.description
      }, {
        overwrite: true
      },
      function(err) {
        if (!err) {
          res.send("Successfully updated the selected article.");
        }
      }
    );
  })

  .patch(function(req, res) {

    Movie.update({
        title: req.params.movieTitle
      }, {
        $set: req.body
      },
      function(err) {
        if (!err) {
          res.send("Successfully updated article.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete(function(req, res) {

    Movie.deleteOne({
        title: req.params.movieTitle
      },
      function(err) {
        if (!err) {
          res.send("Successfully deleted the corresponding article.");
        } else {
          res.send(err);
        }
      }
    );
  });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
