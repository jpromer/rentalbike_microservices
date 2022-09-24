var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const rental = require("./src/controller/rentalbike.controller");
const amqp = require("amqplib");
var channel, connection;

connectQueue(); // call connectQueue function
async function connectQueue() {
  try {
    connection = await amqp.connect(
      "amqps://rakeswqy:TQLGAcSh5D89pvC_OpxFMTScvFTfq1cA@moose.rmq.cloudamqp.com/rakeswqy"
    );
    channel = await connection.createChannel();
    // connect to 'test-queue', create one if doesnot exist already
    await channel.assertQueue("rental");

    channel.consume("rental", (data) => {
      //console.log(JSON.parse(data.content.toString()));
      rental.addRabbitMQMessage(JSON.parse(data.content.toString()));

      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
}

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./routes/rentalbike.routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const db = require("./src/models");
const { connect } = require("http2");
const { Console, log } = require("console");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexion a base de datos exitosa");
  })
  .catch((err) => {
    console.log("No se pudo establecer conexion con la base de datos", err);
    process.exit();
  });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
