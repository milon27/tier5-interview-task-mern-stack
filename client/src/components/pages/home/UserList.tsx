import React from 'react'
import { IUser } from '../../../utils/models/User'

interface UserListProps {
    userList: IUser[]
}

export default function UserList({ userList = [] }: UserListProps) {
    return (
        <div>

            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {Object.keys(userList[0]).map((item, idx) => {
                                return <th key={idx} scope="col" className="py-3 px-6">
                                    {item}
                                </th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((_item, idx) => {
                            return <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                {Object.values(_item).map((item, _idx) => {
                                    return <th key={_idx} className={idx == 0 ? "py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" : "py-4 px-6"}>
                                        {item}
                                    </th>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
