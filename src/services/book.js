import db from '../models'
import data from "../../data/data.json";
import { generate, generate2 } from '../helpers/category';
import { generateRandomNumbers } from '../helpers/random';
import { v4 as generateId } from 'uuid'

export const insert = () => new Promise (async (resolve, reject) => {
    try {
        // const dataBook = Object.entries(data);
        // dataBook.forEach(async(item) => {
            
        //     await db.Category.create({
        //         code:generate(item[0]),
        //         value:generate2(item[0]),
        //     })

        // });

        dataBook.forEach(async(item) => {
            const category = generate(item[0])
            item[1].forEach( async (book) => {
                await db.Book.create({
                    id:book.id,
                    title: book.bookTitle,
                    price: +book.bookPrice,
                    available: +book.available,
                    image: book.imageUrl,
                    description: book.bookDescription,
                    category_code: category
                });
            })

        });
        resolve({
            mes: dataBook ? 'ok' : null
        })
    } catch (error) {
        reject(error)
    }
})

export const create = (body) => new Promise (async (resolve, reject) => {
    try {
        const [book, created] = await db.Book.findOrCreate({
            where: {title: body.title},
            defaults: {
                ...body,
                id: generateId()
            }
        })
        resolve({
            err:created? 0: 1,
            message: created? 'Create book successfully':'Had similar book before',
            bookData: created? book : null
        })
    } catch (error) {
        reject(error)
    }
})

export const deleteBook = (id) => new Promise (async (resolve, reject) => {
    try {
        const response = await db.Book.destroy({where: {id: id}})
        resolve({
            err:response > 0 ? 0: 1,
            message: response > 0 ? `Delete successfully`:'Can not delete',
            bookData: response > 0 ? `Quantity: ${response}`: null
        })
    } catch (error) {
        reject(error)
    }
})

export const update = (body,id) => new Promise (async (resolve, reject) => {
    try {
        const response = await db.Book.update(body, {
            where: {id:id},
        })
        //* update sẽ trả về số lượng sách được update
        resolve({
            err:response > 0 ? 0: 1,
            message: response > 0 ? `${response} book updated successfully`:'Can not update',
            bookData: response > 0 ? response : null
        })
    } catch (error) {
        reject(error)
    }
})

export const detail = (id) => new Promise (async (resolve, reject) => {
    try {
        const response = await db.Book.findOne({
            where: { id: id },
            include: [
                {
                model: db.Category,
                as: "categoryData",
                attributes: ["value"],
                },
            ],
        });
        //* update sẽ trả về số lượng sách được update
        resolve({
            
            bookData: response? response : null
        })
    } catch (error) {
        reject(error)
    }
})

export const relatedBook = (category) => new Promise (async (resolve, reject) => {
    try {
        const response = await db.Book.findAndCountAll({
            where: { category_code: category},

        })
        let max = response.count - 1;
        let min = 0;
        let relatedBook = [];
        let numberArray = generateRandomNumbers(min, max);
        for (let number of numberArray) {
            relatedBook.push(response.rows[number]);
        }
        //* update sẽ trả về số lượng sách được update
        resolve({
            bookRelated: response? relatedBook: null
        })
    } catch (error) {
        reject(error)
    }
})

export const comment = (body) => new Promise (async (resolve, reject) => {
    try {
        const response = await db.Comment.create({
            avata:body.avata,
            idBook: body.idBook,
            username: body.username,
            star: body.star,
            content:body.content
        })
        resolve({
            err:response? 0: 1,
            message: response ? `Create comment successfully`:'Can not create',
            comment: response
        })
    } catch (error) {
        reject(error)
    }
})

export const commentBook = (id) => new Promise (async (resolve, reject) => {
    try {
        const response = await db.Comment.findAndCountAll({
            where: {idBook: id}
        })
        
        resolve({
            err:response? 0: 1,
            commentBook: response
        })
    } catch (error) {
        reject(error)
    }
})

export const commentDelete = (id) => new Promise (async (resolve, reject) => {
    try {
        const response = await db.Comment.destroy({
            where: {id: id}
        })
        
        resolve({
            err:response > 0 ? 0: 1,
            message: response > 0 ? `Delete successfully`:'Can not delete',
        })
    } catch (error) {
        reject(error)
    }
})

