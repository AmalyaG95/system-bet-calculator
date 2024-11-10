import { Fragment } from "react";
import { TFormState } from "./model";
import { EStatus } from "@/utils/generateInitialEvents/generateInitialEvents";
import { TInput } from "./types";

type EventsProps = TInput &  {
  events: TEvent[];
};

const Events = ({ events, register, handleChange, errors }: EventsProps) => {
  return (
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
  );
};

export default Events;
