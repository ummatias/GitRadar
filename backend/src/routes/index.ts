import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';
import sessionRouter from './session.routes';
import teacherRouter from './teacher.routes';
import studentRouter from './student.routes';
import classRouter from './class.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/teacher', teacherRouter);
routes.use('/session', sessionRouter);

routes.use(authMiddleware);

routes.use('/student', studentRouter);
routes.use('/class', classRouter);

export default routes;
