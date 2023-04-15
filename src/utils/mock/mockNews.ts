import { INews } from "../types";

export const mockNews2: INews[] = [{
    "id": 13,
    "type": "event_results",
    "userReaction": null,
    "votesUp": 0,
    "votesDown": 0,
    "createdAt": "2023-04-10T00:02:10.799202Z",
    "eventId": 2,
    "eventTitle": "День енотов",
    "eventDescription": "Победители: Найтли Кира Пиратовна; Портман Натали;",
    "owner": {
      "id": "680e57c8-7c0c-4053-b069-819a2bbbe34c",
      "lastName": "Портман",
      "firstName": "Натали",
      "patronymic": null,
      "job": "Архимаг",
      "mainImageId": null
    }
},     {
    "id": 115,
    "type": "thanks",
    "userReaction": null,
    "votesUp": 1,
    "votesDown": 0,
    "createdAt": "2023-04-12T13:34:04.675562Z",
    "fromUser": {
      "id": "64a9df65-ca92-4c72-bfc0-dbb968e2b5fa",
      "lastName": "Найтли",
      "firstName": "Кира",
      "patronymic": "Пиратовна",
      "job": "Пиратский барон. Капитан Летучего голландца",
      "mainImageId": null
    },
    "toUser": {
      "id": "b023cee3-e01e-4b39-a6d4-f01b29f668f6",
      "lastName": "Сидорова",
      "firstName": "Елена",
      "patronymic": "Александровна",
      "job": "",
      "mainImageId": null
    },
    "comment": "321",
    "thankAmount": 2
  },
  {
    "id": 114,
    "type": "new_product",
    "userReaction": null,
    "votesUp": 0,
    "votesDown": 0,
    "createdAt": "2023-04-12T13:29:22.705282Z",
    "productId": 7,
    "productName": "Лейс с crabom",
    "owner": {
      "id": "680e57c8-7c0c-4053-b069-819a2bbbe34c",
      "lastName": "Портман",
      "firstName": "Натали",
      "patronymic": null,
      "job": "Архимаг",
      "mainImageId": null
    }
  },]