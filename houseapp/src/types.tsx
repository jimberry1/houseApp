import { StringifyOptions } from 'querystring';

export type MoneyTransactionType = {
  amount: number;
  recipientId: string;
  recipientName: string;
  payerId: string;
  payerName: string;
  title: string;
  description: string;
  timestamp: any;
  isPaid: boolean;
};

export type RecordableEvent = {
  title: string;
  description: string;
  date: any;
  amount: number;
  payee1Id: string;
  payee1Amount: number;
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  photoURL: string;
  email: string;
};

export type EggRecordType = {
  userId: string;
  username: string;
  quantity: number;
  timestamp: any;
};
