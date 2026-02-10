'use strict';

const weatherAPIKey = '2b5ba8d5766b4012e031a5915825fb2e';
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API Key}&units=metric`;

// MENU HANDLER

function menuHandler() {
  document.querySelector('#open-nav-menu').addEventListener('click', function() {
  document.querySelector('header nav .wrapper').classList.add('nav-open');
});

document.querySelector('#close-nav-menu').addEventListener('click', function() {
  document.querySelector('header nav .wrapper').classList.remove('nav-open');
});
}

// GREETING AND TEMPERATURE

function greetingHandler() {
  
let currentHour = new Date().getHours();
let greetingText;

if (currentHour < 12) {
  greetingText = 'Good morning!';
} else if (currentHour < 18) {
  greetingText = 'Good afternoon!';
} else if (currentHour <= 23) {
  greetingText = 'Good evening!';
} else {
  greetingText = 'Hello!';
}

document.querySelector('#greeting').innerHTML = greetingText;
}

// WEATHER HANDLER

function weatherHandler() {
  
function celsiusToFahr(temperature) {
  let fahr = (temperature * 9) / 5 + 32;
  return fahr;
}

navigator.geolocation.getCurrentPosition(position => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let weatherURL = weatherAPIURL
    .replace('{lat}', latitude)
    .replace('{lon}', longitude)
    .replace('{API Key}', weatherAPIKey);

  fetch(weatherURL)
  .then(response => response.json())
  .then(data => {
    const condition = data.weather[0].description;
    const location = data.name;
    const temperature = data.main.temp;

    console.log(data);

    let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`;
    let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;

    document.querySelector('p#weather').innerHTML = celsiusText;

    document.querySelector('.weather-group').addEventListener('click', function(event) {
      if (event.target.id == 'celsius') {
          document.querySelector('p#weather').innerHTML = celsiusText;
      } else if (event.target.id == 'fahr') {
          document.querySelector('p#weather').innerHTML = fahrText;
      }  
      });
  }).catch(error => {
    document.querySelector('p#weather').innerHTML = "Unable to retrieve weather data. Please refresh and try again.";
  });
});
}

// LOCAL TIME

function updateLocalTime() {
  setInterval(function(){
  let localTime = new Date();
  document.querySelector('span[data-time=hours]').textContent = String(localTime.getHours()).padStart(2, '0');
  document.querySelector('span[data-time=minutes]').textContent = String(localTime.getMinutes()).padStart(2, '0');
  document.querySelector('span[data-time=seconds]').textContent = String(localTime.getSeconds()).padStart(2, '0');
}, 1000);
}

// GALLERY SECTION 

function galleryHandler() {
  const galleryImages = [
  {
    src: './assets/gallery/image1.jpg',
    alt: 'Thumbnail Image 1'
  },
  {
    src: './assets/gallery/image2.jpg',
    alt: 'Thumbnail Image 2'
  },
  {
    src: './assets/gallery/image3.jpg',
    alt: 'Thumbnail Image 3'
  }
];

let mainImg = document.querySelector('#gallery > img');
let thumbnails = document.querySelector('#gallery .thumbnails');

mainImg.src = galleryImages[0].src;
mainImg.alt = galleryImages[0].alt;

/* <img src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1" data-array-index="0" data-selected="true"></img> */

galleryImages.forEach(function(image, index){
  let thumb = document.createElement('img');
  thumb.src = image.src;
  thumb.alt = image.alt;
  thumb.dataset.arrayIndex = index;
  thumb.dataset.selected = index === 0 ? true : false;

  // if(index === 0) {
  //   thumb.dataset.selected = true;
  // } else {
  //   thumb.dataset.selected = false;
  // }

  thumb.addEventListener('click', function(event){
    let selectedIndex = event.target.dataset.arrayIndex;
    let selectedImg = galleryImages[selectedIndex];

    mainImg.src = selectedImg.src;
    mainImg.alt = selectedImg.alt;

    // Update selected state on thumbnails
    thumbnails.querySelectorAll('img').forEach(function(img){
      img.dataset.selected = false;
    });

    event.target.dataset.selected = true;
  });

  thumbnails.appendChild(thumb);
});
}

// PRODUCTS SECTION ----------------------------------

function populateProducts(productList) {

  let productsSection = document.querySelector('.products-area');
  // Clear existing products when user clicks on course filter (all, paid, free)
  productsSection.innerHTML = '';

  // Loop through products array and create product elements
  productList.forEach(function(product, index){

    // Create product item container
    let productElm = document.createElement('div');
    // Add class to product item
    productElm.classList.add('product-item');

    // Create product image element and use title from product object for alt attribute
    let productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = 'Image for ' + product.title;

    // Create product details container
    let productDetails = document.createElement('div');
        productDetails.classList.add('product-details');

    // create title, author, price elements here
    let productTitle = document.createElement('h3');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;

    let productAuthor = document.createElement('p');
        productAuthor.classList.add('product-author');
        productAuthor.textContent = product.author;

    let priceTitle = document.createElement('p');
        priceTitle.classList.add('price-title');
        priceTitle.textContent = 'Price';

    let productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = product.price > 0 ? '$' + product.price.toFixed(2) : 'Free';

    // Append title, author, price title, price to product details container
    productDetails.append(productTitle);
    productDetails.append(productAuthor);
    productDetails.append(priceTitle);
    productDetails.append(productPrice);

    // Add all child elements of the product item here (details, title, author, price, etc.)
    productElm.append(productImg);
    productElm.append(productDetails);
    
    // Add complete individual product item to products section
    productsSection.append(productElm);
  });
}

function productsHandler() {
  /* <div class="product-item">
  <img src="./assets/products/img6.png" alt="AstroFiction">
  <div class="product-details">
    <h3 class="product-title">AstroFiction</h3>
    <p class="product-author">John Doe</p>
    <p class="price-title">Price</p>
    <p class="product-price">$ 49.90</p>
  </div>
</div> */

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ];


  // let freeProducts = products.filer(item => !item.price || Number(item.price) <= 0);
  let freeProducts = products.filter(function(item){
    return !item.price || Number(item.price) <= 0;
  });

  // let paidProducts = products.filter(item => item.price && Number(item.price) > 0);
  let paidProducts = products.filter(function(item){
    return item.price && Number(item.price) > 0;
  });

populateProducts(products);

document.querySelector('.products-filter label[for=all] span.product-amount').textContent = products.length;
document.querySelector('.products-filter label[for=paid] span.product-amount').textContent = paidProducts.length;
document.querySelector('.products-filter label[for=free] span.product-amount').textContent = freeProducts.length;

let productsFilter = document.querySelector('.products-filter');
productsFilter.addEventListener('click', function(event){
  if (event.target.id === 'all') {
    populateProducts(products);
  } else if (event.target.id === 'paid') {
    populateProducts(paidProducts);
  } else if (event.target.id === 'free') {
    populateProducts(freeProducts);
  }
});
}

function footerHandler() {
  let currentYear = new Date().getFullYear();
  document.querySelector('footer').innerHTML = `&copy; ${currentYear} &mdash; All rights reserved`;
}


menuHandler();
greetingHandler();
weatherHandler();
updateLocalTime();
galleryHandler();
productsHandler();
footerHandler();