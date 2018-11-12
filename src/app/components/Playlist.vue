<template>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="sendPlaylist">
                            <div class="form-group">
                                <input v-model="playlist.name" type="text" placeholder="Inserta el nombre" class="form-control">
                            </div>
                            <div class="form-group">
                                <textarea v-model="playlist.description" cols="30" rows="10" class="form-control" placeholder="Inserta una descripcion"></textarea>
                            </div>
                            <template v-if="edit == false">
                                <button class="btn btn-primary btn-block">Send</button>
                            </template>
                            <template v-else>
                                <button class="btn btn-primary btn-block">Update</button>
                            </template>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Playlist</th>
                            <th>Descripcion</th>
                            <th>Favorito</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(playlist, index) of playlists" :key="`playlist-${index}`">
                            <td>{{ index }}</td>
                            <td>{{ playlist.name }}</td>
                            <td>{{ playlist.description }}</td>
                            <td>
                                <img src="images/favorite.png" alt="¿Favorite?" style="margin-left: 22pt" v-if="playlist.favorite" @click="setFavorite(1, index)">
                                <img src="images/nofavorite.png" alt="¿Favorite?" style="margin-left: 22pt" v-else @click.stop.prevent="setFavorite(0, index)">
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="deletePlaylist(playlist._id)" :id="`playlist-${index}`">Delete</button>
                                <button class="btn btn-secondary" @click="editPlaylist(playlist._id)">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
class Playlist {
    constructor(name, description){
        this.name = name || '';
        this.description = description || '';
    }
}

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
        },
        setFavorite(num, index) {
            console.log(this.playlists[index]);
            if (num == 1) {
                this.playlists[index].favorite = false;
                return;
            }
            this.playlists[index].favorite = true;
        }
    }
}
</script>