import {FastifyRequest , FastifyReply} from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getSales = async (req: FastifyRequest , reply: FastifyReply) => {
    const sales = await prisma.sale.findMany()
    reply.send(sales)
}


export const storeSale = async (req: FastifyRequest, reply: FastifyReply) => {
  const { subtotal, discount, items: rawItems, discountItem, total } = req.body as {
      subtotal: number;
      discount: number;
      total: number;
      items: { id: number; qty: number; price: number }[] ;
      discountItem: number;
  };

  const items = Array.isArray(rawItems) ? rawItems : [];

  try {
      // Validate the request body
      const generateSaleNo = 'INV' + Math.floor(Math.random() * 1000000);
      if (!items.length) {
          return reply.status(400).send({ message: 'Items must be a non-empty array.' });
      }

      if (subtotal < 0 || total < 0 || discount < 0) {
          return reply.status(400).send({ message: 'Numeric fields must be positive values.' });
      }

      // Calculate the final discount
      const finalDiscount = discount || 0;

      // Create the sale
      const sale = await prisma.sale.create({
          data: {
              date: String(new Date().toLocaleDateString().replaceAll('/' , '-')),
              subtotal,
              saleNo: generateSaleNo,
              discount: finalDiscount,
              total,
              saleItems: {
                  create: items.map((item) => ({
                      qty: item.qty,
                      price: item.price,
                      productId: item.id,
                  })),
              },
          },
          include: { saleItems: true },
      });

      // Update product stock
      for (const item of items) {
          await prisma.product.update({
              where: { id: item.id },
              data: { stock: { decrement: item.qty } },
          });
      }

      // Send the response
      reply.status(201).send(sale);
  } catch (error) {
      console.error('Error creating sale:', error);
      reply.status(500).send({
          message: 'Failed to create sale',
          error: error instanceof Error ? error.message : error,
      });
  }
};


export const filterSaleByDate = async (req: FastifyRequest , reply: FastifyReply) => {
  const {date} = req.params as {date: string}

  try{
    if(!date) {
      return reply.status(400).send({message: 'Date is required'})
    }

    const sale = await prisma.sale.findMany({
      where: {
        date: String(date)
      }
    })

    reply.send(sale)
  } catch(error) {
    reply.status(500).send(error)
  }
}
