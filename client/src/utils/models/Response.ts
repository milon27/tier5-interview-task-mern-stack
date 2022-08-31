interface IResponse<T> {
    message: string
    response?: T
}
export default IResponse