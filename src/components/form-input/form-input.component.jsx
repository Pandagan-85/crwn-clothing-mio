import { FormInputLabel, Input, Group } from "./form-input.styles";
const FormInput = ({ label, inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} />

      {/* Renderizzare solo se la label esiste */}
      {label && (
        <FormInputLabel shrink={inputOptions.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};
export default FormInput;
