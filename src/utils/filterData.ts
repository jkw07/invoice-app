export const filterData = <T extends object>(data: T[], searchValue: string): T[] => {
  if (!searchValue.trim()) return data;

  return data.filter((item) =>
    Object.entries(item).some(([, value]) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );
};