import { generateFio } from "../funcs";
import { ENewsTypes, IUser } from "../types";

export const NewsTypesTitle = {
  thanks: "Благодарность",
  event_user_registered: "Пользователь зарегистрировался на событие",
  event_results: "Результаты события",
  new_event: "Новое событие",
  new_order: "Новый заказ",
  new_product: "Новый товар",
};

const NewsTypesOwnerTitle = (type: ENewsTypes) =>
  type === "thanks" || type === "new_order" || type === "new_product" ? "Автор" : "Организатор";
interface usersForGen {
  owner?: IUser;
  userTo?: IUser;
  userFrom?: IUser;
  currentUser?: string;
}

export const NewsTypesOwner = (type: ENewsTypes, users: usersForGen) => {
  if (users.owner) {
    return `${NewsTypesOwnerTitle(type)}: ${generateFio(users.owner)}`;
  } else if (users.userTo.id === users.currentUser) {
    return `${NewsTypesOwnerTitle(type)}: Вы / Получатель: Вы`;
  } else if (users.userFrom.id === users.currentUser) {
    return `${NewsTypesOwnerTitle(type)}: Вы / Получатель: ${generateFio(users.userTo)}`;
  } else if (users.userFrom && users.userTo) {
    return `${NewsTypesOwnerTitle(type)}: ${generateFio(
      users.userFrom
    )} / Получатель: ${generateFio(users.userTo)}`;
  }
};
