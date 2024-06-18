export type ApiResponse<T> = {
    message :  String,
    success: Boolean,
    status: number,
    data?: T
}