const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require("./src/routes/index");
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const connectToMongoDB = require('./src/config/database'); 

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60, httpOnly: false },
    resave: false,
  })
);

app.use("/api", routes.auth);
app.use("/api", routes.job);


connectToMongoDB()
  .then(() => {
    const PORT = process.env.PORT || 8990;
    app.listen(PORT, () => {
      console.log(`SERVER STARTED ON PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });