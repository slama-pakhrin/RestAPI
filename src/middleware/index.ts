import express from "express";
import {get, identity, merge} from "lodash";
import { getUserBySessionToken } from "../db/users";
import authentication from "../router/authentication";

export const isOwner = async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        if(!currentUserId){return res.sendStatus(403)}
        if(currentUserId.toString() !== id){
           return res.sendStatus(403);
        }
        return next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}

export const isAuthenticated = async (req:express.Request,res:express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['ARII-CHECK'];
        if(!sessionToken){
            return res.sendStatus(403);
        }
        const activeUser = await getUserBySessionToken(sessionToken);
        if(!activeUser){
            return res.sendStatus(403);
        }
        merge(req, {identity: activeUser});
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }
}