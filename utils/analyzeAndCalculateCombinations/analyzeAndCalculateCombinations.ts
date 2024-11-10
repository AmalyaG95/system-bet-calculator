import { EStatus } from "../generateInitialEvents/generateInitialEvents";

const getCombinationCount = (n: number, r: number): number => {
  if (r > n) return 0;
  let num = 1;
  let denom = 1;
  for (let i = 0; i < r; i++) {
    num *= n - i;
    denom *= i + 1;
  }
  return num / denom;
};

const analyzeAndCalculateCombinations = (
  events: TEvent[],
  systemTypeX: number,
  stake: number
): TResultData => {
  const combinations: TCombination[] = [];
  const eventCount = events.length;
  const stakePerCombination =
    stake / getCombinationCount(eventCount, systemTypeX);

  const generateCombinations = (
    currentCombo: TEvent[],
    startIndex: number
  ): void => {
    if (currentCombo.length === systemTypeX) {
      const id = currentCombo.map((event) => event.id).join("-");

      // Calculate winning amount based only on events with a "WIN" status
      let winningAmount = stakePerCombination;
      let hasWin = false;

      currentCombo.forEach((event) => {
        if (event.status === EStatus.WIN) {
          winningAmount *= event.rate;
          hasWin = true;
        }
      });

      // If no winning events were found in the combination, set winningAmount to zero
      winningAmount = hasWin ? winningAmount : 0;

      combinations.push({
        id,
        events: [...currentCombo],
        winningAmount: +winningAmount.toFixed(2),
      });
      return;
    }

    for (let i = startIndex; i < events.length; i++) {
      generateCombinations([...currentCombo, events[i]], i + 1);
    }
  };

  generateCombinations([], 0);

  const winningsTotalAmount = combinations.reduce(
    (acc, combo) => acc + combo.winningAmount,
    0
  );

  return {
    winningsTotalAmount,
    stakePerCombination,
    combinations,
    stake,
  };
};

export default analyzeAndCalculateCombinations;
