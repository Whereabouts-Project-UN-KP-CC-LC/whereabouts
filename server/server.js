const path = require('path');
const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3500;
const app = express();
const apiRouter = require('./routes/api');
const db = require('./models/whereaboutsModel');

// const httpServer = require('http').Server(app); // app is a handler function supplied to HTTP server
const http = require('http');
const httpServer = http.createServer(app);

const cors = require('cors');
app.use(cors()); // allows communication between different domains

// initialize new Server instance of socket.io by passing it HTTP server obj on which to mount the socket server
const { Server } = require('socket.io');
const io = new Server(httpServer, {
  pingTimeout: 30000, // https://socket.io/docs/v4/troubleshooting-connection-issues/#the-browser-tab-was-minimized-and-heartbeat-has-failed
  cors: {
    origin: `http://localhost:8080`,
    methods: ['GET', 'POST'],
  },
  // path: '/chat',
});

// on connection event (i.e. on connecting to socket server instance), listening for incoming sockets + connects with React app
io.on('connection', (socket) => {
  //console.log(`${socket.id} user connected`);
  socket.on('new msg', (msg) => {
    // server emits client's msg to everyone, inc sender (all users / sockets); recall, io is the socket server instance we created
    io.emit('disperse msg', msg);
    // go to ChatPage.jsx, socket.on('disperse msg')
  });
  socket.on('disconnect', () => {
    //console.log(`${socket.id} user disconnected`); // refreshing chat page disconnects and reconnects socket
    //https://socket.io/docs/v4/troubleshooting-connection-issues/#problem-the-socket-gets-disconnected
  });
});

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

/**
 * define route handlers
 */
app.use('/api', apiRouter);

// Implement SSE to regularly stream trips data back to FE
const dbQuery = async (phoneNumber) => {
  // const { rows } = await db.query(`SELECT * FROM users WHERE phone_number = '${phoneNumber}'`);
  const { rows } = await db.query(`
    SELECT t.start_timestamp, t.start_lat, t.start_lng, t.sos_timestamp, t.sos_lat, t.sos_lng, t.end_timestamp,j.*
    FROM trips t
    INNER JOIN trips_users_join j ON t.id = j.trips_id
    WHERE j.user_phone_number = '${phoneNumber}'
    ORDER BY j.trips_id DESC
  `);
  // console.log(rows);
  return rows;
};

app.get('/stream/:phone_number', (req, res) => {
  const phoneNumber = req.params.phone_number;
  if (req.headers.accept === 'text/event-stream') {
    console.log('accept/content type is event-stream');
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      // 'Access-Control-Allow-Origin': '*',
    });
    setInterval(async () => {
      const rows = await dbQuery(phoneNumber);
      res.write(`data: ${JSON.stringify(rows)}\n\n`);
    }, 1000);
  } else {
    res.json({ message: 'Ok' });
  }
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 500,
    message: {
      err: 'An error occurred. We inside global error handler. BUT WHY?',
    },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// listening on HTTP server!
httpServer.listen(PORT, () =>
  console.log(`Currently listening on port: ${PORT}`)
);

module.exports = app;