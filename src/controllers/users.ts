import express from 'express';
import { deleteUserById, getUserById, getUsers, updateUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (err) {
        return res.sendStatus(403);
    }
}

export const deleteUser = async(req:express.Request, res:express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserById(id)
        return res.status(200).json(deletedUser).end();
    } catch (error) {
        console.log(error);
        res.sendStatus(403);
    }
} 

export const updateUser = async(req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const {email, userName, password} = req.body;
        if(!userName){return res.sendStatus(403)}
        const updatedUser = await getUserById(id);
        updatedUser.userName = userName;
        await updatedUser.save();
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}