import { Field, FieldProps, useField } from 'formik';
import Select from 'react-select';

type TOption = {
  value: string;
  label: string;
};

type TOptions = TOption[];

type SelectFieldProps = {
  label: string;
  name: string;
  options: TOptions;
};

function SelectField({ label, name, options }: SelectFieldProps) {
  const [meta, helpers] = useField(name);

  const styles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: helpers.error && helpers.touched ? '#FFF3F3' : '',
      borderColor: helpers.error && helpers.touched ? '#F95950' : '#e9e9e9',
      borderRadius: '8px',
      height: '48px',
    }),
    input: (styles: any) => ({
      ...styles,
      'input:focus': {
        boxShadow: 'none',
      },
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: '#BDBDBD',
    }),
  };

  return (
    <label className="block">
      <span className="text-gray-60 text-sm mb-2">{label}</span>
      <Field as="select" name={name}>
        {({
          field: { onBlur, value, ...formikField },
          form: { setFieldValue, touched, errors },
          meta,
        }: FieldProps) => (
          <div className="w-full mt-1">
            <Select
              className={meta.touched && meta.error ? 'dropdown-error' : ''}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.name = name;
                e.target.value = value;
                onBlur(e);
              }}
              onChange={(option: TOption | null) => {
                setFieldValue(name, option?.value);
              }}
              options={options}
              styles={styles}
              value={
                options
                  ? options.find((option) => option.value === value)
                  : { label: '', value: '' }
              }
            />

            {meta.touched && meta.error ? (
              <div className="mt-1 text-xs text-red">{meta.error}</div>
            ) : null}
          </div>
        )}
      </Field>
    </label>
  );
}

export default SelectField;
