export interface IUser {
    id:string,
    lastName: string,
    firstName: string,
    patronymic: string | null,
    mainImageId?: string,
    job?:string,
  }