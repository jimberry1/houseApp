import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export interface MaterialCardProps {
  header: string;
  amount: number;
  clicked: any;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
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
});

const MaterialCard: React.FunctionComponent<MaterialCardProps> = ({
  header,
  amount,
  clicked,
}) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {header}
        </Typography>
        <Typography variant="h5" component="h2">
          £ {amount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          style={{ margin: 'auto' }}
          onClick={() => {
            clicked();
          }}
        >
          See transactions
        </Button>
      </CardActions>
    </Card>
  );
};

export default MaterialCard;
