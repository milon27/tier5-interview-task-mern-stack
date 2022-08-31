import { Router } from "express";
import UsersController from "../controllers/UsersController";

const UsersRouter = Router()

/**
 * @description add track to fav list of current user
 * @get http://localhost:2727/users/get-info
 */
UsersRouter.get('/get-info', UsersController.getDashboardUsers)


export default UsersRouter