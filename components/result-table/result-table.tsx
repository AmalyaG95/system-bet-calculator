import Row from "./row";

type ResultTableProps = {
  combinations: TCombination[];
  pickNumber: number;
};

const ResultTable = ({ combinations, pickNumber }: ResultTableProps) => {
  return (
    <div className="flex flex-col gap-2 border-red-200">
      <div className="flex gap-3 w-full border-blue-400">
        <span className=" w-48 text-center">ID</span>
        <span className=" w-48 text-center">Name</span>
        {Array(pickNumber)
          .fill(1)
          .map((_, i) => (
            <span key={i} className=" w-48 text-center">{`Event ${
              i + 1
            }`}</span>
          ))}
        <span className=" w-48 text-center">Rate</span>

        <span className=" w-48 text-center">Winning Amount</span>
      </div>
      {combinations.map((combo, i) => (
        <Row key={combo.id} index={i} {...combo} />
      ))}
    </div>
  );
};

export default ResultTable;
