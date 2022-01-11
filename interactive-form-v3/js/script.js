const name = document.getElementById("name").focus();
const jobRole = document.getElementById("title");
let otherJobRole = (document.getElementById("other-job-role").style.display =
  "none");

jobRole.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    document.getElementById("other-job-role").style.display = "block";
  } else {
    document.getElementById("other-job-role").style.display = "none";
  }
});
