// utils.ts
export const keyPress = (
  key: string,
  callback: (e: React.KeyboardEvent) => void
) => {
  return (e: React.KeyboardEvent) => {
    if (e.key === key) {
      callback(e);
    }
  };
};
