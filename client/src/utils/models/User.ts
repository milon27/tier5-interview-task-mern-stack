export interface IUser {
    id: string
    name: string
    email: string
    country: Country
    countryCode: string
    gender: string
    device: string
    usageTimeInMin: number
    lastActive: Date
}

export interface Country {
    code: string
    name: string
    Users?: IUser[]
}