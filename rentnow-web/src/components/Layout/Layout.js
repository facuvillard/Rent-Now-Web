import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import {makeStyles} from '@material-ui/core/styles'
import {Container} from '@material-ui/core'

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
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Container maxWidth='lg' >
                {props.children}
              </Container>
            </main>
        </div>
    )
}
