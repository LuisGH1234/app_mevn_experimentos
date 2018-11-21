<template>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="sendPlaylist">
                            <div class="form-group">
                                <input v-model="playlist.name" id="campoNombre" type="text" placeholder="Inserta el nombre" class="form-control">
                            </div>
                            <div class="form-group">
                                <textarea v-model="playlist.description" id="campoDescripcion" cols="30" rows="10" class="form-control" placeholder="Inserta una descripcion"></textarea>
                            </div>
                            <template v-if="edit == false">
                                <button id="btnGuardar" class="btn btn-primary btn-block">Send</button>
                            </template>
                            <template v-else>
                                <button id="btnGuardar" class="btn btn-primary btn-block">Update</button>
                            </template>
                            <template>
                                <div class="alert alert-primary" role="alert" id="mensajeRequest" v-if="successSend == 1" style="margin: 12pt">
                                    Se guardo correctamente!
                                </div>
                                <div class="alert alert-warning" role="alert" id="mensajeRequest" v-if="successSend == 2" style="margin: 12pt">
                                    El nombre contiene caracteres invalidos.
                                </div>
                                <div class="alert alert-warning" role="alert" id="mensajeRequest" v-if="successDelete" style="margin: 12pt">
                                    Se eliminó de manera correcta la Playlist
                                </div>
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
                                <img src="images/favorite.png" alt="¿Favorite?" style="margin-left: 22pt" v-if="playlist.favorite == 'yes'" @click="setFavorite(1, index)" :id="`isFavorite-${index}`">
                                <img src="images/nofavorite.png" alt="¿Favorite?" style="margin-left: 22pt" v-else @click.stop.prevent="setFavorite(0, index)" :id="`isFavorite-${index}`">
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="deletePlaylist(playlist._id)" :id="`delete-${index}`">Delete</button>
                                <button class="btn btn-secondary" @click="editPlaylist(playlist._id)" :id="`edit-${index}`">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import request from '../requests.js';

class Playlist {
    constructor(name, description, favorite, index_i){
        this.name = name || '';
        this.description = description || '';
        this.favorite = favorite || 'no';
        this.index_i = index_i || 0;
    }
}

export default {
    //data es la manera de definir que datos usara mi app
    data() {
        return {
            playlist: new Playlist(),
            playlists: [],
            edit: false,
            playlistToEdit: '',
            successSend: '0', //0: inactivo, 1: exitoso, 2: error
            successDelete: false
        }
    },
    created() {
        //este metodo se ejecuta al cargar la pagina
        this.getPlaylists()
    },
    methods: {
        sendPlaylist() {
            if(this.playlist.name[0] == " "){
                this.successDelete = false;
                this.successSend = '2';
                return;
            }
            //metodo fetch hace requests HTTP - propio de js lo usa el navegador
            if (this.edit === false) { //no esta editando
            this.playlist.favorite = 'no';
                fetch('/api/playlists', {
                    method: 'POST',
                    body: JSON.stringify(this.playlist),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json()) //convierto la respuesta a un JSON
                .then(data => {
                    this.successDelete = false;
                    this.successSend = data.status == 'OK'? '1' : '2';
                    this.getPlaylists();
                }); //como los datos cambiaron, entonces los vuelvo a obtener
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
                    this.successDelete = false;
                    this.successSend = data.status == 'OK'? '1' : '2';
                    this.edit = false;
                    this.playlistToEdit = '';
                    this.getPlaylists();
                });
            }
            this.playlist = new Playlist();
        },
        getPlaylists() {
            fetch('/api/playlists')
            .then(res => res.json())
            .then(data => {
                this.playlists = data;
                //console.log(this.playlists);
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
                this.successSend = '0';
                this.successDelete = true;
                this.getPlaylists();
                //console.log(data);
            })
            .catch(err => console.log(err));
        },
        editPlaylist(id) {
            fetch(`/api/playlists/${id}`)
            .then(res => res.json()) //llega en formato string y lo convierte JSON
            .then(data => { //data ya es el JSON que se convirtio anteriormente
                this.playlist = new Playlist(data.name, data.description, data.favorite, data.index_i);
                this.playlistToEdit = data._id;
                console.log(this.playlistToEdit);
                this.edit = true;
            });
        },
        setFavorite(num, index) {
            const aux =  this.playlists[index];
            let playlist = new Playlist(aux.name, aux.description, aux.favorite == 'yes'? 'no' : 'yes', aux.index_i);
            fetch(`/api/playlists/${this.playlists[index]._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(playlist),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
            })
            .then(res => res.json())
            .then(data => this.getPlaylists());
        }
    }
}
</script>