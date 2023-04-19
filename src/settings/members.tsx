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
import useUsers from './hooks/useUsers';

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

function Members() {
  const [open, setOpen] = useState(false);
  const { data: users, isLoading, isSuccess } = useUsers();
  const createUserMutator = useCreateUser();
  const [formError, setFormError] = useState<string | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitForm = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    createUserMutator.mutate(values);
    window.location.reload();
  };

  useEffect(() => {
    setOpen(false);
  }, [createUserMutator.isSuccess]);

  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5">Members</Typography>
        <Button
          color="primary"
          onClick={handleClickOpen}
          startIcon={<PersonAddAltIcon />}
          variant="contained"
        >
          Invite
        </Button>
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

      <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={open}>
        <DialogTitle>Invite User</DialogTitle>
        <Formik
          initialValues={{
            email: '',
            first_name: '',
            last_name: '',
          }}
          onSubmit={onSubmitForm}
          validationSchema={InviteUserSchema}
        >
          {({ submitForm, isSubmitting, touched, errors }) => (
            <Form>
              <DialogContent>
                <Box className={FormStyle}>
                  <FormikField
                    error={
                      touched.first_name ? Boolean(errors.first_name) : null
                    }
                    fieldName="first_name"
                    helperText={touched.first_name ? errors.first_name : null}
                    label="First Name *"
                    type="text"
                  />
                  <FormikField
                    error={touched.last_name ? Boolean(errors.last_name) : null}
                    fieldName="last_name"
                    helperText={touched.last_name ? errors.last_name : null}
                    label="Last Name *"
                    type="text"
                  />
                  <FormikField
                    error={touched.email ? Boolean(errors.email) : null}
                    fieldName="email"
                    helperText={touched.email ? errors.email : null}
                    label="Email *"
                    type="email"
                  />

                  {createUserMutator.isLoading ? <LinearProgress /> : null}
                  {formError ? (
                    <Box pt={2}>
                      <ErrorMessage color="error">{formError}</ErrorMessage>
                    </Box>
                  ) : null}
                </Box>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  color="primary"
                  disabled={createUserMutator.isLoading}
                  onClick={submitForm}
                  type="submit"
                  variant="contained"
                >
                  Invite
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default Members;
