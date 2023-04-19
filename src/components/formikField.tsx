import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Box, FormControl, MenuItem, Typography } from '@mui/material';
import { Field } from 'formik';
import { InputBase, Select } from 'formik-mui';

import withErrorBoundary from './hoc/withErrorBoundary';

const FieldWrapper = styled(Box)(({ theme }) => ({
  '& .MuiFormHelperText-root': {
    margin: `${theme.spacing(0.5)} 0`,
  },
  padding: `${theme.spacing(1)}px 0`,
}));

const InputStyle = css`
  height: 48px;
  padding: 0 1rem;
  border: 1px solid #e9e9e9;
  border-radius: 0.5rem;
  font-size: 14px;
`;

const SelectField = styled(Select)(() => ({
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid #e9e9e9',
  },
  borderRadius: '0.5rem',
  height: '50px',
}));

export const ErrorMessage = styled(Typography)`
  font-size: 12px;
  margin-top: 4px;
`;

type FormikFieldProps = {
  label: string;
  fieldName: string;
  type: string;
  error: boolean;
  helperText: string;
  options?: { label: string; value: string }[];
  disabled?: boolean;
};

function FormikField({
  label,
  fieldName,
  type,
  error,
  helperText,
  options,
  disabled,
}: FormikFieldProps) {
  return (
    <FieldWrapper>
      <span className="text-gray-60 text-sm mb-2">{label}</span>
      {type !== 'select' ? (
        <FormControl fullWidth>
          <Field
            className={error ? 'error' : null}
            classes={{
              input: InputStyle,
            }}
            component={InputBase}
            disabled={disabled ?? false}
            fullWidth
            label={label}
            name={fieldName}
            type={type}
          />

          {error ? (
            <div className="mt-1 text-xs text-red">{helperText}</div>
          ) : null}
        </FormControl>
      ) : (
        <FormControl fullWidth>
          <Field
            component={SelectField}
            fullWidth
            id={fieldName}
            label={label}
            labelId={`${fieldName}-simple`}
            name={fieldName}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field>
        </FormControl>
      )}
    </FieldWrapper>
  );
}

export default withErrorBoundary(FormikField);
