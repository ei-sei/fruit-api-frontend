const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");

fruitForm.addEventListener("submit", extractFruit);

// fruitList.addEventListener("click", (e) => console.log(e.target))
// fruitList.addEventListener("click", (e) => e.target.remove())

function extractFruit(e) {
    e.preventDefault();
    let fruitInput = e.target.fruitInput.value;

    if (fruitInput) {
        addFruit(fruitInput);
    }

    e.target.reset();
};


function addFruit(fruit) {
    const li = document.createElement('li');

    li.textContent = fruit;

    li.addEventListener('click', removeFruit)

    // li.className = "list-item"

    //append list item to the html list
    fruitList.appendChild(li);


};

function removeFruit(e){
    e.target.remove();
}

