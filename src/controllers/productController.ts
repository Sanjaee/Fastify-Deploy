
import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create Product
export const createProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { code, name, price, categoryId, stock, description, unitId } = request.body as {
    code: string;
    name: string;
    price: number;
    categoryId: number;
    stock: number;
    description: string;
    unitId: number;
  };

  try {
    const randomCode = 'PR' + Math.floor(Math.random() * 999999)
    const product = await prisma.product.create({
      data: {
        code : randomCode,
        name,
        price,
        categoryId,
        stock,
        description,
        unitId,
      },
    });
    reply.status(201).send(product);
  } catch (error) {
    reply.status(500).send(error);
  }
};

// Get all Products
export const getProducts = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const products = await prisma.product.findMany();
    reply.send(products);
  } catch (error) {
    reply.status(500).send(error);
  }
};

// Update Product
export const updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { name, price, categoryId, stock, description, unit } = request.body as {
    name: string;
    price: number;
    categoryId: number;
    stock: number;
    description: string;
    unit: string;
  };

  try {
    const product = await prisma.product.update({
      where: { id },
      data: { name, price, stock, description },
    });
    reply.send(product);
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const detailProduct = async (request: FastifyRequest , reply: FastifyReply) => {
  const {name} = request.params as {name: string}

  
  try{
    const product = await prisma.product.findFirst({
      where: {
        name: name.toLowerCase()
      }
    })
    reply.send(product)
  } catch(error) {
    reply.status(500).send(error)
  }
}


// Delete Product
export const deleteProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  try {
    await prisma.product.delete({
      where: { id },
    });
    reply.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    reply.status(500).send(error);
  }
};
