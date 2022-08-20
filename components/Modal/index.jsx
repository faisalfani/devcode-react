import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';

const Modal = ({ visible, onClose, children, width, height, cypressData }) => {
  const [event, setEvent] = useState();
  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      setEvent('escape');
    } else {
      console.log('calledHere');
      setEvent(undefined);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    document.addEventListener('mouseup', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
      document.removeEventListener('mouseup', escFunction);
    };
  }, []);

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => !event && onClose()}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={` transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all`}
                data-cy={cypressData}
                as='div'
                style={{ width, height, overflow: 'unset' }}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
