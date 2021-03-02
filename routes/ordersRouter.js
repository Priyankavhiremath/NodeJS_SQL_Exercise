require('dotenv').config();
const express = require('express')
const ordersRouter = express.Router()
const {Pool} = require("pg")
const pool = new Pool()

// Get all orders ***************************************************************
ordersRouter.get("/", (req, res) =>{
    pool
      .query("SELECT * from orders ORDER BY id ASC")
      .then(data => res.json(data.rows))
      .catch(err => res.sendStatus(500));
  })
    // Get one order*************************************************************
    ordersRouter.get("/:id", (req, res) =>{
      const {id} = req.params
      pool
        .query("SELECT * from orders where id=$1", [id])
        .then(data => res.json(data.rows))
        .catch(err => res.sendStatus(500));
    })
  
  // Create order*****************************************************************
  ordersRouter.post('/', (req, res)=>{
    const{price, date, user_id } = req.body
    const newOrder = {
      text:`INSERT INTO orders(price, date, user_id)
      VALUES($1,$2,$3)
      RETURNING *`,
      values: [price, date, user_id ]
      }
      // console.log(newOrder)
     pool.query(newOrder)
         .then(data => res.json(data.rows))
         .catch(err => res.status(500).send(err));
  })
  
  // Update order ******************************************************************
  ordersRouter.put('/:id', (req, res)=>{
    const {id} = req.params
    const{price, date, user_id } = req.body
    const updateUser = {
      text:`UPDATE orders
      SET price=$1, date=$2, user_id=$3
      WHERE id=$4
      RETURNING *`,
      values: [price, date, user_id,id ]
      }
      // console.log(newUser)
     pool.query(updateUser)
         .then(data => res.json(data.rows))
         .catch(err => res.status(500).send(err));
  })
  
  // Delete order *********************************************************************
  ordersRouter.delete('/:id', (req, res)=>{
    const {id} = req.params
    const deleteUser = {
      text:`DELETE FROM orders
            WHERE id=$1
            RETURNING *`,
      values: [id]
      }
      // console.log(newUser)
     pool.query(deleteUser)
         .then(data => res.json(data.rows))
         .catch(err => res.status(500).send(err));
  })

  module.exports = ordersRouter