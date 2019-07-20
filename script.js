var nextPage = '//frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1';

window.onload = function() {
    getProducts(nextPage);
};

function getProducts(url) {
    request(url, function(responseText) {
        var data = JSON.parse(responseText);
        nextPage = `//${data.nextPage}`;
        var template = document.getElementById("product-card");
        var productsWrapper = document.getElementById("products-wrapper");
        data.products.forEach(function(product) {
            var element = document.importNode(template.content, true);
            element.querySelector("img").src = product.image;
            element.querySelector("h3").innerHTML = product.name;
            element.querySelector(".description").innerHTML = product.description;
            element.querySelector(".old-price").innerHTML = `De: R$${product.oldPrice.toFixed(2)}`;
            element.querySelector(".current-price").innerHTML = `Por: R$${product.price.toFixed(2)}`;
            element.querySelector(".installments").innerHTML = `ou ${product.installments.count}x de R$${product.installments.value.toFixed(2)}`;
            productsWrapper.appendChild(element);
        });
    });
};

function request(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText)
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send();  
}