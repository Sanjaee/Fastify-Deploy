import {FastifyRequest , FastifyReply} from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createTransaction = async (req: FastifyRequest , reply: FastifyReply) => {
    const {saleId , paymentAmount , change} = req.body as {saleId : number; paymentAmount: number; change: number}
    try {
        const transaction = await prisma.transaction.create({
            data: {
                saleId,
                paymentAmount,
                change
            }
        })
        reply.send(transaction)
    } catch (error) {
        reply.status(400).send({message: 'Error creating transaction'})
    }
}