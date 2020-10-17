import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box';
import BiddingCard from '../../components/cards/BiddingCard'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from '../../store/actions/actionsItem'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex', 
    flexDirection: 'column',
    width: '70%' ,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: {
      width: '90%' ,
    },
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const items = useSelector(state => state.reducerItem.items)

  return (
    <Box>
      <Box className={classes.container}>
        {items && items.map(data => {
          return (
            <BiddingCard data={data}/>                                
          )
        })}
      </Box>
    </Box>
  )
}
