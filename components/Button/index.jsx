import React from 'react';

const Button = ({ icons, children, type, ...restProps }) => {
  const renderType = () => {
    let className = '';
    switch (type) {
      case 'secondary':
        className = `flex border-none bg-gray-100 text-gray-500 items-center gap-2 justify-center px-6 py-4 font-semibold rounded-full`;
        break;

      case 'danger':
        className = `flex border-none bg-danger text-white items-center gap-2 justify-center px-6 py-4 font-semibold rounded-full`;
        break;

      default:
        className = `flex border-none bg-primary text-white items-center gap-2 justify-center px-6 py-4 font-semibold rounded-full`;
        break;
    }
    return className;
  };
  return (
    <button className={renderType()} {...restProps}>
      {icons}
      {children}
    </button>
  );
};

export default Button;
