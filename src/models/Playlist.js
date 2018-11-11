const mongo = require('mongoose');
const { Schema } = mongo;

const Playlist = new Schema({
    name: String,
    description: String,
    favorite: String,
    index_i: Number
});

//Defini el modelo y ahora se exporta para usarlo en otras partes de la aplicacion
module.exports = mongo.model('Playlists', Playlist);