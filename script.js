const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p")

const fruitNutritionImages = document.querySelector("#nutritionSection img")
const APIkey = '33986170-cb342e36e814b5e7e54b0ada5'




fruitForm.addEventListener("submit", extractFruit);

// fruitList.addEventListener("click", (e) => console.log(e.target))
// fruitList.addEventListener("click", (e) => e.target.remove())

function extractFruit(e) {
    e.preventDefault();
    let fruitInput = e.target.fruitInput.value;

    if (fruitInput) {
        // addFruit(fruitInput);
        fetchFruitData(fruitInput);
    }

    e.target.reset();
};


function addFruit(fruit) {

    let cal = 0;

    console.log(fruit);

    //create list item
    const li = document.createElement('li');

    //assign text to list item
    li.textContent = fruit['name'];

    li.addEventListener('click', removeFruit)

    // li.className = "list-item"

    //append list item to the html list
    fruitList.appendChild(li);

    fruitNutrition.textContent = `Calorie count: ${cal += fruit.nutritions.calories}`
};


function removeFruit(e) {
    e.target.remove();
}


async function fetchFruitData(fruit) {
    try {
        const resp = await fetch(`https://fruity-api.onrender.com/fruits/${fruit}`);
        if (resp.ok) {
            const data = await resp.json()
            addFruit(data)
        }
        else {
            throw `Error; http status code = ${resp.status}`
        }
    } catch (e) {
        console.log(e);
    }
}


// function fetchFruitData(fruit) {
//     fetch(`https://fruity-api.onrender.com/fruits/${fruit}`)
//         .then(resp => processResponse(resp))
//         .then(data => addFruit(data))
//         .catch((e) => console.log(e))
// }


// function processResponse(resp) {
//     if (resp.ok) {
//         return resp.json()
//     }
//     else {
//         throw `Error; http status code = ${resp.status}`
//     }
// }

