class Financier {
  constructor(name, loanHistory) {
    this.name = name;
    this.loanHistory = loanHistory;
  }
}

class Customer {
  constructor(name, cibilScore) {
    this.name = name;
    this.cibilScore = cibilScore;
  }
}

function sortFinanciers(financiers, customers) {
  return financiers
    .map((financier) => {
      const averageCibilScore =
        financier.loanHistory.reduce((acc, loan) => acc + loan[1], 0) /
        financier.loanHistory.length;
      return { financier, averageCibilScore };
    })
    .sort((a, b) => {
      const diff = b.averageCibilScore - a.averageCibilScore;
      if (diff === 0) {
        return b.financier.loanHistory.reduce((acc, loan) => acc + loan[0], 0) -
          a.financier.loanHistory.reduce((acc, loan) => acc + loan[0], 0);
      }
      return diff;
    })
    .slice(0, 3)
    .map((financierData) => {
      return customers
        .map((customer) => {
          return {
            financier: financierData.financier,
            customer,
            diff: Math.abs(financierData.averageCibilScore - customer.cibilScore),
          };
        })
        .sort((a, b) => a.diff - b.diff)[0];
    })
    .map(({ financier, customer }) => [financier, customer]);
}

const financiers = [
  new Financier("Financier 1", [
    [100, 700],
    [50, 650],
    [75, 600],
  ]),
  new Financier("Financier 2", [
    [100, 750],
    [50, 700],
    [75, 650],
  ]),
  new Financier("Financier 3", [
    [100, 800],
    [50, 750],
    [75, 700],
  ]),
];

const customers = [
  new Customer("Customer 1", 750),
  new Customer("Customer 2", 700),
  new Customer("Customer 3", 650),
];

console.log(sortFinanciers(financiers, customers));
