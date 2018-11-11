const Playlist = require('../../models/Playlist');
export default {
    //data es la manera de definir que datos usara mi app
    data() {
        return {
            playlist: new Playlist(),
            playlists: [],
            edit: false,
            playlistToEdit: ''
        }
    },
    created() {
        //este metodo se ejecuta al cargar la pagina
        this.getPlaylists()
    },
    methods: {
        sendPlaylist() {
            //metodo fetch hace requests HTTP - propio de js lo usa el navegador
            if (this.edit === false) { //no esta editando
                fetch('/api/playlists', {
                    method: 'POST',
                    body: JSON.stringify(this.playlist),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json()) //convierto la respuesta a un JSON
                .then(data => this.getPlaylists()) //como los datos cambiaron, entonces los vuelvo a obtener
                .catch(err => console.log(err));
            } else {
                fetch(`/api/playlists/${this.playlistToEdit}`, {
                    method: 'PUT',
                    body: JSON.stringify(this.playlist),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.edit = false;
                    this.playlistToEdit = '';
                    this.getPlaylists();
                })
            }
            
            this.playlist = new Playlist();
        },
        getPlaylists() {
            fetch('/api/playlists')
            .then(res => res.json())
            .then(data => {
                this.playlists = data;
                console.log(this.playlists);
            })
            .catch(err => console.log(err));
        },
        deletePlaylist(id) {
            fetch(`/api/playlists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getPlaylists();
                console.log(data);
            })
            .catch(err => console.log(err));
        },
        editPlaylist(id) {
            fetch(`/api/playlists/${id}`)
            .then(res => res.json()) //llega en formato string y lo convierte JSON
            .then(data => { //data ya es el JSON que se convirtio anteriormente
                this.playlist = new Playlist(data.name, data.description);
                this.playlistToEdit = data._id;
                console.log(this.playlistToEdit);
                this.edit = true;
            });
        }
    }
}