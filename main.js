const catSelect = document.getElementById('category');
const CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php'
const mealSelect = document.getElementById('mealSelect')
const listIngredients = document.getElementById('recipe-ingredients')



fetch(CATEGORY_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data.categories)
        const categoryArray = data.categories.map(i => i.strCategory);        
        console.log(categoryArray);
        for (let i=0;i<categoryArray.length; i++) {
            const option = document.createElement('option');
            option.value = categoryArray[i];
            option.innerText = option.value;
            catSelect.appendChild(option);
        }
})
 
catSelect.addEventListener('change', event => {
    const CATEGORY_FILTER = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catSelect.value}`
    getMealsByCategory(CATEGORY_FILTER);
})

const getMealsByCategory = url => {
    fetch(url) 
    .then(res => res.json())
    .then(data => {
    console.log(data)
    const mealArray = data.meals.map(i => i.strMeal);        
    console.log(mealArray);
    document.getElementById('mealSelect').options.length = 1;
    for (let i=0;i<mealArray.length; i++) {
        const option = document.createElement('option');        
        option.value = mealArray[i];
        option.innerText = option.value;
        mealSelect.appendChild(option);
    }
})
}

mealSelect.addEventListener('change', event => {
    const MEAL_NAMES = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealSelect.value}`
    getMealInfo(MEAL_NAMES)
})

document.getElementById('random').addEventListener('click', event => {
    const RANDOM_MEAL = `https://www.themealdb.com/api/json/v1/1/random.php`
    getMealInfo(RANDOM_MEAL)
})

const getMealInfo = url => {
    fetch(url) 
    .then(res => res.json())
    .then(data => {
    console.log(data.meals[0])
    const mealIdea = new MealInfo(data.meals[0])
    mealIdea.showInfo()
    mealIdea.getIngredientArray(data.meals[0])
       
})
}

class MealInfo {
    constructor(mealData) {
        this.name = mealData.strMeal
        this.img = mealData.strMealThumb
        this.instructions = mealData.strInstructions 
    }
   
    showInfo() {
        document.getElementById('recipeName').innerHTML = this.name;
        document.getElementById('recipeImg').src = this.img;
        document.getElementById('recipe-instructions').innerHTML = this.instructions;
    }

    getIngredientArray(obj) {
        const ingArray = Object.values(obj)
        let mainArr = [];
        const ingredientList = document.getElementById('recipe-ingredients');
        ingredientList.innerHTML = ''
        for (let i=9; i<=48; i++) {

            mainArr.push(ingArray[i])
                 

        }
        for (let i = 0; i<mainArr.length-20; i++) { 
                if(!mainArr[i]) {
                    return
                } else {
                var ul = document.getElementById("recipe-ingredients");
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(`${mainArr[i+20]} ${mainArr[i]}`));
                ul.appendChild(li);
                }
            } 
              console.log(mainArr);
    }
    
        
}

function removeSpec() {
    var myList = document.getElementById("recipe-ingredients"); /* Var to reference the list */  
    myList.querySelectorAll('li').forEach(function(item) {
      if (!item.innerHTML)
        item.remove();
    });
  }

// var x=document.getElementById("summaryOL");
// newLI = document.createElementNS(null,"li");
// newText = document.createTextNode(txt);
// newLI.appendChild(newText);
// x.appendChild(newLI);

