import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import {
  isAuthCheckedSelector,
  loginUserRequestSelector
} from '../../services/slices/userSlice';

// Определение пропсов для компонента
type ProtectedRouteProps = {
  onlyUnAuth?: boolean; // Показывать только для неавторизованных пользователей
  children: React.ReactElement; // Дочерние компоненты
};

// Компонент защищенного маршрута
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  // Получение информации о текущем состоянии аутентификации пользователя
  const isAuthChecked = useSelector(isAuthCheckedSelector); // Проверка завершена
  const loginUserRequest = useSelector(loginUserRequestSelector); // Запрос на вход

  // Получение информации о текущем маршруте
  const location = useLocation();

  // Если происходит проверка аутентификации пользователя
  if (!isAuthChecked && loginUserRequest) {
    return <Preloader />; // Отображаем прелоадер
  }

  // Если требуется авторизация и проверка еще не завершена
  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />; // Перенаправляем на страницу входа
  }

  // Если необходимо показывать только неавторизованным пользователям и пользователь авторизован
  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' }; // Определяем, откуда пришел пользователь
    return <Navigate replace to={from} state={location} />; // Перенаправляем на предыдущий маршрут
  }

  // Если ни одно из условий не выполняется, отображаем дочерние компоненты
  return children;
};
