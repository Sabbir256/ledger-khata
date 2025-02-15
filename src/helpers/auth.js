require('dotenv').config();

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

function verifyLogin({ username, password }) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return { success: true };
    }
    else {
        return { success: false }
    }
}

module.exports = { verifyLogin }