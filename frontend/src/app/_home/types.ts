import { Dispatch, SetStateAction } from "react";

export interface User {
  userId: string;
  name: string;
  email: string;
  lastLogin: string;
  createdAt: string;
  enabled: boolean;
}


export type GlobalContextType = {
  users: User[];
  authUser?: User;
  jwt: string | null;
  setAuthUser: Dispatch<SetStateAction<User | undefined>>;
  setJwt: (jwt: string|null) => void;
  setUsers: Dispatch<SetStateAction<User[]>>;
  updateUsers: (users: User[]) => void;
  removeUsers: (usedIds: string[]) => void;
  removeAuth: () => void;
}