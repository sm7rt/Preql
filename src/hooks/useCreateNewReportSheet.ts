import { useMutation } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';
import { ICreateReportSheetBody } from 'src/types/sheet.types';
import { SheetResponse } from 'src/types/sheetResponse.types';

const useCreateNewReportSheetMutation = () => {
  return useMutation((body: ICreateReportSheetBody) => {
    return getApiClient().post<SheetResponse>(`reports/sheets`, body);
  });
};

export default useCreateNewReportSheetMutation;
