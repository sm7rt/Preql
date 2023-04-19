import { useMutation } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';
import { ICreateSheetBody } from 'src/types/sheet.types';
import { SheetResponse } from 'src/types/sheetResponse.types';

const useTestNewSheet = () => {
  return useMutation((body: ICreateSheetBody) => {
    return getApiClient().patch<SheetResponse>(`reports/sheets`, body);
  });
};

export default useTestNewSheet;
