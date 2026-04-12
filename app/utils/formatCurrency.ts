export const formatCurrency = (amount: string, currency_code?: string) => {
  amount?.replaceAll(",", "");
  const amt = Number(amount);
  // check for NAN
  if (isNaN(amt)) return amount || "0";

  if (currency_code === "NGN") {
    return amt
      .toLocaleString("en-US", {
        style: "currency",
        currency: currency_code,
      })
      .replace("NGN", "₦");
  }
  return amt.toLocaleString("en-US", {
    style: "currency",
    currency: currency_code || "USD",
  });
};
