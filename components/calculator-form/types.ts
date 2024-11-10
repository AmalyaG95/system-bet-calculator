import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TFormState } from "./model";

type THandleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof TFormState
  ) => void;

export type TInput = {
    register: UseFormRegister<TFormState>;
    handleChange: THandleChange;
    errors: FieldErrors<TFormState>;
  };
  