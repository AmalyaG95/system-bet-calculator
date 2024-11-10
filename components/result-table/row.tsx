import { getTotalRate } from "@/utils";
import { EStatus } from "@/utils/generateInitialEvents/generateInitialEvents";

type RowProps = {
  index: number;
  id: string;
  events: TEvent[];
  winningAmount: number;
};

const rowStyles = 'w-48 text-center';

const Row = ({ index, id, events, winningAmount }: RowProps) => (
  <div className="flex gap-3 border-blue-400">
    <span className={`${rowStyles}`}>{index + 1}</span>
    <span className={`${rowStyles}`}>{id}</span>
    {events.map(({ id, rate, status }) => (
      <span
        key={id}
        className={`${rowStyles} ${
          status === EStatus.WIN
            ? "text-lime-600"
            : status === EStatus.LOSE
            ? "text-red-600"
            : "text-slate-400"
        }`}
      >
        {Number(rate)?.toFixed(2)}
      </span>
    ))}
    <span className={`${rowStyles}`}>{getTotalRate(events)}</span>
    <span className={`${rowStyles}`}>{winningAmount.toFixed(2)}</span>
  </div>
);

export default Row;
