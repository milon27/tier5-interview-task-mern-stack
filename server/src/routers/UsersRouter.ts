import { Router } from "express";
import UsersController from "../controllers/UsersController";

const UsersRouter = Router()

/**
 * @description add track to fav list of current user
 * @post http://localhost:2727/track/add-fav/:id
 */
UsersRouter.post('/add-fav/:id', UsersController.addToFav)


export default UsersRouter