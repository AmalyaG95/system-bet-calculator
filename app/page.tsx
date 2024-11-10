"use client";

import { FinalResult } from "@/components";
import CalculatorForm from "@/components/calculator-form/calculator-form";
import ResultTable from "@/components/result-table/result-table";
import systemTypes from "@/utils/generateBetSystemTypes/generateBetSystemTypes";
import { useState } from "react";

const Home = () => {
  const [tableData, setTableData] = useState<TResultData | undefined>();
  const [selectedSystemTypeData, setSelectedSystemTypeData] =
    useState<TSystemTypeData>(systemTypes[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-blue-300">
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
            <FinalResult {...tableData} />
            <ResultTable
              combinations={tableData.combinations}
              pickNumber={selectedSystemTypeData.pick}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
