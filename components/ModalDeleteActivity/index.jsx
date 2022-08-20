import Button from 'components/Button';
import Modal from 'components/Modal';
import React, { useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import { useDeleteActivity } from 'utils/fetchers';

import { AiOutlineInfoCircle } from 'react-icons/ai';

const ModalDeleteActivity = ({ visible, onClose, activity, refetch }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate } = useDeleteActivity({
    onSuccess: () => {
      refetch();
      onClose();
      setIsSuccess(true);
    },
  });

  const onOk = () => {
    mutate(activity.id);
  };

  return (
    <>
      <Modal
        visible={isSuccess}
        onClose={() => setIsSuccess(false)}
        width='490px'
        height={'fit-content'}
        py='40px'
      >
        <div
          className='flex gap-3 py-6 px-8 items-center'
          data-cy='modal-information'
        >
          <AiOutlineInfoCircle
            size={24}
            className='text-success'
            data-cy='modal-information-icon'
          />
          <div
            className='text-sm font-medium'
            data-cy='modal-information-title'
          >
            Activity berhasil dihapus
          </div>
        </div>
      </Modal>
      <Modal
        visible={visible}
        onClose={onClose}
        width='490px'
        height='355px'
        py='40px'
      >
        <div
          className='h-full flex flex-col items-center py-[40px] gap-[40px] px-[20px] text-center'
          data-cy='modal-delete'
        >
          <IoWarningOutline
            className='text-danger'
            size={84}
            data-cy='modal-delete-icon'
          />
          <div className='font-medium text-xl'>
            Apakah anda yakin menghapus activity <br />
            <span className='font-bold'>{`"${activity?.title}"`}</span>
          </div>
          <div className='flex w-full justify-center gap-5'>
            <Button
              type='secondary'
              data-cy='modal-delete-cancel-button'
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              type='danger'
              data-cy='modal-delete-confirm-button'
              onClick={onOk}
            >
              Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDeleteActivity;
