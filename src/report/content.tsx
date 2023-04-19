/* eslint-disable */
import AddIcon from '@mui/icons-material/Add';
import IosShareIcon from '@mui/icons-material/IosShare';
import {
  Box,
  Button,
  ButtonBase,
  Drawer,
  Modal,
  styled,
  Tab,
  Tabs,
  ToggleButtonGroup,
  Typography,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import { useMutation } from 'react-query';
import AutoCompleteSelect from 'src/components/elements/autoCompleteSelect';
import { HeadingXS } from 'src/components/elements/typographies';
import { getApiClient } from 'src/helpers/apiConfig';
import { colors } from 'src/theme';
import { useRouter } from 'next/router';
import styles from './content.module.css';

import withErrorBoundary from '../components/hoc/withErrorBoundary';
import {
  AddColumnButton,
  Columns,
  Content,
  CustomButton,
  DrawerContent,
  LeftNavigation,
  NewSheetButton,
  SheetAction,
  SheetsList,
  SheetWrapper,
  TimeframeToggleButton,
} from './content.styles';
import useReport from 'src/hooks/useReport';
import useSheets from 'src/hooks/useSheets';
import ConnectIntegrationModal from './integration/connectIntegrationModal';
import SheetTable from './sheetTable';
import TextField from '@mui/material/TextField';
import moment from 'moment';

import EditableSheetButton from './editableSheetButton';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import useCreateNewReportSheet from 'src/hooks/useCreateNewReportSheet';
import useCreateNewSheet from 'src/hooks/useCreateNewSheet';
import useSaveSheet from 'src/hooks/useSaveSheet';
import { ISheet } from '../types/sheet.types';
import Loader from 'src/components/elements/loader';

function a11yProps(index: number) {
  return {
    'aria-controls': `simple-tabpanel-${index}`,
    id: `simple-tab-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type TColumn = {
  name: string;
  type: string;
};

export const SyncReport = styled(Button)(({ theme }) => ({
  boxShadow: 'none',
  display: 'flex',
  textTransform: 'none',
  backgroundColor: `${colors.primary[400]} !important`,
}));

const timeframeList = ['day', 'week', 'month', 'year'];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      sx={{ height: '100%' }}
      {...other}
    >
      {value === index && (
        <Box className="tab-panel" sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

function ReportContent({
  reportId,
  clickModalHandler,
  modalState,
  setModalState,
}) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sheets, setSheets] = useState<ISheet[]>([
    {
      display_name: 'Sheet1',
      id: 'newsheet0',
    },
  ]);
  const [isFetching, setIsFetching] = useState(false);
  const [activeSheetId, setActiveSheetId] = useState('');
  const [activeSheetInfo, setActiveSheetInfo] = useState<ISheet>(null);
  const [drawerTabValue, setDrawerTabValue] = useState(0);
  const [columns, setColumns] = useState<TColumn[]>([
    {
      name: 'Total Orders',
      type: 'metric',
    },
    {
      name: 'Created At',
      type: 'dimension',
    },
  ]);
  const [isAddNewColumn, setIsAddNewColumn] = useState(false);
  const [timeframe, setTimeFrame] = useState<string>('week');

  const newReportMode = useMemo(() => {
    return !reportId || reportId === 'new-report';
  }, [reportId]);

  const newSheetMode = useMemo(() => {
    return activeSheetId.includes('newsheet');
  }, [activeSheetId]);

  const syncReportMutation = useMutation((syncData: any) => {
    return getApiClient().post('reports/sync', syncData);
  });

  const syncReport = () => {
    const data = {
      report_id: reportId,
      sheet_id: activeSheetId,
    };
    syncReportMutation.mutate(data);
  };

  const {
    data: reportData,
    status: reportStatus,
    refetch: refetchReport,
  } = useReport(reportId);

  const {
    data: sheetData,
    status: sheetStatus,
    refetch: refetchSheet,
  } = useSheets(reportId, activeSheetId);

  const createNewSheetMutation = useCreateNewSheet();
  const createNewReportSheetMutation = useCreateNewReportSheet();
  const saveSheetMutation = useSaveSheet();

  const [reportTitle, setReportTitle] = useState('Untitled');
  const [reportDesc, setReportDesc] = useState(
    'What is this report all about?'
  );

  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

  const sortCb = (a: any, b: any) =>
    ('' + a.display_name).localeCompare(b.display_name);

  useEffect(() => {
    if (reportData) {
      setSheets(reportData.data.sheets.sort(sortCb));
      activeSheetId.includes('newsheet') &&
        setActiveSheetId(reportData.data.sheets[0].id);
      setReportTitle(reportData.data.display_name);
      setReportDesc(reportData.data.description);
    }
  }, [reportData]);

  useEffect(() => {
    if (activeSheetId.includes('newsheet')) return;

    const activeSheet = sheets.find((item) => item.id === activeSheetId);
    setActiveSheetInfo(activeSheet);
  }, [activeSheetId, sheets]);

  useEffect(() => {
    if (!activeSheetInfo) return;

    const metric_service_api_value = activeSheetInfo.metric_service_api_value;
    setTimeFrame(metric_service_api_value.time_granularity[0].created_at);

    const metrics = metric_service_api_value.metrics.split(',').map((item) => {
      return {
        name: capitalizeFirstLetter(item),
        type: 'metric',
      };
    });
    const dimensions = metric_service_api_value.dimensions
      .split(',')
      .map((item) => {
        return {
          name: capitalizeFirstLetter(item),
          type: 'dimension',
        };
      });
    setColumns([...metrics, ...dimensions]);
    const where = metric_service_api_value.where;
    if (!Array.isArray(where)) {
      return;
    }
    const date_list = where.filter((item) => item.includes('created_at'));
    if (!date_list.length) {
      return;
    }

    const start_date = date_list
      .find((item) => item.includes('>='))
      .split("'")[1];
    const end_date = date_list
      .find((item) => item.includes('<='))
      .split("'")[1];
    setStartDate(moment(start_date).format('YYYY-MM-DD'));
    setEndDate(moment(end_date).format('YYYY-MM-DD'));
  }, [activeSheetInfo]);

  const toggleDrawer =
    (open: boolean, tabName?: string) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      if (tabName === 'timeframe') {
        setDrawerTabValue(0);
      } else {
        setDrawerTabValue(1);
      }

      setOpenDrawer(open);
    };

  const onChangeDrawerTab = (event: React.SyntheticEvent, newValue: number) => {
    setDrawerTabValue(newValue);
  };

  const activeSheetStateManager = (id, index) => {
    if (!activeSheetId && index === 0) {
      setActiveSheetId(id);
    }
    return activeSheetId === id ? 'active' : '';
  };

  const handleStartDateChange = (e) => {
    if (moment(e.target.value).isAfter(endDate, 'day')) {
      return;
    }
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    if (moment(e.target.value).isBefore(startDate, 'day')) {
      return;
    }
    setEndDate(e.target.value);
  };

  const handleHideSelect = () => {
    setIsAddNewColumn(false);
  };

  const onClickSheet = (id: string) => {
    setActiveSheetId(id);
  };

  const onClickNewSheet = () => {
    setSheets([
      ...sheets,
      {
        display_name: `Sheet${sheets.length + 1}`,
        id: 'newsheet' + String(sheets.length),
      },
    ]);

    setActiveSheetId('newsheet' + String(sheets.length));
  };

  const handleEditReportTitle = (e) => {
    setReportTitle(e.target.value);
  };

  const handleEditReportDesc = (e) => {
    setReportDesc(e.target.value);
  };

  const handleAddColumn = () => {
    setIsAddNewColumn(true);
  };

  const handleRemoveColumn = (columnItem: TColumn) => {
    const newColumns = columns.filter((item) => item.name !== columnItem.name);
    setColumns(newColumns);
  };

  const handleAddOption = useCallback(
    (option) => {
      setIsAddNewColumn(false);

      if (columns.some((item) => item.name === option.name)) return;
      setColumns([...columns, option]);
    },
    [columns]
  );

  const handleSaveSheetTitle = (val) => {
    const sheetIdx = sheets.findIndex((item) => item.id === activeSheetId);

    if (sheetIdx < 0) return;
    sheets[sheetIdx].display_name = val;

    setSheets([...sheets]);
  };

  const parseColumnTitle = (type) => {
    return columns
      .filter((item) => item.type === type)
      .map((item) => item.name.toLowerCase().split(' ').join('_'))
      .join(',');
  };

  const capitalizeFirstLetter = (str: string) => {
    const words = str.split('_');

    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleSheetSaveRequest = () => {
    setOpenDrawer(false);
    setIsFetching(true);

    if (!activeSheetId) return;

    const newSheetMode = activeSheetId.includes('newsheet');
    if (newSheetMode) {
      if (newReportMode) {
        const reqBody = {
          report_display_name: reportTitle,
          report_description: reportDesc,
          sheet_display_name: 'Total Orders',
          dimensions: parseColumnTitle('dimension'),
          metrics: parseColumnTitle('metric'),
          order: [{ created_at: 'DESC' }],
          time_granularity: [{ created_at: timeframe }],
          where: [
            `created_at >= '${moment(startDate).toISOString()}'`,
            `created_at <= '${moment(endDate).toISOString()}'`,
          ],
        };
        createNewReportSheetMutation.mutate(reqBody, {
          onSettled: (data) => {
            router.push(`/dashboard/report/${data.data.data.report_id}`);
            setIsFetching(false);
          },
        });
      } else {
        const requestBody = {
          display_name: !activeSheetId.includes('newsheet')
            ? activeSheetInfo.display_name
            : sheets.find((item) => item.id === activeSheetId).display_name,
          dimensions: parseColumnTitle('dimension'),
          metrics: parseColumnTitle('metric'),
          order: [{ created_at: 'DESC' }],
          time_granularity: [{ created_at: timeframe }],
          where: [
            `created_at >= '${moment(startDate).toISOString()}'`,
            `created_at <= '${moment(endDate).toISOString()}'`,
          ],
        };

        createNewSheetMutation.mutate(
          { reportId, body: requestBody },
          {
            onSuccess: (data) => {
              setActiveSheetId(data.data.data.id);
              refetchReport();
              setIsFetching(false);
            },
          }
        );
      }
    } else {
      const requestBody = {
        display_name: activeSheetInfo.display_name,
        dimensions: parseColumnTitle('dimension'),
        metrics: parseColumnTitle('metric'),
        order: [{ created_at: 'DESC' }],
        time_granularity: [{ created_at: timeframe }],
        table_id: activeSheetInfo.metric_service_api_value.table_id,
        where: [
          `created_at >= '${moment(startDate).toISOString()}'`,
          `created_at <= '${moment(endDate).toISOString()}'`,
        ],
      };

      saveSheetMutation.mutate(
        { reportId, sheetId: activeSheetId, body: requestBody },
        {
          onSuccess: () => {
            refetchReport();
            refetchSheet();
            setIsFetching(false);
          },
        }
      );
    }
  };

  return (
    <Content>
      <LeftNavigation>
        <EditText
          name="textbox1"
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '0.01em',
            lineHeight: '48px',
            margin: 0,
          }}
          defaultValue={reportTitle}
          value={reportTitle}
          onChange={handleEditReportTitle}
        />
        <EditTextarea
          name="textarea1"
          rows={2}
          style={{
            fontSize: '1rem',
            letterSpacing: '-0.01em',
            margin: 0,
            color: colors.wfBase[600],
          }}
          value={reportDesc}
          defaultValue={reportDesc}
          onChange={handleEditReportDesc}
        />
        <SheetsList>
          {reportStatus !== 'loading' &&
            sheets.map((sheet, index) => (
              <EditableSheetButton
                className={activeSheetStateManager(sheet.id, index)}
                value={sheet.display_name}
                key={sheet.id}
                onClick={() => onClickSheet(sheet.id)}
                onSave={handleSaveSheetTitle}
              />
            ))}
          <NewSheetButton onClick={onClickNewSheet}>+ New sheet</NewSheetButton>
        </SheetsList>
      </LeftNavigation>
      <SheetWrapper>
        <div className="sheet-actions">
          <SheetAction onClick={toggleDrawer(true, 'timeframe')}>
            Timeframe
          </SheetAction>
          <SheetAction onClick={toggleDrawer(true, 'columns')} sx={{ mr: 1 }}>
            Columns
          </SheetAction>
          {activeSheetId ? (
            <CustomButton
              onClick={syncReport}
              sx={{
                px: '10px',
                mr: 1,
                backgroundColor: `${colors.secondary[900]} !important`,
              }}
              type="submit"
              variant="contained"
            >
              Sync
            </CustomButton>
          ) : null}
          {sheetData ? (
            <CSVLink
              data={sheetData.data.sheets[0].records}
              filename={`${sheetData.data.sheets[0].display_name
                .toLowerCase()
                .replace(/\s/g, '')}_${sheetData.data.display_name}.csv`}
              style={{ textDecoration: 'none' }}
              target="_blank"
            >
              <CustomButton variant="contained">
                <IosShareIcon fontSize="small" sx={{ marginRight: '8px' }} />
                Download CSV
              </CustomButton>
            </CSVLink>
          ) : null}
        </div>
        <div className="sheet-label">
          <HeadingXS extraClasses="text-wfbase-700">
            {activeSheetInfo && activeSheetInfo.display_name}
          </HeadingXS>
        </div>
        {newSheetMode ? (
          <SheetTable
            rows={[]}
            timeframe={'week'}
            onAddColumns={toggleDrawer(true, 'columns')}
          />
        ) : !isFetching ? (
          sheetData ? (
            <SheetTable
              rows={sheetData.data.sheets[0].records}
              timeframe={
                activeSheetInfo
                  ? activeSheetInfo.metric_service_api_value.time_granularity[0]
                      .created_at
                  : timeframe
              }
              onAddColumns={toggleDrawer(true, 'columns')}
            />
          ) : (
            <Loader />
          )
        ) : (
          <Loader />
        )}
      </SheetWrapper>
      <Drawer anchor="right" onClose={toggleDrawer(false)} open={openDrawer}>
        <DrawerContent>
          <Box mb={3}>
            <HeadingXS extraClasses="text-wfbase-800">
              {activeSheetInfo && activeSheetInfo.display_name}
            </HeadingXS>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              aria-label="drawer tab"
              onChange={onChangeDrawerTab}
              value={drawerTabValue}
            >
              <Tab
                label="Timeframe"
                sx={{
                  textTransform: 'none',
                  '&:hover': { backgroundColor: colors.wfBase[300] },
                }}
                {...a11yProps(0)}
              />
              <Tab
                label="Column"
                sx={{
                  textTransform: 'none',
                  '&:hover': { backgroundColor: colors.wfBase[300] },
                }}
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel index={0} value={drawerTabValue}>
            <Box>
              <ToggleButtonGroup
                aria-label="outlined primary button group"
                fullWidth
                color="primary"
                sx={{ mb: 3 }}
                exclusive
                value={timeframe}
                size="small"
              >
                {timeframeList.map((item) => (
                  <TimeframeToggleButton
                    onClick={(e, value) => setTimeFrame(value)}
                    value={item}
                    key={item}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {item}
                  </TimeframeToggleButton>
                ))}
              </ToggleButtonGroup>
              <Box className="form-field" sx={{ mb: 2 }}>
                <Typography sx={{ mb: 1 }}>Start</Typography>
                <TextField
                  id="startDate"
                  type="date"
                  sx={{ width: 1 }}
                  value={startDate}
                  InputProps={{
                    inputProps: { min: '2020-01-01', max: '2022-09-29' },
                    sx: { '& .MuiSvgIcon-root': { color: 'red' } },
                  }}
                  onChange={handleStartDateChange}
                />
              </Box>
              <Box className="form-field">
                <Typography sx={{ mb: 1 }}>End</Typography>
                <TextField
                  id="endDate"
                  type="date"
                  sx={{ width: 1 }}
                  value={endDate}
                  InputProps={{
                    inputProps: {
                      min: '2020-01-01',
                      max: moment().format('YYYY-MM-DD'),
                    },
                  }}
                  onChange={handleEndDateChange}
                />
              </Box>
            </Box>

            <CustomButton
              fullWidth
              variant="contained"
              onClick={handleSheetSaveRequest}
            >
              Done
            </CustomButton>
          </TabPanel>
          <TabPanel index={1} value={drawerTabValue}>
            <Box>
              <Columns>
                {columns.map((column, index) => (
                  <Box
                    className="column"
                    key={`${column.name}-${index}`}
                    sx={{
                      textTransform: 'none',
                      '&:hover': { backgroundColor: colors.wfBase[200] },
                      cursor: 'pointer',
                    }}
                  >
                    <Typography>{column.name}</Typography>
                    <ButtonBase onClick={() => handleRemoveColumn(column)}>
                      <Image
                        height="16"
                        src="/icons/icon-trash.svg"
                        width="16"
                      />
                    </ButtonBase>
                  </Box>
                ))}
              </Columns>

              <Box pt={1}>
                {!isAddNewColumn && (
                  <AddColumnButton
                    onClick={handleAddColumn}
                    sx={{ '&:hover': { backgroundColor: colors.wfBase[300] } }}
                  >
                    <span>Add column</span>
                    <AddIcon />
                  </AddColumnButton>
                )}

                {isAddNewColumn ? (
                  <AutoCompleteSelect
                    selectedOptions={columns}
                    onHide={handleHideSelect}
                    onChange={handleAddOption}
                  />
                ) : null}
              </Box>
            </Box>
            <CustomButton
              fullWidth
              variant="contained"
              onClick={handleSheetSaveRequest}
            >
              Done
            </CustomButton>
          </TabPanel>
        </DrawerContent>
      </Drawer>
      <Modal open={modalState}>
        <div>
          {setModalState}
          <ConnectIntegrationModal
            clickModalHandler={clickModalHandler}
            setModalState={setModalState}
          />
        </div>
      </Modal>
    </Content>
  );
}

export default withErrorBoundary(ReportContent);
