import { css } from '@emotion/css';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import FormikField, { ErrorMessage } from 'src/components/formikField';
import * as Yup from 'yup';

import useCreateUser from './hooks/useCreateUser';
import useGetInvites from './hooks/useGetInvites';

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
}

const InviteUserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  { field: 'created_at', headerName: 'Created', width: 200 },
];

const FormStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function Invites() {
  const { data: users, isLoading, isSuccess } = useGetInvites();
  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5">Invites</Typography>
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        {isLoading ? <Typography>Loading...</Typography> : null}
        {isSuccess ? (
          <DataGrid
            checkboxSelection
            columns={columns}
            pageSize={5}
            rows={users.data.data}
            rowsPerPageOptions={[5]}
          />
        ) : null}
      </div>
    </>
  );
}

export default Invites;
