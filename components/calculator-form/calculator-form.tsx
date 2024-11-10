"use client";

import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import generateInitialEvents from "@/utils/generateInitialEvents/generateInitialEvents";
import { useForm } from "react-hook-form";
import systemTypes from "@/utils/generateBetSystemTypes/generateBetSystemTypes";
import { analyzeAndCalculateCombinations, parseSystemType } from "@/utils";
import {
  generateInitialValues,
  generateValidationSchema,
  TFormState,
} from "./model";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty } from "lodash";
import {
  Events,
  SelectSystemType,
  TotalStakeInput,
} from "@/components/calculator-form";

type CalculatorFormProps = {
  selectedSystemTypeData: TSystemTypeData;
  setTableData: Dispatch<SetStateAction<TResultData | undefined>>;
  setSelectedSystemTypeData: Dispatch<SetStateAction<TSystemTypeData>>;
};

const CalculatorForm = ({
  selectedSystemTypeData,
  setTableData,
  setSelectedSystemTypeData,
}: CalculatorFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TFormState>({
    resolver: yupResolver(generateValidationSchema()),
    defaultValues: generateInitialValues(selectedSystemTypeData),
  });

  const onSubmit = () => {
    if (!isEmpty(errors)) return errors;

    const data = analyzeAndCalculateCombinations(
      events,
      parseSystemType(systemType).pick,
      totalStake
    );

    setTableData(data);
  };

  const handleSelectChange = (
    event: ChangeEvent<HTMLSelectElement & HTMLInputElement>
  ) => {
    setSelectedSystemTypeData(parseSystemType(event.target.value));
    setTableData(undefined);
    setValue(
      "events",
      generateInitialEvents(parseSystemType(event.target.value).from)
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof TFormState
  ) => {
    const value =
      e.target.value === "" ? 0 : parseFloat(e.target.value).toString();
    setValue(name, value);
  };

  const { systemType, events, totalStake } = getValues();

  return (
    <>
      <form noValidate className="container" onSubmit={handleSubmit(onSubmit)}>
        <SelectSystemType
          handleSelectChange={handleSelectChange}
          register={register}
          systemTypes={systemTypes}
        />
        <TotalStakeInput
          errors={errors}
          handleChange={handleChange}
          register={register}
        />

        <Events
          errors={errors}
          events={events}
          handleChange={handleChange}
          register={register}
        />
        <button type="submit">Analyze</button>
      </form>
    </>
  );
};

export default CalculatorForm;
