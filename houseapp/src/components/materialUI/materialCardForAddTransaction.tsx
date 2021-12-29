import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { MoneyTransactionType } from '../../types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

export interface MaterialCardForAddTransactionsProps {
  //   moneyTransaction: MoneyTransactionType;
  userIds: { id: string; name: string }[];
  amount: number;
  selectedPayerId: string;
  title: string;
  description: string;
  recipientName: string;
  onPayerChanged: any;
  onAmountChanged: any;
  onTitleChanged: any;
  onDescriptionChanged: any;
  onSubmitPressed: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const MaterialCardForAddTransactions: React.FunctionComponent<MaterialCardForAddTransactionsProps> =
  ({
    userIds,
    amount,
    selectedPayerId,
    title,
    description,
    recipientName,
    onPayerChanged,
    onAmountChanged,
    onTitleChanged,
    onDescriptionChanged,
    onSubmitPressed,
  }) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const recipientNameField =
      userIds && selectedPayerId
        ? userIds.filter((userId) => userId.id === selectedPayerId)[0].name
        : '';

    const calculateFromName = () => {
      return userIds && selectedPayerId
        ? userIds.filter((userId) => userId.id === selectedPayerId)[0].name
        : '';
    };

    console.log(recipientNameField);

    return (
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <form className={classes.root} noValidate autoComplete="off">
            {/* <TextField
              id="standard-basic"
              label="Standard"
              value={recipientName}
            /> */}
            {/* <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            /> */}

            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              To: {recipientName}
            </Typography>

            <Typography variant="h5" component="h2">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">From:</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  renderValue={() => calculateFromName()}
                  onChange={(newPayer) => {
                    console.log(newPayer);
                    onPayerChanged(newPayer);
                  }}
                >
                  {userIds.map((userId) => (
                    <MenuItem key={userId.id} value={userId.id}>
                      {userId.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              <TextField
                id="standard-basic"
                label="Amount (£)"
                value={amount}
                onChange={(e) => onAmountChanged(e.target.value)}
              />
            </Typography>
            <Typography variant="body2" component="p">
              <TextField
                id="standard-basic"
                label="Title"
                value={title}
                onChange={(e) => onTitleChanged(e.target.value)}
              />
            </Typography>
            <Typography>
              <TextField
                id="standard-basic"
                label="Description"
                value={description}
                onChange={(e) => onDescriptionChanged(e.target.value)}
              />
            </Typography>
          </form>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            style={{ margin: 'auto' }}
            onClick={(e) => onSubmitPressed(e)}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  };

export default MaterialCardForAddTransactions;
