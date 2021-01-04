const express=require('express');
const Sequelize=require('sequelize');
const data=require('./data.js');
const app=express();



const connection=new Sequelize('employeedb','root','prem0131',{
    dialect:'mysql'
})

const Prem=connection.define('Prem',{
    name:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    type:Sequelize.STRING,
})
connection.sync({
    logging:console.log,
    force:true
}).then(()=>{
    console.log("Done SetUP")
    app.listen(3000,()=>{
        console.log("SERVER IS RUNNING")
    })
}).then(()=>{
    Prem.bulkCreate(data)
}).then(async ()=>{
    const users = await Prem.findAll();
console.log(users); 
}).then(async()=>{
    await Prem.destroy({
        where: {
          name: "Kaseem Decker"
        }
      });
}).then(async()=>{
    await Prem.update({ email: "prepanwala710@gmail.com" }, {
        where: {
          name: "William Miller"
        }
      });
})
.catch((e)=>{
    console.log(e)
})