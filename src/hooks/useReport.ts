import { useQuery } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';
import type { ReportResponse } from 'src/types/reportResonse.types';

export const fetchReport = async (
  reportId: string
): Promise<ReportResponse> => {
  return (await getApiClient().get<ReportResponse>(`reports/${reportId}`)).data;
};

const useReport = (reportId: string) => {
  const getReportsQuery = useQuery(
    ['reports', reportId],
    () => fetchReport(reportId),
    { enabled: !!reportId && reportId !== 'new-report', retry: 0 }
  );

  return getReportsQuery;
};

export default useReport;
