import express from "express";
 
const db = require(`../database.js`);
const router=express.Router();

const users =[
    {
        Nombres: "Jhon",
        Apellidos: "Campo",
        Cedula: 100345442,
        Cargo: "Gerente",
        HoraLlegada: "8 am",

    },
];
router.get("/", (req, res)=>{
    res.json(users);
});
router.post("/", (req, res)=>{
    const user = req.body;

    users.push(user)

    res.json(`El usuario ${user.Nombres} Ha sido Agregado!`);
});

export default router;
