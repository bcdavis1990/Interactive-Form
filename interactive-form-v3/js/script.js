const name = document.getElementById("name");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const shirtColor = document.getElementById("color");
const colorOptions = shirtColor.children;
const shirtDesigns = document.getElementById("shirt-designs");
const option = document.querySelectorAll("option");

name.focus(); //applies focus to the name field
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

//Displays corresponding colors after selecting a design
shirtDesigns.addEventListener("change", (e) => {
  shirtColor.disabled = false;
  for (i = 0; i < colorOptions.length; i++) {
    const choosenDesign = colorOptions[i].getAttribute("data-theme");
    if (choosenDesign !== e.target.value) {
      colorOptions[i].hidden = true;
    } else {
      colorOptions[i].hidden = false;
    }
  }
});
