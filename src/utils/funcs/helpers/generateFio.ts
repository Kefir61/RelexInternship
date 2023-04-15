import { IUser } from "src/utils/types";

export const generateFio = (user:IUser) => `${user.lastName} ${user.firstName?`${user.firstName[0]}.`:''} ${user.patronymic?`${user.patronymic[0]}.`:''}`
    