var nextPage = '//frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';

window.onload = function() {
    getProducts(nextPage);
};

function getProducts(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `https:${url}`, false );
    xmlHttp.send( null );
    var data = JSON.parse(xmlHttp.responseText);
    nextPage = data.nextPage;
    var template = document.getElementById("product-card");
    var productsWrapper = document.getElementById("products-wrapper");
    data.products.forEach(function(product) {
        let element = document.importNode(template.content, true);
        element.querySelector("img").src = "https:" + product.image;
        element.querySelector("h3").innerHTML = product.name;
        element.querySelector(".description").innerHTML = product.description;
        element.querySelector(".old-price").innerHTML = `De: R$${product.oldPrice.toFixed(2)}`;
        element.querySelector(".current-price").innerHTML = `Por: R$${product.price.toFixed(2)}`;
        element.querySelector(".installments").innerHTML = `ou ${product.installments.count}x de R$${product.installments.value.toFixed(2)}`;
        productsWrapper.appendChild(element)
        console.log(product);
    });
};