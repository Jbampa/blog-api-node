import express from 'express';
import helmet from 'helmet';
import routes from './routes';

const server = express();
const port = process.env.PORT;

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(routes);

server.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`)
})