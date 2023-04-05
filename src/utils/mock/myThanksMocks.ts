import { EOperaionType, IOneMyThanks } from "../types";

export const myThanksMocks: IOneMyThanks[] = [{
    comment:'asd', 
    commentsCount:2, 
    createdAt:'2022-21-21T21:21', 
    id:3, operationType: EOperaionType.FROM, 
    thanksAmount:3, 
    votesDown:3, 
    votesUp:0, 
    comments:[{id:1,comment:'Привет', createdAt:'2022-21-21T21:21', user:{
      firstName:'Алексей', 
      id:3, 
      lastName:'Петров', 
      mainImageId:null, 
      patronymic:'Сергеевич'
    }}, 
    {id:2,comment:'long message', createdAt:'2022-21-21T21:21', user:{
      firstName:'Олег', 
      id:2, 
      lastName:'Васильев', 
      mainImageId:null, 
      patronymic:'Сергеевич'
    }}, 
    {id:3,comment:'long message and another and another and another', createdAt:'2022-21-21T21:21', user:{
      firstName:'Олег', 
      id:1, 
      lastName:'Сидоров', 
      mainImageId:null, 
      patronymic:'Сергеевич'
    }},
  ],
    user:{
      firstName:'Олег', 
      id:2, 
      lastName:'Сидоров', 
      mainImageId:null, 
      patronymic:'Сергеевич'
    }}, {
      comment:'asd', 
      commentsCount:2, 
      createdAt:'2022-21-21T21:21', 
      id:3, operationType: EOperaionType.FROM, 
      thanksAmount:3, 
      votesDown:3, 
      votesUp:0, 
      comments:[{id:1,comment:'Привет', createdAt:'2022-21-21T21:21', user:{
        firstName:'Алексей', 
        id:3, 
        lastName:'Петров', 
        mainImageId:null, 
        patronymic:'Сергеевич'
      }}, 
      {id:2,comment:'long message', createdAt:'2022-21-21T21:21', user:{
        firstName:'Олег', 
        id:2, 
        lastName:'Васильев', 
        mainImageId:null, 
        patronymic:'Сергеевич'
      }}, 
      {id:3,comment:'long message and another and another and another', createdAt:'2022-21-21T21:21', user:{
        firstName:'Олег', 
        id:1, 
        lastName:'Сидоров', 
        mainImageId:null, 
        patronymic:'Сергеевич'
      }},
    ],
      user:{
        firstName:'Олег', 
        id:1, 
        lastName:'Сидоров', 
        mainImageId:null, 
        patronymic:'Сергеевич'
      }}]