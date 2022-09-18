module.exports = (mongoose) => {
  const Location = mongoose.model(
    "location",
    mongoose.Schema(
      {
        idBike: { type: Number, index: { unique: true, sparse: true } },
        longitud: { type: Number },
        latitud: { type: Number },
      },
      { timestamps: false }
    )
  );

  return Location;
};
