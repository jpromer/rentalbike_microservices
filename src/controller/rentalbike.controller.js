const db = require("../models");
const Rental = db.rental;

exports.addRabbitMQMessage = (req, res) => {  
  const rental = new Rental({
    idBike: req.idBike,
    dateInitial: req.dateInitial,
    dataFinished: req.dataFinished,
  });

  rental
    .save(rental)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log("Error realizando reserva");
    });
};

exports.create = (req, res) => {
  if (!req.body.idBike) {
    res
      .status(400)
      .send({ message: "Can't add rental, idBike field is required" });
    return;
  }

  if (!req.body.dateInitial) {
    res
      .status(400)
      .send({ message: "Can't add rental, dateInitial field is required" });
    return;
  }
  if (!req.body.dataFinished) {
    res
      .status(400)
      .send({ message: "Can't add rental, dataFinished field is required" });
    return;
  }

  const rental = new Rental({
    idBike: req.body.idBike,
    dateInitial: req.body.dateInitial,
    dataFinished: req.body.dataFinished,
  });
  rental
    .save(rental)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while storing a rental",
      });
    });
};

exports.findAll = (req, res) => {
  const idBike = req.query.idBike;
  var condicion = idBike
    ? { idBike: { $regex: new RegExp(idBike), $options: "i" } }
    : {};

  Rental.find(condicion)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred when searching for rental",
      });
    });
};

exports.findOne = (req, res) => {
  const idBike = req.params.idBike;

  Rental.find({ idBike: idBike })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "There is no rental with the id" + idBike });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error bringing the rental =" + idBike,
      });
    });
};

exports.deleteOne = (req, res) => {
  const idBike = req.params.idBike;

  Rental.deleteOne({ idBike: idBike })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Failed to remove rental ${idBike}. The student may not have been found.`,
        });
      } else {
        res.send({
          message: "The rental was successfully removed",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting rental",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data could not be updated!",
    });
  }

  Rental.updateOne(
    { idBike: req.params.idBike },
    { $set: req.body },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Failed to update rental with document number =${idBike}. Please check and perform the action again!`,
        });
      } else res.send({ message: "Successfully upgraded rental" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating rental with id" + idBike,
      });
    });
};
