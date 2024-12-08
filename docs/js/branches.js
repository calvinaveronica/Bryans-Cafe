const XHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
let cards = document.getElementsByClassName('cardDesk')[0];  // Assuming 'cardDesk' is the class where branches should appear
let branchList;

XHR.onreadystatechange = function() {
    fetchBranches() ? populateBranches(branchList) : fetchBranches();
};

XHR.open("GET", "xml/branches.xml", true);
XHR.send();

function fetchBranches() {
    if (XHR.readyState === 4 && XHR.status === 200) {
        console.log("XML loaded successfully");
        branchList = XHR.responseXML.getElementsByTagName('branch');
        console.log(branchList);  // Check if branches are being fetched correctly
        return true;
    } else {
        console.log("XML loading failed", XHR.status);
        return false;
    }
}

function generateCard(address, contact, hours, mapsLink) {
    let card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card">
            <iframe id="branch1" src="${mapsLink}"
                width="100%" height="300px" style="border:0, margin:auto" allowfullscreen="" loading="lazy" class="card-img-top"></iframe>
            <div class="card-body">
                <h5 class="card-title">${address}</h5>
                <p class="card-text">${contact}</p>
                <p class="card-text">${hours}</p>
            </div>
        </div>
        `;
    return card;
}

function populateBranches(branches) {
    if (branches.length === 0) {
        console.log("No branches found in XML.");
    }
    
    Array.from(branches).forEach(branch => {
        let address = branch.getElementsByTagName("address")[0].textContent;
        let contact = branch.getElementsByTagName("contact")[0].textContent;
        let hours = branch.getElementsByTagName("hours")[0].textContent;
        let mapsLink = branch.getElementsByTagName("mapsLink")[0].textContent;

        console.log("Adding branch:", address);  // Debugging line to see which branch is being added
        cards.appendChild(generateCard(address, contact, hours, mapsLink));
    });
}
