const router = require('express').Router();
const Playlist = require('../models/Playlist');

router.get('/playlists', async (req, res) => {
    //find: es un find all, metodo asincrono
    //auqnue la funcion find tome tiempo lo que se va a ser es esperar a que termine
    //notese que al ser este metodo un callback (asicrono) se comporta de forma sincrona en ciertas partes | hybridismo de javascript
    const playlists = await Playlist.find();
    console.log(playlists);
    res.json(playlists);
});

router.get('/playlists/:id', async (req, res) => {
    const playlist = await Playlist.findById(req.params.id);
    res.json(playlist);
});

router.post('/playlists', async (req, res) => {
    const playlist = new Playlist(req.body);
    console.log(playlist);
    await playlist.save();
    res.json({ status:'Saved' });
});

router.put('/playlists/:id', async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    await Playlist.findByIdAndUpdate(req.params.id, req.body);
    res.json({ statuc: 'Updated' });
});

router.delete('/playlists/:id', async (req, res) => {
    console.log(req.params);
    await Playlist.findOneAndDelete(req.params.id);
    res.json({ status: 'Deleted' });
});

module.exports = router;
