import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { Button } from 'src/components/elements';
import { BodyBoldXS, HeadingL } from 'src/components/elements/typographies';

import styles from './styles.module.css';

type InfoModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export default function InfoModal({ isOpen, closeModal }: InfoModalProps) {
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
                <p className="text-18">
                  Create metrics, organize definitions, and generate reports–all
                  in one platform.
                </p>
                <div className="flex flex-col items-center my-6 pt-2 pb-4 border border-wfbase-400 rounded-lg">
                  <BodyBoldXS as="p" extraClasses="mb-2">
                    Connections
                  </BodyBoldXS>
                  <div className={styles.snowflake}>
                    <Image
                      height={28}
                      src="/icons/icon-snowflake.svg"
                      width={28}
                    />
                    <BodyBoldXS as="p">SNOWFLAKE</BodyBoldXS>
                    <Image
                      height={16}
                      src="/icons/icon-check-green.svg"
                      width={16}
                    />
                  </div>

                  <div className="flex items-center relative gap-1 bg-white">
                    <Image
                      alt="Snowflake"
                      height={24}
                      src="/icons/icon-shopify.svg"
                      width={24}
                    />

                    <BodyBoldXS as="p">SHOPIFY</BodyBoldXS>
                  </div>
                </div>
                <div className="mb-6 text-18">
                  We’ve connected your Snowflake warehouse to Preql and are
                  pulling data from Shopify.
                </div>
                <Button
                  className="w-full"
                  label="continue"
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
