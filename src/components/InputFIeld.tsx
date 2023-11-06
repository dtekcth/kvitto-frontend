import { UseFormRegister, FieldError } from "react-hook-form";
import styled from "@emotion/styled";
import { OurForm } from "../Form";
import { HTMLInputTypeAttribute } from "react";
import { ErrorMessage, Label } from "./styles";

interface Props {
  name: keyof OurForm; // ensures the field name is one from the field-type
  label: string;
  placeholder?: string | number;
  type: HTMLInputTypeAttribute;
  error: FieldError | undefined;
  register: UseFormRegister<OurForm>;
}

export const InputField = ({ name, type, label, register, error }: Props) => {
  const Input = styled.input`
    ${error &&
    `
  border-color: red;
  `}
  `;

  return (
    <div>
      <Label>
        {label}
        <Input type={type} {...register(name)}></Input>
        <ErrorMessage>{error?.message}</ErrorMessage>
      </Label>
    </div>
  );
};
