'use client';
import React from 'react';
import { GlobalContextType, User } from './types';

export const GlobalContext = React.createContext<GlobalContextType | null>(
  null
);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [authUser, setAuthUser] = React.useState<User>();
  const [jwt, setJwt] = React.useState<string | null>(
    localStorage.getItem('jwt')
  );
  const removeAuth = () => {
    localStorage.removeItem('jwt');
    setJwt(null);
    setAuthUser(undefined);
  };
  const updateUsers = (updtUsers: User[]) => {
    const updated = users.map((user) => {
      for (const updtUser of updtUsers)
        if (updtUser.userId == user.userId) return updtUser;
      return user;
    });
    setUsers(updated);
  };
  const removeUsers = (removeIds: string[]) => {
    const updated = users.filter((user) => {
      for (const removeId of removeIds)
        if (removeId == user.userId) return false;
      return true;
    });
    setUsers(updated);
  };

  return (
    <GlobalContext.Provider
      value={{
        users,
        jwt,
        authUser,
        updateUsers,
        removeUsers,
        setAuthUser,
        setJwt,
        setUsers,
        removeAuth
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
