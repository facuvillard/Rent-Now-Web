import React from 'react'
import {AppBar, Toolbar, Typography,} from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

function ElevationScroll(props) {
    const { children } = props;

    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  

const Navbar = (props) => {
    return (
        <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Rent Now</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    )
}

export default Navbar

