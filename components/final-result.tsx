const FinalResult = ({
  stake,
  winningsTotalAmount,
  stakePerCombination,
}: TResultData) => (
  <section className="flex flex-col gap-3 font-bold">
    <h1 className="text-start">
      Total winnings: {winningsTotalAmount.toFixed(2)}
    </h1>
    <h1 className="text-start">Total stake: {Number(stake).toFixed(2)}</h1>
    <h1 className="text-start">
      Stake per Combination: {stakePerCombination.toFixed(2)}
    </h1>
  </section>
);

export default FinalResult;
