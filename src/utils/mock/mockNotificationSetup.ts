import { INotificationInner } from '@utils';

export const mockNotificationInnersDefault: INotificationInner = {
    financials: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    thanks: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    shop_order: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    shop_delivered: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    shop_remains: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    shop_out_of_stock: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    shop_in_stock: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    new_event: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    new_message: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    new_user: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    event_results: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
    event_winner: [
        { target: 'push', status: false },
        { target: 'mattermost', status: false },
        { target: 'email', status: false }],
};

export const notificationSubtitles = new Map([
    ['financials', 'уведомления по финансовым операциям:'],
    ['thanks', 'благодарности:'],
    ['shop_order', 'заказ в магазине:'],
    ['shop_delivered', 'поступление нового товара:'],
    ['shop_remains', 'остаток избранного товара менее 3 шт:'],
    ['shop_out_of_stock', 'завершение избранного товара:'],
    ['shop_in_stock', 'поступление избранного товара:'],
    ['new_event', 'новое событие:'],
    ['new_message', 'новые сообщения в чате события:'],
    ['new_user', 'новые участники в событии:'],
    ['event_results', 'результаты события:'],
    ['event_winner', 'первое место в конкурсе:'],
]);
