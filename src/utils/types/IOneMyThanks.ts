import { IComment } from "./IComment";
import { IUser } from "./IUser";
  
export enum EOperaionType {TO = 'TO', FROM = 'FROM'}
export enum EReactionType {LIKE = 'like', DISLIKE = 'dislike', NONE = null}

export interface IOneMyThanks {
    operationType: EOperaionType,
    user: IUser,
    comment: string,
    votesUp: number,
    votesDown: number,
    id: number,
    userReaction:EReactionType,
    commentsCount:number,
    comments:IComment[]
    thankAmount: number,
    createdAt: string,
  }

