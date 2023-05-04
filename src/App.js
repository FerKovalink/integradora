const express = require('express')
const handlebars = require('express-handlebars')
const objetconfig = require('./config/objetconfig.js')
const productsRouter = require('./routes/products.router')
const cartRouter = require('./routes/cartManager.router')
const userRouter = require('./routes/users.router')
const viewStatic = require('./routes/views.router')
 
const {
    Server
} = require('socket.io')

//const {socketProducts} = require ('./socketproducts')
const app = express()
const PORT = 8080

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/', viewStatic)
app.use('/realtimeproducts', viewStatic)

objetconfig.connectDB()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/static', express.static(__dirname + '/public'))

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando el puerto: ${PORT}`)
})
const io = new Server(httpServer)

// http://localhost:8080/api/products
app.use('/api/products', productsRouter)

// http://localhost:8080/api/carts
app.use('/api/carts', cartRouter)

// http://localhost:8080/api/usuarios
app.use('/api/usuarios', userRouter)

//socketProducts(io)

//CHAT
let messages = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')
    socket.on('message', data => {
        messages.push(data)
        io.emit('messageLogs', messages)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })

})