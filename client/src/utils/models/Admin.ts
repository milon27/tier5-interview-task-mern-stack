interface IAdmin {
    id: string
    name: string
    email: string
}

export interface IAdminLoginDto {
    email: string
    password: string
}

export interface IAdminRegisterDto {
    name: string
    email: string
    password: string
}

export default IAdmin