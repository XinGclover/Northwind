const express = require('express')
const app = express()
const mysql = require('mysql')
var bodyParser = require('body-parser')
//var serverController=require('./serverController')
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var con = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Xinroot",
    database: "northwind"
});

con.connect(function (err) {
    if (err) {
        console.log("ERROR felaktigt password")
        return
        }
    console.log(" Connected to mysql!");
});

//serverController(app)


app.get('/categories',(req,res)=>{   
    res.sendFile(__dirname+'/public/categories.html')
    })


app.get('/categories/list',(req,res)=>{
    const sql = "select categoryid,categoryname,description from categories"
    con.query(sql, function (err, result) {
      // console.log(result)
        res.json(result)
    })
})

//Get one category
app.get("/categories/:id", (req, res) => {
    var id=req.params.id
    var sql='select categoryid,categoryname,description from categories where categoryid='+ id 
    con.query(sql, function (err, result,meta) {
     console.log(result)
     res.json(result) //Avslutar och returnerar en array
    })
 })

//Get all products
app.get('/products/list',(req,res)=>{
    const sql = "select Productid,ProductName,QuantityPerUnit,UnitPrice,UnitsInStock,UnitsOnOrder,ReorderLevel,Discontinued from Products"
    con.query(sql, function (err, result) {
      // console.log(result)
       res.json(result)
      
    })
})

//Get product of certain category
app.get('/products/list/:id',(req,res)=>{

    var id=req.params.id
    const sql = 'select Productid,ProductName,QuantityPerUnit,UnitPrice,UnitsInStock,UnitsOnOrder,ReorderLevel,Discontinued from Products where CategoryId='+id
    con.query(sql, function (err, result) {

        // console.log(result)
        res.json(result)
        
    })
    
})

//Get product of certain category
app.get('/products/:id',(req,res)=>{  
    var id=req.params.id 
    res.sendFile(__dirname+'/public/products.html')
    })


app.get('/test',(req,res)=>{   
    res.sendFile(__dirname+'/public/test.html')
    })

app.listen(3000, () => console.log('Lyssnar på  port 3000!'))