import { useQuery } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';
import { SheetResponse } from 'src/types/sheetResponse.types';

export const fetchReportSheet = async (
  reportId: string,
  sheetId: string
): Promise<SheetResponse> => {
  return (await getApiClient().get(`reports/${reportId}/sheets/${sheetId}`))
    .data;
};

const useSheets = (reportId: string, sheetId: string) => {
  const getSheetsQuery = useQuery(
    ['reports', reportId, 'sheetId', sheetId],
    () => fetchReportSheet(reportId, sheetId),
    {
      enabled: !!reportId && !!sheetId && !sheetId.includes('newsheet'),
      retry: 0,
    }
  );

  return getSheetsQuery;
};

export default useSheets;
