import React, { FC } from 'react';
import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Roles, PageRoutes } from '@utils';

/** Временный интерфейс пользователя*/
interface IUser {
    id: number;
    name: string;
    role: Roles;
}

interface IPrivateWrapper{
    roles?: Roles[];
}

export const PrivateWrapper: FC<IPrivateWrapper> = ({roles}) => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    /** Заглушка для дальнейшего получения пользователя из стейта, сейчас будет всегда true*/
    const user: IUser = {
        id: 1,
        name: 'Vasya',
        role: 'admin_events',
    }
    
    /** Допилить редирект на страницу, с которой пытались перейти вручную*/
    if (roles.includes(user.role)) {
        return <Outlet/>
    } else {
        return user
            ? <Navigate to={PageRoutes.SHARED_FEED}/>
            : <Navigate to={PageRoutes.LOGIN} state={{ from: location }} replace/>
    }   
}
