var requestURL = 'https://gist.githubusercontent.com/mapreuss/cccf0781ba848648d9d8a6510201a027/raw/74b72ac19728a92306b296863b5a81c8a0b3d8d7/test.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();
request.onload = function() {
    var products = request.response;
    var productGrid = document.querySelector('.js-product-grid');
    
    if (!(products && productGrid)) {
        return;
    }

    var productsHTML = products.reduce((html, product) => {
        var instalment = '$' + (Number(product.price.replace('$', '')) / product.installmentTimes).toFixed(2);
        return html += `
            <li>
                <article class="product">
                <figure>
                    <img src="${product.picture}" alt="${product.name}">
                </figure>
                <div class="content">
                    <p class="name">${product.name}</p>
                    <p class="description">${product.description}</p>
                    <p class="old-price">De: R${product.oldPrice}</p>
                    <p class="price">Por: R${product.price}</p>
                    <p class="instalment">ou ${product.installmentTimes}x de ${instalment}</p>
                    <button class="buy" onclick="alert('Produto não adicionado ao seu carinho!')">Comprar</button>
                </div>
                </article>
            </li>
        `;
    }, '');

    productGrid.innerHTML = productsHTML;
}