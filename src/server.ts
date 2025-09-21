import express from 'express';
import helmet from 'helmet';
import routes from './routes';
import passport from 'passport';
import { strategy } from './libs/passport';
import { errorHandler, notFoundRequest } from './errors/errorHandler';

const server = express();
const port = process.env.PORT;

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));

server.use('/', routes);

server.use(passport.initialize());
passport.use('jwt', strategy);

server.use(notFoundRequest);
server.use(errorHandler);


server.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`)
})