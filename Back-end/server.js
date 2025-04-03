import express from "express";
import { OAuth2Client } from "google-auth-library";
import cors from "cors"
import connection from "./connection.js";
import userSchema from "./models/user.model.js"
import pkg from "jsonwebtoken"
import env from "dotenv"
env.config()
const client = new OAuth2Client();
const {sign}=pkg;

const app = express();
app.use(cors())
app.use(express.json())
app.post("/google-auth", async (req, res) => {
    console.log(req.body);
    const { credential, client_id } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id
        })
        const payload = ticket.getPayload();
        const { email, given_name, family_name } = payload;
console.log(email,given_name,family_name)
        // // Check if the user already exists in the database
        let user = await userSchema.findOne({ email });
        console.log(user);
        
        if (!user) {
            // Create a new user if they don't exist
            user = await userSchema.create({
                email,
                name: `${given_name} ${family_name}`,
                authSource: 'google',
            });
        }

        // // Generate a JWT token
        const token = sign({ userId: user._id, email: user.email }, process.env.JWT_KEY, {
            expiresIn: '1h', // Adjust expiration time as needed
        });
console.log(token);

        // Send the token as a cookie and response
        res
            .status(200)
            // .cookie('token', token, {
            //     httpOnly: true,
            //     secure: false, // Set to true in production when using HTTPS
            //     maxAge: 3600000, // 1 hour in milliseconds
            // })
            .json({ message: 'Authentication successful', user, token });
    } catch (err) {
        res.status(400).json({ error: 'Authentication failed', details: err });
    }

})

connection().then(() => {
    app.listen(3001, () => console.log("Server is listening on port 3001"));
})
    .catch(err => console.log(err))