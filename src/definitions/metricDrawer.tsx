import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import MetricDimensions from 'src/definitions/metricDimensions';
import MetricDrawerFooter from 'src/definitions/metricDrawerFooter';
import MetricDrawerHeader from 'src/definitions/metricDrawerHeader';
import MetricFilter from 'src/definitions/metricFilter';
import MetricFunction from 'src/definitions/metricFunction';
import MetricImpact from 'src/definitions/metricImpact';
import { getApiClient } from 'src/helpers/apiConfig';
import { Filter, MetricModel } from 'src/hooks/useQueryMetrics';
import { Metadata } from 'src/types/manifest.types';

type MetricDrawerProps = {
  open: boolean;
  metric: MetricModel;
  metadata: Metadata;
  onClose: () => void;
};

const MetricDrawer = ({
  open,
  metric,
  metadata,
  onClose,
}: MetricDrawerProps) => {
  const [filters, setFilters] = useState<(string | Filter)[][]>();

  const sendFilters = () => {
    updateMetricMutation.mutate({ body: { constraints: filters } });
  };

  const updateMetricMutation = useMutation(
    ({ body }: { body: object }) => {
      return getApiClient().patch(`metrics/${metric.id}`, body);
    },
    {
      onError: (err: any, variables, context) => {
        console.log(err, variables, context);
      },
      onSettled: (data, error, variables, context) => {
        console.log('settled');
      },
      onSuccess: (data) => {
        console.log('metric updated');
      },
    }
  );

  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-2xl px-8 pt-8 overflow-scroll">
                    <div className="flex-1">
                      <MetricDrawerHeader metric={metric} />
                      <MetricFunction metric={metric} />
                      <MetricFilter
                        metadata={metadata}
                        metric={metric}
                        updateFilters={setFilters}
                      />
                      <MetricImpact metric={metric} />
                      <MetricDimensions metric={metric} />
                    </div>
                    <MetricDrawerFooter
                      onClose={onClose}
                      onSave={sendFilters}
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MetricDrawer;
