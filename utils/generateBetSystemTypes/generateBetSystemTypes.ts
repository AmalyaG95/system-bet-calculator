const generateBetSystemTypes = (numEvents: number): TSystemTypeData[] => {
  const uniqueBets = new Set<string>();
  const betSystemTypes: TSystemTypeData[] = [];

  while (betSystemTypes.length < numEvents) {
    const from = Math.floor(Math.random() * 19) + 2;
    const pick = Math.floor(Math.random() * (from - 1)) + 1;

    const key = `${from}/${pick}`;
    if (!uniqueBets.has(key)) {
      uniqueBets.add(key);
      betSystemTypes.push({ id: key, from, pick });
    }
  }

  return betSystemTypes.sort((a, b) =>
    a.from === b.from ? a.pick - b.pick : a.from - b.from
  );
};

const systemTypes = generateBetSystemTypes(20);

export default systemTypes;
