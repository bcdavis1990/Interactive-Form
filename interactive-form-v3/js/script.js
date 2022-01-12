const nameField = document.getElementById("name");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");

const shirtColor = document.getElementById("color");
const shirtDesigns = document.getElementById("shirt-designs");
const activitiesBox = document.getElementById("activities-box");

const activities = document.getElementById("activities");
const activitiesCost = document.getElementById("activities-cost");
let total = 0;

const payment = document.getElementById("payment");
const paymentOptions = payment.children;
const creditCardDiv = document.getElementById("credit-card"); //targets all the credit card selection elements

const button = document.querySelector("button");
const emailField = document.getElementById("email");

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

//makes credit card the default payment option and hides other fields when other option is selected
paymentOptions[1].setAttribute("selected", "selected");

payment.addEventListener("change", (e) => {
  if (e.target.value !== "credit-card") {
    creditCardDiv.style.display = "none";
  } else {
    creditCardDiv.style.display = "block";
  }
});

//helper functions for the submit event
function nameHelper() {
  const nameValue = nameField.value;
  const alert = document.getElementById("name-hint");
  if (nameValue == "") {
    alert.classList.remove("hint");
    event.preventDefault();
    return false;
  }
}

function emailHelper() {
  const emailValue = emailField.value;
  const alert = document.getElementById("email-hint");
  const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
  if (validEmail) {
    return validEmail;
  } else {
    alert.classList.remove("hint");
    event.preventDefault();
    return false;
  }
}

function activityRegistered() {
  const activitySelected = total > 0;
  if (activitySelected) {
    return activitySelected;
  } else {
    return false;
  }
}

//checks form validation upon submit button click
button.addEventListener("click", (e) => {
  nameHelper();
  emailHelper();
  activityRegistered();
});
