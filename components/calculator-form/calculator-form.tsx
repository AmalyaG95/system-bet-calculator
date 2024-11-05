"use client";

import React, { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";

import analyseAndCalculateCombinations from "@/utils/analyseAndCalculateCombinations/analyseAndCalculateCombinations";
import generateInitialEvents, {
  EStatus,
} from "@/utils/generateInitialEvents/generateInitialEvents";
// import useForm from "@/hooks/use-form";
import useForm from "react-hook-form";
import systemTypes from "@/utils/generateBetSystemTypes/generateBetSystemTypes";
import { parseSystemType } from "@/utils";
import {
  generateInitialValues,
  generateValidationSchema,
  TFormState,
} from "./model";

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
  const { formData, setFormData, errors, register, formAction, pending } =
    useForm<TFormState>(
      async (_, errors) => {
        // if (!!errors) return errors;
        console.log("events", events);

        const data = analyseAndCalculateCombinations(
          events,
          parseSystemType(systemType).pick,
          totalStake
        );

        setTableData(data);
        return formData;
      },
      generateInitialValues(selectedSystemTypeData),
      generateValidationSchema()
    );

  const handleSelectChange = (
    event: ChangeEvent<HTMLSelectElement & HTMLInputElement>
  ) => {
    register("systemType").onChange(event);

    setSelectedSystemTypeData(parseSystemType(event.target.value));
    setTableData(undefined);
    setFormData((prev) => ({
      ...prev,
      events: generateInitialEvents(parseSystemType(event.target.value).from),
    }));

    console.log("event3", events, parseSystemType(event.target.value).from);
  };

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log("3333333", name, value);
    const [index, fieldName] = name.split(".");
    const numbericIndex = Number(index);

    setFormData((prev) => ({
      ...prev,
      events: events.with(numbericIndex, {
        ...events[numbericIndex],
        [fieldName]: value ? parseFloat(value) : 0,
      }),
    }));

    console.log("event3", events, parseSystemType(event.target.value).from);
  };

  const { systemType, events, totalStake } = formData;

  return (
    <>
      <form action={formAction}>
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
            defaultValue={100}
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
                  {...register(`events.${i}.rate` as Path<TFormState>)}
                  // name={`${name}.rate`}
                  type="number"
                  step="0.01"
                  defaultValue={rate.toFixed(2)}
                  onChange={handleChangeEvent}
                />
                <input
                  id={`win-${id}`}
                  {...register(`${i}.status`)}
                  // name={`${name}.status`}
                  type="radio"
                  defaultChecked
                  value={EStatus.WIN}
                  onChange={handleChangeEvent}
                />
                <input
                  id={`lose-${id}`}
                  {...register(`${i}.status`)}
                  // name={`${name}.status`}
                  type="radio"
                  value={EStatus.LOSE}
                  onChange={handleChangeEvent}
                />
                <input
                  id={`draw-${id}`}
                  {...register(`${i}.status`)}
                  type="radio"
                  value={EStatus.DRAW}
                  onChange={handleChangeEvent}
                />
              </div>
              {errors.events && (
                <div className="error-message">{errors.events}</div>
              )}
            </Fragment>
          ))}
        </div>

        <button type="submit" disabled={pending}>
          Analyse
        </button>
      </form>
    </>
  );
};

export default CalculatorForm;
