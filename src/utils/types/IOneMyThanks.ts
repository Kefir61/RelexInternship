import { IComment } from "./IComment";
import { IUser } from "./IUser";
  
export enum EOperaionType {TO = 'TO', FROM = 'FROM'}

export interface IOneMyThanks {
    operationType: EOperaionType,
    user: IUser,
    comment: string,
    votesUp: number,
    votesDown: number,
    id: number,
    commentsCount:number,
    comments:IComment[]
    thanksAmount: number,
    createdAt: string,
  }

