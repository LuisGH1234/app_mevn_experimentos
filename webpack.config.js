const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
    mode: 'development',
    //indico que archivo va a traducir
    entry: {
        index: './src/app/index.js'
    },
    //indica la salida del archivo traducido
    output: {
        path: `${__dirname}/src/public/js`,
        filename:'[name].bundle.js'
    },
    //indicarle los archivos a traducir del front y back end
    module: {
        //reglas de webpack
        rules: [
            {
                // tiene que leer todos los archivos que terminen con la extencion .js
                test: /\.js$/,
                //no queremos a traducir los .js de las dependecias
                exclude: /node_modules/,
                //los va atraducir a travez de un loader: encargado de traducir js moderno a js que cualquier navegador puede entender
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                //testea todos los archivos que terminen con .vue
                test: /\.vue$/,
                //lo lea a travez de un loader - pero requiere de un plugin ya instalado con vue-loader
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};