import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user){res.sendStatus(400)}
        const expectedHash = authentication(user.authentication.salt, password).toString('utf8');
        
        if(user.authentication.password !== expectedHash){
            return res.sendStatus(403);
        }

        const salt  = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString()).toString('utf8');
        await user.save()

        res.cookie("ARII-CHECK", user.authentication.sessionToken, { domain: "localhost", path: "/"});
        return res.status(200).json(user).end()

    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password, userName} = req.body;

        //const existingUser = await getUserByEmail(email);
        // if(!existingUser){return res.sendStatus(400)}
        if(!email || !password || !userName){
            return res.sendStatus(400);
        }
        
        const salt = random();
        const user = await createUser({
            email,
            userName,
            authentication: {
                salt,
                password: authentication(salt,password),
            }
        })
        return res.status(200).json(user).end()
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}