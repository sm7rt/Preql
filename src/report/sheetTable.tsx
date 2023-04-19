import AddIcon from '@mui/icons-material/Add';

import withErrorBoundary from '../components/hoc/withErrorBoundary';
import { SheetAction } from './content.styles';
import { Table, TableBody, TableHeader } from './sheetsTable.styles';

interface SheetTableProps {
  rows: Array<any>;
  timeframe: string;
  onAddColumns: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

function SheetTable({ rows, timeframe, onAddColumns }: SheetTableProps) {
  return (
    <Table>
      <TableHeader>
        <div className="tr">
          <div className="th th-index" />
          <div className="th th-timeframe">
            Timeframe: {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
          </div>
          {rows.length
            ? Object.keys(rows[0])
              .filter((item) => !item.includes('CREATED_AT'))
              .map((item) => (
                <div
                  className={`th th-${item.toLowerCase()}`}
                  key={item}
                  style={{ textTransform: 'capitalize' }}
                >
                  {item.split('_').join(' ').toLowerCase()}
                </div>
              ))
            : null}
          <div className="th th-default">
            <SheetAction onClick={onAddColumns}>
              <AddIcon /> Add columns
            </SheetAction>
          </div>
        </div>
      </TableHeader>
      <TableBody>
        {rows?.map((row, index) => (
          <div
            className="tr"
            key={`${row['CREATED_AT__' + timeframe.toUpperCase()]}-${index}`}
          >
            <div className="td td-index">{index + 1} </div>
            <div className="td td-timeframe">
              {row['CREATED_AT__' + timeframe.toUpperCase()]}
            </div>
            {rows.length
              ? Object.keys(rows[0])
                .filter((item) => !item.includes('CREATED_AT'))
                .map((item) => (
                  <div className={`td td-${item}`} key={item}>
                    {row[item]}
                  </div>
                ))
              : null}
          </div>
        ))}
      </TableBody>
    </Table>
  );
}

export default withErrorBoundary(SheetTable);
