type TSystemTypeData = {
  id: string;
  pick: number;
  from: number;
};

type TEvent = {
  id: string;
  rate: number;
  status: EStatus;
};

type TCombination = {
  id: string;
  events: TEvent[];
  winningAmount: number;
};

type TResultData = {
  winningsTotalAmount: number;
  stakePerCombination: number;
  combinations: TCombination[];
  stake: number;
};
