// Import
const express = require('express')
const client = require('./connection.js')
// By loading mathjs
const math = require('mathjs')
const bodyparser = require('body-parser')
const app=express()
client.connect();
app.use(bodyparser.urlencoded({extended:true}))
//Set Engine
app.set("view engine", "ejs");

app.get('',(req,res)=> {
    res.sendFile(__dirname + '/index1.html')
})

app.post('/equals',(req,res)=>{
    var n1=req.body.num1
    const result = math.evaluate(n1).toString()
    res.send('' + result)
    // Query for inserting values
    //client.query("Insert into user_cal values($1,$2,$3,$4,current_timestamp)",
      //  [data.first_num, data.second_num, data.operator, data.res], (err, result) => {
client.query("Insert into upd_user_cal values('" + n1 + "','" + result + "',current_timestamp)"), 
(err, result) => {   
         if (!err) {
                console.log("Inserted");
            }
            else {
                console.log(err);
            }
            
        }
    }); 
    

app.get('/index', (req, res) => {
    client.query("Select * from upd_user_cal", (err, result) => {
        if (!err) {
            res.render('index', {'items': result.rows}
            );
          }
          
    else {
        console.log(err)
      }
    })
});

app.listen(4000, ()=>{
  console.log("Sever is now listening at port 4000");
})
