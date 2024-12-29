import {FastifyRequest , FastifyReply} from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export const getUnits = async (request: FastifyRequest , reply: FastifyReply) => {
    const units = await prisma.unit.findMany()
    reply.send(units)
}

export const createUnit = async (request: FastifyRequest , reply: FastifyReply) => {
    const {name} = request.body as {name: string}


    try{
        const unit = await prisma.unit.create({
            data: {name }
        })

        reply.status(201).send(unit)
    }catch(error) {
        reply.status(500).send(error)
    }
}


export const updateUnit = async (request: FastifyRequest , reply: FastifyReply) => {
    const {id} = request.params as {id: number}
    const {name} = request.body as {name: string}
    try{
        const unit = await prisma.unit.update({
            data: {name},
            where: {id: Number(id)}
        })
        reply.status(200).send(unit)
    } catch(error) {
        reply.status(500).send(error)
    }

}


export const deleteUnit = async (request: FastifyRequest , reply: FastifyReply) => {
    const {id} = request.params as {id: number}

    try {
        if (!id) {
            reply.status(404).send({message: 'Unit not found'})
        }

        const unit = await prisma.unit.delete({
            where: {id: Number(id)}
        })

        reply.status(200).send(unit)
    } catch (error) {
        reply.status(500).send(error)
    }
}