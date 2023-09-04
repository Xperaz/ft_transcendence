'use client';
import React, { useEffect } from 'react';
import FriendCard from './FriendCard';
import { userType } from '@/types/types';
import Cookies from 'js-cookie';
import axios from 'axios';

export function getFriendList(): userType[] {
  const [friendList, setFriendList] = React.useState<userType[]>([]);
  const jwtToken = Cookies.get('token');

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/friends/accepted`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const fetchedData: userType[] = response.data;
        setFriendList(fetchedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return friendList;
}

const Friend = () => {
  const friends: userType[] = getFriendList();

  return (
    <div className="bg-[#243230] rounded-md text-white flex flex-col p-2 xl:p-3 overflow-auto">
      {friends &&
        friends.map((friend) => (
          <FriendCard
            login={friend.login}
            userId={friend.id}
            avatar={friend.avatar}
            userStatus={friend.status}
          />
        ))}
      {(!friends || friends.length === 0) && (
        <div className="text-center text-white">You have no friends yet</div>
      )}
    </div>
  );
};

export default Friend;
