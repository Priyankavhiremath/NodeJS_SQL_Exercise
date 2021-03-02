const express = require ('express')
const usersRouter = require('./routes/usersRouter')
const ordersRouter = require('./routes/ordersRouter')
const app = express()
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)

app.get('/', (req, res) =>{
  res.send('Hi!')
})

const port = process.env.port || 4000
app.listen(port, ()=>console.log(`server running at port: ${port}`))

