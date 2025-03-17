const { body, validationResult } = require('express-validator');

const loginvalidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('pwd').isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must contain at least one special character'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }
        next();
    }
];

const registervalidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('pwd').isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must contain at least one special character'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }
        next();
    }
];



const forgotpassvalidation = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }
        next();
    }
]

const resetpassvalidation = [
    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*]/)
        .withMessage('Password must contain at least one special character'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }
        next();
    }

]




const addmealvalidation = [
    body('mealname')
        .trim()
        .notEmpty().withMessage("Food name is required")
        .isLength({ min: 3, max: 50 }).withMessage("Food name must be between 3 and 50 characters long"),

    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 0, max: 100 }).withMessage("Price must be a positive number between 0 and 100"),

    body("location")
        .trim()
        .notEmpty().withMessage("Location is required")
        .isLength({ min: 5, max: 50 }).withMessage("Location must be between 5 and 50 characters long"),

    body("quantity")
        .notEmpty().withMessage("Quantity is required")
        .isFloat({ min: 0, max: 100 }).withMessage("Quantity must be a positive number between 0 and 100"),

    body("pickupAddress")
        .trim()
        .notEmpty().withMessage("Pickup Address is required")
        .isLength({ min: 5, max: 80 }).withMessage("Pickup Address must be between 5 and 80 characters long"),

    body("discription")
        .trim()
        .notEmpty().withMessage("Discription is required")
        .isLength({ max: 200 }).withMessage("Description must be under 100 characters"),

    body("category")
        .trim()
        .notEmpty().withMessage("Category is required")
        .isIn(["Veg", "Non-veg"]).withMessage("Invalid category"),

    body("option")
        .trim()
        .notEmpty().withMessage("Option is required")
        .isIn(["Donate", "Sell"]).withMessage("Invalid Option"),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }
        next();
    }
];




module.exports = { loginvalidation, registervalidation, forgotpassvalidation, resetpassvalidation, addmealvalidation };