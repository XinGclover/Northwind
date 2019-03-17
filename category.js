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
    //console.log($('input:checkbox').val())
    var selectedIDArray = []
    $('input:checkbox').filter(':checked').each(function(){
        selectedIDArray.push($(this).val())
    })
    console.log(selectedIDArray)
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

 var productsArray=[]
 var orderItemArray=[]

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
     <button id='next'>Next</button> </div>`
     buttons.innerHTML = btns
     
   })
 }

 function getHeaderProducts(header){
    var headers=[]
    headers.push("Choose")
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
       `<tr id="product">
        <td><input type=checkbox value=${x.Productid}></td>
        <td><input type=number value=0></td>
        <td><input type=number value=0></td>
        <td>${x.Productid}</td>
        <td>${x.ProductName}</td>
        <td>${x.QuantityPerUnit}</td>
        <td>${x.UnitPrice}</td>
        <td>${x.UnitsInStock}</td>
        <td>${x.UnitsOnOrder}</td>
        <td>${x.ReorderLevel}</td>
        <td>${x.Discontinued}</td>
        </tr> `       
        var product=new Product(x.Productid,x.ProductName,x.QuantityPerUnit,x.UnitPrice,x.UnitsInStock,x.UnitsOnOrder,x.ReorderLevel,x.Discontinued)
        productsArray.push(product)
        //console.log(product)
        return row
    })
    document.querySelector("tbody").innerHTML=tableRows.join("")
   
    
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

   
//Varja en product sen klicka på button.
$(document).on('click','#next',function(){
        
    var item=new OrderItem()
        
    $('input:checkbox').filter(':checked').each(function(){  
        item.Productid=$(this).val()
        
        item.OrderQuantity=$(this).parent().next().children().eq(0).val()
        item.OrderDiscount=$(this).parent().next().next().children().eq(0).val()
        
        orderItemArray.push(item)
    })
    console.log(orderItemArray)
})

 

//Select all checkbox
function uncheckCheckbox(){
    $(":checkbox").prop("checked", false);
}

function checkAll(){
    $(":checkbox").prop("checked", true);
}
