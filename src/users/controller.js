const pool = require("../../db");
const queries =  require('./queries');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUsersById= (req,res) =>{
    const userid = parseInt(req.params.userid);
    pool.query(queries.getUsersById, [userid], (error,results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addUsers = (req,res) => {
    const{ username, usernick, userpassword, useradmin} = req.body;

    //check if usernick exists
    pool.query(queries.checkUserNickExists, [usernick], (error,results) => {
        if(results.rows.length) {
        res.send("Usernick already exists.");
        }
        // add users to db
        pool.query(queries.addUsers, [username, usernick, userpassword, useradmin], (error, results) => {
            if(error) throw error;
            res.status(201).send("User Created Successfully!");
        }
      );
    });
};

const removeUser = (req, res) => {
    const userid = parseInt(req.params.userid);

    pool.query(queries.getUsersById, [userid], (error,results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("User does not exist in the database, could not remove.");
            return;
        }
        
        pool.query(queries.removeUser, [userid], (error,results) => {
            if(error) throw error;
            res.status(200).send("User removed successfully!");
        })
    });
};

const updateUser = (req, res) => {
    const userid = parseInt(req.params.userid);
    const{ username, usernick, userpassword, useradmin} = req.body;

    pool.query(queries.getUsersById, [userid], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("User does not exist in the database, could not update.");
            return;
        }
        pool.query(queries.updateUser, [username, usernick, userpassword, useradmin,userid], (error,results) => {
            if(error) throw error;
            res.status(200).send("User updated successfully!");
        })    
    }
  );
}

module.exports={
    getUsers,
    getUsersById,
    addUsers,
    removeUser,
    updateUser,
};