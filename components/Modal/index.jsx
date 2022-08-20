import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';

const Modal = ({ visible, onClose, children, width, height, cypressData }) => {
  const [event, setEvent] = useState();
  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      setEvent('escape');
    } else {
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
        <div className='fixed inset-0 bg-black bg-opacity-25' />

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Dialog.Panel
              className={` transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all`}
              data-cy={cypressData}
              as='div'
              style={{ width, height, overflow: 'unset' }}
            >
              {children}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
