const getValidatedUser = (username, password) => {
    return new Promise((resolve, reject) => {
        if (username === 'avinashpsk@gmail.com' && password === "12345") {
            resolve(true);
        }
        else reject(false);
    })
}

module.exports = getValidatedUser;