import { useForm, SubmitHandler } from "react-hook-form";
import { InputField } from "./components/InputFIeld";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationScheme";

//  npm install @emotion/react @emotion/styled react-hook-form yup @hookform/resolvers @types/react
// example form type, should replicate the Request-object expected by api

// TODO: use fn+f2 to replace all occurances of the type-name when changed
// TODO: move the "OurForm" interface to a more resonable place were other types are stored.
// since it should be useable by e.g. api-calls etc
export type OurForm = {
  name: string;
  cost: number;
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // When the resolver does not cover all fields in OurForm, the resolver will give an error
  } = useForm<OurForm>({ resolver: yupResolver(schema) });

  const onSubmit = (formData: OurForm) => {
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="name"
          type="text"
          label="Namnet på kontot"
          register={register}
          error={errors.name}
        />
        <InputField
          name="cost"
          type="number"
          label="Den totala kostnaden"
          register={register}
          error={errors.cost}
        />
        <input type="submit" />
      </form>
    </div>
  );
};
