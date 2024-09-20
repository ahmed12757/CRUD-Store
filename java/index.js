// !html elments
var NameInput = document.getElementById("name");
var cotegoryInput = document.getElementById("cotegory");
var priceInput = document.getElementById("price");
var descriotionInput = document.getElementById("descriotion");
var getimgInput = document.getElementById("getimg");
var ProductContenar = document.getElementById("ProductContenar");
var search = document.getElementById("search");
var AddBtn = document.getElementById("AddBtn");
var UpdateBtn = document.getElementById("UpdateBtn");

// ^App variables
var updateindex;

var NameRegex = /^[A-Z]+(\s*[ـ\-&\S]\s*\w+)+$/;
var cotegoryeRegex = /^[A-Z][a-z]{3,}$/;
var PriceRegex = /^[0-9]+$/;
var DescriotionRegex = /^(?=.*\b\w+\b).{25,}$/;

//compare if local storage have data or not
var allproducts = JSON.parse(localStorage.getItem("product")) || [];
DisplayProducts(); // cole function DisplayProducts

// &functions

// this function for button to add products
function addproduct() {
  if (
    validate(NameRegex, NameInput) &&
    validate(cotegoryeRegex, cotegoryInput) &&
    validate(PriceRegex, priceInput) &&
    validate(DescriotionRegex, descriotionInput)
  ) {
    var product = {
      name: NameInput.value,
      cotegory: cotegoryInput.value,
      price: priceInput.value,
      descriotion: descriotionInput.value,
      getimg: "./imgs/" + getimgInput.files[0].name,
    };
    allproducts.push(product); // edet in list
    localStorage.setItem("product", JSON.stringify(allproducts)); //to save product in local storage
    displayproducts(allproducts.length - 1); //cole function displayproducts & give number of index
    ClearInputs(); //cole function ClearInputs
  }
}
// to display all products in the website
function displayproducts(index) {
  var productHTML = `
  <div class="col-md-4 col-sm-6 col-lg-3 my-3">
          <div class="inner p-4 ">
          <figure>
           <img
              class="w-100 mb-3"
              src="${allproducts[index].getimg}"
              alt=""
            />
            </figure>
           
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="h5"> ${allproducts[index].name} </h2>
              <span>${allproducts[index].price} $</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <h3 class="h6">${allproducts[index].cotegory} </h3>
            </div>
            <p class="text-secondary">
              ${allproducts[index].descriotion}
            </p>
            <button class="btn btn-outline-warning text-uppercase py-1 px-2 "onclick="getData(${index})"> update</button>
            <button class="btn btn-outline-danger text-uppercase py-1 px-2 " onclick="DeletedProduct( ${index} )"> deletE</button>
          </div>
        </div>
  `;
  ProductContenar.innerHTML += productHTML;
}
function DisplayProducts() {
  for (var i = 0; i < allproducts.length; i++) {
    displayproducts(i);
  }
}
// function to Cleare Inputs
function ClearInputs() {
  NameInput.value = "";
  cotegoryInput.value = "";
  priceInput.value = "";
  descriotionInput.value = "";
  getimgInput.value = "";
}
// function to Deleted Product
function DeletedProduct(index) {
  allproducts.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(allproducts));
  ProductContenar.innerHTML = "";
  DisplayProducts();
}
// search function
function SearchProduct() {
  ProductContenar.innerHTML = "";
  for (var i = 0; i < allproducts.length; i++) {
    if (
      allproducts[i].name.toLowerCase().includes(search.value.toLowerCase())
    ) {
      displayproducts(i);
    }
  }
}

function validate(Regex, element) {
  if (Regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
function getData(index) {
  updateindex = index;
  NameInput.value = allproducts[index].name;
  cotegoryInput.value = allproducts[index].cotegory;
  priceInput.value = allproducts[index].price;
  descriotionInput.value = allproducts[index].descriotion;
  UpdateBtn.classList.remove("d-none");
  AddBtn.classList.add("d-none");
}
function updateElement() {
  allproducts[updateindex].name = NameInput.value;
  allproducts[updateindex].cotegory = cotegoryInput.value;
  allproducts[updateindex].price = priceInput.value;
  allproducts[updateindex].descriotion = descriotionInput.value;
  if (getimgInput.files.length > 0) {
    allproducts[updateindex].getimg="./imgs/" + getimgInput.files[0].name;
  }
  UpdateBtn.classList.add("d-none");
  AddBtn.classList.remove("d-none");
  localStorage.setItem("product", JSON.stringify(allproducts)); //to save product in local storage
  ProductContenar.innerHTML = "";
  DisplayProducts();
  ClearInputs(); //cole function ClearInputs
}
