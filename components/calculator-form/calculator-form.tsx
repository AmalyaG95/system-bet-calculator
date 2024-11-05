"use client";

import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useState,
} from "react";

import analyseAndCalculateCombinations from "@/utils/analyseAndCalculateCombinations/analyseAndCalculateCombinations";
import generateInitialEvents, {
  EStatus,
} from "@/utils/generateInitialEvents/generateInitialEvents";
import { useForm } from "react-hook-form";
import systemTypes from "@/utils/generateBetSystemTypes/generateBetSystemTypes";
import { parseSystemType } from "@/utils";
import {
  generateInitialValues,
  generateValidationSchema,
  TFormState,
} from "./model";
import { yupResolver } from "@hookform/resolvers/yup";

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
    watch,
    setValue,
    getValues,
  } = useForm<TFormState>({
    resolver: yupResolver(generateValidationSchema()),
    defaultValues: generateInitialValues(selectedSystemTypeData),
  });

  const currentName = watch("events");
  console.log(currentName, errors);

  const onSubmit = () => {
    if (!!errors) return errors;

    const data = analyseAndCalculateCombinations(
      events,
      parseSystemType(systemType).pick,
      totalStake
    );
    console.log("data", data);

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

  const { systemType, events, totalStake } = getValues();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="systemType">System Type</label>
          <select
            id="systemType"
            {...register("systemType")}
            onChange={handleSelectChange}
          >
            {systemTypes.map(({ id, from, pick }) => (
              <option
                key={id}
                value={`${pick}/${from}`}
              >{`${pick} from ${from}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="totalStake">Total Stake</label>
          <input
            {...register("totalStake")}
            name="totalStake"
            type="number"
            // defaultValue={100}
          />
          {errors.totalStake && (
            <div className="error-message">{errors.totalStake}</div>
          )}
        </div>
        <div>
          {events.map(({ id, rate }, i) => (
            <Fragment key={id}>
              <div key={id}>
                <label htmlFor={id}>{`Event ${i + 1}`} </label>
                <input
                  id={id}
                  {...register(`events.${i}.rate`)}
                  type="number"
                  step="0.01"
                  defaultValue={Number(rate).toFixed(2)}
                />
                <input
                  id={`win-${id}`}
                  {...register(`events.${i}.status`)}
                  type="radio"
                  defaultChecked
                  value={EStatus.WIN}
                />
                <input
                  id={`lose-${id}`}
                  {...register(`events.${i}.status`)}
                  type="radio"
                  value={EStatus.LOSE}
                />
                <input
                  id={`draw-${id}`}
                  {...register(`events.${i}.status`)}
                  type="radio"
                  value={EStatus.DRAW}
                />
              </div>
              {errors.events && (
                <div className="error-message">{errors.events}</div>
              )}
            </Fragment>
          ))}
        </div>

        <button type="submit">Analyse</button>
      </form>
    </>
  );
};

export default CalculatorForm;
