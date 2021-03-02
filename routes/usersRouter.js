require('dotenv').config();
const express = require('express')
const usersRouter = express.Router()
const {Pool} = require("pg")
const pool = new Pool()

// Get all users ***************************************************************
usersRouter.get("/", (req, res) =>{
    pool
      .query("SELECT * from users ORDER BY id ASC")
      .then(data => res.json(data.rows))
      .catch(err => res.sendStatus(500));
  })
    // Get one user*************************************************************
    usersRouter.get("/:id", (req, res) =>{
      const {id} = req.params
      pool
        .query("SELECT * from users where id=$1", [id])
        .then(data => res.json(data.rows))
        .catch(err => res.sendStatus(500));
    })
  
  // Create user*****************************************************************
  usersRouter.post('/', (req, res)=>{
    const{first_name, last_name, age } = req.body
    const newUser = {
      text:`INSERT INTO users(first_name, last_name, age)
      VALUES($1,$2,$3)
      RETURNING *`,
      values: [first_name, last_name, age ]
      }
      // console.log(newUser)
     pool.query(newUser)
         .then(data => res.json(data.rows))
         .catch(err => res.status(500).send(err));
  })
  
  // Update user ******************************************************************
  usersRouter.put('/:id', (req, res)=>{
    const {id} = req.params
    const{first_name, last_name, age } = req.body
    const updateUser = {
      text:`UPDATE users
      SET first_name=$1, last_name=$2, age=$3
      WHERE id=$4
      RETURNING *`,
      values: [first_name, last_name, age,id ]
      }
      // console.log(newUser)
     pool.query(updateUser)
         .then(data => res.json(data.rows))
         .catch(err => res.status(500).send(err));
  })
  
  // Delete user *********************************************************************
  usersRouter.delete('/:id', (req, res)=>{
    const {id} = req.params
    const deleteUser = {
      text:`DELETE FROM users
            WHERE id=$1
            RETURNING *`,
      values: [id]
      }
      // console.log(newUser)
     pool.query(deleteUser)
         .then(data => res.json(data.rows))
         .catch(err => res.status(500).send(err));
  })

  module.exports = usersRouter