//Klient javascript
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


function getHeader(header){
    var headers=[]
    headers.push("Choose")
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


function getCategoriesId(){
    var catIDArray = []
    $('input:checkbox').filter(':checked').each(function(){
        catIDArray.push($(this).val());
    })
    return catIDArray
 }

 function gotoProducts(){
    var id=getCategoriesId()[0]  
    console.log(id)
    visaProducts(id)
   
 }

 function visaProducts(id) {
    let testvar = $.get('/products/list/' + id,function(response){   
        console.log("tests")    
     const header=response[0]
     getHeaderProducts(header)
     getProductsByCategroyId(id)
     var buttons=document.getElementById("buttons")
     var btns=`<div><button onclick=>Back</button>
     <button onclick=checkAll()>Select All</button> 
     <button onclick=uncheckCheckbox()>Clear</button>
     <button onclick=removeCategory()>Next</button> </div>`
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

 function getProductsByCategroyId(id) {
    var url = "/products/list/" +id
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
        var array = JSON.parse(this.responseText)//alla categories
        showTableDataProducts(array)
    })
    oReq.open("GET", url);
    oReq.send();
}

function showTableDataProducts(array) {
    var tableRows = array.map(x => {
        var row =
       `<tr>
        <td><input type=checkbox value=${x.Productid}></td>
        <td><input type=text value=0></td>
        <td><input type=text value=0></td>
        <td>${x.Productid}</td>
        <td>${x.ProductName}</td>
        <td>${x.QuantityPerUnit}</td>
        <td>${x.UnitPrice}</td>
        <td>${x.UnitsInStock}</td>
        <td>${x.UnitsOnOrder}</td>
        <td>${x.ReorderLevel}</td>
        <td>${x.Discontinued}</td>
        </tr> `
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



function uncheckCheckbox(){
    $(":checkbox").prop("checked", false);
}

function checkAll(){
    $(":checkbox").prop("checked", true);
}
