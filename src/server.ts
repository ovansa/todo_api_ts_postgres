import express from 'express';
import indexRoute from './routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
