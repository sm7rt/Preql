interface MetricDrawerFooterProps {
  onClose: () => void;
  onSave: () => void;
}

const MetricDrawerFooter = ({ onClose, onSave }: MetricDrawerFooterProps) => {
  return (
    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
      <div className="flex justify-between space-x-3">
        <button
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1"
          onClick={onClose}
          type="button"
        >
          Cancel
        </button>
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1"
          onClick={onSave}
          type="button"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default MetricDrawerFooter;
