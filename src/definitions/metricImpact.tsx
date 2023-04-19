import Image from 'next/image';
import { MetricModel } from 'src/hooks/useQueryMetrics';

interface MetricImpactProps {
  metric: MetricModel;
}

const MetricImpact: React.FC<MetricImpactProps> = ({ metric }) => {
  const impactItems = ['Net Revenue', 'AOV ($)', 'Gross Revenue ($)'];
  return (
    <div className="border-b border-gray-100 py-3">
      <div className="my-2 flex items-center justify-start space-x-3">
        <Image
          alt="Function"
          height={20}
          src="/icons/icon-circle-wavy-warning.svg"
          width={20}
        />
        <p className="text-14 text-wfbase-800 font-normal">
          Changing this metric will impact
        </p>
      </div>
      <div className="ml-8 mt-5 mb-3 flex items-center justify-start space-x-3">
        {impactItems.map((impactItem, index) => (
          <div
            className="flex items-center text-12 text-wfbase-800 font-normal py-1 px-3 rounded-full bg-wfbase-200"
            key={index}
          >
            <Image
              className="cursor-pointer"
              height={16}
              src="/icons/icon-shopify.svg"
              width={16}
            />
            <span className="ml-2">{impactItem}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricImpact;
