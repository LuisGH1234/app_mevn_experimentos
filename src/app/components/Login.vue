<template>
    <div>
        <div class="container">
            <div class="row pt-5">
                <img src="images/movie-night.png">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <!-- .prevent evita que la pagina se recargue y permita actualizar cierta parte de la vista de acuerdo a lo que se utilice en el metodo utilizado -->
                            <form>
                                <div class="form-group">
                                    <input v-model="user.email" type="text" placeholder="Email" class="form-control">
                                </div>
                                <div class="form-group">
                                    <input v-model="user.password" type="text" placeholder="Constraseña" class="form-control">
                                </div>
                                <button class="btn btn-primary btn-block" @click.stop.prevent="sigin">Iniciar Sesion</button>
                            </form>
                            <template v-if="incorrectLogin == true">
                                <h1>Usario o Contraseña Incorrecta</h1>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script src="./js/login.js"></script>
