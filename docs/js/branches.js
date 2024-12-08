const XHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
let cards = document.getElementById('branches'); // Make sure the ID matches in your HTML
let branchList;

// Fetch the branches data
XHR.onreadystatechange = function () {
    if (XHR.readyState == 4 && XHR.status == 200) {
        branchList = XHR.responseXML.getElementsByTagName('branch');
        populateBranches(branchList);
    }
};

XHR.open("GET", "xml/branches.xml", true);
XHR.send();

// Generate and populate cards with branch data
function generateCard(address, contact, hours, mapsLink) {
    let card = document.createElement("div");
    card.classList.add("col");

    card.innerHTML = `
        <div class="card">
            <iframe id="branch1" src="${mapsLink}" width="100%" height="300px" style="border:0;" allowfullscreen="" loading="lazy" class="card-img-top"></iframe>
            <div class="card-body">
                <h5 class="card-title">${address}</h5>
                <p class="card-text">${contact}</p>
                <p class="card-text">${hours}</p>
            </div>
        </div>
    `;
    return card;
}

// Populate branches on the page
function populateBranches(branches) {
    Array.from(branches).forEach(branch => {
        let address = branch.getElementsByTagName("address")[0].textContent;
        let contact = branch.getElementsByTagName("contact")[0].textContent;
        let hours = branch.getElementsByTagName("hours")[0].textContent;
        let mapsLink = branch.getElementsByTagName("mapsLink")[0].textContent;

        // Append each card to the branches section
        cards.appendChild(generateCard(address, contact, hours, mapsLink));
    });
}
