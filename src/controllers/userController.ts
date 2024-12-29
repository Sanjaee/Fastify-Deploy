// src/controllers/userController.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'your_jwt_secret'; // Ganti dengan secret yang aman

// Register User
export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password, role } = request.body as { username: string; password: string; role: string };

  // Enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role : 'CASHIER',
      },
    });
    reply.status(201).send({ message: 'User created successfully', user });
  } catch (error) {
    reply.status(500).send(error);
  }
};

// Login User
export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as { username: string; password: string };

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return reply.status(400).send({ message: 'Invalid username or password' });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(400).send({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    reply.send({ message: 'Login successful', token });
  } catch (error) {
    reply.status(500).send(error);
  }
};
