import { IUser } from "src/utils/types";

export const generateFio = (user:IUser) => `${user.lastName} ${user.firstName[0]}. ${user.patronymic[0]}`
    