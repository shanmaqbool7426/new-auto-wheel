import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/redux/reducers/authSlice';

export default function AuthWrapper({ children }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();


  console.log("session>>>>>>", session)
  useEffect(() => {
    if (session?.user) {
      dispatch(login({
        token: session?.user?.token?.token,
        user: session?.user?.token?.user
      }));
    } else {
      dispatch(logout());
    }
  }, [session, dispatch]);

  return children;
}