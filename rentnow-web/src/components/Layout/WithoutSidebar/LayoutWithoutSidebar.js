import React from 'react'
import Navbar from '../Navbar'
import {makeStyles} from '@material-ui/core/styles'
import {Container} from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(0),
      },
      backdrop: {
        zIndex: theme.zIndex.drawer - 1,
        color: '#fff',
      },
}))


const LayoutWithoutSidebar = (props) => {
    const classes = useStyles()
    return (
        <div>
            <Navbar/>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Container maxWidth='xl' >
                {props.children}
              </Container>
            </main>
        </div>
    )
  }

  export default LayoutWithoutSidebar