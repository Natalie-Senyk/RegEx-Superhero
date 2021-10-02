import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    color: '#41e4a0'
  },
}));

const PrimarySpinner: React.FC = () =>  {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.root} />
    </div>
  );
}

export default PrimarySpinner