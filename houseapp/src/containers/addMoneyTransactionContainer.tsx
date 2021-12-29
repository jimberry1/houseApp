import { useState } from 'react';
import MaterialCardForAddTransactions from '../components/materialUI/materialCardForAddTransaction';
import db from '../firebase';
import { useStateValue } from '../store/stateProvider';
import { MoneyTransactionType } from '../types';
import Firebase from 'firebase';
import { MONEY_COLLECTION } from '../config/firebaseConfig';

export interface AddMoneyTransactionContainerProps {
  userIds: { id: string; name: string }[];
  onMoneySubmittedSuccessfully: any;
}

const AddMoneyTransactionContainer: React.SFC<AddMoneyTransactionContainerProps> =
  ({ userIds, onMoneySubmittedSuccessfully }) => {
    const [{ user }, dispatch] = useStateValue();
    const [selectedPayerId, setSelectedPayer] = useState<string>('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    // const [moneyTransactionToAdd, setMoneyTransactionToAdd] =
    //   useState<MoneyTransactionType>({
    //     recipientName: user.firstName,
    //     recipientId: user.id,
    //     payerName: '',
    //     payerId: '',
    //     amount: 0,
    //     title: '',
    //     description: '',
    //     timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
    //     isPaid: false,
    //   });

    const handleSubmitNewMoneyTransaction = (e: any) => {
      e.preventDefault();
      if (selectedPayerId && description && amount > 0) {
        const moneyToAdd: MoneyTransactionType = {
          amount: amount,
          recipientId: user.id,
          recipientName: user.firstName,
          payerId: selectedPayerId,
          payerName: userIds.filter(
            (userId) => userId.id === selectedPayerId
          )[0].name,
          timestamp: Firebase.firestore.FieldValue.serverTimestamp(),
          title: title,
          description: description,
          isPaid: false,
        };
        db.collection(MONEY_COLLECTION)
          .add(moneyToAdd)
          .then(() => {
            console.log('success');
          })
          .then(() => onMoneySubmittedSuccessfully());
      }
      // setCounter((count) => count + 1);
    };

    return (
      <div
        style={{
          display: 'flex',
          margin: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          width: '75%',
        }}
      >
        <MaterialCardForAddTransactions
          //   moneyTransaction={moneyTransactionToAdd}
          userIds={userIds}
          selectedPayerId={selectedPayerId}
          amount={amount}
          title={title}
          description={description}
          recipientName={user.firstName}
          onPayerChanged={(whateverThisIs: any) =>
            setSelectedPayer(whateverThisIs.target.value)
          }
          onAmountChanged={(newVal: number) => setAmount(+newVal)}
          onTitleChanged={(newVal: string) => setTitle(newVal)}
          onDescriptionChanged={(newVal: string) => setDescription(newVal)}
          onSubmitPressed={(e: any) => handleSubmitNewMoneyTransaction(e)}
        />
      </div>
    );
  };

export default AddMoneyTransactionContainer;
