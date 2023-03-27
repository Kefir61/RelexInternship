export interface IUser {
    id:number,
    lastName: string,
    firstName: string,
    patronymic: string,
    mainImageId: number,
  }
  
export enum EOperaionType {'TO', 'FROM'}

export interface IOneMyThanks {
    operationType: EOperaionType,
    user: IUser,
    comment: string,
    votesUp: number,
    votesDown: number,
    id: number,
    thanksAmount: number,
    createdAt: string,
  }