import { FastifyRequest , FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
 



// create Category
export const createCategory = async(request : FastifyRequest , reply : FastifyReply ) => {
    const {name } = request.body as {name: string  ; slug: string}

    try {
        const slugParse = name.toLowerCase()
        const category = await prisma.category.create({
            data: {
                name , 
                slug: slugParse
            }
        })
        
        reply.status(201).send(category)
    } catch (error) {
        reply.status(500).send(error);
    }

}


export const getCategories = async (_: FastifyRequest , reply: FastifyReply) => {
    try{
        const categories = await prisma.category.findMany({
            include: {
                products: true
            }
        })

        reply.send(categories)
    } catch(error) {
        reply.status(500).send(error)
    }
}


export const detailCategory = async (request: FastifyRequest , reply: FastifyReply) => {
    try {
        const {slug} = request.params as {slug: string}
    if(!slug) {
        reply.status(404).send({
            message: "Category not found"
        })

    }
    const detailcategory = await prisma.category.findFirst({
        where: {
            slug: slug
        },
        include: {
            products: true
        }
    })
    reply.status(200).send(detailcategory)
    } catch (error) {
        reply.status(500).send(error)
    }
}

export const updateCategory = async (request: FastifyRequest , reply: FastifyReply) => {
    const {id} = request.params as {id: number}
    const {name} = request.body as {name: string}

    try {
        const category = await prisma.category.update({
            where: {id : Number(id)},
            data: {name , slug: name.toLowerCase()}
        })
        reply.send(category)
    } catch (error) {
        reply.status(500).send(error)
    }
}


export const deleteCategory = async (request: FastifyRequest , reply: FastifyReply) => {
    const {id} = request.params as {id: number}
    try{
        await prisma.category.delete({
            where: {id : Number(id)}
        })

        reply.status(200).send({message: 'Category deleted success' })
    } catch(error) {
        reply.status(500).send(error)
    }
}
