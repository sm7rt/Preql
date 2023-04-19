import { useMutation } from 'react-query';
import { getApiClient } from 'src/helpers/apiConfig';
import { ISaveSheetRequest } from 'src/types/sheet.types';
import { SheetResponse } from 'src/types/sheetResponse.types';

const useTestSheet = () => {
  return useMutation(({ reportId, sheetId, body }: ISaveSheetRequest) => {
    return getApiClient().patch<SheetResponse>(
      `reports/${reportId}/sheets/${sheetId}`,
      body
    );
  });
};

export default useTestSheet;
