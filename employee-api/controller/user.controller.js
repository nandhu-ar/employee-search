const db = require('./db.controller');
var dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
    try {
        await db.addUser(req, res);
    } catch (error) {
        res.status(400).send('respond with error');
    }
}

const validateLogin = async (req, res) => {
    try {
        const isValidawait = await db.validateLogin(req, res);
        if(isValidawait){
            const token = await generateAccessToken(req.body)
            res.status(200).json(token);
        }
        else{
            res.status(200).json(false);
        }
    } catch (error) {
        res.status(400).send('respond with error');
    }
}

const generateAccessToken = async(username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
}

const authenticateToken = async (req, res, next) => {
    try{const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    await jwt.verify(token, process.env.TOKEN_SECRET.toString());
    next();
    }
    catch(error){
        return res.sendStatus(403);
    }
  }

module.exports = {
    addUser,
    validateLogin,
    authenticateToken
}