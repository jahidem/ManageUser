'use client';
import { GlobalContextType, User } from '../_home/types';
import { GlobalContext } from '../_home/authUserContext';
import React, { useEffect, useState } from 'react';
import { api } from '../_home/constants';
import { FaLock, FaLockOpen, FaTrashCan } from 'react-icons/fa6';
import { MdLogout } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import doc from '../../../assets/doc.png';
import Image from 'next/image';

export default function Dashboard() {
  const {
    users,
    setUsers,
    jwt,
    authUser,
    setAuthUser,
    setJwt,
    updateUsers,
    removeUsers,
    removeAuth,
  } = React.useContext(GlobalContext) as GlobalContextType;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await fetch(`${api}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response.status == 401) {
        removeAuth();
        router.replace('/');
        return;
      }
      const data: User[] = await response.json();
      setUsers(data);
    };
    if (jwt) getAllUsers();
  }, []);

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };
  const handleEnabling = async () => {
    const update = await fetch(`${api}/user/enable`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(selectedUsers),
    });
    if (update.status == 401) {
      removeAuth();
      router.replace('/');
      return;
    }
    const updateList: User[] = await update.json();
    updateUsers(updateList);
    setSelectedUsers([]);
  };
  const handleBlocking = async () => {
    const update = await fetch(`${api}/user/block`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(selectedUsers),
    });
    if (update.status == 401) {
      removeAuth();
      router.replace('/');
      return;
    }
    const updateList: User[] = await update.json();
    updateUsers(updateList);
    setSelectedUsers([]);
  };

  const handleDeleting = async () => {
    const update = await fetch(`${api}/user/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(selectedUsers),
    });
    if (update.status == 401) {
      removeAuth();
      router.replace('/');
      return;
    }
    const updateList: string[] = await update.json();

    removeUsers(updateList);
    setSelectedUsers([]);
  };

  return (
    <>
      <div className='w-full border-b-gray-200 border-b-2 h-16 flex justify-between px-12'>
        <div className='flex justify-center items-center space-x-2'>
          <Image
            alt='Manage User'
            src={doc}
            className='mx-auto h-9 w-auto'
          />
          <p className='font-bold'>MANAGE-USER</p>
        </div>
        <div className='flex space-x-6 items-center'>
          <div>
            <p className='font-semibold'>
              {authUser?.name && `Hello, ${authUser?.name}!`}
            </p>
          </div>
          <button
            onClick={() => {
              setJwt(null);
              setAuthUser(undefined);
              router.replace('/');
            }}
            className='flex justify-center items-center px-3 text-md rounded-md py-1.5  leading-6 text-white shadow-sm font-semibold bg-orange-600 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'>
            Logout
            <MdLogout className='ml-2 text-white font-semibold' />
          </button>
        </div>
      </div>
      <div className='max-w-screen-xl mx-auto overflow-hidden'>
        <div className='flex justify-start w-full mt-16 '>
          <div className='flex space-x-2'>
            <button
              onClick={handleBlocking}
              className='flex justify-center items-center rounded-md bg-gray-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
              <FaLock className='mr-2' />
              Block
            </button>
            <button
              onClick={handleEnabling}
              className='flex justify-center items-center rounded-md bg-gray-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
              <FaLockOpen />
            </button>
            <div className='w-10'></div>
            <button
              onClick={handleDeleting}
              className='flex justify-center items-center rounded-md bg-orange-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'>
              <FaTrashCan className='mr-2' />
              Delete
            </button>
          </div>
        </div>
        <div className='mt-4 max-h-[560px] relative overflow-y-auto shadow-md sm:rounded-lg border  dark:border-gray-700'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-orange-100 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th
                  scope='col'
                  className='p-4'>
                  <div className='flex items-center'>
                    <input
                      onChange={() => {
                        if (selectedUsers.length == users.length)
                          setSelectedUsers([]);
                        else setSelectedUsers(users.map((p) => p.userId));
                      }}
                      checked={selectedUsers.length == users.length}
                      id='checkbox-all-search'
                      type='checkbox'
                      className='w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <label
                      htmlFor='checkbox-all-search'
                      className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  User Id
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Full Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Email
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Last Login
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Registration Time
                </th>
                <th
                  scope='col'
                  className='px-6 py-3'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.userId}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                  <td className='w-4 p-4'>
                    <div className='flex items-center'>
                      <input
                        checked={selectedUsers.includes(user.userId)}
                        onChange={() => handleCheckboxChange(user.userId)}
                        id='checkbox-table-search-1'
                        type='checkbox'
                        className='w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label
                        htmlFor='checkbox-table-search-1'
                        className='sr-only'>
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className='px-6 py-4'>{user.userId.slice(0, 6)}</td>
                  <td className='px-6 py-4'>{user.name}</td>
                  <td className='px-6 py-4'>{user.email}</td>
                  <td className='px-6 py-4'>
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                  <td className='px-6 py-4'>
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className='px-6 py-4'>
                    {user.enabled ? 'Active  ' : 'Blocked'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
