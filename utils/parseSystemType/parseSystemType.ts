const parseSystemType = (systemType: string): TSystemTypeData => {
  const [pick, from] = systemType.split("/").map(Number);

  return { id: `${pick}/${from}`, pick, from };
};

export default parseSystemType;
