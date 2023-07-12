const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE USERID = $1";
const checkUserNickExists = "SELECT u FROM users u WHERE u.usernick = $1";
const addUsers = "INSERT INTO users(username, usernick, userpassword, useradmin) VALUES ($1, $2, $3, $4)";
const removeUser = "DELETE FROM users WHERE USERID = $1";
const updateUser = "UPDATE users SET username=$1, usernick=$2, userpassword=$3, useradmin=$4 WHERE USERID = $5" ;

module.exports = {
    getUsers,
    getUsersById,
    checkUserNickExists,
    addUsers,
    removeUser,
    updateUser,
};