import { Dialog } from '@headlessui/react';
import { MetricModel } from 'src/hooks/useQueryMetrics';

interface MetricDrawerHeaderProps {
  metric: MetricModel;
}

const MetricDrawerHeader = ({ metric }: MetricDrawerHeaderProps) => {
  return (
    <div className="border-b border-gray-200 pb-3">
      <div className="flex items-start justify-between space-x-3">
        <div className="space-y-1">
          <Dialog.Title className="text-20 font-bold text-wfbase-1000">
            {metric.display_name}
          </Dialog.Title>
          <p className="text-14 text-wfbase-600 font-normal">
            {metric.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricDrawerHeader;
