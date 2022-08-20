import { Header } from '../components';
import Button from '../components/Button';

import { HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { useCreateActivity, useGetActivity } from 'utils/fetchers';
import useDisclosure from 'hooks/useDisclosure';
import { email } from 'utils/constanst';
import { size } from 'lodash';
import Image from 'next/image';
import { activityDateFormat } from 'utils/dateFormat';
import { useRouter } from 'next/router';
import ModalDeleteActivity from 'components/ModalDeleteActivity';
import { useState } from 'react';

export default function Home() {
  const { push } = useRouter();
  const [selectedActivity, setselectedActivity] = useState();

  const modalDelete = useDisclosure();

  const {
    data: activities,
    refetch,
    isLoading: activityLoading,
  } = useGetActivity();

  const { mutate } = useCreateActivity({
    onSuccess: refetch,
  });

  const onCreateActivityClicked = () => {
    mutate({
      title: 'New Activity',
      email: encodeURI(email),
    });
  };

  const onActivityClicked = (id) => {
    push(`/detail/${id}`);
  };

  const onDeleteActivity = (activity) => {
    setselectedActivity(activity);
    modalDelete.onOpen();
  };

  return activityLoading ? (
    <div className='loading'>loading...</div>
  ) : (
    <div className='bg-bg-primary h-screen w-screen'>
      <Header />
      <div className='w-screen flex justify-center'>
        <div className='w-[1000px] mt-10 flex flex-col items-center gap-y-[50px]'>
          {/* header */}
          <div className='flex justify-between items-center w-full'>
            <div
              className='font-bold text-4xl text-n900'
              data-cy='activity-title'
            >
              Activity
            </div>
            <Button
              type='primary'
              icons={<HiPlus />}
              data-cy='activity-add-button'
              onClick={onCreateActivityClicked}
            >
              Tambah
            </Button>
          </div>

          {/* task section */}
          {size(activities) > 0 ? (
            <div className='grid grid-cols-4 gap-x-5 gap-y-6 w-full'>
              {activities.map((activity) => (
                <div
                  className='bg-white rounded-xl h-[234px] shadow-lg flex flex-col justify-between px-7 py-6 cursor-pointer'
                  key={activity.id}
                  data-cy='activity-item'
                  onClick={() => onActivityClicked(activity.id)}
                >
                  <div
                    className='font-bold text-lg text-n900'
                    data-cy='activity-item-title'
                  >
                    {activity.title}
                  </div>
                  <div className='flex justify-between items-center'>
                    <div
                      className='text-secondary text-sm'
                      data-cy='activity-item-date'
                    >
                      {activityDateFormat(activity.created_at)}
                    </div>
                    <HiOutlineTrash
                      data-cy='activity-item-delete-button'
                      className='text-secondary cursor-pointer'
                      size={24}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteActivity(activity);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <Image
                src='/assets/imgs/activity-empty-state.png'
                width={767}
                height={490}
                alt='activity-empty-state'
                data-cy='activity-empty-state'
              />
            </div>
          )}
        </div>
      </div>
      <ModalDeleteActivity
        visible={modalDelete.isOpen}
        onClose={modalDelete.onClose}
        activity={selectedActivity}
        refetch={refetch}
      />
    </div>
  );
}
