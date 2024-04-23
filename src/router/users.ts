import express from "express";
import {isAuthenticated, isOwner} from "../middleware";
import { getAllUsers, updateUser } from "../controllers/users";
import { deleteUser } from "../controllers/users";

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.put('/users/:id', isAuthenticated, isOwner, updateUser);
}