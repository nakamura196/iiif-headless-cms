export const useSettings = () => {
  const theme = useState("theme", () => "");

  return {
    theme,
  };
};
