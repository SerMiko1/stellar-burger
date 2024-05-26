import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { clearErrors, errorSelector } from '../../services/slices/user/slice';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../services/slices/user/actions';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(errorSelector);
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
    navigate('/');
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  return (
    <LoginUI
      errorText={error!}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
