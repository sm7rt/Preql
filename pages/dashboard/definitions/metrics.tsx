import { useEffect, useState } from 'react';
import React from 'react';
import Toggle from 'src/components/elements/customToggle';
import SearchBox from 'src/components/elements/searchBox';
import DashboardWrapper from 'src/dashboard/wrapper';
import DefinitionsHeader from 'src/definitions/header';
import MetricDrawer from 'src/definitions/metricDrawer';
import MetricPopup from 'src/definitions/metricPopup';
import MetricsTable from 'src/definitions/metricsTable';
import useMetadata from 'src/hooks/useMetadata';
import { MetricModel } from 'src/hooks/useQueryMetrics';

const sortbyOptions = [
  { icon: '/icons/icon-descending.svg', value: 'desc' },
  { icon: '/icons/icon-ascending.svg', value: 'asc' },
];

const viewOptions = [
  { icon: '/icons/icon-grid.svg', value: 'grid' },
  { icon: '/icons/icon-list.svg', value: 'list' },
];

function Metrics() {
  const { data: metadata } = useMetadata();

  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [sortby, setSortby] = useState(sortbyOptions[0]);
  const [viewOption, setViewOption] = useState(viewOptions[0]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selected, setSelected] = useState<MetricModel>();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onClose = () => {
    setShowPopup(false);
    // on close metric popup - store 'closed' as metric_popup local storage
    localStorage.setItem('metric_popup', 'closed');
  };

  useEffect(() => {
    if (localStorage.getItem('metric_popup') === 'closed') {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  }, []);

  const onMetricSelected = (metric: MetricModel) => {
    setSelected(metric);
    setOpen(true);
  };

  return (
    <DashboardWrapper>
      <DefinitionsHeader />
      {showPopup ? <MetricPopup onClose={onClose} /> : null}

      <div className="w-full flex flex-wrap flex-row justify-end items-center gap-5">
        <SearchBox onChange={onSearch} value={query} />
        <Toggle
          onToggleChange={setSortby}
          options={sortbyOptions}
          selected={sortby}
        />
        <Toggle
          onToggleChange={setViewOption}
          options={viewOptions}
          selected={viewOption}
        />
      </div>
      <div className="mb-16 relative">
        <MetricsTable
          onSelectRow={onMetricSelected}
          searchQuery={query}
          sortby={sortby.value}
        />
      </div>
      <MetricDrawer
        metadata={metadata?.metadata}
        metric={selected}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      />
    </DashboardWrapper>
  );
}

export default Metrics;
