import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

const App = () => (
  <BrowserRouter>
    <div className={styles.app}>
      <AppHeader />
      <>
        <Routes>
          {/* Базовые маршруты */}
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          
          {/* Защищённые маршруты */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          
          {/* Страница не найдена */}
          <Route path='*' element={<NotFound404 />} />
          
          {/* Модальные окна */}
          <Route
            path='/feed/:number'
            element={<Modal title='' onClose={() => {}} />}
          />
          {/* TODO: убрать заглушку */}
          <Route
            path='/ingredients/:id'
            element={<Modal title='' onClose={() => {}} />}
          />
          {/* TODO: убрать заглушку */}
          <Route
            path='/ingredients/:id'
            element={<Modal title='' onClose={() => {}} />}
          />
        </Routes>
      </>
    </div>
  </BrowserRouter>
);

export default App;
