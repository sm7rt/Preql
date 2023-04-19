import AddIcon from '@mui/icons-material/Add';
import { Box, Button, ButtonBase, Chip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  DateRange,
  DateRangePicker,
} from '@mui/x-date-pickers-pro/DateRangePicker';
import _cloneDeep from 'lodash/cloneDeep';
import _isEqual from 'lodash/isEqual';
import isEqual from 'lodash/isEqual';
import Image from 'next/image';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Select, { GroupBase } from 'react-select';
import { Button as PreqlButton } from 'src/components/elements';
import Equations from 'src/components/equations';
import { getApiClient } from 'src/helpers/apiConfig';
import { Dimension, Filter } from 'src/hooks/useQueryMetrics';

import withErrorBoundary from '../components/hoc/withErrorBoundary';
import { MetricContentWrapper } from './metricContent.styles';

type TFilter = {
  option: string;
  value: string;
  type: string;
};

const filterByOptions = [
  { label: 'Numeric', value: 'numeric' },
  { label: 'Categorical', value: 'categorical' },
  { label: 'Date', value: 'date' },
];

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

const commonSelectStyles = {
  container: (provided) => ({
    ...provided,
    fontSize: 14,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: '6px 0px 0px 6px',
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

const subSelectStyles = {
  ...commonSelectStyles,
  control: (provided) => ({
    ...provided,
    borderLeft: 0,
    borderRadius: 0,
    borderRight: 0,
    height: 45,
    width: 120,
  }),
};

const typeSelectStyles = {
  ...commonSelectStyles,
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

type FilterProps = {
  filter: Filter;
  equation: Filter;
  value: Filter | Date;
  list: { label: string; value: string; type: string }[];
  onDeleteFilter: () => void;
  metadata: any;
  filters: Filter[][];
  index: number;
  onChangeFilter: (updatedFilters: Filter[][]) => void;
};

function FilterComponent({
  filter,
  equation,
  value,
  list,
  onDeleteFilter,
  metadata,
  filters,
  index,
  onChangeFilter,
}: FilterProps) {
  const [filterBy, setFilterBy] = useState<Filter | null>(
    filter ? filter : null
  );
  const [subFilterBy, setSubFilterBy] = useState<Filter | null>(
    equation ? equation : null
  );
  const [subFilterByValue, setSubFilterByValue] = useState<
    Filter | Date | null
  >(value ? value : null);
  const [dateFilterValue, setDateFilterValue] = useState<Filter | Date | null>(
    value ? value : null
  );
  const [dateFilterBetweenValue, setDateFilterBetweenValue] = useState<
    DateRange<Date>
  >([null, null]);

  const onChangeFilterBy = (value: Filter) => {
    setFilterBy(value);
    setSubFilterBy(null);
    const filtersTmp = [...filters];
    filtersTmp[index][0] = value;

    onChangeFilter(filtersTmp);
  };

  const onChangeSubFilter = (value: Filter) => {
    setSubFilterBy(value);
    const filtersTmp = [...filters];
    filtersTmp[index][1] = value;

    onChangeFilter(filtersTmp);
  };

  const onChangeValueFilter = (value: any) => {
    setSubFilterByValue(value);
    const filtersTmp = [...filters];
    filtersTmp[index][2] = value;

    onChangeFilter(filtersTmp);
  };

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

  return (
    <Box className="filter">
      <Box sx={{ flexShrink: 0 }}>
        <Image height={13} src="/icons/filter.svg" width={15} />
      </Box>

      <Box className="selects">
        <Select
          onChange={onChangeFilterBy}
          options={list}
          styles={commonSelectStyles}
          value={filterBy}
        />
        <Select
          onChange={onChangeSubFilter}
          options={
            filterBy?.type === 'time' ? dateFilterOptions : includeOptions
          }
          styles={subSelectStyles}
          value={subFilterBy}
        />
        {filterBy?.type === 'time' && subFilterBy?.value !== 'date_is_between' && (
          <DatePicker
            label="Basic example"
            onChange={(newValue) => {
              setDateFilterValue(newValue);
              onChangeValueFilter(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box
                className="date-selector"
                sx={{ alignItems: 'center', display: 'flex' }}
              >
                <input ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </Box>
            )}
            value={dateFilterValue}
          />
        )}

        {filterBy?.type === 'time' && subFilterBy?.value === 'date_is_between' && (
          <Box sx={{ flex: 1 }}>
            <DateRangePicker
              label="Advanced keyboard"
              onChange={(newValue) => {
                setDateFilterBetweenValue(newValue);
                onChangeValueFilter(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <Box className="date-range-picker">
                  <input
                    ref={startProps.inputRef as React.Ref<HTMLInputElement>}
                    {...startProps.inputProps}
                  />
                  <Box sx={{ mx: 1 }}>-</Box>
                  <input
                    ref={endProps.inputRef as React.Ref<HTMLInputElement>}
                    {...endProps.inputProps}
                  />
                </Box>
              )}
              value={dateFilterBetweenValue}
            />
          </Box>
        )}

        {filterBy?.type !== 'time' && (
          <Select
            onChange={onChangeValueFilter}
            options={cleanDimensionMetadata(filterBy?.value)}
            styles={typeSelectStyles}
            value={subFilterByValue}
          />
        )}
      </Box>

      <ButtonBase onClick={onDeleteFilter} sx={{ flexShrink: 0 }}>
        <Image height={16} src="/icons/icon-trash.svg" width={16} />
      </ButtonBase>
    </Box>
  );
}

const MetricContent: FC<{
  dimensions: Array<Dimension>;
  metrics: Array<{
    agg: string;
    create_metric: boolean;
    description: string;
    expr: string;
    name: string;
  }>;
  met: any;
  metadata: any;
  changeUpdatable: (updatable: boolean) => void;
  isUpdatable: boolean;
}> = ({ dimensions, metrics, met, metadata, changeUpdatable, isUpdatable }) => {
  const [filters, setFilters] = useState<Filter[][]>(
    _cloneDeep(met.filters) || []
  );

  const onAddFilter = () => {
    setFilters([
      ...filters,
      [
        { label: '', type: '', value: '' },
        { label: '', type: '', value: '' },
        { label: '', type: '', value: '' },
      ],
    ]);
  };

  const onDeleteFilter = (index) => {
    const arr = [...filters];
    arr.splice(index, 1);
    setFilters(arr);
  };

  const sendFilters = () => {
    updateMetricMutation.mutate({ body: { constraints: filters } });
  };

  const updateMetricMutation = useMutation(
    ({ body }: { body: object }) => {
      return getApiClient().patch(`metrics/${met.id}`, body);
    },
    {
      onError: (err: any, variables, context) => {
        console.log(err, variables, context);
      },
      onSettled: (data, error, variables, context) => {
        //
      },
      onSuccess: (data) => {
        console.log('metric updated');
      },
    }
  );

  const onChangeFilter = (updatedFilters: Filter[][]) => {
    setFilters(updatedFilters);
  };

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(met.filters || [])) {
      changeUpdatable(true);
    } else {
      changeUpdatable(false);
    }
  }, [filters, changeUpdatable, met.filters]);

  return (
    <MetricContentWrapper>
      {isUpdatable && met.type !== 'measure_proxy' ? (
        <PreqlButton
          className="absolute top-6 right-6 z-10"
          label="Update metric"
          onClick={sendFilters}
        />
      ) : null}
      <Box>
        {metrics.map((metric, index) => (
          <Box className="metric-wrapper" key={metric.name}>
            <div className="flex items-center gap-6">
              <Image height={15} src="/icons/metric.svg" width={15} />
              <Box className="type">
                <p className="leading-[46px]">{metric.agg}:</p>
              </Box>
            </div>

            <Box className="metric">
              {/* ((<span>Net Revenue</span>-<span>Cogs</span>)/
              <span>Net Revenue</span>) */}
              {/* {expressionGenertator(metric.expr)} */}

              <Equations text={metric.expr} />
            </Box>
          </Box>
        ))}
        {filters?.map((filter, index) => (
          <FilterComponent
            equation={filter[1]}
            filter={filter[0]}
            filters={filters}
            index={index}
            key={index}
            list={dimensions.map((dimension) => {
              return {
                label: dimension.name,
                type: dimension.type,
                value: dimension.name,
              };
            })}
            metadata={metadata || {}}
            onChangeFilter={(updatedFilters) => onChangeFilter(updatedFilters)}
            onDeleteFilter={() => onDeleteFilter(index)}
            value={filter[2]}
          />
        ))}
      </Box>
      {met.type !== 'measure_proxy' && (
        <Box className="bottom">
          <Box className="add-filter">
            <Button
              color="inherit"
              onClick={onAddFilter}
              startIcon={<AddIcon />}
            >
              Add filter
            </Button>
          </Box>
        </Box>
      )}
      <Box className="dimensions">
        <Typography>
          Cut this metric with these dimensions in your reports:
        </Typography>
        <Box className="list">
          {dimensions.map((dimension, index) => (
            <Chip
              key={dimension.name}
              label={dimension.name.replaceAll('_', ' ')}
            />
          ))}
        </Box>
      </Box>
    </MetricContentWrapper>
  );
};

export default withErrorBoundary(memo(MetricContent), 'MetricContent');
