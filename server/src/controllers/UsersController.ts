import { Gender } from "@prisma/client"
import { startOfToday, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import { Request, Response } from "express"
import { IAddUserDto } from "../models/AddUserDto"
import MyResponse from "../models/MyResponse"
import Helper from "../utils/Helper"

const UsersController = {
    getDashboardUsers: async (req: Request, res: Response) => {
        try {
            const dailyStart = Helper.getDateInMySqlString(startOfToday())
            const dailyEnd = Helper.getDateInMySqlString(endOfDay(new Date()))

            const weeklyStart = Helper.getDateInMySqlString(startOfWeek(new Date()))
            const weeklyEnd = Helper.getDateInMySqlString(endOfWeek(new Date()))

            const monthlyStart = Helper.getDateInMySqlString(startOfMonth(new Date()))
            const monthlyEnd = Helper.getDateInMySqlString(endOfMonth(new Date()))

            let _countInfo: any[] = await req.prisma.$queryRaw`
                select 'dau' as type , (select COUNT(id) from Users where lastActive BETWEEN  ${dailyStart}  AND  ${dailyEnd} )  as value 
                union all
                select 'wau' as type ,  (select COUNT(id) from Users  where lastActive BETWEEN  ${weeklyStart}  AND  ${weeklyEnd} ) as value 
                union all
                select 'mau' as type ,  (select COUNT(id) from Users  where lastActive BETWEEN  ${monthlyStart}  AND  ${monthlyEnd} ) as value;
            `;
            let countInfo = {
                dau: 0,
                wau: 0,
                mau: 0
            }

            _countInfo.forEach(item => {
                const key = item.type as "dau" | "wau" | "mau"
                countInfo[key] = Number(item.value)
            })

            const top15Users = await req.prisma.users.findMany({
                orderBy: {
                    usageTimeInMin: "desc"
                },
                take: 15
            })

            res.status(200).json(MyResponse("get dashboard data", {
                countInfo,
                top15Users
            }))
        } catch (e) {
            console.log("getDashboardUsers: ", e);
            res.status(500).json(MyResponse((e as Error).message))
        }
    },
    getUsersWithFilter: async (req: Request, res: Response) => {
        try {
            const filter: UserFilterQuery = req.query as any

            const queryCountry = filter.country || undefined
            const queryGender = filter.gender || undefined
            const queryDevice = filter.device || undefined

            const Users = await req.prisma.users.findMany({
                where: {
                    countryCode: queryCountry,
                    gender: queryGender,
                    device: queryDevice
                },
                orderBy: {
                    usageTimeInMin: "desc"
                },
                take: 15
            })

            res.status(200).json(MyResponse("get users", Users))
        } catch (e) {
            console.log("getUsersWithFilter: ", e);
            res.status(500).json(MyResponse((e as Error).message))
        }
    },
    deleteUser: async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            await req.prisma.users.delete({
                where: {
                    id: id
                }
            })
            res.status(200).json(MyResponse("deleteUser done", true))
        } catch (e) {
            console.log("deleteUser: ", e);
            res.status(500).json(MyResponse((e as Error).message))
        }
    },
    addUser: async (req: Request, res: Response) => {
        try {
            const _user: IAddUserDto = req.body

            const user = await req.prisma.users.create({
                data: {
                    name: _user.name,
                    email: _user.email,
                    device: _user.device,
                    countryCode: _user.countryCode,
                    gender: _user.gender as any
                }
            })
            res.status(200).json(MyResponse("deleteUser done", user))
        } catch (e) {
            console.log("addUser: ", e);
            res.status(500).json(MyResponse((e as Error).message))
        }
    }
}

interface UserFilterQuery { country: string, device: string, gender: Gender }

export default UsersController