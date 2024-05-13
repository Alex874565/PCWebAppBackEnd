const cors = require('cors');
const express = require('express');
const database = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/events', eventRoutes.router);
app.use('/api/products', productRoutes.router);
app.use('/api/auth', authRoutes.router);
app.use('/api/users', userRoutes.router);
app.use('/api/reviews', reviewRoutes.router);
app.use('/api/orders', orderRoutes.router)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
