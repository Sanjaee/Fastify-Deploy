// src/routes/userRoutes.ts

import { FastifyPluginAsync } from 'fastify';
import { login, register } from '../controllers/userController';

const userRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/login', login);
  fastify.post('/register', register);
};

export default userRoutes;
