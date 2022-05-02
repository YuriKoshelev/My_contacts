const {Router} = require('express');
const Contacts = require('../models/Contacts');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const router = Router();

///api/contacts
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contacts.find({ user: req.user.userId });
        
        const contactsResult = [];

        contacts.forEach((item) => {
            contactsResult.push({
                id: item._id,
                name: item.name,
                phone: item.phone,
                email: item.email
            });
        });
        res.json(contactsResult);
    } catch (e) {
        res.status(500).json({ 
            error: true,
            message: 'Something went wrong, try again later'
        });
    }
});


// /api/contacts
router.post(
    '/newcontact', 
    [
        check('email', 'Invalid email').isEmail(),
        check('name', 'Name is not filled in').exists(),
        check('phone', 'Phone is not filled in').exists()
    ],
    auth,
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

            const {name, phone, email} = req.body;
            
            const newContact = new Contacts({ 
                name, phone, email, user: req.user.userId  
            });

            const newContactSave = await newContact.save();

            res.status(201).json({ 
                error: false,
                id: newContactSave.id,
                message: 'Contact added'
            });

        } catch (e) {
            res.status(500).json({
                error: true, 
                message: 'Something went wrong, try again later'
            });
        }
});

///api/contacts
router.delete('/:id', auth, async (req, res) => {
    try {
        const delContact = await Contacts.deleteOne({ _id: req.params.id});
        if (delContact.acknowledged) {
            res.status(200).json({ 
                error: false,
                message: 'Contact successfully deleted'
            });
        }
        
    } catch (e) {
        res.status(500).json({ 
            error: true,
            message: 'Something went wrong, try again later'
        });
    }
});

///api/contacts
router.put('/', auth, async (req, res) => {
    try {
        
        const {name, phone, email, id} = req.body;

        const updateContact = await Contacts.findOneAndUpdate({ _id: id}, {name, phone, email});
        
        if (updateContact._id) {
            res.status(200).json({ 
                error: false,
                message: 'The contact has been successfully changed'
            });
        } 
        
    } catch (e) {
        res.status(500).json({ 
            error: true,
            message: 'Something went wrong, try again later'
        });
    }
});

module.exports = router;