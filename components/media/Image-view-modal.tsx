/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import 'rc-pagination/assets/index.css';

import Button from '@components/ui/button';
import Modal from '@components/ui/modal/modal';
import {
  useModalAction,
  useModalState
} from '@components/ui/modal/modal.context';
import { IMAGE_MODAL, MEDIA_ITEM_MODAL } from '@ts-types/constants';
import { useTranslation } from 'next-i18next';

interface Props {}

const ImageViewModal = ({}: Props) => {
  const { t } = useTranslation();

  const { closeModal, openModal } = useModalAction();
  const { isOpen, view, id } = useModalState();

  console.log({ isOpen, view, id });

  return (
    <div className="w-full">
      {/* MODEL */}
      <Modal open={isOpen} onClose={closeModal}>
        {view === MEDIA_ITEM_MODAL && (
          <div className="flex overflow-y-auto flex-col bg-white md:h-fit h-[100vh] w-[100vw] md:w-[70vw] 2xl:w-[60vw]">
            <div className="p-4 h-fit min-h-[400px] w-full">
              <div className="flex items-center mt-3 md:mb-0 justify-end mb-16">
                <Button>Save</Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageViewModal;
