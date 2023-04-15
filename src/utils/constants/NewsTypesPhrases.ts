import { generateFio } from "../funcs"
import { ENewsTypes, IUser } from "../types"

export const NewsTypesTitle = {
    thanks:'Благодарность',
    event_user_registered:'Пользователь зарегестрировался на событие',
    event_results:'Результаты события',
    new_event:'Новое событие',
    new_order:'Новый заказ',
    new_product:'Новый товар',
}

const NewsTypesOwnerTitle = (type:ENewsTypes)=>type==='thanks' || type==='new_order' || type==='new_product' ? 'Автор':'Организатор'
interface usersForGen {
    owner?:IUser, 
    userTo?:IUser, 
    userFrom?:IUser, 
    currentUser?:IUser
}

export const NewsTypesOwner = (type:ENewsTypes, users:usersForGen)=>{
    if(users.owner) {
        return `${NewsTypesOwnerTitle(type)}: ${generateFio(users.owner)}`
    } else if(users.userTo === users.currentUser) {
        return `${NewsTypesOwnerTitle(type)}: ${generateFio(users.userTo)}`
    } else {
        return `${NewsTypesOwnerTitle(type)}: ${generateFio(users.userTo)} / Получатель: ${generateFio(users.userFrom)}`
    }
}