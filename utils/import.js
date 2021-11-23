const mongoose = require('mongoose')
const Place = require('../features/place/models')
const algoliasearch = require('algoliasearch')

const client = algoliasearch("8EX4HV0QUR", "b2772d19465c740d90681c83988eae9b");
const index = client.initIndex("Places");

const fs = require('fs');

const walk = function (dir, done) {
    fs.readdir(dir, function (error, list) {
        if (error) {
            return done(error);
        }

        let i = 0;

        (function next() {
            let file = list[i++];

            if (!file) {
                return done(null);
            }

            file = dir + '/' + file;

            fs.stat(file, function (error, stat) {

                if (stat && stat.isDirectory()) {
                    walk(file, function (error) {
                        next();
                    });
                } else {
                    // do stuff to file here
                    let place = fs.readFileSync(file, 'utf8')

                    if (!place.includes('}\n' + '{')) {

                        Place.create([
                            JSON.parse(place)
                        ]).then(function (place) {
                            console.log("Data inserted")  // Success
                            index.saveObjects([{...place, objectID: place[0]._id}])
                                .then(() => console.log('added to algolia'))
                                .catch(error =>
                                    console.log('error', error)
                                )
                        }).catch(function (error) {
                            console.log(error)      // Failure
                        });



                    } else {
                        console.log('file', file)
                    }
                    //   console.log('place', place.includes('}\n' + '{'))
                    next();
                }
            });
        })();
    });
};


mongoose.connect('mongodb+srv://dev:rGyE5qPpXDDcNyOy@igbeta.29ybu.mongodb.net/production?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB connected'))

walk('./import', () => console.log('done'))
