import { useState, useEffect } from 'react';
import db from '../firebase';
import { fetchUnpaidMoneyTransactionsToRecipientFromPayerFromFirebase } from '../services/firebaseRequests';
import { MoneyTransactionType } from '../types';
export interface MoneyOwedProps {
  recipientId: string;
  payerId: string;
}

interface MoneyTransactionWrapper {
  data: MoneyTransactionType;
  id: string;
}
const MoneyOwed: React.SFC<MoneyOwedProps> = ({ recipientId, payerId }) => {
  const [transactions, setTransactions] = useState<any>([]);

  useEffect(() => {
    const fetchMoneyTransactionsFromFirebase = async () => {
      return await fetchUnpaidMoneyTransactionsToRecipientFromPayerFromFirebase(
        recipientId,
        payerId
      ).then((docsnap) => {
        setTransactions(
          docsnap.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
    };
    fetchMoneyTransactionsFromFirebase();
  }, []);
  return (
    <div>
      <h2>
        {transactions[0]
          ? `In total ${transactions[0].data.recipientName} owes you`
          : ''}
      </h2>
      {/* {transactions.map((trans: MoneyTransactionWrapper) => {
        return <div key={trans.id}>{trans.data.amount}</div>;
      })} */}
      £{' '}
      {transactions.reduce(
        (total: number, value: MoneyTransactionWrapper) =>
          total + value.data.amount,
        0
      )}
    </div>
  );
};

export default MoneyOwed;
