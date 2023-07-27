const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const db = require('../database/database');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.productosPath = '/api/productos';
        this.ordenesTrabajoPath = '/api/ots';
        this.cargosPath = '/api/cargos';
        this.estadosUsuarioOtPath = '/api/estados_usuario_ot'
        this.auth= '/api/auth'
        // this.login = '/api/auth';
        //se va a intentar conectar a la BD
        this.conectarDB();

        //hay que configurar un middleware para cuando la informacion viene hacia el backend viene en formato json
        //Middlewares!
        this.middlewares();
        //rutas de mi aplicación!
        this.routes();
    }
    async conectarDB(){
        try{
            await db.authenticate();
            await db.sync();
            console.log('db autenticada!');
        }catch(error){
            throw new Error(error);
        }
    }
    middlewares(){
        //CORS quien entra?
        this.app.use(cors());
        
        // Parseo y lectura del body; cualquier informacion que venga la va a intentar serializar a un formato json
        this.app.use( express.json() );

        this.app.use(bodyParser.json());

        //DIRECTORIO PUBLICO
        this.app.use( express.static('public') );
        
    }


    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
        this.app.use(this.productosPath,require('../routes/productos'));
        this.app.use(this.ordenesTrabajoPath,require('../routes/ordenTrabajo'));
        this.app.use(this.cargosPath,require('../routes/cargos'));
        this.app.use(this.estadosUsuarioOtPath,require('../routes/estadosUsuarioOt'));
        this.app.use(this.auth,require('../routes/auth'));
        // this.app.use(this.login, require('./routes/auth'));
        //si se necesitan mas rutas se dejan aca en el modulo de routes y se accede a la api desde el controlador
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("SERVIDOR CORRIENDO EN EL PUERTO",this.port)
        })
    }

}

module.exports = Server