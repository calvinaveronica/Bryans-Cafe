const XHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

let mealList, hotBevs, otherBevs;

XHR.onreadystatechange = function () {
    if (XHR.readyState === 4 && XHR.status === 200) {
        console.log("XML file loaded successfully!");
        fetchMenu();
        populateMenu(mealList, hotBevs, otherBevs);
    } else if (XHR.readyState === 4) {
        console.error("Failed to load XML file. Status:", XHR.status);
    }
};
XHR.open("GET", "xml/menu.xml", true);
XHR.send();

function fetchMenu() {
    console.log("Parsing XML...");
    const responseXML = XHR.responseXML;
    mealList = responseXML.getElementsByTagName('meals')[0]?.children || [];
    hotBevs = responseXML.getElementsByTagName('hotBeverages')[0]?.children || [];
    otherBevs = responseXML.getElementsByTagName('otherBeverages')[0]?.children || [];
    console.log("Meals:", mealList.length, "Hot Beverages:", hotBevs.length, "Other Beverages:", otherBevs.length);
}

function generateCard(name, price, desc, imageURL) {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card">
            <img src="${imageURL || 'images/placeholder.jpg'}" class="card-img-top" alt="Menu item - ${name}">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${desc || ''}</p>
                <p class="card-text"><strong>Price:</strong> $${price}</p>
            </div>
        </div>
    `;
    console.log("Generated card for:", name);
    return card;
}

function populateMenu(meals, hotBevs, otherBevs) {
    console.log("Populating menu...");
    populateMeals(meals);
    populateBeverages(hotBevs, otherBevs);
}

function populateMeals(meals) {
    const menu = document.getElementById('menu');
    Array.from(meals).forEach(meal => {
        const name = meal.querySelector("name")?.textContent.trim() || "Unnamed Meal";
        const price = meal.querySelector("price")?.textContent.trim() || "0.00";
        const desc = meal.querySelector("description")?.textContent.trim() || "";
        const imageURL = meal.querySelector("imageURL")?.textContent.trim();
        menu.appendChild(generateCard(name, price, desc, imageURL));
    });
}

function populateBeverages(hotBevs, otherBevs) {
    const menu = document.getElementById('menu');

    // Hot Beverages
    Array.from(hotBevs).forEach(beverage => {
        const size = `Coffee and Hot Chocolates - ${beverage.querySelector("size")?.textContent.trim() || "Unknown Size"}`;
        const price = beverage.querySelector("price")?.textContent.trim() || "0.00";
        const desc = beverage.querySelector("description")?.textContent.trim() || "";
        const imageURL = "images/beverage.jpg";
        menu.appendChild(generateCard(size, price, desc, imageURL));
    });

    // Other Beverages
    Array.from(otherBevs).forEach(beverage => {
        const name = beverage.querySelector("name")?.textContent.trim() || "Unnamed Beverage";
        const price = beverage.querySelector("price")?.textContent.trim() || "0.00";
        const imageURL = "images/beverage.jpg";
        menu.appendChild(generateCard(name, price, "", imageURL));
    });
}
