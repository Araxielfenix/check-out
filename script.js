function updateCardNumber(event) {
    if(isFlipped){
        flipCard();
    }
    numberValidation(event);
    document.getElementById("card-number").textContent = event.value;
}

function numberValidation(event){
    //erase any character if it's not a number or a space.
    if (event.value.length > 0) {
        if (isNaN(event.value.substring(event.value.length - 1, event.value.length)) && event.value.substring(event.value.length - 1, event.value.length) != " ") {
            event.value = event.value.substring(0, event.value.length - 1);
        }
        if (event.value.substring(0, 1) == " ") {
            event.value = event.value.substring(1, event.value.length);
        }
        if (event.value.substring(event.value.length - 1, event.value.length) == " ") {
            event.value = event.value.substring(0, event.value.length - 1);
        }
    }

    if(event.value.length == ""){
        cardStyle("", "", "", "");
    }
    document.getElementById("cardNumber").value = event.value.substring(0, 19);
    if (event.value.length == 6) {
        binCheck(event.value.substring(0, 6));
    }
    //every 4 digits add a space.
    if (event.value.length >= 4) {
        document.getElementById("card-number").textContent = event.value.substring(0, 4) + " " + event.value.substring(4, 8) + " " + event.value.substring(8, 12) + " " + event.value.substring(12, 16);
    }
    if (event.value.length == 16) {
        document.getElementById("cardNumber").value = document.getElementById("card-number").textContent;
    }
}

function binCheck(bin) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'd6bdc7a107msh89a608107a00df4p1192ebjsn69b65da30204',
            'X-RapidAPI-Host': 'bin-ip-checker.p.rapidapi.com'
        },
        body: '{"bin": "' + bin + '"}'
    };

    fetch('https://bin-ip-checker.p.rapidapi.com/?bin=' + bin, options)
        .then(response => response.json())
        .then(response => {
            const { brand, type, scheme, issuer } = response.BIN;
            search4Logo(brand);
            cardStyle(brand, type, scheme, issuer.name);
        })
        .catch(err => console.error(err));
}

function search4Logo(brand){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd6bdc7a107msh89a608107a00df4p1192ebjsn69b65da30204',
            'X-RapidAPI-Host': 'duckduckgo-image-search.p.rapidapi.com'
        }
    };
    
    fetch('https://duckduckgo-image-search.p.rapidapi.com/search/image?q=Logo%20' + brand, options)
        .then(response => response.json())
        .then(response => {
            document.getElementById('card-brand').src = response.results[0].image;
        })
        .catch(err => console.error(err));
}
var logoUrl = "";
function cardStyle(brand, type, scheme, issuer) {
    document.getElementById('card-issuerName').textContent = issuer;
    if(issuer.length > 35){
        document.getElementById('card-front').style.height = "120%";
        document.getElementById('card-back').style.height = "120%";
    }
    else{
        document.getElementById('card-front').style.height = "100%";
        document.getElementById('card-back').style.height = "100%";
    }
    if (brand == "VISA") {
        //set a blue color for visa and add an effect of blur.
        document.getElementById('card-front').style.background = "rgb(26 26 108 / 58%)";
        document.getElementById('card-issuerName').style.color = "white";
        document.getElementById('card-Type').style.color = "white";
        document.getElementById('card-front').style.backdropFilter = "blur(2px)";
        document.getElementById('card-back').style.background = "rgb(26 26 108 / 58%)";
        document.getElementById('card-back').style.backdropFilter = "blur(2px)";
        document.getElementById('card-Type').textContent = " (" + type + ")";
    }
    if (brand == "MASTERCARD") {
        //set a orange color for mastercard and add an effect of blur.
        document.getElementById('card-front').style.background = "rgb(255 12 0 / 63%)";
        document.getElementById('card-front').style.backdropFilter = "blur(2px)";
        document.getElementById('card-back').style.background = "rgb(255 12 0 / 63%)";
        document.getElementById('card-back').style.backdropFilter = "blur(2px)";
        document.getElementById('card-Type').textContent = " (" + type + ")";
    }
    if (brand == "") {
        //set a black color for unknown cards and remove the effect of blur.
        document.getElementById('card-front').style.background = "rgba(255, 255, 255, 0.19)";
        document.getElementById('card-front').style.backdropFilter = "blur(2px)";
        document.getElementById('card-back').style.background = "rgba(255, 255, 255, 0.19)";
        document.getElementById('card-back').style.backdropFilter = "blur(2px)";
        document.getElementById('card-brand').src = "";
        document.getElementById('card-Type').textContent = "";
        document.getElementById('card-issuerName').textContent = "Bank Card";
    }
}

function updateCardName(event) {
    if(isFlipped){
        flipCard();
    }
    document.getElementById("card-name").textContent = event.value.toUpperCase();
}

function updateCardExpiry(event) {
    if(isFlipped){
        flipCard();
    }
    validateExpiryDate();
    document.getElementById("card-expiry").textContent = event.value;
}

function validateExpiryDate() {
    // get current date in 2023-03 format.
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var monthString = month < 10 ? "0" + month : month;
    currentDate = year + "-" + monthString;
    if (document.getElementById("cardExpiration").value < currentDate) {
        //set color to red.
        document.getElementById("cardExpiration").style.color = "red";
        document.getElementById("card-expiry").style.color = "red";
        //set border to red.
        document.getElementById("cardExpiration").style.border = "1px solid red";
        //reset the value of the input.
        document.getElementById("cardExpiration").value = "";
    }
    else {
        //set color to black.
        document.getElementById("cardExpiration").style.color = "black";
        document.getElementById("card-expiry").style.color = "black";
        //set border to black.
        document.getElementById("cardExpiration").style.border = "1px solid black";
    }

}

//add a variable to store whether the card is flipped or not.
var isFlipped = false;

function updateCardCVV(event) {
    if(!isFlipped){
        flipCard();
    }
    document.getElementById("card-cvv").textContent = event.value;
    //limit the length of the cvv to 3.
    if (event.value.length > 3) {
        document.getElementById("card-cvv").textContent = event.value.substring(0, 3);
        event.value = event.value.substring(0, 3);
    }
}

function flipCard() {
    //flip the card.
    isFlipped = !isFlipped;
    document.getElementById("inner").classList.toggle("flipped");
    //wait 1 second before flipping the card back.
    setTimeout(function () {
        document.getElementById("card").classList.toggle("flipped");
        document.getElementById("cvv-div").classList.toggle("flipped");
    }, 200);
}