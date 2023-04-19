import { useMutation } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';
import { ISaveSheetRequest } from 'src/types/sheet.types';
import { SheetResponse } from 'src/types/sheetResponse.types';

const useSaveSheet = () => {
  return useMutation(({ reportId, sheetId, body }: ISaveSheetRequest) => {
    return getApiClient().post<SheetResponse>(
      `reports/${reportId}/sheets/${sheetId}`,
      body
    );
  });
};

export default useSaveSheet;
