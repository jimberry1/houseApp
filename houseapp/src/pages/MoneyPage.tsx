import { useState, useEffect } from 'react';
import {
  fetchAllMoneyTransactionsFromFirebaseSnapshot,
  fetchUsersIdsFromFirebase,
  updateMoneyTransactionAsPaid,
} from '../services/firebaseRequests';
import { useStateValue } from '../store/stateProvider';
import { MoneyTransactionType } from '../types';
import { filterAndReduceMoneyAmounts } from '../utility/utilityFunctions';
import MaterialTable from '../components/materialUI/materialTable';
import MaterialCard from '../components/materialUI/materialCard';
import styled from 'styled-components';
import MaterialPrimaryButton from '../components/materialUI/materialButton';
import AddMoneyTransactionContainer from '../containers/addMoneyTransactionContainer';

export interface MoneyPageProps {}

const StyledContainerForOweBoxes = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  //   width: 80%;
  padding: 5%;
  flex-wrap: wrap;
`;

function groupBy(list: any, keyGetter: any) {
  const map = new Map();
  list.forEach((item: any) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

const MoneyPage: React.SFC<MoneyPageProps> = () => {
  const [{ idToken }, dispatch] = useStateValue();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showOnlyPaidTransactions, setShowOnlyPaidTransactions] =
    useState(false);
  const [highlightSelf, setHighlightSelf] = useState(false);
  const [tableFilter, setTableFilter] = useState('');
  const [moneyTransactions, setMoneyTransactions] = useState<
    { id: string; data: MoneyTransactionType }[]
  >([]);
  const [userIds, setUserIds] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetchAllMoneyTransactionsFromFirebaseSnapshot(setMoneyTransactions);
    // This should get me all transactions that I, the user, am involved in

    // For each different user that I am either recieving money from, so Luke or Will, group them together -- into what?
    // For now let's make sure just to get every single transaction that occurred, then I can filter out afterwards.
  }, [idToken]);

  useEffect(() => {
    fetchUsersIdsFromFirebase().then((usersSnapshot) => {
      setUserIds(
        usersSnapshot.docs
          .filter((user) => user.id !== idToken)
          .map((userSnapshot) => ({
            id: userSnapshot.id,
            name: userSnapshot.data().firstName,
          }))
      );
    });
  }, [idToken]);

  const filterMoneyTransactionsById = (userId: string) => {
    setMoneyTransactions(
      moneyTransactions.filter(
        (moneyTransaction) =>
          moneyTransaction.data.recipientId === userId ||
          moneyTransaction.data.payerId === userId
      )
    );
  };

  const [counter, setCounter] = useState(0);

  const handleMoneyTransactionPayment = (moneyTransactionId: string) => {
    updateMoneyTransactionAsPaid(moneyTransactionId);
  };

  {
    moneyTransactions[0] &&
      userIds[0] &&
      userIds.map((userId) => {
        const moneyAmountOwed = moneyTransactions
          .filter(
            (trans) =>
              (trans.data.payerId === userId.id &&
                trans.data.recipientId === idToken) ||
              (trans.data.payerId === idToken &&
                trans.data.recipientId === userId.id)
          )
          .map((filteredTrans: { id: string; data: MoneyTransactionType }) =>
            filteredTrans.data.recipientId === idToken
              ? filteredTrans.data.amount
              : -filteredTrans.data.amount
          )
          .reduce((accumulator, money) => money + accumulator, 0);

        if (moneyAmountOwed === 0) {
          return <div key={userId.id}>`You owe ${userId.name} £0.00`</div>;
        }
        return (
          <div key={userId.id}>
            {moneyAmountOwed > 0
              ? `${userId.name} owes you £ ${moneyAmountOwed}`
              : `You owe ${userId.name} £ ${moneyAmountOwed * -1}`}
          </div>
        );
      });
  }

  return (
    <div>
      <div style={{ paddingTop: '5%' }}>
        <h2 style={{ fontSize: '45px' }}>It's money time</h2>
        <StyledContainerForOweBoxes>
          {moneyTransactions[0] &&
            userIds[0] &&
            userIds.map((userId) => {
              const moneyAmountOwed = filterAndReduceMoneyAmounts(
                moneyTransactions,
                idToken,
                userId.id
              );

              return (
                <div key={userId.id}>
                  <MaterialCard
                    header={
                      moneyAmountOwed > 0
                        ? `${userId.name} owes you`
                        : `You owe ${userId.name}`
                    }
                    amount={Math.abs(moneyAmountOwed)}
                    clicked={() => {
                      setTableFilter(userId.id);
                      //   setHighlightSelf(true);
                    }}
                  />
                </div>
              );
            })}
        </StyledContainerForOweBoxes>
        <div>
          <MaterialPrimaryButton
            buttonText={showAddTransaction ? 'Hide' : 'Add transaction'}
            clicked={() => setShowAddTransaction((curVal) => !curVal)}
          />
          {showAddTransaction && (
            <AddMoneyTransactionContainer
              userIds={userIds}
              onMoneySubmittedSuccessfully={() => setShowAddTransaction(false)}
            />
          )}
        </div>
        <StyledContainerForOweBoxes>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '300px',
            }}
          >
            <div style={{ borderBottom: '1px solid white' }}>
              Control buttons
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 10,
              }}
            >
              <MaterialPrimaryButton
                buttonText="Reset"
                clicked={() => {
                  setHighlightSelf(false);
                  setTableFilter('');
                }}
              />
              <MaterialPrimaryButton
                buttonText={
                  highlightSelf ? 'Remove highlight' : 'Highlight self'
                }
                clicked={() => setHighlightSelf((curVal) => !curVal)}
              />
              <MaterialPrimaryButton
                buttonText={
                  showOnlyPaidTransactions ? 'Show all' : 'Filter unpaid'
                }
                clicked={() => setShowOnlyPaidTransactions((curVal) => !curVal)}
              />
            </div>
          </div>

          <MaterialTable
            tableData={moneyTransactions}
            highlightSelf={highlightSelf}
            userId={idToken}
            filterId={tableFilter}
            showOnlyPaidTransactions={showOnlyPaidTransactions}
            payClicked={(moneyTransactionId: string) =>
              handleMoneyTransactionPayment(moneyTransactionId)
            }
          />
        </StyledContainerForOweBoxes>
      </div>
    </div>
  );
};

export default MoneyPage;
