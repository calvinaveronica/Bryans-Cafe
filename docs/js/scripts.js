/***********************************************************
* Comment:                                 *
* Author:                                  *
* Date created:                            *
 ***********************************************************/
function clearRegistrationForm() {
    document.querySelector(".registrationForm").reset();
}

function getCurrentYear() {
    return new Date().getFullYear();
}

function validateRegistrationForm() {
    // let phone number = document.forms["registrationForm"]["phoneNumber"].value;
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("confirmPassword").value;
    let isNoErrors = true;

    if(password != confirmPassword) {
        alert("Password and Confirm Password does not match. Please Try Again.");
        isNoErrors = false;
    }

    //if(phoneNumber ! =  '' && isNan(phoneNumber)) 
    //{
    //  alert("Invalid telephone Number. Please try again.");   
    //  isNoErrors = false;
    //}

    if (!isNoErrors)
        return isNoErrors;
}

