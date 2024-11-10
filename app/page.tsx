"use client";

import CalculatorForm from "@/components/calculator-form/calculator-form";
import ResultTable from "@/components/result-table/result-table";
import systemTypes from "@/utils/generateBetSystemTypes/generateBetSystemTypes";
import { useState } from "react";

const Home = () => {
  const [tableData, setTableData] = useState<TResultData | undefined>();
  const [selectedSystemTypeData, setSelectedSystemTypeData] =
    useState<TSystemTypeData>(systemTypes[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100">
      <main className="flex flex-col gap-9 p-14">
        <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          System Bet Calculator
        </h1>
        <CalculatorForm
          selectedSystemTypeData={selectedSystemTypeData}
          setTableData={setTableData}
          setSelectedSystemTypeData={setSelectedSystemTypeData}
        />
        {!!tableData && (
          <>
            <ResultTable
              combinations={tableData.combinations}
              pickNumber={selectedSystemTypeData.pick}
            />
            <section className="flex flex-col gap-3 font-bold">
              <h1 className="text-center">
                Total winnings: {tableData.winningsTotalAmount.toFixed(2)}
              </h1>
              <h1 className="text-center">Total stake: {Number(tableData?.stake).toFixed(2)}</h1>
              <h1 className="text-center">
                Stake per Combination: {tableData.stakePerCombination.toFixed(2)}
              </h1>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
