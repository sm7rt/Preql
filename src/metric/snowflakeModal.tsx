import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { Button } from 'src/components/elements';
import { HeadingL } from 'src/components/elements/typographies';

type SnowflakeModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

function SnowflakeModal({ isOpen, closeModal }: SnowflakeModalProps) {
  return (
    <Transition appear as={Fragment} show={isOpen}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[536px] transform overflow-hidden rounded-2xl bg-white p-12 text-left align-middle shadow-xl transition-all text-wfbase-800">
                <div className="logo text-center mb-12">
                  <Image alt="Logo" height={40} src="/Logo.svg" width={160} />
                </div>
                <HeadingL extraClasses="mb-6">👋 Welcome to Preql</HeadingL>
                <p className="text-18 mb-8">
                  Create metrics, organize definitions, and generate reports–all
                  in one platform.
                </p>
                <p className="text-18 mb-4">
                  Connect to your data warehouse to get started
                </p>
                <Button
                  className="w-full"
                  label="Set up connection"
                  onClick={closeModal}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SnowflakeModal;
