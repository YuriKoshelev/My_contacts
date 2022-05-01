const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        
        let token = req.headers.token;

        if (!token) {
            res.status(401).json({ 
                error: true,
                message: 'The token has expired'
            });
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));         
        req.user = decoded;
        next();

    } catch(e) {
        res.status(401).json({ 
            error: true,
            message: 'The token has expired'
        });
    }
}