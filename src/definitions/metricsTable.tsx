import {
  HeaderCellSort,
  useSort,
} from '@table-library/react-table-library/sort';
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import Image from 'next/image';
import React from 'react';
import { MetricModel, useQueryMetrics } from 'src/hooks/useQueryMetrics';

interface MetricsTableProps {
  searchQuery: string;
  sortby: string;
  onSelectRow: (row) => void;
}

function MetricsTable({ searchQuery, sortby, onSelectRow }: MetricsTableProps) {
  const { data } = useQueryMetrics();

  const tableData = {
    nodes:
      data?.length > 0
        ? data
          .filter(
            (item: MetricModel) =>
              item.display_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
          )
          .sort((a: MetricModel, b: MetricModel) => {
            return sortby === 'asc'
              ? a.display_name.localeCompare(b.display_name)
              : b.display_name.localeCompare(a.display_name);
          })
        : [],
  };

  const sort = useSort(tableData, null, {
    sortFns: {
      METRIC: (array) =>
        array.sort((a: MetricModel, b: MetricModel) => {
          return sortby === 'asc'
            ? a.display_name.localeCompare(b.display_name)
            : b.display_name.localeCompare(a.display_name);
        }),
      UPDATED_AT: (array) =>
        array.sort((a: MetricModel, b: MetricModel) => {
          if (sortby === 'asc') {
            return new Date(b.updated_at) < new Date(a.updated_at) ? 1 : -1;
          }
          if (sortby === 'desc') {
            return new Date(a.updated_at) < new Date(b.updated_at) ? 1 : -1;
          }
        }),
    },
  });

  const theme = useTheme({
    Cell: `
      padding: 15px 0px;
      padding-right: 5px;

      div {
        overflow: none;
        text-overflow: none;
        white-space: normal !important;
      }
     
      &:nth-of-type(1) {
        flex: 1;
      }

      &:last-of-type {
        padding-right: 15px;
        text-align: end;
      }
    `,
    HeaderCell: `
      padding: 10px 0px;
      border-bottom: 1px solid #A0ABC0;
      &:last-of-type {
        padding-right: 15px;
        text-align: end;
      }
    `,
    Row: `
      position: relative;
      cursor: pointer;
      border-bottom: 1px solid #565656;
      .td {
        border-bottom: 1px solid #CBD2E0;
      }
    
      &:hover .td {
        background-color: #f8fafc;
      }
    `,
    Table: `
      --data-table-library_grid-template-columns: 20% 40% 20% 20% minmax(50px, 1fr);
    `,
  });

  return (
    <div className="mt-4 shadow-xl bg-white rounded-xl px-5">
      <div className="flex gap-2 h-12 pt-8 pb-8 justify-start items-center">
        <Image height="16" src="/icons/icon-hamburger.svg" width="16" />
        <p className="text-lg font-bold">All Metrics</p>
      </div>
      {data ? (
        <Table data={tableData} sort={sort} theme={theme}>
          {(rows) => {
            return (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCellSort resize sortKey="METRIC">
                      Metric
                    </HeaderCellSort>
                    <HeaderCell resize>Definition</HeaderCell>
                    <HeaderCell resize>Data Source</HeaderCell>
                    <HeaderCellSort resize sortKey="UPDATED_AT">
                      Last Updated
                    </HeaderCellSort>
                    <HeaderCell resize />
                  </HeaderRow>
                </Header>
                <Body>
                  {rows.map((item) => (
                    <Row className="py-3" item={item} key={item.id}>
                      <Cell>{item.display_name}</Cell>
                      <Cell>{item.description}</Cell>
                      <Cell>
                        <div className="flex gap-2 w-fit h-8 px-4 rounded-full bg-slate-100 justify-start items-center">
                          <Image
                            alt="SHOPIFY ICON"
                            height="20"
                            src="/icons/icon-shopify.svg"
                            width="20"
                          />
                          <div className="text-sm">Shopify</div>
                        </div>
                      </Cell>
                      <Cell>{item.updated_at}</Cell>
                      <Cell className="flex justify-end">
                        <Image
                          alt="RIGHT ICON"
                          height="20"
                          onClick={() => {
                            onSelectRow(item);
                          }}
                          src="/icons/icon-chevron-right.svg"
                          width="20"
                        />
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            );
          }}
        </Table>
      ) : null}
      <div className="flex gap-2 h-12 py-10 justify-start items-center">
        <Image height="16" src="/icons/icon-plus.svg" width="16" />
        <p className="text-md font-extrabold">Add a new metric</p>
      </div>
    </div>
  );
}

export default MetricsTable;
