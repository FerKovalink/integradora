const {
    Router
} = require('express')
const router = Router()
const productManager = require('../dao/product.mongo.js')

router.get('/chat', (req, res) => {
    res.render('chat', {})
})

router.get('/', async (req, res) => {
    await productManager.getProducts()
        .then(documents => {
            const context = {
                usersDocuments: documents.map(document => {
                    return {
                        title: document.title,
                        description: document.description,
                        price: document.price,
                        thumbnails: document.thumbnails,
                        stock: document.stock,
                        code: document.code
                    }
                })
            }
            res.render('home', {
                usersDocuments: context.usersDocuments
            })
        })
        .catch(error => res.status(500).send(error))



})

router.get('/realtimeproducts', async (req, res) => {
    await productManager.getProducts()
        .then(documents => {
            const context = {
                usersDocuments: documents.map(document => {
                    return {
                        title: document.title,
                        description: document.description,
                        price: document.price,
                        thumbnails: document.thumbnails,
                        stock: document.stock,
                        code: document.code
                    }
                })
            }
            res.render('realTimeProducts', {
                usersDocuments: context.usersDocuments
            })
        })
        .catch(error => res.status(500).send(error))

})

module.exports = router