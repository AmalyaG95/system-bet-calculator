import { EStatus } from "../generateInitialEvents/generateInitialEvents";

const getTotalRate = (events: TEvent[]) =>
  events.reduce(
    (total, { rate, status }) =>
      status === EStatus.WIN ? total * rate : total,
    1
  );

export default getTotalRate;
