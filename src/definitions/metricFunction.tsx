import Image from 'next/image';
import Equations from 'src/components/equations';
import { MetricModel } from 'src/hooks/useQueryMetrics';

interface MetricFunctionProps {
  metric: MetricModel;
}

const MetricFunction: React.FC<MetricFunctionProps> = ({ metric }) => {
  return (
    <div className="border-b border-gray-100 py-3 w-full">
      <div className="my-2 flex items-center justify-start space-x-3">
        <Image
          alt="Function"
          height={20}
          src="/icons/icon-function.svg"
          width={20}
        />
        <p className="text-14 text-wfbase-800 font-normal">
          How we&apos;re calculating total sales
        </p>
      </div>
      {metric.metrics.map((metricItem, index) => {
        return (
          <div className="ml-7 flex items-center justify-start" key={index}>
            <div className="flex justify-start items-center space-x-2 mr-2">
              <Image
                className="w-fit"
                height={15}
                src="/icons/metric.svg"
                width={15}
              />
              <p className="leading-[46px]">{metricItem.agg}:</p>
            </div>
            <Equations text={metricItem.expr} />
          </div>
        );
      })}
    </div>
  );
};

export default MetricFunction;
