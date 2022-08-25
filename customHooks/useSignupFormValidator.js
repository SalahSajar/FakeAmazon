import {useState} from 'react'

const useSignupFormValidator = () => {
    const [nameInputIsValid, setNameInputIsValid] = useState(false);
    const [emailInputIsValid, setEmailInputIsValid] = useState(false);
    const [passwordInputIsValid, setPasswordInputIsValid] = useState(false);
    const [passwordCopyInputIsValid, setPasswordCopyInputIsValid] = useState(false);
    
    const [nameInputErrorMessage, setNameInputErrorMessage] = useState(null);
    const [emailInputErrorMessage, setEmailInputErrorMessage] = useState(null);
    const [passwordInputErrorMessage, setPasswordInputErrorMessage] = useState(null);
    const [passwordCopyInputErrorMessage, setPasswordCopyInputErrorMessage] = useState(null);

    const fullFormCheck__HANDLER = (evt , type) => {
      if(type === "register"){
        const nameInputValue = evt.target.name.value;
        const emailInputValue = evt.target.email.value;
        const passwordInputValue = evt.target.password.value;
        const passwordCopyInputValue = evt.target.passwordCopy.value;
  
        const nameInputValueIsValid = nameInputHandlers_OBJ.nameInputFullCheck__HANDLER(nameInputValue);
        const emailInputValueIsValid = emailInputHandlers_OBJ.emailInputFullCheck__HANDLER(emailInputValue);
        const passwordInputValueIsValid = passwordInputHandlers_OBJ.passwordInputFullCheck__HANDLER(passwordInputValue);
        const passwordCopyInputValueIsValid = passwordCopyInputHandlers_OBJ.passwordCopyInputFullCheck__HANDLER(passwordInputValue, passwordCopyInputValue);
  
        return nameInputValueIsValid && emailInputValueIsValid && passwordInputValueIsValid && passwordCopyInputValueIsValid;
      }

      if(type === "signin"){
        const emailInputValue = evt.target.email.value;
        const passwordInputValue = evt.target.password.value;

        const emailInputValueIsValid = emailInputHandlers_OBJ.emailInputFullCheck__HANDLER(emailInputValue);
        const passwordInputValueIsValid = passwordInputHandlers_OBJ.passwordInputFullCheck__HANDLER(passwordInputValue);

        return emailInputValueIsValid && passwordInputValueIsValid;

      }
    }

    const nameInputHandlers_OBJ = {
      resetUserNameInputError__HANDLER: () => setNameInputErrorMessage(null),
      nameInputHalfCheck__HANDLER: function(value){
        if(!!value){
          if(value.length >= 3){
            setNameInputIsValid(true);
          } else {
            setNameInputIsValid(false);
          }
        } else {
          setNameInputIsValid(false);
        }
      },
      nameInputFullCheck__HANDLER: function(value) {
        if(!!value){
            if(value.length >= 3){
              setNameInputIsValid(true);
              return true;

            } else {
              setNameInputIsValid(false);
              setNameInputErrorMessage("minimum 3 characters required");
              return false;
            }
          } else {
            setNameInputIsValid(false);
            setNameInputErrorMessage("Enter your name");
            return false;
          }
      },
      nameInputBlur__HANDLER: function(evt) {
        const inputValue = evt.target.value;
        
        this.nameInputFullCheck__HANDLER(inputValue);
        
      },
      nameInputFocus__HANDLER: function() {
        this.resetUserNameInputError__HANDLER();
      },
      nameInputChange__HANDLER: function(evt) {
        const inputValue = evt.target.value;

        this.nameInputHalfCheck__HANDLER(inputValue);
        
      }
    }

    const emailInputHandlers_OBJ = {
      resetUserEmailInputError__HANDLER: () => setEmailInputErrorMessage(null),
      emailInputHalfCheck__HANDLER: function(value){
        if(!!value){
          const re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

          if(re.test(value)){
            setEmailInputIsValid(true);
          } else {
            setEmailInputIsValid(false);
          };
        } else {
          setEmailInputIsValid(false);
        }
      },
      emailInputFullCheck__HANDLER: function(value) {
        if(!!value){
          const re = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

          if(re.test(value)){
            setEmailInputIsValid(true);
            return true;

          } else {
            setEmailInputIsValid(false);
            setEmailInputErrorMessage("Wrong or Invalid email address. Please correct and try again.");
            return false;

          };
        } else {
          setEmailInputIsValid(false);
          setEmailInputErrorMessage("Enter your email");
          return false;
        }
      },
      emailInputBlur__HANDLER: function(evt) {
        const inputValue = evt.target.value;
        
        this.emailInputFullCheck__HANDLER(inputValue);
        
      },
      emailInputFocus__HANDLER: function() {
        this.resetUserEmailInputError__HANDLER();
      },
      emailInputChange__HANDLER: function(evt) {
        const inputValue = evt.target.value;

        this.emailInputHalfCheck__HANDLER(inputValue);
        
      }
    }

    const passwordInputHandlers_OBJ = {
      resetUserPasswordInputError__HANDLER: () => setPasswordInputErrorMessage(null),
      passwordInputHalfCheck__HANDLER: function(value){
        if(!value || value.length < 6){
          setPasswordInputIsValid(false);
          setPasswordInputErrorMessage("Minimum 6 characters required");
        } else {
          setPasswordInputIsValid(true);
        }
      },
      passwordInputFullCheck__HANDLER: function(value) {
        if(!value || value.length < 6){
          setPasswordInputIsValid(false);
          setPasswordInputErrorMessage("Minimum 6 characters required");
          return false;
        } else {
          setPasswordInputIsValid(true);
          return true;
        }
      },
      passwordInputBlur__HANDLER: function(evt) {
        const inputValue = evt.target.value;
        
        this.passwordInputFullCheck__HANDLER(inputValue);
        
      },
      passwordInputFocus__HANDLER: function() {
        this.resetUserPasswordInputError__HANDLER();
      },
      passwordInputChange__HANDLER: function(evt) {
        const inputValue = evt.target.value;

        this.passwordInputHalfCheck__HANDLER(inputValue);
        
      }
    }

    const passwordCopyInputHandlers_OBJ = {
      resetUserPasswordCopyInputError__HANDLER: () => setPasswordCopyInputErrorMessage(null),
      passwordCopyInputHalfCheck__HANDLER: function(passwordValue, passwordCopyValue){
        if(passwordCopyValue === passwordValue){
          setPasswordCopyInputIsValid(true);
        } else {
          setPasswordCopyInputIsValid(false);
        }
      },
      passwordCopyInputFullCheck__HANDLER: function(passwordValue, passwordCopyValue) {
        if(passwordCopyValue === passwordValue){
          setPasswordCopyInputIsValid(true);
          return true
        } else {
          setPasswordCopyInputIsValid(false);
          setPasswordCopyInputErrorMessage("passwords must match");
          return false
        }
      },
      passwordCopyInputBlur__HANDLER: function(evt) {
        const passwordCopyValue = evt.target.value;
        const passwordValue = evt.target.parentElement.parentElement.parentElement.parentElement.password.value;

        this.passwordCopyInputFullCheck__HANDLER(passwordValue, passwordCopyValue);
      },
      passwordCopyInputFocus__HANDLER: function() {
        this.resetUserPasswordCopyInputError__HANDLER();
      },
      passwordCopyInputChange__HANDLER: function(evt) {
        const passwordCopyValue = evt.target.value;
        const passwordValue = evt.target.parentElement.parentElement.parentElement.parentElement.password.value;

        this.passwordCopyInputHalfCheck__HANDLER(passwordValue, passwordCopyValue);
      }
    }

  return {
    fullFormCheck__HANDLER,

    nameInputHandlers_OBJ,
    emailInputHandlers_OBJ,
    passwordInputHandlers_OBJ,
    passwordCopyInputHandlers_OBJ,


    nameInputIsValid,
    emailInputIsValid,
    passwordInputIsValid,
    passwordCopyInputIsValid,

    nameInputErrorMessage,
    emailInputErrorMessage,
    passwordInputErrorMessage,
    passwordCopyInputErrorMessage,
  }
}

export default useSignupFormValidator