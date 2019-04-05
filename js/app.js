'use strict';
Product.allProducts = [];
Product.productsShownLast = [];
Product.productsAlreadySelected = [];

new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');

new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

function Product(Name, filepath) {
  this.name = Name;
  this.filepath = filepath;
  this.id = filepath.replace('/',':').replace('.',':');
  this.noOfTimesDiplayed = 0;
  this.votes = 0;
  Product.allProducts.push(this);
}


function refreshRandomProducts(){
  console.log('Refreshing Products')

  // var randomIdx = Math.floor(Math.random() * Product.allProducts.length);
  // var imgContainer = document.getElementById('prod-pic1');
  // console.log(Product.allProducts[randomIdx].filepath);
  // Product.allProducts[randomIdx].noOfTimesDiplayed += 1;
  // imgContainer.src = Product.allProducts[randomIdx].filepath;
  // imgContainer.nextSibling.nextSibling.value = Product.allProducts[randomIdx].id;
  // imgContainer.nextSibling.nextSibling.id = Product.allProducts[randomIdx].id;

  // var randomIdx = Math.floor(Math.random() * Product.allProducts.length);
  // var imgContainer = document.getElementById('prod-pic2');
  // console.log(Product.allProducts[randomIdx].filepath);
  // Product.allProducts[randomIdx].noOfTimesDiplayed += 1;
  // imgContainer.src = Product.allProducts[randomIdx].filepath;
  // imgContainer.nextSibling.nextSibling.value = Product.allProducts[randomIdx].id;
  // imgContainer.nextSibling.nextSibling.id = Product.allProducts[randomIdx].id;

  // var randomIdx = Math.floor(Math.random() * Product.allProducts.length);
  // var imgContainer = document.getElementById('prod-pic3');
  // console.log(Product.allProducts[randomIdx].filepath);
  // Product.allProducts[randomIdx].noOfTimesDiplayed += 1;
  // imgContainer.src = Product.allProducts[randomIdx].filepath;
  // imgContainer.nextSibling.nextSibling.value = Product.allProducts[randomIdx].id;
  // imgContainer.nextSibling.nextSibling.id = Product.allProducts[randomIdx].id;

  Product.productsAlreadySelected = [];
  var productImages = document.getElementsByClassName('product-image')
  //console.log(productImages)
  for(var i = 0; i < productImages.length; i++){
    var prodImg = productImages[i];
    console.log(prodImg);
    var nextProduct = undefined;
    while(nextProduct === undefined){
      console.log('In finding next product to show');
      var randomProduct = getRandomProduct();
      //debugger;
      if(isProdutShownAlready(randomProduct) == false){
        nextProduct = randomProduct;
      }  
    }
    prodImg.src = nextProduct.filepath;
    prodImg.nextSibling.nextSibling.value = nextProduct.id;
    prodImg.nextSibling.nextSibling.id = nextProduct.id;
    nextProduct.noOfTimesDiplayed += 1;

    Product.productsAlreadySelected.push(nextProduct);

  }
  Product.productsShownLast = Product.productsAlreadySelected;
}

function isProdutShownAlready(productToCheck){
  console.log('product to check', productToCheck);
  var productsShownRecently = Product.productsShownLast.concat(Product.productsAlreadySelected);
  console.log('products list', productsShownRecently);
  for(var j=0; j< productsShownRecently.length; j++){
    if(productToCheck.id == productsShownRecently[j].id){
      return true;
    }
  }
  return false;
}

function getRandomProduct(){
  var randomIdx = Math.floor(Math.random() * Product.allProducts.length);
  return Product.allProducts[randomIdx];
}

var selectionCount = 0;
function recordVote(event){
  //console.log(event);
  console.log('---In recordVote---')
  //console.log(event.target.favPhoto)
  var selProduct ='';
  for (var i = 0; i < event.target.favPhoto.length; i++) {
    if (event.target.favPhoto[i].checked){
      console.log('Selected', event.target.favPhoto[i].value);
      selProduct = event.target.favPhoto[i].value;
      selectionCount++;
      for(var j = 0; j < Product.allProducts.length; j++){
        if(Product.allProducts[j].id == event.target.favPhoto[i].value){
          Product.allProducts[j].votes += 1;
        }
      }
      break;
    }
  }
  
  if(selectionCount == 3){
    voteForm.removeEventListener('submit', recordVote);
    var voteButton =  document.getElementById('voteProduct');
    voteButton.style.display = "none";
    showResults();
  }
  else{
    refreshRandomProducts();
  }
  voteForm.reset();
  event.preventDefault();
}

function showResults(){
  var listElement = document.createElement('ul');

  for(var i = 0; i < Product.allProducts.length; i++){
    var liElement = document.createElement('li');
    liElement.innerHTML = `${Product.allProducts[i].votes} votes for ${Product.allProducts[i].name}`
    listElement.appendChild(liElement);
  }
  document.getElementById('results').appendChild(listElement);
  document.getElementById('results').style.display = "block";
}

var voteForm =  document.getElementById('vote_form');
voteForm.addEventListener('submit', recordVote)

document.getElementById('results').style.display = "none";
refreshRandomProducts();