"use client";

import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useState,
} from "react";
// import { isNil, isObject } from "lodash";

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
import { isNil } from "lodash";

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

  const eventsV = watch("events");
  const totalStakeV = watch("totalStake");
  console.log(eventsV, "yyyyyy");
  console.log(totalStakeV, "totalStakeV");

  const onSubmit = () => {
    console.log(111111, errors);

    if (isNil(errors)) return errors;

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
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <label htmlFor="systemType">System Type</label>
          <select
            className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        <div className="flex items-center">
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
        <div className="events container">
          {events.map(({ id, rate }, i) => (
            <Fragment key={id}>
              <div key={id} className="flex gap-6">
                <label htmlFor={id}>{`Event ${i + 1}`} </label>
                <input
                  id={id}
                  {...register(`events.${i}.rate`)}
                  type="number"
                  step="0.01"
                  defaultValue={Number(rate).toFixed(2)}
                />
                <input
                  className="win"
                  id={`win-${id}`}
                  {...register(`events.${i}.status`)}
                  type="radio"
                  defaultChecked
                  value={EStatus.WIN}
                />
                <input
                  className="lose"
                  id={`lose-${id}`}
                  {...register(`events.${i}.status`)}
                  type="radio"
                  value={EStatus.LOSE}
                />
                <input
                  className="draw"
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
