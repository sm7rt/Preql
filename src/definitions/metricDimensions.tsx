import Image from 'next/image';
import { Dimension, MetricModel } from 'src/hooks/useQueryMetrics';

interface MetricImpactProps {
  metric: MetricModel;
}

const MetricDimensions: React.FC<MetricImpactProps> = ({ metric }) => {
  const dimensions: Dimension[] = metric.dimensions;

  return (
    <div className="bg-wfbase-50 px-5 py-2 rounded-xl my-5">
      <div className="my-2 flex items-center justify-start space-x-3">
        <Image alt="Function" height={20} src="/icons/reports.svg" width={20} />
        <p className="text-14 text-wfbase-800 font-normal">
          Dimensions that can be applied to cut the metric
        </p>
      </div>
      <div className="ml-2 my-3 flex flex-wrap items-center justify-start overflow-auto">
        {dimensions.map((dimension, index) => (
          <span
            className="flex items-center text-12 text-wfbase-800 font-normal py-1 px-3 mx-2 my-1 rounded-full bg-wfbase-300"
            key={index}
          >
            {dimension.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MetricDimensions;
