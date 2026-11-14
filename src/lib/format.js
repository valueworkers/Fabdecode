const inr = new Intl.NumberFormat('en-IN')

export const formatNumber = (n) => inr.format(n)
export const formatRupees = (n) => `₹${inr.format(n)}`
