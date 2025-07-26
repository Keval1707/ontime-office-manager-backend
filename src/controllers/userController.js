const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");


const UserController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (await UserModel.getUserByEmail(email))
                return res.status(400).json({ error: "User already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const id = await UserModel.addUser({ name, email, password: hashedPassword });

            res.status(201).json({ id, message: "User registered" });
        } catch (err) {
            console.error("Register error:", err);
            res.status(500).json({ error: "Server error" });
        }
    },

    login: async (req, res) => {
        try {
            const JWT_SECRET = process.env.JWT_SECRET || "fallback-dev-secret";
            const { email, password } = req.body;
            const user = await UserModel.getUserByEmail(email);
            if (!user || !(await bcrypt.compare(password, user.password)))
                return res.status(400).json({ error: "Invalid credentials" });

            const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: "1d" });
            res.json({ token });
        } catch (err) {
            console.error("Login error:", err);
            res.status(500).json({ error: "Server error" });
        }
    },

    getProfile: (req, res) => res.json({ user: req.user }),
};

module.exports = UserController;
