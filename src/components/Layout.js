import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'


export default (props) => {
    return (
            <>
            <Navbar />
                <div className='page-content'>{props.children}</div>
            <Footer />
            </>
    )
}