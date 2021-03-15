var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

//mongoose.connect(process.env.DB, { useNewUrlParser: true });
try {
    mongoose.connect( process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected"));
}catch (error) {
    console.log("could not connect");
}
mongoose.set('useCreateIndex', true);

//Movie schema
var MovieSchema = new Schema({
    title: {type: String, Required: true},
    year: {type: String, Required: true},
    genre: {type: String, Required: true},
    actor: {type: String, Required: true}

});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;

