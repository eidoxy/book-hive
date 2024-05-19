import dotenv from 'dotenv';
import app from './main';

dotenv.config();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started at http://localhost:${process.env.APP_PORT}`);
});
