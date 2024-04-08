const router = require("express").Router();
const { prisma } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


/* Register a new user account */

router.post("/register", async (req, res, next) => {
    try {
        const user = await prisma.User.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        });

        /* Create a token with the user id */

        // const token = jwt.sign({ id: user.id }, process.env.JWT);
        // res.status(201).send({ token });
    } catch(error) {
        next(error);
    }
});

/* Login to a user account */

// router.post("/login", async (req, res, next) => {
//     try {
//         const user = await prisma.User.findUnique({
//             where: {
//                 username: req.body.username
//             }
//         });

//         if (!user) {
//             return res.status(401).send("Invalid Login Credentials");
//         }
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             const token = jwt.sign({ id: user.id }, process.env.JWT);
//             res.send({ token });
//         } else {
//             return res.status(401).send("Invalid Login Credentials");
//         }
//     } catch(error) {
//         next(error);
//     }
// });

module.exports = router;