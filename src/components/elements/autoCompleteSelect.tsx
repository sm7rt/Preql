/* eslint-disable indent */
import { Box, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import useDimension from 'src/hooks/useDimension';
import { useQueryMetrics } from 'src/hooks/useQueryMetrics';
import { TColumn } from 'src/report/content';
import { colors } from 'src/theme';

const SelectButton = styled(ButtonBase)(({ theme }) => ({
  '&.selected': {
    background: '#fff',
    border: `1px solid ${colors.wfBase[400]}`,
    color: colors.wfBase[800],
  },
  background: `${colors.wfBase[300]}`,
  borderRadius: '4px',
  color: colors.wfBase[600],
  height: 40,
  justifyContent: 'space-between',
  padding: `${theme.spacing()} ${theme.spacing(
    1.5
  )} ${theme.spacing()} ${theme.spacing()}`,
  width: '100%',
}));

const SelectWrapper = styled(Box)(({ theme }) => ({
  '& .select-input': {
    '& input': {
      border: 'none',
      flex: 1,
      fontSize: '1rem',
      height: '100%',
      outline: 'none',
    },
    borderBottom: `1px solid ${colors.wfBase[400]}`,
    display: 'flex',
    gap: theme.spacing(),
    height: 56,
    paddingLeft: theme.spacing(2),
  },
  '& .select-options': {
    '& .option': {
      '&.none': {
        '&:hover': {
          background: 'transparent',
        },
        textAlign: 'center',
      },
      '&:hover': {
        background: colors.wfBase[300],
      },
      color: colors.wfBase[800],
      cursor: 'pointer',
      lineHeight: `24px`,
      padding: `${theme.spacing()} ${theme.spacing(2)}`,
    },
    paddingTop: theme.spacing(),
  },
  borderRadius: theme.spacing(),
  boxShadow: '0px 6px 14px rgba(45, 54, 72, 0.16)',
}));

type TOption = {
  id: number;
  name: string;
  type: string;
};

function AutoCompleteSelect({
  selectedOptions,
  onHide,
  onChange,
}: {
  selectedOptions: TColumn[];
  onHide: () => void;
  onChange: (option: TOption) => void;
}) {
  const [showDropdown, setShowDropdown] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState<TOption[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<TOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<TOption>();
  const inputReference = useRef(null);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (showDropdown) {
        setIsSearching(false);
      }
    },
  });

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const { data: metricData } = useQueryMetrics();
  const { data: dimensionData } = useDimension();

  const capitalizeFirstLetter = (str: string) => {
    const words = str.split('_');

    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    if (!metricData || !dimensionData) return;

    let options = metricData
      .filter(
        (item) =>
          !selectedOptions.some((_item) => _item.name === item.display_name)
      )
      .map((item, index) => {
        return {
          id: index,
          name: item.display_name,
          type: 'metric',
        };
      });

    const dimensionList = dimensionData
      .map((item, index) => {
        return {
          id: options.length + index,
          name: capitalizeFirstLetter(item.name),
          type: 'dimension',
        };
      })
      .filter(
        (item) => !selectedOptions.some((_item) => _item.name === item.name)
      );

    options = [...options, ...dimensionList];

    setOptions(options);
  }, [metricData, dimensionData, selectedOptions]);

  useEffect(() => {
    if (searchValue !== '' && options) {
      setIsSearching(true);

      setFilteredOptions(
        options.filter((x) =>
          x.name.toLowerCase().startsWith(searchValue.toLowerCase())
        )
      );
    } else {
      setIsSearching(false);
    }
  }, [searchValue, options]);

  const onSelectOption = (option: TOption) => {
    setSelectedOption(option);
    onChange(option);
  };

  useEffect(() => {
    if (selectedOption) {
      setIsSearching(false);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (showDropdown) {
      inputReference.current.focus();
    }
  }, [showDropdown]);

  return (
    <div ref={ref}>
      <SelectButton
        className={selectedOption ? 'selected' : 'default'}
        onClick={() => {
          onHide();
        }}
      >
        <span>{selectedOption ? selectedOption.name : 'Select'}</span>
        <Image height="16" src="/icons/icon-chevron-down.svg" width="16" />
      </SelectButton>
      {showDropdown ? (
        <SelectWrapper>
          <Box className="select-input">
            <Image height="14" src="/icons/icon-search.svg" width="14" />
            <input
              onChange={onChangeSearch}
              placeholder="Search metrics & dimensions"
              ref={inputReference}
              type="text"
            />
          </Box>
          <Box
            className="select-options"
            sx={{ height: '350px', overflowY: 'scroll' }}
          >
            {!isSearching
              ? options.map((option) => (
                  <Box
                    className="option"
                    key={option.id}
                    onClick={() => onSelectOption(option)}
                  >
                    {option.name}
                  </Box>
                ))
              : filteredOptions.map((option) => (
                  <Box
                    className="option"
                    key={option.id}
                    onClick={() => onSelectOption(option)}
                  >
                    {option.name}
                  </Box>
                ))}
            {isSearching && filteredOptions.length === 0 ? (
              <Box className="option none">No option available</Box>
            ) : null}
          </Box>
        </SelectWrapper>
      ) : null}
    </div>
  );
}

export default AutoCompleteSelect;
