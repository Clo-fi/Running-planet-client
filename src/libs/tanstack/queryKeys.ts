export const runningKeys = {
  all: ["running"] as const,
  record: () => [...runningKeys.all, "records"] as const,
  current: () => [...runningKeys.all, "records", "current"] as const,
  recordById: (id: number) => [...runningKeys.record(), id] as const,
};
