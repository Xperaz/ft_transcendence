'use client';
import Image from 'next/image';
import { RiNotification2Fill } from 'react-icons/ri';
import logo from '@/../public/logo2.svg';
import { Logout } from './Logout';
import Settings from './Settings';
import * as Popover from '@radix-ui/react-popover';
import Notification from '@/components/profile/Notification';
import { Socket } from 'socket.io-client';
import React from 'react';
import { membersType, userType } from '@/types/types';
import MyToast from '@/components/ui/Toast/MyToast';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const token = Cookies.get('token');

const Header = ({ socket }: { socket: Socket | null }): JSX.Element => {
  const [notifications, setnotifications] = React.useState<any[] | null>(null);
  if (!token) {
    toast.error('You are not logged in');
    return <div></div>;
  }
  // socket?.on('GameNotificationResponse', (data) => {
  //   console.log("GameNotificationResponse data :", data)
  //   Notifications !== null
  //   ? setNotifications([...Notifications, data])
  //   : setNotifications([data])
  //   setshownotification(true)
  // })
  React.useEffect(() => {
    (async () => {
      // get all friend request
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/friends/all`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setnotifications(data);
        console.log('notification data: ', data);
        return;
      }
      toast.error(res.statusText);
    })();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <Image
          className="flex justify-center lg:w-[150px] xl:w-[150px] md:w-[150px] "
          src={logo}
          height={32}
          width={79}
          alt="Picture of the author"
          priority
        />
      </div>
      <nav className="flex justify-center items-center">
        <ul className="flex items-center  gap-5 justify-center">
          <Settings login={false} />
          <li>
            <Popover.Root>
              <Popover.Trigger asChild aria-controls="radix-:R1mcq:">
                <button>
                  <RiNotification2Fill size={32} color="#E0E0E0" />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="text-white rounded p-2 md:p-3 w-[90vw] sm:w-[60vw] md:w-[55vw] lg:w-[40vw] xl:w-[35vw] 2xl:w-[25vw] bg-[#2B504B]"
                  sideOffset={5}
                >
                  <div className="flex flex-col gap-2.5">
                    <h1 className="tracking-wide ml-2 font-bold sm:text-lg 2xl:text-xl">
                      Notifications
                    </h1>

                    {notifications &&
                      notifications.map(
                        (friendshipData: any, index: number) => (
                          <Notification
                            friendshipData={friendshipData}
                            key={index}
                            message="send a friend request."
                            isFriend
                          />
                        )
                      )}
                  </div>
                  <Popover.Arrow className="fill-[#2B504B]" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </li>
          <Logout />
        </ul>
      </nav>
    </>
  );
};

export default Header;
