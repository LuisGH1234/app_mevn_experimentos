<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>
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
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(playlist, index) of playlists" :key="`playlist-${index}`">
                                <td>{{ playlist.name }}</td>
                                <td>{{ playlist.description }}</td>
                                <td>
                                    <button class="btn btn-danger" @click="deletePlaylist(playlist._id)">Delete</button>
                                    <button class="btn btn-secondary" @click="editPlaylist(playlist._id)">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./js/app.js"></script>