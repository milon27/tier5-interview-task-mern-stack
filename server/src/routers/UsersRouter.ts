import { Router } from "express";
import UsersController from "../controllers/UsersController";

const UsersRouter = Router()

/**
 * @description get top 15 users and DAU,WAU,MAU
 * @get http://localhost:2727/users/get-info
 */
UsersRouter.get('/get-info', UsersController.getDashboardUsers)

/**
 * @description get users based on filter
 * @get http://localhost:2727/users/filter?country=BD&device=APPLE&gender=MALE
 */
UsersRouter.get('/filter', UsersController.getUsersWithFilter)

/**
 * @description delete user
 * @delete http://localhost:2727/users/delete/:id
 */
UsersRouter.delete('/delete/:id', UsersController.deleteUser)

export default UsersRouter