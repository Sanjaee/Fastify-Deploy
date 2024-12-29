
import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Ganti dengan secret yang aman

export const roleMiddleware = (allowedRoles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Ambil token dari header Authorization
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return reply.status(401).send({ message: 'Authorization token is missing' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return reply.status(401).send({ message: 'Invalid token' });
      }

      // Verifikasi token
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      
      // Periksa apakah role pengguna diizinkan
      if (!allowedRoles.includes(decoded.role)) {
        return reply.status(403).send({ message: 'Forbidden: You do not have access to this resource' });
      }

      // Tambahkan data pengguna ke request
      request.user = decoded;
    } catch (error) {
      reply.status(401).send({ message: 'Invalid token' });
    }
  };
};
