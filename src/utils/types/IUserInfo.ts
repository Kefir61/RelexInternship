import { IDelivery, INotification, INotificationInner } from '@utils';
export interface IUserInfo {
    id: string,
    username: string,
    email: string,
    lastName: string,
    firstName: string,
    patronymic: string,
    birthday: string,
    city: string,
    address: string,
    status: string,
    dismissalDate: string,
    mainImageId: string | null,
    job: string,
    statusMessage: string,
    showBirthday: boolean,
    fromOffice: boolean,
    userDeliveries: IDelivery[],
    userNotifications: INotificationInner
};

export interface IUserState {
    user: IUserInfo,
    userLastState: IUserInfo,
    userImage: string,
    error: string | null,
    loading: boolean
};
