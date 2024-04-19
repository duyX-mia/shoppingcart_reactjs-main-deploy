export const formatCurrency = (val) => {
  if (!val) return "";

  return val.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
