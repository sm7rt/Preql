import 'react-datepicker/dist/react-datepicker.css';

import _cloneDeep from 'lodash/cloneDeep';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import IconButton from 'src/components/elements/iconButton';
import { Dimension } from 'src/hooks/useQueryMetrics';
import { Filter, MetricModel } from 'src/hooks/useQueryMetrics';
import { Metadata } from 'src/types/manifest.types';

import styles from './metricFilter.module.css';

const dateFilterOptions = [
  { label: 'Date is', type: '', value: '=' },
  { label: 'Date is before', type: '', value: '<' },
  { label: 'Date is after', type: '', value: '>' },
  { label: 'Date is between', type: '', value: 'BETWEEN' },
];

const includeOptions = [
  { label: 'Do not include', type: '', value: '!=' },
  { label: 'Only include', type: '', value: '=' },
];

const typeOptions = [
  { label: 'True', type: 'boolean', value: 'TRUE' },
  { label: 'False', type: 'boolean', value: 'FALSE' },
];

const filterSelectStyles = {
  container: (provided) => ({
    ...provided,
    fontSize: 14,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: '6px',
    height: 45,
    width: 120,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    '& svg': {
      height: 16,
      width: 16,
    },
  }),
};

const filterTypeSelectStyles = {
  ...filterSelectStyles,
  container: (provided) => ({
    ...provided,
    fontSize: 14,
    marginLeft: 20,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: '6px 0px 0px 6px',
    height: 45,
    width: 120,
  }),
};

const filterValueSelectStyles = {
  ...filterSelectStyles,
  container: (provided) => ({
    ...provided,
    flex: 1,
    fontSize: 14,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: '0px 6px 6px 0px',
    flex: 1,
    height: 45,
  }),
};

interface MetricFilterProps {
  metric: MetricModel;
  metadata: Metadata;
  updateFilters: (filters: (string | Filter)[][]) => void;
}

const MetricFilter: React.FC<MetricFilterProps> = ({
  metric,
  metadata,
  updateFilters,
}) => {
  const dimensions: Dimension[] = metric.dimensions;
  const dimensionOptions: Filter[] = dimensions.map((dimension: Dimension) => {
    return {
      label: dimension.name,
      type: dimension.type,
      value: dimension.name,
    };
  });

  const [filters, setFilters] = useState<(string | Filter)[][]>(
    _cloneDeep(metric.filters) || []
  );

  const [show, setShow] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<Filter | null>();
  const [subFilterBy, setSubFilterBy] = useState<Filter | null>();
  const [subFilterByValue, setSubFilterByValue] = useState<
    Filter | Date | null
  >();
  const [dateFilterValue, setDateFilterValue] = useState<
    Filter | Date | null
  >();

  const [dateRange, setDateRange] = useState<[Date, Date]>([null, null]);
  const [startDate, endDate] = dateRange;

  const cleanDimensionMetadata = useCallback(
    (val) => {
      if (val && metadata?.[val]) {
        const flatValues = Object.values(metadata[val]).flatMap((x) => x);
        const main = flatValues.map((x) => {
          const container = {};
          container['value'] = x;
          container['label'] = x;
          container['type'] = '';
          return container;
        });
        return main as Filter[];
      }
      return typeOptions as Filter[];
    },
    [metadata]
  );

  const onAddFilter = () => {
    setShow((prev) => !prev);
  };

  const onFilterByChange = (value: Filter) => {
    setFilterBy(value);
    setSubFilterBy(null);
    setSubFilterByValue(null);
  };

  const onFilterTypeChange = (value: Filter) => {
    setSubFilterBy(value);
  };

  const onFilterValueChange = (value: any, isDateValue: number) => {
    let filterValue;

    if (isDateValue === 0) {
      filterValue = value;
    } else if (isDateValue === 1) {
      filterValue = {
        label: filterBy.label,
        type: 'date',
        value: value.toISOString(),
      };
    } else if (isDateValue === 2) {
      const [start, end] = value;
      if (!end) return;
      filterValue = {
        label: filterBy.label,
        type: 'daterange',
        value: `${start.toISOString()}-${end.toISOString()}`,
      };
    }

    setSubFilterByValue(filterValue);
    const newFilter: Filter[] = [filterBy, subFilterBy, filterValue];
    const updatedFilters = [...filters, newFilter];
    setFilters(updatedFilters);
    updateFilters(updatedFilters);
  };

  const onRemoveFilter = (index: number) => {
    const updatedFilters = [
      ...filters.slice(0, index),
      ...filters.slice(index + 1),
    ];
    setFilters(updatedFilters);
    updateFilters(updatedFilters);
  };

  return (
    <div className="border-b border-gray-100 py-3">
      <div className="my-2 flex items-center justify-start space-x-3">
        <Image alt="Function" height={20} src="/icons/filter.svg" width={20} />
        <p className="text-14 text-wfbase-800 font-normal">
          What filters you&apos;ve appliced:
        </p>
      </div>
      {filters.length > 0 && (
        <div className="ml-5 mt-5 flex flex-col items-start justify-center space-y-2">
          {filters.map((filter: (string | Filter)[], index) => {
            return (
              <div
                className="flex justify-start items-center space-x-3 ml-3"
                key={index}
              >
                <p className="text-14 text-wfbase-800 font-normal">
                  {typeof filter[1] !== 'string' && filter[1].label}
                </p>
                <p className="text-14 text-wfbase-500 font-normal">
                  {typeof filter[0] !== 'string' && filter[0].label}
                </p>
                <div className="flex items-center text-12 text-wfbase-800 font-normal py-1 px-3 rounded-lg bg-indigo-200">
                  <span className="mr-2">
                    {typeof filter[2] !== 'string' && filter[2].value}
                  </span>
                  <Image
                    className="cursor-pointer"
                    height={16}
                    onClick={() => {
                      onRemoveFilter(index);
                    }}
                    src="/icons/icon-x.svg"
                    width={16}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      <IconButton
        icon="/icons/icon-plus.svg"
        label="Add new filter"
        onClick={onAddFilter}
      />
      {show ? (
        <div className={styles.filterContainer}>
          <Select
            onChange={onFilterByChange}
            options={dimensionOptions}
            styles={filterSelectStyles}
            value={filterBy}
          />
          <Select
            onChange={onFilterTypeChange}
            options={
              filterBy?.type === 'time' ? dateFilterOptions : includeOptions
            }
            styles={filterTypeSelectStyles}
            value={subFilterBy}
          />
          {filterBy?.type === 'time' && subFilterBy?.value !== 'BETWEEN' && (
            <div className={styles.dateSelector}>
              <DatePicker
                onChange={(date: Date) => {
                  setDateFilterValue(date);
                  onFilterValueChange(date, 1);
                }}
                selected={dateFilterValue}
              />
            </div>
          )}
          {filterBy?.type === 'time' && subFilterBy?.value === 'BETWEEN' && (
            <div className={styles.dateSelector}>
              <DatePicker
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                  onFilterValueChange(update, 2);
                }}
                selectsRange
                startDate={startDate}
              />
            </div>
          )}
          {filterBy?.type !== 'time' && (
            <Select
              onChange={(value) => onFilterValueChange(value, 0)}
              options={cleanDimensionMetadata(filterBy?.value)}
              styles={filterValueSelectStyles}
              value={subFilterByValue}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MetricFilter;
