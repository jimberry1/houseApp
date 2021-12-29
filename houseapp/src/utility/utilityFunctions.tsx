import { MoneyTransactionType } from '../types';

export const filterAndReduceMoneyAmounts = (
  moneyTransactions: { id: string; data: MoneyTransactionType }[],
  idToken: string,
  otherUserId: string
) => {
  return moneyTransactions
    .filter((moneyTransaction) => !moneyTransaction.data.isPaid)
    .filter(
      (trans) =>
        (trans.data.payerId === otherUserId &&
          trans.data.recipientId === idToken) ||
        (trans.data.payerId === idToken &&
          trans.data.recipientId === otherUserId)
    )
    .map((filteredTrans: { id: string; data: MoneyTransactionType }) =>
      filteredTrans.data.recipientId === idToken
        ? filteredTrans.data.amount
        : -filteredTrans.data.amount
    )
    .reduce((accumulator, money) => money + accumulator, 0);
};
