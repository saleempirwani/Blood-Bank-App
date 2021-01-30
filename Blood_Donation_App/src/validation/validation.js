// Email Validation
const emailValidation = (email) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
    if (email.trim() === '') {
        alert('Please enter email address')
        return false
    } else if (!email.match(mailformat)) {
        alert('Invalid email format')
        return false
    } else {
        return true
    }
}

// Password Validation
const passwordValidation= (password, cmfPassword) => {

    const format = /^[A-Za-z]\w{7,14}$/g

    if (password.trim() === '') {
        alert('Please enter password')
        return false
    } else if (!password.match(format)) {
        alert('Password should be 7 to 15 characters long which contain only characters, numeric digits, underscore and first character must be a letter')
        return false
    } else if (cmfPassword.trim() === '') {
        alert('Please enter confirm password')
        return false
    } else if (password !== cmfPassword) {
        alert('Both password should be same.')
        return false
    } else {
        return true
    }
}


const nameValidation = (nm) => {
    const format = /^[A-Za-z]{3,15}$/g
    const name = nm.trim()

    if (name === '') {
        alert('Please enter name')
        return false
    } else if (!name.match(format)) {
        alert('Name should be 3 to 10 characters long which contain only aplhabets')
        return false
    } else {
        return true
    }
}

const phoneValidation = (ph) => {
    const format = /^\d{11}$/;
    const phone = ph.trim()

    if (phone === '') {
        alert('Please enter phone')
        return false
    } else if (!phone.match(format)) {
        alert('Phone no. should be 11 digits long')
        return false
    } else {
        return true
    }
}

const addressValidation = (add) => {
    const format = /^[A-Za-z\s]{8,20}$/g
    const address = add.trim()

    if (address === '') {
        alert('Please enter address')
        return false
    } else if (!address.match(format)) {
        alert('Enter only main part of your address, which contains 8-20 alphabets long')
        return false
    } else {
        return true
    }
}


// Only password Not Empty
export const emptyPasswordValidation = (pass) => {
    if (pass.trim() === '') {
      alert('Please enter password');
      return false;
    } else {
      return true;
    }
  };


// Checking Internet Connection
export const isNetWorking = () => {
    if(false){
        alert('No Internet Connection')
        return false
    }
    else{
        return true
    }
} 

export {
    emailValidation,
    passwordValidation,
    nameValidation,
    addressValidation,
    phoneValidation,
}