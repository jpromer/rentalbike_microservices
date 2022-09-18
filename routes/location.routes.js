const location = require("../src/controller/location.controller");

module.exports = function(app) {

    var router = require("express").Router();

    //Agregar bicicletas 
    router.post("/", location.create);

    //Buscar bicicletas
    router.get("/", location.findAll);

     //Buscar bicicleta especifica
    router.get("/:idBike", location.findOne);


    //Actualizar estudiante
    router.put("/:idBike", location.update)


    //Eliminar 1 estudiantes por numero de documeto
    router.delete("/:idBike", location.deleteOne);

    //Ruta predeterminada
    app.use('/api/location', router);

}

