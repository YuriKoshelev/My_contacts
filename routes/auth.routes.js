const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
        '/register', 
        [
            check('email', 'Invalid email').isEmail(),
            check('password', 'Minimum of 6 characters').isLength({ min: 6 })
        ],
    async (req, res) => {
    
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                error: true,
                message: 'Incorrect data'
            });
            }

            const {email, password} = req.body;
            
            const candidate = await User.findOne({ email: email });

            if (candidate) {
 
               return res.status(400).json({ 
                    error: true,
                    message: 'Such a user already exists' 
                }); 
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ 
                error: false,
                message: 'User created'
            });

        } catch (e) {
            res.status(500).json({
                error: true, 
                message: 'Something went wrong, try again later'
            });
        }
});

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Enter the password').exists(),
        check('password', 'Minimum of 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: true, 
                errors: errors.array(),
                message: 'Incorrect data'
            }); 
        }

        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ 
                error: true,
                message: 'Invalid username or password' 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                error: true, 
                message: 'Invalid username or password' 
            });           
        }

        const token = jwt.sign(
            { userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: "1h" }
        );

        res.json({ 
            error: false,
            token, 
            userId: user.id, 
            user: user.email 
        });

    } catch (e) {
        res.status(500).json({ 
            error: true,
            message: 'Something went wrong, try again later'
        });
    }
});


// /api/auth/verifytoken
router.post(
    '/verifytoken', 
    [
        check('userToken', 'Missing token').exists(),
    ],
async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: true, 
                errors: errors.array(),
                message: 'Incorrect data'
            }); 
        }

        const {userToken} = req.body;
        
        const result = await jwt.verify(userToken, config.get('jwtSecret'));

        res.json({ 
            error: false,
            message: 'The token is valid'
        }); 

    } catch (e) {
        res.status(401).json({ 
            error: true,
            message: 'The token has expired'
        });
    }
});

module.exports = router;