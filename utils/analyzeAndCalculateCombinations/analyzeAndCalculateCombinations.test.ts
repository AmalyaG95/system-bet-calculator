import { analyzeAndCalculateCombinations } from "..";
import { EStatus } from "../generateInitialEvents/generateInitialEvents";

// Sample events for tests
const sampleEvents = [
  { id: "1", rate: 2.0, status: EStatus.WIN },
  { id: "2", rate: 1.5, status: EStatus.LOSE },
  { id: "3", rate: 1.8, status: EStatus.WIN },
  { id: "4", rate: 1.2, status: EStatus.WIN },
];

describe("System Bet Calculator Core Functionality Tests", () => {
  describe("Combination Generation", () => {
    it("should generate the correct number of 2/3 combinations", () => {
      const events = sampleEvents.slice(0, 3); // Using 3 events
      const result = analyzeAndCalculateCombinations(events, 2, 100);

      // Expected combinations for 3 events taken 2 at a time is 3
      expect(result.combinations.length).toBe(3);
    });

    it("should generate the correct number of 3/4 combinations", () => {
      const result = analyzeAndCalculateCombinations(sampleEvents, 3, 100);

      // Expected combinations for 4 events taken 3 at a time is 4
      expect(result.combinations.length).toBe(4);
    });
  });

  describe("Payout Calculation", () => {
    it("should correctly calculate payouts for all winning events", () => {
      const allWinningEvents = sampleEvents.map((event) => ({
        ...event,
        status: EStatus.WIN,
      }));
      const result = analyzeAndCalculateCombinations(allWinningEvents, 2, 100);

      result.combinations.forEach((combo: TCombination) => {
        let expectedWinningAmount = result.stakePerCombination;
        combo.events.forEach((event) => {
          expectedWinningAmount *= event.rate;
        });
        expect(combo.winningAmount).toBeCloseTo(expectedWinningAmount, 2);
      });
    });

    it("should correctly calculate payouts for some winning and some losing events", () => {
      const result = analyzeAndCalculateCombinations(sampleEvents, 2, 100);

      let expectedTotalWinnings = 0;
      result.combinations.forEach((combo: TCombination) => {
        let winningAmount = result.stakePerCombination;
        combo.events.forEach((event) => {
          if (event.status === EStatus.WIN) winningAmount *= event.rate;
        });
        expectedTotalWinnings += winningAmount;
      });

      expect(result.winningsTotalAmount).toBeCloseTo(expectedTotalWinnings, 2);
    });

    it("should return zero winnings when all events lose", () => {
      const allLosingEvents = sampleEvents.map((event) => ({
        ...event,
        status: EStatus.LOSE,
      }));
      const result = analyzeAndCalculateCombinations(allLosingEvents, 2, 100);

      expect(result.winningsTotalAmount).toBe(0);
      result.combinations.forEach((combo: TCombination) => {
        expect(combo.winningAmount).toBe(0);
      });
    });
  });
});
