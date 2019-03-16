//Klient javascript
/***************************  Categories' page  ******************************************** */
//Initial sight of categories' page with table
window.onload = init
//Skapa ett formulär med knappar
function init() {
   $.get("/categories/list",function(response){       
    const header=response[0]
    getHeader(header)
    getAllCategories()
    var buttons=document.getElementById("buttons")
    var btns=`<div><button onclick=>Back</button>
    <button onclick=checkAll()>Select All</button> 
    <button onclick=uncheckCheckbox()>Clear</button>
    <button onclick=gotoProducts()>Next</button> </div>`
    buttons.innerHTML = btns
  })
}

//Show the head of tabel 
function getHeader(header){
    var headers=[]
    headers.push("Choose")  //the checkbox is first
    for(var v in header){           
        headers.push(v.charAt(0).toUpperCase()+v.substr(1))           
    }
    //console.log(headers)
    var h=headers.map(x=>{
        var rad=`<th>${x}</th>`
        return rad
    })
    document.querySelector("thead").innerHTML=`<tr>${h.join('')}</tr>`
    
}

function getAllCategories() {
    var url = "/categories/list"
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
        var array = JSON.parse(this.responseText)//alla categories
        showTableData(array)
    });
    oReq.open("GET", url);
    oReq.send();
}

function showTableData(array) {
    var tableRows = array.map(x => {
        var row =
       `<tr>
        <td><input type=checkbox value=${x.categoryid}></td>
        <td>${x.categoryid}</td>
        <td>${x.categoryname}</td>
        <td>${x.description}</td>
        </tr>
        `
        return row
    })
    document.querySelector("tbody").innerHTML=tableRows.join("")
}

class Category {
    constructor(categoryid, categoryname, description) {
        this.categoryid = categoryid
        this.categoryname = categoryname
        this.description = description
    }
}

// Get the array of categories' id which are seleted
function getSelectedId(){
    var selectedIDArray = []
    $('input:checkbox').filter(':checked').each(function(){
        selectedIDArray.push($(this).val())
    })
    return selectedIDArray
 }

 // Choose the first one
 function gotoProducts(){
    var id=getSelectedId()[0]  
    console.log(id)
    visaProducts(id)  
 }

 /***************************  Products' page  ******************************************** */

 // Initial sight of products' page with tabel

 var ItemArray=[]

 function visaProducts(id) {
    let testvar = $.get('/products/list/' + id,function(response){   
        console.log("tests")    
     const header=response[0]
     getHeaderProducts(header)
     getProductsByCategroyId(id)
     var buttons=document.getElementById("buttons")
     var btns=`<div><button onclick=init()>Back</button>
     <button onclick=checkAll()>Select All</button> 
     <button onclick=uncheckCheckbox()>Clear</button>
     <button onclick=showOrderItemArray()>Next</button> </div>`
     buttons.innerHTML = btns
     
   })
 }

 function getHeaderProducts(header){
    var headers=[]
    headers.push("OrderQuantity")
    headers.push("OrderDiscount")
    for(var v in header){
        //console.log(v)           
        headers.push(v.charAt(0).toUpperCase()+v.substr(1))           
    }
    //console.log(headers)
    var h=headers.map(x=>{
        var rad=`<th>${x}</th>`
        return rad
    })
    document.querySelector("thead").innerHTML=`<tr>${h.join('')}</tr>`
    
}

// Get all products of a certain categorId in this path
 function getProductsByCategroyId(id) {
    var url = "/products/list/" +id
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
        var array = JSON.parse(this.responseText)
        showTableDataProducts(array)
    })
    oReq.open("GET", url);
    oReq.send();
    
}

function showTableDataProducts(array) {
   
    var tableRows = array.map(x => {
        var row =
       `<tr onclick=>
        <td><input type=text placeholder=0 class='quantity'></td>
        <td><input type=text placeholder=0 class='discount'></td>
        <td class='id'>${x.Productid}</td>
        <td class='name'>${x.ProductName}</td>
        <td>${x.QuantityPerUnit}</td>
        <td class='unitPrice'>${x.UnitPrice}</td>
        <td>${x.UnitsInStock}</td>
        <td>${x.UnitsOnOrder}</td>
        <td>${x.ReorderLevel}</td>
        <td>${x.Discontinued}</td>
        </tr> `
        ItemArray.push(new OrderItem(x.Productid,x.ProductName,x.UnitPrice,x.OrderQuantity,x.OrderDiscount))
        return row
    })
    document.querySelector("tbody").innerHTML=tableRows.join("")
    console.log(ItemArray.length)
    
}

class Product {
    constructor(Productid,ProductName,QuantityPerUnit,UnitPrice,UnitsInStock,UnitsOnOrder,ReorderLevel,Discontinued) {
        this.Productid=Productid
        this.ProductName=ProductName
        this.QuantityPerUnit=QuantityPerUnit
        this.UnitPrice=UnitPrice
        this.UnitsInStock=UnitsInStock
        this.UnitsOnOrder=UnitsOnOrder
        this.ReorderLevel=ReorderLevel
        this.Discontinued=Discontinued
    }
}

//Build class to order
class OrderItem{
    consturctor(Productid,ProductName,UnitPrice,OrderQuantity,OrderDiscount){
        this.Productid=Productid
        this.ProductName=ProductName
        this.UnitPrice=UnitPrice
        this.OrderQuantity=OrderQuantity
        this.OrderDiscount=OrderDiscount
    }
}



//Jennys function to check the stockinfo
function getStockInfo(){
    productsArray.map(x=>{
        var id = x.ProductId
        var name= x.ProductName
        console.log(id+name)
        url = "/products/" + id
 
        $.get(url, function(response){
            stockInfoArray = response
        })
    })
 }

 function showOrderItemArray(){
     console.log(ItemArray[1].OrderQuantity)
     var OrderItemArray=ItemArray.map(x=>x.OrderQuantity>0)
     console.log(OrderItemArray.length)
 }




//Select all checkbox
function uncheckCheckbox(){
    $(":checkbox").prop("checked", false);
}

function checkAll(){
    $(":checkbox").prop("checked", true);
}
