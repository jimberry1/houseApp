import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export interface MaterialPrimaryButtonProps {
  buttonText: string;
  clicked: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

const MaterialPrimaryButton: React.FunctionComponent<MaterialPrimaryButtonProps> =
  ({ buttonText, clicked }) => {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={clicked}>
          {buttonText}
        </Button>
      </div>
    );
  };

export default MaterialPrimaryButton;
