import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';

type IntegrationModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  getProviderHandler: (providerId: string) => void;
  data: any;
};

const IntegrationModal = ({
  isOpen,
  closeModal,
  getProviderHandler,
  data,
}: IntegrationModalProps) => {
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
              <Dialog.Panel className="w-[650px] transform overflow-hidden rounded-2xl bg-white p-12 text-left align-middle shadow-xl transition-all text-wfbase-800">
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-semibold">
                    Add a new app connection
                  </p>
                  <button
                    className="w-10 h-10 cursor-pointer rounded-lg hover:bg-[#E4E7EB]"
                    onClick={closeModal}
                    type="button"
                  >
                    <Image
                      alt="Close"
                      height={40}
                      src="/icons/close-times.svg"
                      width={40}
                    />
                  </button>
                </div>
                <p className="text-sm mb-6">
                  To begin the procedure, simply click on the app you wish to
                  add.
                </p>
                <div className="flex flex-col h-[510px] overflow-y-auto">
                  {data
                    ? data.data.data.map((provider: any) => (
                      <div
                        className="w-full p-3 mb-6 h-16 flex cursor-pointer rounded-lg border border-[#E4E7EB] items-center"
                        key={provider.id}
                        onClick={(event) => getProviderHandler(provider.id)}
                      >
                        <div className="flex justify-center mr-1">
                          <Image
                            alt={provider.name}
                            height={40}
                            src={provider.icon}
                            width={40}
                          />
                        </div>
                        <p className="text-sm font-medium text-center">
                          {provider.name}
                        </p>
                      </div>
                    ))
                    : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export function IntegrationData({ data }) {
  return (
    <div className="flex flex-col h-screen overflow-y-auto gap-6">
      {data
        ? data.data.data.map((integration: any) => (
          <div
            className="flex items-center bg-white border border-[#E4E7EB] rounded-lg shadow-[0px_6px_14px_rgba(0,0,0,0.08)] h-[72px] p-3 w-full"
            key={integration.id}
          >
            <div className="flex justify-center mr-1">
              <Image
                alt={integration.provider.name}
                height={50}
                src={integration.provider.icon}
                width={50}
              />
            </div>
            <p className="text-sm font-medium text-center">
              {integration.integration_name}
            </p>
          </div>
        ))
        : null}
    </div>
  );
}

export default IntegrationModal;
