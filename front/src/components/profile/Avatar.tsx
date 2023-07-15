"use client";
import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import style from '@/components/Home/style'
import profile from '../../../public/profile.png'

const AvatarProfile: React.FC = () => (
  <div className='relative flex'>
    <Avatar.Root className={`${style.flexCenter} flex-inline align-middle overflow-hidden select-none
                    w-[100px] h-[100px] rounded-full absolute top-[-7vh] left-7`}>
      <Avatar.Image
        className="w-[100%] h-[100%] object-cover rounded-[inherit]"
        src={profile.src}
        alt="User Avatar"
      />
      <Avatar.Fallback className={`w-[100%] h-[100%] ${style.flexCenter} bg-white text-[15px] leanding-1 font-medium`} delayMs={600}>
        Avatar
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);

export default AvatarProfile;