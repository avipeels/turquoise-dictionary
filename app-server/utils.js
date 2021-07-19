const getValidatedUser = (email, password) => {
    return new Promise((resolve, reject) => {
        if (email === 'avinashpsk@gmail.com' && password === "12345") {
            resolve(true);
        }
        else reject(false);
    })
}

module.exports = getValidatedUser;