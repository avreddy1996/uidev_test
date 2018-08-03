/* function to get the products data and send the response to call back function */
function loadDoc(url, done) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            done(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
/*====== function to get number of stars =====*/
function getStars(count) {
    var stars = '';
    for(var i=0; i<count;i++){
        stars += '<div>\n' +
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 19.481 19.481" enable-background="new 0 0 19.481 19.481" width="10px" height="10px">\n' +
            '  <g>\n' +
            '    <path d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z" fill="#ff1493"/>\n' +
            '  </g>\n' +
            '</svg></div>\n'
    }
    return stars;
}
/*========= function to get price text =========*/
function getPrice(product) {
    var price = '';
    price = '<h3>'+product.price+'&nbsp;&nbsp;</h3>';
    if(product.oldPrice){
        price += '<span class="old-price">'+product.oldPrice+'</span><span class="save-price">&nbsp;&nbsp;&nbsp;You save '+product.savings+'</span>'
    }
    return price;
}
/*======== function to get fav icon ======*/
function getFavIcon(isFav) {
    var icon ='';
    if(isFav){
        icon = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
            '\t viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve" width="20px" height="20px">\n' +
            '<path style="fill:#FF1493;" d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543\n' +
            '\tc0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503\n' +
            '\tc-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/>\n' +
            '</svg>'
    }else{
        icon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 471.701 471.701" style="enable-background:new 0 0 471.701 471.701;" xml:space="preserve" width="20px" height="20px">\n' +
            '<g>\n' +
            '\t<path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" fill="#ff1493"/>\n' +
            '</g>\n' +
            '</svg>'
    }
    return icon;
}
/*===== callback function to get the response data and render it to DOM ========*/
function parseData(xhttp) {
    var products = JSON.parse(xhttp.response);
    var el = document.getElementById('products');
    var countEl = document.getElementById('count');
    countEl.innerHTML = '<h4 class="count-text">'+products.length+'&nbsp;results</h4>';
    for(var i=0; i<products.length;i++){
        var card = document.createElement('div');
        card.setAttribute("id","product-"+i);
        el.appendChild(card);
        var product = products[i];
        var productCard = '<div class="product-card">' +
            '<div class="card-header"><img src="'+product.picture+'" alt="product image" >' +
            '<div class="fav-icon" id="fav-'+i+'">' +
            getFavIcon(product.isFav)+'</div></div>' +
            '<div class="card-content">' +
            '<h5>'+product.name+'</h5>' +
            '<h6>'+product.size+'</h6><div class="stars">'+getStars(product.rating)+'</div>' +
            '<div class="price">'+getPrice(product)+'</div> </div></div>';
        document.getElementById('product-'+i).innerHTML = productCard;
    }
}

loadDoc('../../src/data/products.json', parseData);