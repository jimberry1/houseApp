import { EggRecordType, MoneyTransactionType } from '../types';
import db from '../firebase';
import {
  EGG_TRACKER_COLLECTION,
  MONEY_COLLECTION,
  MONEY_IS_PAID_FIELD,
  MONEY_PAYEE_ID_FIELD,
  MONEY_PAYER_ID_FIELD,
  USERS_COLLECTION,
} from '../config/firebaseConfig';

export const addMoneyEvent = (money: MoneyTransactionType) => {
  // db.collection()
};

export const fetchUnpaidMoneyTransactionsToRecipientFromPayerFromFirebase = (
  recipientId: string,
  payerId: string
) => {
  return db
    .collection(MONEY_COLLECTION)
    .where(MONEY_PAYEE_ID_FIELD, '==', recipientId)
    .where(MONEY_PAYER_ID_FIELD, '==', payerId)
    .where(MONEY_IS_PAID_FIELD, '==', false)
    .get();
};

export const fetchMoneyTransactionsInvolvingRecipientFromFirebase = () => {};

export const fetchAllMoneyTransactionsFromFirebaseSnapshot = (
  callback: any
) => {
  //   return db
  //     .collection(MONEY_COLLECTION)
  //     .orderBy('timestamp', 'desc')
  //     .get()
  //     .then((docSnapshot) => {
  //       console.log(docSnapshot);
  //       callback(
  //         docSnapshot.docs.map((moneyTransaction) => ({
  //           id: moneyTransaction.id,
  //           data: moneyTransaction.data(),
  //         }))
  //       );
  //     });

  return db
    .collection(MONEY_COLLECTION)
    .orderBy('timestamp', 'desc')
    .onSnapshot((docSnapshot) => {
      console.log(docSnapshot);
      callback(
        docSnapshot.docs.map((moneyTransaction) => ({
          id: moneyTransaction.id,
          data: moneyTransaction.data(),
        }))
      );
    });
};

export const fetchUsersIdsFromFirebase = () => {
  return db.collection(USERS_COLLECTION).get();
};

export const updateMoneyTransactionAsPaid = (moneyTransactionId: string) => {
  return db
    .collection(MONEY_COLLECTION)
    .doc(moneyTransactionId)
    .update({ isPaid: true });
};

export const submitEggRequest = (
  eggRecord: EggRecordType,
  completionHandler: any
) => {
  return db
    .collection(EGG_TRACKER_COLLECTION)
    .add(eggRecord)
    .then(() => completionHandler());
};
