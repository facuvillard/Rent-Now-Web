import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
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
        padding: theme.spacing(8),
      },
      backdrop: {
        zIndex: theme.zIndex.drawer - 1,
        color: '#fff',
      },
}))

export const Layout = (props) => {
    const classes = useStyles()
    const [isSBOpen, setIsSBOpen] = useState(false);

    const sideBarOpenHandler = () => {
      setIsSBOpen(oldIsOpen => !oldIsOpen)
    }
    
   
  
    return (
        <div>
            <Navbar sideBarOpenHandler={sideBarOpenHandler} isSideBarOpen={isSBOpen} />
            <Sidebar sideBarOpenHandler={sideBarOpenHandler} isSideBarOpen={isSBOpen} />
            <Backdrop className={classes.backdrop} open={isSBOpen} onClick={sideBarOpenHandler} />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Container maxWidth='lg' >
                {props.children}
              </Container>
            </main>
        </div>
    )
}
