import { useMutation } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';
import { ICreateSheetRequest } from 'src/types/sheet.types';
import { SheetResponse } from 'src/types/sheetResponse.types';

const useCreateNewSheet = () => {
  return useMutation(({ reportId, body }: ICreateSheetRequest) => {
    return getApiClient().post<SheetResponse>(
      `reports/${reportId}/sheets`,
      body
    );
  });
};

export default useCreateNewSheet;
