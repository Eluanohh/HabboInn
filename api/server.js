const { databaseConnection } = require("./database/connection");

databaseConnection();

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3031;

const roomsRoute = require('./routes/roomsRoute');
const clientsRoute = require('./routes/clientsRoute');
const reservationRoute = require('./routes/reservationRoute');
const authRoute = require('./routes/authRoute');

app.use(cors());
app.use(express.json());

app.use('/rooms', roomsRoute);
app.use('/clients', clientsRoute);
app.use('/reservations', reservationRoute);
app.use('/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});