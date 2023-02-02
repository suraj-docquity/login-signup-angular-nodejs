
const form = document.getElementById("form1");
const errBox = document.getElementById("errBox");
const errtxt = document.getElementById("errtxt");

const email = document.getElementById("email_id");
const pass = document.getElementById("pass_id");

function authenticate() {
  var email_id = email.value.trim();
  var pattern = /^[\w-\.]+@(docquity)\.+(com)$/;

  if (!email_id.match(pattern)) {

    email.classList.remove("pass_border");
    email.classList.add("error_border");

    showError("Please enter valid docquity ID");

    email.value = "";
    pass.value = "";
    email.focus();
  }
  else {

    email.classList.add("pass_border");
    email.classList.remove("error_border");

    errBox.classList.add("hideErr");
    errBox.classList.remove("showErr");

    if (!validatePassword(pass.value)) {

      pass.classList.remove("pass_border");
      pass.classList.add("error_border");

      errtxt.innerText = "Please enter valid password";
      errBox.classList.remove("hideErr");
      errBox.classList.add("showErr");

      pass.value = "";
      pass.focus();
    }
  }
}

function validatePassword(str) {
  if (str == "") {
    // alert("Password should NOT be empty");
    return false;
  }
  else {
    return passwordCHK(str);
  }
}



function passwordCHK(str) {
  var flag = true;
  if (!str.match(/[a-z]/)) {
    flag = false;
  }
  else if (!str.match(/[A-Z]/)) {
    flag = false;
  }
  else if (!str.match(/[0-9]/)) {
    flag = false;
  }
  else if (!str.match(/[^a-zA-Z\d]/)) {
    flag = false;
  }
  else if (str.length < 8) {
    flag = false;
  }

  if (!flag) {
    // alert("Invalid Password ! \nPassword must contain 8 or more characters, with at least one number and one uppercase and one lowercase letter");
    return false;
  }
  pass.classList.add("pass_border");
  pass.classList.remove("error_border");

  errBox.classList.add("hideErr");
  errBox.classList.remove("showErr");

  return true;
}


function validateEmail() {
  var email_id = email.value.trim();
  var pattern = /^[\w-\.]+@(docquity)\.+(com)$/;

  if (!email_id.match(pattern)) {

    email.classList.remove("pass_border");
    email.classList.add("error_border");

    showError("Please enter valid docquity ID");

    email.value = "";
    email.focus();

    return false;
  } else {
    email.classList.add("pass_border");
    email.classList.remove("error_border");

    hideError();

    return true;
  }
}

function validateDetails() {
  const phone_id = document.getElementById("phone_id");
  var phone = phone_id.value.trim();

  if (phone == "" || phone.length != 10 || phone.match(/^[a-zA-Z]+$/)) {
    phone_id.classList.add("error_border");

    // alert("Please enter valid phone number !");
    phone_id.value = phone;
    phone_id.focus();
  } else {
    phone_id.classList.remove("error_border");
  }

}


function showError(err) {
  document.getElementById("errtxt").innerText = err;
  document.getElementById("errBox").classList.remove("hideErr");
  document.getElementById("errBox").classList.add("showErr");
}

function hideError() {
  document.getElementById("errtxt").innerText = "No Error Found";
  document.getElementById("errBox").classList.add("hideErr");
  document.getElementById("errBox").classList.remove("showErr");
}


// function showPassHint(){
//   console.log("show err");
//   document.getElementById("passBoxHint").add(passBoxShow);
//   document.getElementById("passBoxHint").remove(passBoxHide);
// }

// function hidePassHint(){
//   console.log("hide err");
//   document.getElementById("passBoxHint").remove(passBoxShow);
//   document.getElementById("passBoxHint").add(passBoxHide);
// }