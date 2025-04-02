const winston = require("winston");
const commandLineArgs = require("command-line-args");

const { io } = require("socket.io-client");

const Blink1 = require("node-blink1");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),

  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),

    new winston.transports.File({
      filename: "logs.txt",
      maxsize: 1000000,
      maxFiles: 3,
    }),
  ],
});

const optionDefinitions = [
  { name: "deviceid", alias: "d", type: String },
  { name: "host", alias: "h", type: String, defaultValue: "localhost" },
  { name: "port", alias: "p", type: Number, defaultValue: 4455 },
  { name: "clientid", alias: "c", type: String },
];

const options = commandLineArgs(optionDefinitions);

logger.info("starting with options", options);

logger.info("blink devices", Blink1.devices());

const socket = io("http://" + options.host + ":" + options.port);

socket.on("connect", () => {
  logger.info("connected");
  socket.emit("listenerclient_connect", {
    // start listening for the device
    deviceId: options.deviceid,
    listenerType: "blink1_" + options.clientid,
    canBeReassigned: false,
    canBeFlashed: true,
    supportsChat: false,
  });
});

socket.on("connect_error", (error) => {
  logger.error("connect_error", error);
});

socket.on("disconnect", (reason) => {
  logger.info("disconnected with reason %s", reason);
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
});

socket.on("error", (error) => {
  logger.error("Socket error", error);
});

socket.on("flash", () => {
  logger.info("flash");
  //blink1.blink();
});

let bussOptions = [];
socket.on("bus_options", (data) => {
  bussOptions = data;
});

socket.on("device_states", (data) => {
  processDeviceState(data);
});

const processDeviceState = (data) => {
  const bussesList = [];

  for (const deviceState of data) {
    const currentBus = bussOptions.find((bus) => bus.id === deviceState.busId);
    if (deviceState.sources.length > 0) {
      bussesList.push(currentBus);
    }
  }
  if (bussesList.length === 0) {
    // do nothing
    // turn off led
    // blink1.stop();
  } else {
    bussesList.sort((a, b) => a.priority - b.priority);

    const currentColor = bussesList[0].color;
    logger.info("current state", bussesList[0]);
    console.log("current color", currentColor);
    // set blink to color
    // color: '#0000FF',
    // blink1.setRGB(currentColor.r, currentColor.g, currentColor.b);
  }
};
