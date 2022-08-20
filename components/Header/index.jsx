import React from 'react';

const Header = () => {
  return (
    <div
      className='h-[105px] w-full bg-primary flex items-center justify-center font-bold'
      data-cy='header-background'
    >
      <div className='w-[1000px]'>
        <div data-cy='header-title' className='text-white text-2xl'>
          TO DO LIST APP
        </div>
      </div>
    </div>
  );
};

export default Header;
