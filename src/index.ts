const express = require('express');
const database = require('./config/database');
const eventRoutes = require('./routes/eventRoutes');
const productRoutes = require('./routes/productRoutes')

const app = express();
app.use(express.json());
app.use('/api/events', eventRoutes.router);
app.use('/api/products', productRoutes.router)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
