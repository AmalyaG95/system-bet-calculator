import { getTotalRate } from "@/utils";
import { EStatus } from "@/utils/generateInitialEvents/generateInitialEvents";

type RowProps = {
  index: number;
  id: string;
  events: TEvent[];
  winningAmount: number;
};

const Row = ({ index, id, events, winningAmount }: RowProps) => {
  return (
    <div className="flex gap-3 border-blue-400">
      <span className=" w-48 text-center">{index + 1}</span>
      <span className=" w-48 text-center">{id}</span>
      {events.map(({ id, rate, status }) => (
        <span
          key={id}
          className={`w-48 text-center ${
            status === EStatus.WIN
              ? "text-lime-600"
              : status === EStatus.LOSE
              ? "text-red-600"
              : "text-slate-400"
          }`}
        >
          {rate.toFixed(2)}
        </span>
      ))}
      <span className=" w-48 text-center">{getTotalRate(events)}</span>
      <span className=" w-48 text-center">{winningAmount}</span>
    </div>
  );
};

export default Row;
