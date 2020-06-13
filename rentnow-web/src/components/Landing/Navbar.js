import React from 'react'
import {AppBar, Toolbar, Typography,} from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';



function ElevationScroll(props) {
    const { children } = props;
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
        <AppBar color="secondary">
          <Toolbar>
            <Typography variant="h6">Rent Now</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    )
}

export default Navbar

