import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { MoneyTransactionType } from '../../types';
import { TiTick } from 'react-icons/ti';
import MaterialPrimaryButton from './materialButton';

export interface MaterialTableProps {
  tableData: { id: string; data: MoneyTransactionType }[];
  highlightSelf: boolean;
  userId: string;
  filterId: string;
  showOnlyPaidTransactions: boolean;
  payClicked: (moneyTransactionId: string) => void;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const determineBackgroundColor = (
  row: { id: string; data: MoneyTransactionType },
  highlightSelf: boolean,
  userId: string
) => {
  if (!highlightSelf) {
    return '';
  } else if (row.data.recipientId === userId) {
    return 'teal';
  } else if (row.data.payerId === userId) {
    return '#ffcbad';
  }
};

const MaterialTable: React.FunctionComponent<MaterialTableProps> = ({
  tableData,
  highlightSelf,
  userId,
  filterId,
  payClicked,
  showOnlyPaidTransactions,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Amount (£)</TableCell>
            <TableCell align="right">Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .filter((tableRow) =>
              filterId
                ? (tableRow.data.recipientId === filterId &&
                    tableRow.data.payerId === userId) ||
                  (tableRow.data.payerId === filterId &&
                    tableRow.data.recipientId === userId)
                : true
            )
            .filter((tableRow) =>
              showOnlyPaidTransactions ? !tableRow.data.isPaid : true
            )
            .map((row) => {
              const date = new Date(0);
              if (row.data.timestamp) {
                date.setUTCSeconds(row.data.timestamp.seconds);
              }
              return (
                <TableRow
                  key={row.id}
                  style={{
                    backgroundColor: determineBackgroundColor(
                      row,
                      highlightSelf,
                      userId
                    ),
                  }}
                >
                  <TableCell component="th" scope="row">
                    {date ? date.toDateString() : ''}
                    {/* {Date.parse(row.data.timestamp.seconds)} */}
                  </TableCell>
                  <TableCell align="right">{row.data.recipientName}</TableCell>
                  <TableCell align="right">{row.data.payerName}</TableCell>
                  <TableCell align="right">{row.data.title}</TableCell>
                  <TableCell align="right">{row.data.description}</TableCell>
                  <TableCell align="right">{row.data.amount}</TableCell>
                  <TableCell align="right">
                    {row.data.isPaid ? (
                      <TiTick size={30} style={{ paddingRight: 20 }} />
                    ) : row.data.recipientId === userId ? (
                      <div style={{ paddingRight: 35 }}>-</div>
                    ) : (
                      <MaterialPrimaryButton
                        buttonText="Pay"
                        clicked={() => payClicked(row.id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
