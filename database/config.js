const Sequelize = require('sequelize');
   
const dbConnection = async() => {
    try {

        const sequelize = new Sequelize(
            'hello_world_db',
            'DATABASE_USERNAME',
            'DATABASE_PASSWORD',
             {
               host: 'DATABASE_HOST',
               dialect: 'mysql'
             }
           );

        sequelize.authenticate().then(() => {
            console.log('base de datos Online');
         }).catch((error) => {
            console.error('No se pudo acceder a la base de datos: ', error);
         });
        
        // await mongoose.connect(process.env.MONGODB_CNN,{
        //     useNewUrlParser:true,
        //     useUnifiedTopology:true,
        // });


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}