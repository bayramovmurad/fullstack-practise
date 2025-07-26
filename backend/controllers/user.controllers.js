import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { UserModel } from '../models/user.model.js';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password'); 
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    const {id} = req.params;

    const user = await UserModel.findByIdAndDelete(id)
    return res.status(200).json({user})

  

}

export const addRegisterUser = async (req, res) => {
    try {
        const { username, email, password, role} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

 
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'

        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const addLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role}, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
        });

        console.log(user);
        
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
