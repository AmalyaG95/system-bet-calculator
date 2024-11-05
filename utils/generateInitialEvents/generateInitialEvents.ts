export enum EStatus {
  WIN = "win",
  LOSE = "lose",
  DRAW = "draw",
}

const generateInitialEvents = (number: number): TEvent[] => {
  const events: TEvent[] = Array.from({ length: number }, (_, index) => {
    const id = `event-${index + 1}`; // Generating a unique id
    const rate = 2.0; // Random rate value between 1 and 10
    const status = EStatus.WIN; // Randomly selecting a status

    return { id, rate, status };
  });

  return events;
};

export default generateInitialEvents;
