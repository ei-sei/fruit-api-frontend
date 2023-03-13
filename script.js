const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const createForm = document.querySelector("#create-form");

let cal = 0;
const fruitCal = {};
const APIkey = '33986170-cb342e36e814b5e7e54b0ada5'

fruitForm.addEventListener("submit", extractFruit);
createForm.addEventListener("submit", createNewFruits);

function extractFruit(e) {
    e.preventDefault();
    let fruitInput = e.target.fruitInput.value;
    if (fruitInput) {
        fetchFruitData(fruitInput);
    }
    e.target.reset();
};

function addFruit(fruit, fruitImage) {
    const img = document.createElement("img");
    img.alt = fruit.name;
    img.src = fruitImage.hits[0].previewURL;

    img.addEventListener("click", removeFruit, { once: true });
    fruitList.appendChild(img);

    fruitCal[fruit.name] = fruit.nutritions.calories;

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = `Calorie count: ${cal}`;
};

function removeFruit(e) {
    const fruitName = e.target.alt;
    cal -= fruitCal[fruitName];
    fruitNutrition.textContent = cal;

    delete fruitCal[fruitName];
    e.target.remove();
};


async function fetchFruitData(fruit) {
    try {
        // const respData = await fetch(`https://fruity-api.onrender.com/fruits/${fruit}`);
        const respData = await fetch(`https://fruit-api-6m8m.onrender.com/fruits/${fruit}`);
        const respImage = await fetch(`https://pixabay.com/api/?key=${APIkey}&q=${fruit}&image_type=photo&pretty=true`);

        if (respData.ok && respImage.ok) {
            const data = await respData.json();
            const imgData = await respImage.json();
            addFruit(data, imgData);
        }
        else {
            throw "Something has gone wrong with on of the API requests"
        }
    } catch (e) {
        console.log(e);
    }
}

async function createNewFruits(e) {
    e.preventDefault();
    const data = { name: e.target.fruitInput.value };

    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data)
    }

    const response = await fetch("https://fruit-api-6m8m.onrender.com/fruits", options);

    let messageStatus = document.querySelector("#message")
    if (response.status === 201) {
        e.target.fruitInput.value = ''
        messageStatus.textContent = "Fruit successfully created."
        setTimeout(() => {
            messageStatus.textContent = ""
        }, 4000)
    } else {
        e.target.fruitInput.value = ''
        messageStatus.textContent = "This fruit already exists. Please enter another fruit!"
        setTimeout(() => {
            messageStatus.textContent = ""
        }, 4000)
    }
};

