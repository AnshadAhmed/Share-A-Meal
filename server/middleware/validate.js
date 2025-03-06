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
    body('email').isEmpty().withMessage('Enter a valid email address'),
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


module.exports = { loginvalidation, registervalidation, forgotpassvalidation, resetpassvalidation};