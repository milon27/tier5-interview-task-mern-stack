import { Request, Response } from "express"
import MyResponse from "../models/MyResponse"

const UsersController = {
    addToFav: async (req: Request, res: Response) => {
        try {
            res.status(200).json(MyResponse("Track Added To Fav list", true))
        } catch (e) {
            // console.log("addToFav: ", e);
            res.status(500).json(MyResponse("already added!"))
        }
    },

}

export default UsersController