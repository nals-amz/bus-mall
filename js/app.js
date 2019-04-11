'use strict';
Product.allProducts = [];
Product.productsShownLast = [];
Product.productsAlreadySelected = [];
var selectionCount = 0;

new Product('Bag', 'img/bag.jpg');
new Product('Banana', 'img/banana.jpg');
new Product('Bathroom', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast', 'img/breakfast.jpg');
new Product('Bubblegum', 'img/bubblegum.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog-duck', 'img/dog-duck.jpg');
new Product('Dragon', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet-sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn', 'img/unicorn.jpg');
new Product('USB', 'img/usb.gif');
new Product('Water-can', 'img/water-can.jpg');
new Product('Wine-glass', 'img/wine-glass.jpg');

function Product(Name, filepath) {
  this.name = Name;
  this.filepath = filepath;
  this.id = filepath.replace('/',':').replace('.',':');
  this.noOfTimesDiplayed = 0;
  this.votes = 0;
  Product.allProducts.push(this);
}

function refreshRandomProducts(){
  console.log('Refreshing Products');

  Product.productsAlreadySelected = [];
  var productImages = document.getElementsByClassName('product-image');
  //console.log(productImages)
  for(var i = 0; i < productImages.length; i++){
    var prodImg = productImages[i];
    console.log(prodImg);
    var nextProduct = undefined;
    while(nextProduct === undefined){
      console.log('In finding next product to show');
      var randomProduct = getRandomProduct();
      //debugger;
      if(isProdutShownAlready(randomProduct) === false){
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
    if(productToCheck.id === productsShownRecently[j].id){
      return true;
    }
  }
  return false;
}

function getRandomProduct(){
  var randomIdx = Math.floor(Math.random() * Product.allProducts.length);
  return Product.allProducts[randomIdx];
}


function recordVote(event){
  console.log(event);
  console.log('---In recordVote---');
  //console.log(event.target.favPhoto)
  var selProduct ='';

  console.log('Selected', event.target.nextSibling.nextSibling.value);
  selProduct = event.target.nextSibling.nextSibling.value;
  selectionCount++;
  for(var j = 0; j < Product.allProducts.length; j++){
    if(Product.allProducts[j].id === selProduct){
      Product.allProducts[j].votes += 1;
      break;
    }
  }

  if(selectionCount === 25){
    removeEventListners();
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
    liElement.innerHTML = `${Product.allProducts[i].votes} votes for ${Product.allProducts[i].name}`;
    listElement.appendChild(liElement);
  }
  //document.getElementById('results').appendChild(listElement);
  renderVoteResults();

  document.getElementById('results').style.display = 'block';
}

var voteForm =  document.getElementById('vote_form');
var productImages = document.getElementsByClassName('product-image');
function setEventListners(){
  for(var i = 0; i < productImages.length; i++){
    var prodImg = productImages[i];
    prodImg.addEventListener('click', recordVote);
  }

  // voteForm.addEventListener('submit', recordVote)
}
function removeEventListners(){
  for(var i = 0; i < productImages.length; i++){
    var prodImg = productImages[i];
    prodImg.removeEventListener('click', recordVote);
  }
  // voteForm.removeEventListener('submit', recordVote);
  // var voteButton =  document.getElementById('voteProduct');
  // voteButton.style.display = "none";
}
setEventListners();
document.getElementById('results').style.display = 'none';
refreshRandomProducts();

function renderVoteResults(){
  var prodLabels = [];
  var prodVotes = [];
  var prodColors = [];
  var prodBorderColor = [];
  for(var i=0; i<Product.allProducts.length; i++){
    var productObj = Product.allProducts[i]
    if(productObj.votes > 0){
      prodLabels.push(productObj.name);
      prodVotes.push(productObj.votes);
      prodColors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.4)`);
      prodBorderColor.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);
    }
  }

var prodColors2 = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];

  console.log(prodColors, prodBorderColor);
  var ctx = document.getElementById('voteResultsChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: prodLabels,
      datasets: [{
        label: '# of Votes',
        data: prodVotes,
        backgroundColor: prodColors,
        borderColor: prodBorderColor,
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      aspectRatio: 2,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  console.log(myChart);
  
}
