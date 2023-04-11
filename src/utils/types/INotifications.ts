export type INotifucationVariant = 'push' | 'mattermost' | 'email'

export interface INotificationParam {
    target: INotifucationVariant,
    status: boolean
}

export interface INotificationUpdate {
    label: string,
    target: INotifucationVariant,
    index: number
    status: boolean,
}

export interface INotification {
    userNotifications: INotificationInner;
}

export interface INotificationInner {
    financials: INotificationParam[],
    thanks: INotificationParam[],
    shop_order: INotificationParam[],
    shop_delivered: INotificationParam[],
    shop_remains: INotificationParam[],
    shop_out_of_stock: INotificationParam[],
    shop_in_stock: INotificationParam[],
    new_event: INotificationParam[],
    new_message: INotificationParam[],
    new_user: INotificationParam[],
    event_results: INotificationParam[],
    event_winner: INotificationParam[],
}
