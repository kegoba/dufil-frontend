
export const emailValidation = (email) => {
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const passwordValidation = (password) => {
  
    return password.length >= 4;
  };

  export const inputValidation = (input) => {

    return input.length >= 6;
  };

  
  
  export const amountValidation = (amount) => {

    return typeof amount !== 'number' || amount >100
  };

  export const durationValidation = (input) => {

    const validOptions = [6, 12];

    // Check if the selected value is in the list of valid options
    if (validOptions.includes(input)) {
      return { valid: true, message: "Valid selection" };
    
    }
    
  };

  export const textAreaValidation = (textArea) => {
    
    return textArea.length >= 10;
    
  };


  export const phoneValidation = (phone) => {
    const regex = /^\d+$/;
    return (phone.length === 11) && (regex.test(phone));
  
  }
  