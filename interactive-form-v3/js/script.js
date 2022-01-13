const nameField = document.getElementById("name");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");

const shirtColor = document.getElementById("color");
const shirtDesigns = document.getElementById("shirt-designs");
const activitiesBox = document.getElementById("activities-box");
const checkboxes = document.querySelectorAll("[type = 'checkbox']");

const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
let total = 0;

const payment = document.getElementById("payment");
const paymentOptions = payment.children;
const creditCardDiv = document.getElementById("credit-card"); //targets all the credit card selection elements
const payPal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

const button = document.querySelector("button");
const emailField = document.getElementById("email");
const creditCard = document.getElementById("cc-num");
const expMonth = document.getElementById("exp-month");
const expYear = document.getElementById("exp-year");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");

nameField.focus(); //applies focus to the name field upon page load
shirtColor.disabled = true; //disables color field by default
otherJobRole.style.display = "none"; //hides the other job input field by default

//displays the other job input field when "other" is selected in the job role menu
jobRole.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
});

//displays corresponding colors after selecting a design
shirtDesigns.addEventListener("change", (e) => {
  shirtColor.disabled = false;
  const colorOptions = shirtColor.children;
  for (i = 0; i < colorOptions.length; i++) {
    const choosenDesign = colorOptions[i].getAttribute("data-theme");
    if (choosenDesign !== e.target.value) {
      colorOptions[i].hidden = true;
    } else {
      colorOptions[i].hidden = false;
    }
  }
});

//updates Total Cost when activites are selected
activities.addEventListener("change", (e) => {
  const dataCost = parseInt(e.target.getAttribute("data-cost"));

  if (e.target.checked) {
    total += dataCost;
    activitiesCost.innerHTML = `Total: $${total}`;
  } else {
    total -= dataCost;
    activitiesCost.innerHTML = `Total: $${total}`;
  }
});

//makes the "Registered Activites" section's focus objects more obvious
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });
  checkboxes[i].addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
}

//makes credit card the default payment option and hides other fields when other option is selected
paymentOptions[1].setAttribute("selected", "selected");

//hides other payment options on page load
payPal.style.display = "none";
bitcoin.style.display = "none";

payment.addEventListener("change", (e) => {
  if (e.target.value === "credit-card") {
    creditCard.parentElement.style.display = "block";
    expMonth.parentElement.style.display = "block";
    expYear.parentElement.style.display = "block";
    zipCode.parentElement.style.display = "block";
    cvv.parentElement.style.display = "block";
    bitcoin.style.display = "none";
    payPal.style.display = "none";
  } else if (e.target.value === "paypal") {
    payPal.style.display = "block";
    creditCard.parentElement.style.display = "none";
    expMonth.parentElement.style.display = "none";
    expYear.parentElement.style.display = "none";
    zipCode.parentElement.style.display = "none";
    cvv.parentElement.style.display = "none";
    bitcoin.style.display = "none";
  } else if (e.target.value === "bitcoin") {
    bitcoin.style.display = "block";
    creditCard.parentElement.style.display = "none";
    expMonth.parentElement.style.display = "none";
    expYear.parentElement.style.display = "none";
    zipCode.parentElement.style.display = "none";
    cvv.parentElement.style.display = "none";
    payPal.style.display = "none";
  }
});

//helper functions for the submit event
//need to work on not repeating myself so much for these functions
function nameHelper() {
  const nameValue = nameField.value;
  const alert = document.getElementById("name-hint");
  if (nameValue == "") {
    alert.classList.remove("hint");
    alert.parentElement.classList.add("not-valid");
    event.preventDefault();
    return false;
  } else {
    alert.classList.add("hint");
    alert.parentElement.classList.remove("not-valid");
    alert.parentElement.classList.add("valid");
    return nameValue;
  }
}

function emailHelper() {
  const emailValue = emailField.value;
  const alert = document.getElementById("email-hint");
  const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
  if (validEmail) {
    alert.classList.add("hint");
    alert.parentElement.classList.remove("not-valid");
    alert.parentElement.classList.add("valid");
    return emailValue;
  } else {
    alert.classList.remove("hint");
    alert.parentElement.classList.add("not-valid");
    event.preventDefault();
    return false;
  }
}

function activityRegistered() {
  const activitySelected = total > 0;

  if (activitySelected) {
    activities.firstElementChild.classList.remove("not-valid");
    activities.firstElementChild.classList.add("valid");
  } else {
    activities.firstElementChild.classList.remove("valid");
    activities.firstElementChild.classList.add("not-valid");
    event.preventDefault();
    return false;
  }
  return total;
}

function cardNumberValid() {
  const cardValue = creditCard.value;
  const alert = document.getElementById("cc-hint");
  const cardValid = /^\d{13,16}$/.test(cardValue);
  if (cardValid) {
    alert.classList.add("hint");
    alert.parentElement.classList.remove("not-valid");
    alert.parentElement.classList.add("valid");
    return cardValue;
  } else {
    alert.classList.remove("hint");
    alert.parentElement.classList.add("not-valid");
    event.preventDefault();
    return false;
  }
}

function zipCodeValid() {
  const zipValue = zipCode.value;
  const alert = document.getElementById("zip-hint");
  const zipVaild = /^\d{5}$/.test(zipValue);
  if (zipVaild) {
    alert.classList.add("hint");
    alert.parentElement.classList.remove("not-valid");
    alert.parentElement.classList.add("valid");
    return zipValue;
  } else {
    alert.classList.remove("hint");
    alert.parentElement.classList.add("not-valid");
    event.preventDefault();
    return false;
  }
}

function cvvValid() {
  const cvvValue = cvv.value;
  const alert = document.getElementById("cvv-hint");
  const cvvValid = /^\d{3}$/.test(cvvValue);
  if (cvvValid) {
    alert.classList.add("hint");
    alert.parentElement.classList.remove("not-valid");
    alert.parentElement.classList.add("valid");
    return cvvValue;
  } else {
    alert.classList.remove("hint");
    alert.parentElement.classList.add("not-valid");
    event.preventDefault();
    return false;
  }
}

//checks form validation upon submit button click
button.addEventListener("click", (e) => {
  nameHelper();
  emailHelper();
  activityRegistered();
  cardNumberValid();
  zipCodeValid();
  cvvValid();
});

//makes the "Registered Activites" section's focus objects more obvious
for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });
  checkboxes[i].addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
}
