import { ENewsTypes } from "./INewsTypes";
import { EReactionType } from "./IOneMyThanks";
import { IUser } from "./IUser";

export type EUserParticipateType = null | 'no_more_place' | 'taking_part'

export interface INews {
    id:number,
    type:ENewsTypes,
    userReaction:EReactionType,
    votesUp:number,
    votesDown:number,
    createdAt:string,
    owner?:IUser,
    user?:IUser,
    eventId?: number,
    eventTitle?: string,
    eventDescription?: string,
    userParticipateType?: EUserParticipateType,
    orderId?: number,
    orderAmount?: number,
    productId?: number,
    productName?: string,   
    fromUser?:IUser,
    toUser?:IUser,
    comment?: string,
    thankAmount?: number,
}