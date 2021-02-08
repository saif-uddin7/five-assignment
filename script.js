const searchButton = document.getElementById("searchButton")
const productList = document.getElementById("product")
const productIngradient = document.querySelector(".product-ingradient")
const productCloseBtn = document.getElementById("closeButton")

//Add event listener
searchButton.addEventListener("click", getProductList)
productList.addEventListener("click", getProductIngradient)

//Creat product List
function getProductList() {
    let searchInput = document.getElementById("search-box-input")
    let searhcInputText = searchInput.value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searhcInputText}`)
        .then(response => response.json())
        .then(data => {
            let html = ``
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class="product-item col-md-3 text-center bg-white  pb-3" data-id="${meal.idMeal}">                        
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" class="img-fluid meal-img" alt="food">
                            </div>
                            <div class="meal-name">
                                <h2 class="mt-3 meal-h">${meal.strMeal}</h2>
                            </div>                       
                    </div>
                    `
                });
            } else {
                document.getElementById("unsuccessAlert").style.display = "block"
            }
            document.getElementById('cancel').addEventListener("click", function() {
                document.getElementById("unsuccessAlert").style.display = "none"
            })
            productList.innerHTML = html
        })
    searchInput.value = ''
}
//Get Ingradient
function getProductIngradient(event) {
    event.preventDefault();
    if (event.target.classList.contains('meal-img') || event.target.classList.contains('meal-h')) {
        let mealItem = event.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealIngradientModal(data.meals))

    }
}
//Ingridients in Modal
function mealIngradientModal(meal) {
    meal = meal[0]
    let html = `
        <img src="${meal.strMealThumb}" class="img-fluid" alt="food">
         <h2 class="meal-title">${meal.strMeal}</h2>
         <h3>Ingradients</h3>
         <ul id="myIngradient">
            <li>${ product.strIngredient1}</li>
            <li>${ product.strIngredient2}</li>
            <li>${ product.strIngredient3}</li>
            <li>${ product.strIngredient4}</li>
            <li>${ product.strIngredient5}</li>
            <li>${ product.strIngredient6}</li>
            <li>${ product.strIngredient7}</li>
            <li>${ product.strIngredient8}</li>
            <li>${ product.strIngredient9}</li>
            <li>${ product.strIngredient10}</li>
         </ul>               
    `
    productIngradient.innerHTML = html;
    productIngradient.parentElement.classList.add('showMeal')
}
//Close Modal
productCloseBtn.addEventListener('click', () => {
    productIngradient.parentElement.classList.remove('showMeal')
})