const db = require("../models");
const Location = db.location;

exports.create = (req, res) => {
  if (!req.body.idBike) {
    res
      .status(400)
      .send({ message: "Can't add location, idLocation field is required" });
    return;
  }

  if (!req.body.latitud) {
    res
      .status(400)
      .send({ message: "Can't add location, latitud field is required" });
    return;
  }
  if (!req.body.longitud) {
    res
      .status(400)
      .send({ message: "Can't add location, longitud field is required" });
    return;
  }

  const location = new Location({
    idBike: req.body.idBike,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
  });
  location
    .save(location)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while storing a location",
      });
    });
};

exports.findAll = (req, res) => {
  const idBike = req.query.idBike;
  var condicion = idBike
    ? { idBike: { $regex: new RegExp(idBike), $options: "i" } }
    : {};

  Location.find(condicion)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred when searching for locations",
      });
    });
};

exports.findOne = (req, res) => {
  const idBike = req.params.idBike;

  Location.find({ idBike: idBike })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "There is no location with the id" + idBike });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error bringing the location =" + idBike,
      });
    });
};

exports.deleteOne = (req, res) => {
  const idBike = req.params.idBike;

  Location.deleteOne({ idBike: idBike })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Failed to remove location ${idBike}. The student may not have been found.`,
        });
      } else {
        res.send({
          message: "The location was successfully removed",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting locations",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data could not be updated!",
    });
  }

 Location.updateOne(
    { idBike: req.params.idBike },
    { $set: req.body },
    { useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Failed to update location with document number =${idBike}. Please check and perform the action again!`,
        });
      } else res.send({ message: "Successfully upgraded location" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error updating location with id" +
          idBike,
      });
    });
};
