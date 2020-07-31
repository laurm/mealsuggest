import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'


export default (props) => {
    return (
            <>
            <Navbar />
                {props.children}
            <Footer />
            </>
    )
}