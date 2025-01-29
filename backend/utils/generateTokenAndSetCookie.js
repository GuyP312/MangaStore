import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' }) //return a token that pass payload which is the userID, help fetch user profile from DB
    res.cookie('token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,    
    });
    return token;
};