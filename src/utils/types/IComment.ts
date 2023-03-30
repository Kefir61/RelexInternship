import { IUser } from "./IUser";

export interface IComment {
    id: number,
    user:IUser,
    comment:string,
    createdAt:string,
}
