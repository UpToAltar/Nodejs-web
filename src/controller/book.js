import db from "../models"
import jwt from "jsonwebtoken"
import * as services from "../services"
import { generate } from "../helpers/category"
import { generateRandomNumbers } from "../helpers/random"
import { number } from "joi"
import { request } from "express"

const book = async (req, res) => {
    const limit = +process.env.LIMIT_DEFAULT;
    const currentPage = +req.params.page || 1
    const start = (currentPage - 1) * limit
    const query = req.query.category ? req.query.category : null;
    
    const dataBook = query == null ? 
    await db.Book.findAndCountAll({
        
        offset: start,
        limit: limit,
        include : [{
                model: db.Category,
                as: 'categoryData',
                attributes: ['id', 'code', 'value']
            }] 
    }) : await db.Book.findAndCountAll({
        where : {category_code:generate(query)},
        offset: start,
        limit: limit,
        include : [{
                model: db.Category,
                as: 'categoryData',
                attributes: ['id', 'code', 'value']
            }] 
    })
    const dataCategory = await db.Category.findAll()
    
    const token = req.signedCookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        let role = !err ? user.role_code : null
        let id = !err ? user.id : null;
        let name = !err ? user.username : 'Not found'
        let avata = !err && user.avata ? user.avata : "https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-avatar-user-basic-abstract-circle-background-flat-color-icon-png-image_1647265.jpg";
        res.render("book.ejs", {
            tokenData: token,
            id:id,
            userName: name,
            avata: avata,
            query: query ? query : false,
            dataCategory:dataCategory,
            dataBook: dataBook.rows,
            role: role,
            pageQuantity: +dataBook.count / +limit,
            currentPage: currentPage,
        });
    });
}

const insert = async (req, res) => {
    try {
        
        let response = await services.insert();
        return res.redirect('/book')
        
    } catch (error) {
        internalServerError(req, res);
    }
}
const create = async (req, res) => {
    try {
        const body = req.body;
        if(!body.title || !body.price || !body.available || !body.image || !body.description){
            return res.status(400).json({
                err:1,
                mes: 'Missing required'
            })
        }
        
        let response = await services.create(body);
        return res.status(200).json(response);
        
    } catch (error) {
        internalServerError(req, res);
    }
}

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        if(!id) {
            return res.status(400).json({err:1,mes: 'Missing required'});
        }
        let response = await services.deleteBook(id);
        return res.status(200).json(response);
        
    } catch (error) {
        internalServerError(req, res);
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body;
        if(!body.title || !body.price || !body.available || !body.image || !body.description){
            return res.status(400).json({
                err:1,
                mes: 'Missing required'
            })
        }
        
        let response = await services.update(body,id);
        res.redirect('/book')
        
        
    } catch (error) {
        internalServerError(req, res);
    }
}
const search = async (req, res) => {
    try {
        console.log(req.query);
    } catch (error) {
        internalServerError(req, res);
    }
}

const bookDetails = async (req, res) => {
    try {
        const id = req.params.id;
        let response = await services.detail(id);
        let categoryData = response.bookData.categoryData.value;
        // * Random book
        let response2 = await services.relatedBook(generate(categoryData));
        
        // *---
        // ? Lấy comment book
        let commentBook = await services.commentBook(id);
        console.log(commentBook.commentBook.rows);
        // ?--
        const token = req.signedCookies.jwt;
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        let role = !err ? user.role_code : null
        let id = !err ? user.id : null;
        const priceOrigin = response.bookData.price*10/100 + response.bookData.price
        let name = !err ? user.username : 'Not found'
        let avata = !err && user.avata ? user.avata : "https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-avatar-user-basic-abstract-circle-background-flat-color-icon-png-image_1647265.jpg";
        res.render("bookDetail.ejs", {
            tokenData: token,
            userName: name,
            id:id,
            avata:avata,
            role: role,
            bookDetail: response.bookData,
            category: categoryData,
            dataCategory:categoryData,
            priceOrigin: priceOrigin.toFixed(2),
            relatedBook: response2.bookRelated,
            commentBook:commentBook.commentBook.rows,
        });
    });
    } catch (error) {
        internalServerError(req, res);
    }
}


const comment = async (req, res) => {
    try {
        
        const body = req.body
        if(!body.idBook|| !body.star || !body.content ||!body.username|| !body.avata) {
            return res.status(400).json({err:1,mes: 'Missing required'});
        }
        let response = await services.comment(body);
        return res.status(200).json(response);
        
    } catch (error) {
        internalServerError(req, res);
    }
}
const commentDelete = async (req, res) => {
    try {
        const id = req.params.id
        let response = await services.commentDelete(id);
        return res.json(response);
    } catch (error) {
        internalServerError(req, res);
    }
}

const test = async (req, res) => {
    try {
        
    } catch (error) {
        internalServerError(req, res);
    }
}

module.exports = {
    book,
    insert,
    create,
    deleteBook,
    update,
    search,
    bookDetails,
    comment,
    test,
    commentDelete
}