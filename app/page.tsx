"use client";

import CalculatorForm from "@/components/calculator-form/calculator-form";
import ResultTable from "@/components/result-table/result-table";
import systemTypes from "@/utils/generateBetSystemTypes/generateBetSystemTypes";
import { useState } from "react";

const Home = () => {
  const [tableData, setTableData] = useState<TResultData>();
  const [selectedSystemTypeData, setSelectedSystemTypeData] =
    useState<TSystemTypeData>(systemTypes[0]);

  return (
    <div>
      <main>
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
            <h1>Total winnings: {tableData.winningsTotalAmount}</h1>
            <h1>Total stake: {tableData.stake}</h1>
            <h1>Stake per Combination: {tableData.stakePerCombination}</h1>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
