export enum EStatus {
  WIN = "win",
  LOSE = "lose",
  DRAW = "draw",
}

const generateInitialEvents = (number: number): TEvent[] => {
  const events: TEvent[] = Array.from({ length: number }, (_, index) => {
    const id = `event-${index + 1}`;
    const rate = 2;
    const status = EStatus.WIN;

    return { id, rate, status };
  });

  return events;
};

export default generateInitialEvents;
