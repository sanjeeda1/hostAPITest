const UserServices = require('../services/user.service');

exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'Email and password are required' });
        }

        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            return res.status(409).json({ status: false, message: `User with email ${email} is already registered` });
        }

        const response = await UserServices.registerUser(email, password);
        res.json({ status: true, success: 'User registered successfully' });

    } catch (err) {
        console.log("---> err -->", err);
        res.status(500).json({ status: false, message: 'Registration failed', error: err.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: 'Email and password are required' });
        }

        let user = await UserServices.checkUser(email);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User does not exist' });
        }

      /*  const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ status: false, message: 'Username or password does not match' });
        }*/

        // Creating Token
        const tokenData = { _id: user._id, email: user.email };
        const token = await UserServices.generateAccessToken(tokenData, "secret", "1h");

        res.status(200).json({ status: true, success: 'Login successful', token: token });
    } catch (error) {
        console.log(error, 'err---->');
        res.status(500).json({ status: false, message: 'Login failed', error: error.message });
    }
};
