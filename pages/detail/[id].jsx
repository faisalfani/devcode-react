import { Header } from 'components';
import Button from 'components/Button';
import { find, isEmpty, orderBy, size } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState, useEffect, Fragment } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import {
  useGetDetailActivity,
  useUpdateActivity,
  useUpdateTodo,
} from 'utils/fetchers';
import { HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { TbPencil } from 'react-icons/tb';
import { BiSortAlt2 } from 'react-icons/bi';
import { Menu, Transition } from '@headlessui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { priority, sortMenu } from 'utils/constanst';
import ModalCreateTodo from 'components/ModalCreateTodo';
import useDisclosure from 'hooks/useDisclosure';
import Image from 'next/image';
import ModalDeleteTodo from 'components/ModalDeleteTodo';
import ModalEditTodo from 'components/ModalEditTodo';

const ActivityDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const modalCreateTodo = useDisclosure();
  const modalDeleteTodo = useDisclosure();
  const modalEditTodo = useDisclosure();

  const [isEdit, setIsEdit] = useState(false);
  const [activeSort, setActiveSort] = useState('newest');
  const [todoList, setTodoList] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState({});

  useEffect(() => {
    if (size(todoList) > 1) {
      switch (activeSort) {
        case 'oldest':
          setTodoList(orderBy(todoList, ['id'], ['asc']));
          break;

        case 'az':
          setTodoList(orderBy(todoList, ['id'], ['asc']));
          break;

        case 'za':
          setTodoList(orderBy(todoList, ['title'], ['desc']));
          break;

        default:
          setTodoList(orderBy(todoList, ['id'], ['desc']));
          break;
      }
    }
  }, [activeSort]);

  const {
    data: activityData,
    isLoading,
    refetch,
  } = useGetDetailActivity(id, {
    onSuccess: () => {
      setIsEdit(false);
    },
  });

  useEffect(() => {
    if (isEmpty(activityData)) return;
    setTodoList(activityData.todo_items);
  }, [activityData]);

  const { mutate: editActivity } = useUpdateActivity({
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: updateTodo } = useUpdateTodo({
    onSuccess: () => {
      refetch();
    },
  });

  const [activityTitle, setActivityTitle] = useState('');

  useEffect(() => {
    if (isEmpty(activityData)) return;
    setActivityTitle(activityData.title);
  }, [activityData]);

  const onEditClicked = () => {
    setIsEdit((prev) => !prev);
  };

  const handleUpdateActivityTitle = () => {
    editActivity({
      id,
      title: activityTitle,
    });
  };

  const onTodoChecked = (e, id) => {
    updateTodo({
      id,
      is_active: e.target.checked ? 0 : 1,
    });
  };

  return isLoading ? (
    <div className='loading'>loading...</div>
  ) : (
    <div>
      <Header />
      <div className='w-screen flex justify-center'>
        <div className='w-[1000px] mt-10 flex flex-col gap-y-[50px]'>
          {/* header */}
          <div className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4'>
              <MdChevronLeft
                size={48}
                className='cursor-pointer'
                onClick={router.back}
                data-cy='todo-back-button'
              />
              {isEdit ? (
                <input
                  type='text'
                  name='title'
                  id='title'
                  className='font-bold text-4xl text-n900 border border-b-n900'
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  onBlur={handleUpdateActivityTitle}
                  autoFocus
                />
              ) : (
                <div
                  className='font-bold text-4xl text-n900'
                  data-cy='todo-title'
                  onClick={onEditClicked}
                >
                  {activityData.title}
                </div>
              )}
              <TbPencil
                size={24}
                className='text-secondary cursor-pointer'
                data-cy='todo-title-edit-button'
                onClick={onEditClicked}
              />
            </div>
            <div className='flex gap-4 items-center'>
              {size(todoList) > 0 ? (
                <Menu
                  as='div'
                  className='relative inline-block text-left'
                  data-cy='todo-sort-button'
                >
                  <div>
                    <Menu.Button className='border-gray-300 border-[1px] rounded-full flex items-center justify-center w-14 h-14'>
                      <BiSortAlt2 size={24} className='text-secondary' />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30'>
                      {sortMenu.map((menu) => (
                        <Menu.Item
                          as='div'
                          key={menu.key}
                          onClick={() => setActiveSort(menu.key)}
                          data-cy='sort-selection'
                        >
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? 'bg-primary text-white'
                                  : 'text-gray-900'
                              } group flex justify-between w-full items-center px-5 py-4 text-sm border-b-gray-200 `}
                              data-cy={
                                activeSort === menu.key
                                  ? 'sort-selection-selected'
                                  : 'false'
                              }
                            >
                              <div className='flex gap-3 items-center'>
                                {menu.icons(active)}
                                <span data-cy='sort-selection-title'>
                                  {menu.label}
                                </span>
                              </div>
                              {activeSort === menu.key && (
                                <AiOutlineCheck
                                  className={`${
                                    active ? 'text-white' : 'text-black'
                                  }`}
                                  size={18}
                                />
                              )}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <div></div>
              )}

              <Button
                type='primary'
                icons={<HiPlus />}
                data-cy='todo-add-button'
                onClick={modalCreateTodo.onOpen}
              >
                Tambah
              </Button>
            </div>
          </div>
          <div className='todo-list flex flex-col gap-2'>
            {size(todoList) > 0 ? (
              todoList.map((todo) => {
                const priorityValue = find(
                  priority,
                  (prio) => prio.value === todo.priority
                );

                const isChecked = todo.is_active === 0 ? true : false;

                return (
                  <div
                    key={todo.id}
                    className='w-full rounded-md shadow-lg h-20 flex items-center justify-between px-7'
                    data-cy='todo-item'
                  >
                    <div className='left-section flex items-center gap-5 '>
                      <input
                        className='h-5 w-5 cursor-pointer'
                        type='checkbox'
                        name='isCheck'
                        id=''
                        checked={isChecked}
                        onChange={(e) => onTodoChecked(e, todo.id)}
                        data-cy='todo-item-checkbox'
                      />
                      <div
                        className={`circle w-3 h-3  ${priorityValue.color} rounded-full`}
                        data-cy='todo-item-priority-indicator'
                      />
                      <div
                        className={`text-[18px] font-medium ${
                          isChecked && 'line-through text-secondary'
                        }`}
                        data-cy='todo-item-title'
                      >
                        {todo.title}
                      </div>
                      <TbPencil
                        size={20}
                        className='text-secondary cursor-pointer'
                        onClick={() => {
                          setSelectedTodo(todo);
                          modalEditTodo.onOpen();
                        }}
                        data-cy='todo-item-edit-button'
                      />
                    </div>
                    <HiOutlineTrash
                      className='cursor-pointer text-secondary'
                      size={20}
                      onClick={() => {
                        setSelectedTodo(todo);
                        modalDeleteTodo.onOpen();
                      }}
                      data-cy='todo-item-delete-button'
                    />
                  </div>
                );
              })
            ) : (
              <div className='w-full flex justify-center'>
                <Image
                  src='/assets/imgs/todo-empty-state.png'
                  width={541}
                  height={413}
                  alt='activity-empty-state'
                  data-cy='todo-empty-state'
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalCreateTodo
        visible={modalCreateTodo.isOpen}
        onClose={modalCreateTodo.onClose}
        refetch={refetch}
        id={id}
      />
      <ModalEditTodo
        visible={modalEditTodo.isOpen}
        onClose={modalEditTodo.onClose}
        refetch={refetch}
        todo={selectedTodo}
        id={selectedTodo.id}
      />
      <ModalDeleteTodo
        activity={selectedTodo}
        visible={modalDeleteTodo.isOpen}
        onClose={modalDeleteTodo.onClose}
        refetch={refetch}
        setSelectedTodo={setSelectedTodo}
      />
      <div data-cy='modal-delete' />
    </div>
  );
};

export default ActivityDetail;
