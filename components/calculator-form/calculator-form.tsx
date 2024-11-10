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
import { isEmpty } from "lodash";

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
  errors;
  const totalStakeV = watch("totalStake");
  const value = watch();
  console.log(eventsV, "yyyyyy");
  console.log(totalStakeV, "totalStakeV", errors);
  console.log("errors", errors);

  const onSubmit = () => {
    console.log(111111, errors);

    if (!isEmpty(errors)) return errors;

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: keyof TFormState
  ) => {
    const value =
      e.target.value === "" ? 0 : parseFloat(e.target.value).toString();
    setValue(name, value);
  };

  const { systemType, events, totalStake } = getValues();

  console.log("events", events);

  return (
    <>
      <form noValidate className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <label htmlFor="systemType" className="min-w-28">
            System Type
          </label>
          <div className="pr-3 border border-gray-300 rounded-md bg-white">
            <select
              className="block w-full px-4 py-3 bg-white border-none shadow-sm focus:outline-none"
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
        </div>
        <div className="flex items-center">
          <label htmlFor="totalStake">Total Stake</label>
          <div className="flex flex-col">
            <input
              {...register("totalStake")}
              name="totalStake"
              type="number"
              onChange={(e) => handleChange(e, "totalStake")}
            />

            <div
              className={`error-message h-6 ${
                errors.totalStake ? "" : "invisible"
              } text-red-600`}
            >
              {errors.totalStake?.message}
            </div>
          </div>
        </div>
        <div className="events container">
          {events.map(({ id, rate }, i) => {
            const errorIndex = errors.events?.findIndex?.(
              (e) => e?.rate?.ref?.id === id
            );
            const hasError = errorIndex !== undefined && errorIndex !== -1;
            const errorMessage = hasError
              ? errors.events?.[errorIndex]?.rate?.message
              : "";
            const errorStyles = `error-message h-6 mt-2 ${
              hasError ? "" : "invisible"
            } text-red-600`;

            return (
              <Fragment key={id}>
                <div>
                  <div key={id} className="flex gap-6">
                    <label htmlFor={id}>{`Event ${i + 1}`} </label>
                    <input
                      id={id}
                      {...register(`events.${i}.rate`)}
                      type="number"
                      step="0.01"
                      defaultValue={Number(rate)}
                      onChange={(e) =>
                        handleChange(e, e.target.name as keyof TFormState)
                      }
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
                  <div className={errorStyles}>{errorMessage}</div>
                </div>
              </Fragment>
            );
          })}
        </div>

        <button type="submit">Analyse</button>
      </form>
    </>
  );
};

export default CalculatorForm;
