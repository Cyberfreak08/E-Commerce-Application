const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/userRoutes');
const itemRouter = require('./routes/itemRoutes');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const sequelize = require('./config/db')
const app = express();
const {PORT} = process.env;
const corsOptions = {
  exposedHeaders: 'x-auth-token',
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes...
app.use(itemRouter);
app.use(userRouter);
app.use(cartRouter);
app.use(orderRouter);
const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
