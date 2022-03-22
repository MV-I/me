function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";

}

function resetAllForms() {
    document.querySelectorAll("form").forEach( form => form.reset());
    document.querySelectorAll(".form__input").forEach(  inputElement => { clearInputError(inputElement) }  );
    setFormMessage(document.getElementById('forgotPassword'), 'success', '');
    setFormMessage(document.getElementById('createAccount'), 'success', '');
    setFormMessage(document.getElementById('login'), 'success', '');

    //make passwords hidden
    document.querySelectorAll(".eye-icon").forEach(icon => {
        icon.previousElementSibling.setAttribute('type', 'password');
        icon.setAttribute('src', 'src/img/eye.png');
    });
}

function noEmptyFields() {
    let fields = [];

    //query selector: an element with class '.form__input', direct child of div that is NOT child of element with class '.form--hidden'
    // .form__input FROM div NOT FROM .form--hidden
    !document.querySelectorAll(':not(form.form--hidden) > div > .form__input').forEach(formInput => { 
        if(formInput.value.length != 0) {
            fields.push('full');
        } else {
            fields.push('empty');
            return false;
        }
    });
    //console.log(fields);
    //if there are no empty fields in the fields array, return true
    if( !fields.includes('empty') ) {
        return true;
    } else {
        return false;
    }
}

function enableAllButtons() {
    document.querySelectorAll("button").forEach ( button => button.disabled = false);
}

function disableAllButtons() {
    document.querySelectorAll("button").forEach ( button => button.disabled = true);
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const forgotPasswordForm = document.querySelector("#forgotPassword");
    const emailValidation = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        createAccountForm.classList.remove("form--hidden");
        loginForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        resetAllForms();
        disableAllButtons();
    });

    document.querySelector("#linkCreateAccountFP").addEventListener("click", e => {
        e.preventDefault();
        createAccountForm.classList.remove("form--hidden");
        loginForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        resetAllForms();
        disableAllButtons();
    });

    document.querySelector("#linkLoginCA").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        resetAllForms();
        disableAllButtons();
    });

    document.querySelector("#linkForgotPassword").addEventListener("click", e => {
        e.preventDefault();
        forgotPasswordForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        loginForm.classList.add("form--hidden");
        resetAllForms();
        disableAllButtons();
    });

    document.querySelector("#linkLoginFP").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
        resetAllForms();
        disableAllButtons();
        document.getElementById("forgotPWUsernameEmail").removeAttribute('disabled', '');
    });

    //Login Page Button logic (e is the event object)
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        checkForErrors();

        // Perform AJAX/Fetch login

        //setFormMessage(loginForm, "error", "Invalid username/password combination");
        location.href='user.html';
    });

    // Reset password button logic
    forgotPasswordForm.addEventListener("submit", e => {
        e.preventDefault();
        checkForErrors();

        document.getElementById("forgotPWUsernameEmail").setAttribute('disabled', '');
        setFormMessage(document.getElementById('forgotPassword'), 'success', 'Thank you. We\'ll email you instructions to reset your password.');
    });

    // Create account button logic
    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        checkForErrors();

        setFormMessage(document.getElementById('createAccount'), 'success', 'Thank you! Your account has been created successfully.');
    });

    //Eye icon password toggle logic
    document.querySelectorAll(".eye-icon").forEach(icon => {
        icon.addEventListener('click', e => {
            e.preventDefault();
            
            if(icon.getAttribute('src') === 'src/img/eye.png') {
                icon.previousElementSibling.setAttribute('type', 'text');
                icon.setAttribute('src', 'src/img/eye-c.png');
            } else {
                icon.previousElementSibling.setAttribute('type', 'password');
                icon.setAttribute('src', 'src/img/eye.png');
            }

        })
    });

    

function checkForErrors() {
    document.querySelectorAll(".form__input").forEach(inputElement => {

        // timeout variable to be used below
        let timeout = null;
        
        
        inputElement.addEventListener("keyup", e => { //release key


            disableAllButtons();

            // Clear the timeout if it has already been set.
            // This will prevent the previous task from executing
            // if it has been less than <MILLISECONDS>
            clearTimeout(timeout);


            // perform checks for error after user stops typing for 1 second
            timeout = setTimeout(function () {


            if ( e.target.id === "loginUsernameEmail" && //Check if login username is valid. applies if the username is an email = if it contains an @
            e.target.value.includes('@') &&
            e.target.value.length > 0 && 
            !e.target.value.toLowerCase().match(emailValidation) ) {
                    setInputError(inputElement, "Email Address is not valid (Example: bob@hired.com)");
            }
            if ( e.target.id === "loginUsernameEmail" && //Check if login email is valid. applies if the username is not an email = if it doesn't contain an @
                !e.target.value.includes('@') &&
                e.target.value.length > 0 && 
                e.target.value.length < 5 ) {
                    setInputError(inputElement, "Username must be at least 5 characters long");
            }
            if (e.target.id === "loginPassword" && 
                e.target.value.length > 0 && 
                e.target.value.length < 5) { //check if login password is valid
                    setInputError(inputElement, "Password must be at least 5 characters long");
            }
            
            if ( e.target.id === "forgotPWUsernameEmail" && //Check if login username is valid. applies if the username is an email = if it contains an @
                e.target.value.includes('@') &&
                e.target.value.length > 0 && 
                !e.target.value.toLowerCase().match(emailValidation) ) {
                    setInputError(inputElement, "Email Address is not valid (Example: bob@hired.com)");
            }
            if ( e.target.id === "forgotPWUsernameEmail" && //Check if login email is valid. applies if the username is not an email = if it doesn't contain an @
                !e.target.value.includes('@') &&
                e.target.value.length > 0 && 
                e.target.value.length < 5 ) {
                    setInputError(inputElement, "Username must be at least 5 characters long");
            }

            if ( e.target.id === "securityCodeInput" && //Check if security code is valid. applies if the username is not an email = if it doesn't contain an @
                e.target.value.length !== 5 ) {
                    setInputError(inputElement, "Security Code must be exactly 5 characters long");
            }

            if (e.target.id === "signupUsername" && 
                e.target.value.length > 0 && 
                e.target.value.length < 5) { //check if signup username is valid
                    setInputError(inputElement, "Username must be at least 5 characters long");
            }
            if (e.target.id === "signupPassword" && 
                e.target.value.length > 0 && 
                e.target.value.length < 5) { //check if signup password is valid
                    setInputError(inputElement, "Password must be at least 5 characters long");
            }
            if (e.target.id === "signupPassword2" && 
                e.target.value !== (document.querySelector("#signupPassword").value)) { //check if signup password 2 matches
                    setInputError(inputElement, "Passwords must match");
            }
            if (e.target.id === "signupEmail" && //Check if signup email is valid
                e.target.value.length > 0 && 
                !e.target.value.toLowerCase().match(emailValidation) ) {
                    setInputError(inputElement, "Email Address is not valid (Example: bob@hired.com)");
            }

            if (!inputElement.classList.contains("form__input--error") && noEmptyFields()) {
                enableAllButtons();
            }
            }, 1000); // 1 second from timeout function

        });

        inputElement.addEventListener("input", e => {

                clearInputError(inputElement);

        })

    })
}
    
checkForErrors();

});
