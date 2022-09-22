module.exports = (mongoose) => {
  const Rental = mongoose.model(
    "rental",
    mongoose.Schema(
      {
        idBike: { type: Number },
        dateInitial: { type: String },
        dataFinished: { type: String },
      },
      { timestamps: false }
    )
  );

  return Rental;
};
