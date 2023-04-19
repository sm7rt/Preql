/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/no-multi-comp */
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
import cn from 'classnames';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { MetricModel, useQueryMetrics } from 'src/hooks/useQueryMetrics';

import withErrorBoundary from '../components/hoc/withErrorBoundary';
import {
  Accordion,
  AccordionSummaryWrapper,
  StyledChip,
  SummaryItemBox,
} from './metric.styles';
import MetricContent from './metricContent';

type MetricAccordionProps = {
  data: MetricModel;
  metadata: unknown;
};

type SummaryItemProps = {
  label: string;
  icon?: React.ReactNode;
  highlighted: boolean;
};

function SummaryItem({ icon, label, highlighted }: SummaryItemProps) {
  return (
    <SummaryItemBox className={cn({ active: highlighted })}>
      {icon} {label}
    </SummaryItemBox>
  );
}

const arrayPluralizer = (x) => {
  if (x === 1) {
    return true;
  }
  return false;
};

function MetricAccordion({ data, metadata }: MetricAccordionProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isUpdatable, setIsUpdatable] = useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const changeUpdatable = useCallback((updatble: boolean) => {
    setIsUpdatable(updatble);
  }, []);

  return (
    <Accordion>
      <AccordionSummaryWrapper>
        <div className="absolute inset-0" onClick={handleChange} />
        <Box className="metric-title flex-shrink-0">
          <Typography gutterBottom variant="h5">
            {data.display_name}
          </Typography>
          <Typography>{data.description}</Typography>
        </Box>
        <Box className="relative">
          <div className="metric-summary">
            <div className="absolute inset-0" onClick={handleChange} />
            {isUpdatable && !expanded ? (
              <div className="absolute right-[-12px] top-[-8px]">
                <Image
                  alt="notification"
                  height="26"
                  src="/icons/icon-yellow-notification.svg"
                  width="26"
                />
              </div>
            ) : null}
            <Box className="metric-summary__top">
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box className="stats">
                  <SummaryItem
                    highlighted={expanded}
                    icon={
                      <Image
                        alt="Metric"
                        height={14}
                        src="/icons/metric.svg"
                        width={14}
                      />
                    }
                    label={`${data?.metrics ? data.metrics?.length : 0} metric${
                      data?.metrics && arrayPluralizer(data.metrics?.length)
                        ? ''
                        : 's'
                    }`}
                  />
                  <SummaryItem
                    highlighted={expanded}
                    icon={
                      <Image
                        alt="Filter"
                        height={14}
                        src="/icons/filter.svg"
                        width={14}
                      />
                    }
                    label={`${data?.filters ? data.filters?.length : 0} filter${
                      data?.filters && arrayPluralizer(data.filters?.length)
                        ? ''
                        : 's'
                    }`}
                  />
                  <SummaryItem
                    highlighted={expanded}
                    icon={
                      <Image
                        alt="Dimensions"
                        height={14}
                        src="/icons/window.svg"
                        width={14}
                      />
                    }
                    label={`${data.dimensions?.length} dimensions`}
                  />
                </Box>
                {!isUpdatable && (
                  <ButtonBase className="expand-icon" onClick={handleChange}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ButtonBase>
                )}
              </Box>
            </Box>

            <div className={expanded ? 'block' : 'hidden'}>
              <MetricContent
                changeUpdatable={changeUpdatable}
                dimensions={data.dimensions}
                isUpdatable={isUpdatable}
                met={data}
                metadata={metadata}
                metrics={data.metrics}
              />
            </div>

            <Box className="metric-summary__bottom">
              {/* {data.tags.map((tag) => ( */}
              <StyledChip
                avatar={
                  <Avatar
                    alt="shopify"
                    src="/icons/shopify.svg"
                    sx={{ height: '16px !important', width: '16px !important' }}
                  />
                }
                label="Shopify"
                sx={{ height: '24px !important' }}
              />
              {/* ))} */}
            </Box>
          </div>
        </Box>
      </AccordionSummaryWrapper>
    </Accordion>
  );
}

function MetricOnboarding({ dimensionMetadata }) {
  const { data } = useQueryMetrics();
  return (
    <Box>
      {data?.map((opt) => (
        <MetricAccordion
          data={opt}
          key={opt.id}
          metadata={dimensionMetadata?.metadata}
        />
      ))}
    </Box>
  );
}

export default withErrorBoundary(MetricOnboarding, 'MetricOnboarding');
