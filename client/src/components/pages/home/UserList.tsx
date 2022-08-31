import { IUser } from '../../../utils/models/User'

interface UserListProps {
    userList: IUser[]
}

export default function UserList({ userList = [] }: UserListProps) {
    if (userList.length == 0) {
        return <p>loading....</p>
    }
    return (
        <div>
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {Object.keys(userList[0]).map((item, idx) => {
                                if (item !== "createdAt" && item !== "id")
                                    return <th key={idx} className="py-3 px-6">
                                        {item}
                                    </th>
                                else
                                    return null;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((_item, idx) => {
                            return <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                {Object.keys(_item).map((key, _idx) => {
                                    if (key == "lastActive") {
                                        return <td key={_idx} className={"py-4 px-6"}>
                                            {(_item[key as keyof IUser]).toString().slice(0, 10)}
                                        </td>
                                    }
                                    else if (key !== "createdAt" && key !== "id") {
                                        return <td key={_idx} className={"py-4 px-6"}>
                                            {(_item[key as keyof IUser]).toString()}
                                        </td>
                                    } else {
                                        return null;
                                    }
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
