import express from 'express';
import { pokemon } from './pokemon';


const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API haha' });
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  next();
})
app.get('/pokemon', (_, res) => {
  res.header("Access-Control-Allow-Origin", "*")

  res.send(pokemon);
});
app.get('/search', (req, res,next) => {
  res.header("Access-Control-Allow-Origin", "*")
  const q = ((req.query?.q as string) ?? '').toLowerCase();
  res.send(
    pokemon.filter(({ name: { english } }) => english.toLowerCase().includes(q))
  );
  next();

});
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
