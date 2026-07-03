const { databaseConnection } = require('./database/connection');

databaseConnection();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3031;

const roomsRoute = require('./routes/roomsRoute');
const clientsRoute = require('./routes/clientsRoute');
const reservationRoute = require('./routes/reservationRoute');

app.use(express.json());

app.use('/rooms', roomsRoute);
app.use('/clients', clientsRoute);
app.use('/reservations', reservationRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});