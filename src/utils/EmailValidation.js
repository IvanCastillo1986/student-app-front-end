const isValidEmail = (email) => {
    // regex for validating email
    // test the expression against the email
    const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    // returning true or false
    return emailValidation
}


module.exports = isValidEmail