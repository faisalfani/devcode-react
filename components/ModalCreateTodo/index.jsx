import Button from 'components/Button';
import Modal from 'components/Modal';
import React, { Fragment, useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';

import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { useCreateTodo } from 'utils/fetchers';
import { priority } from 'utils/constanst';

const ModalCreateTodo = ({ visible, onClose, refetch, id }) => {
  const [selected, setSelected] = useState(priority[0]);

  const [title, setTitle] = useState();

  const { mutate: createTodo } = useCreateTodo({
    onSuccess: () => {
      onClose();
      setSelected(priority[0]);
      setTitle(undefined);
      refetch();
    },
  });

  const onOk = () => {
    createTodo({
      activity_group_id: id,
      title,
      priority: selected.value,
    });
  };

  return (
    <>
      <Modal visible={visible} onClose={onClose} width='830px' height='403px'>
        <div className='h-full flex flex-col  py-6 gap-5 '>
          <div className='flex justify-between items-center px-8'>
            <Dialog.Title
              as='h2'
              className='text-lg font-semibold '
              data-cy='modal-add-title'
            >
              Tambah List Item
            </Dialog.Title>
            <AiOutlineClose
              size={24}
              className='text-secondary cursor-pointer'
              onClick={onClose}
              data-cy='modal-add-close-button'
            />
          </div>
          <div className='w-full h-[1px] bg-gray-200 flex-shrink-0' />
          <div className='modal-body flex flex-col px-8 mt-3 gap-6'>
            <div className='form-group flex flex-col gap-2'>
              <label
                className='text-xs font-semibold'
                data-cy='modal-add-name-title'
              >
                NAMA LIST ITEM
              </label>
              <input
                className='px-4 py-3 border-[1px] rounded-lg  
                focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none
                '
                type='text'
                name='title'
                id=''
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Tambahkan nama list item'
                data-cy='modal-add-name-input'
              />
            </div>
            <div className='form-group flex flex-col gap-2'>
              <label
                className='text-xs font-semibold'
                data-cy='modal-add-priority-title'
              >
                PRIORITY
              </label>
              <Listbox value={selected} onChange={setSelected}>
                <div className='relative mt-1'>
                  <Listbox.Button
                    className='relative cursor-default rounded-lg bg-white pl-3 pr-10 text-left border-gray-200 border-[1px] py-5 px-4 w-[205px] focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm'
                    data-cy='modal-add-priority-dropdown'
                  >
                    <div
                      className='flex items-center gap-5'
                      data-cy='modal-add-priority-item'
                    >
                      <div
                        className={`circle w-3 h-3 ${selected.color} rounded-full`}
                      />
                      <span className='text-[16px]'>{selected.name}</span>
                    </div>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                      <BiChevronDown
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <Listbox.Options className='absolute w-[205px] max-h-60 overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                      {priority.map((prio, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 px-4 pr-4 ${
                              active ? 'bg-primary text-white' : 'text-gray-900'
                            }`
                          }
                          data-cy='modal-add-priority-item'
                          value={prio}
                        >
                          {({ selected }) => (
                            <div className='flex justify-between'>
                              <div className='flex items-center gap-5'>
                                <div
                                  className={`circle w-3 h-3  ${prio.color} rounded-full`}
                                />
                                <span className='text-[16px]'>{prio.name}</span>
                              </div>
                              {selected && <AiOutlineCheck size={18} />}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className='w-full h-[1px] bg-gray-200 flex-shrink-0' />

          <div className='flex w-full justify-end px-8'>
            <Button
              type='primary'
              onClick={onOk}
              data-cy='modal-add-save-button'
            >
              Simpan
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateTodo;
