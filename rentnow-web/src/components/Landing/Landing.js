import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero/Hero'
import Features from './Features/Features'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import About from './About/About';
import Footer from './Footer/Footer';
import FAQ from './FAQ/FAQ';
import ComplejosAdheridos from './Complejos/ComplejosAdheridos';

const theme = createMuiTheme({
    palette: { 
        primary:{
          main: "#FCC931",
        },
        secondary:{
          main: "#3F4652",
          dark: "rgba(33,33,33, 0.8)"
        }
      },
    typography: {
        fontFamily:"'Raleway', sans-serif",
        h2: {
          fontFamily: "'Raleway', sans-serif"
        },
        h3:{
          fontFamily: "'Raleway', sans-serif"
        },
        h4:{
          fontFamily: "'Raleway', sans-serif"
        },
        h5:{
          fontFamily: "'Raleway', sans-serif"
        },
        h6:{
          fontFamily: "'Raleway', sans-serif"
        },
    }
})

const Landing = () => {
    return (  
        <ThemeProvider theme={theme}>
        <Navbar />
        <Hero />
        <Features />
        <About />
        <ComplejosAdheridos />
        <FAQ />
        <Footer />  
    </ ThemeProvider>
    )
}

export default Landing