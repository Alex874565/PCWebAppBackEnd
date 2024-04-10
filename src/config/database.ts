require('dotenv').config();
const mongoose = require('mongoose');

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
    }
  }
}

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on('error', (error : Error) => {
  console.error('Connection error:', error);
  process.exit(1);
});
database.once('open', function () {
  console.log('Connected to MongoDB');
});

export = { database };
