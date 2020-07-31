import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Category from './Category';

import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'

import PopoverBtn from '../PopoverBtn'

export default () => {
const [categoryList, setCategoryList] = useState([]);

const [catSelected, setCatSelected] = useState('Beef')
const [catData, setCatData] = useState({})
const [suggestClick, setSuggestClick] = useState(false)

const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
     .then(res => {
        setCategoryList(res.data.categories)
        })
     .catch( err => {
         console.log(err)
     })
}, [])

useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catSelected}`)
    .then(res => 
        res.json()
    )
    .then(data => {
        const rand = Math.floor(Math.random() * data.meals.length)
        setCatData(data.meals[rand])})
    .catch(err => console.log(err))
}, [suggestClick])


const handleClick = (name) => {
    setSuggestClick(!suggestClick)
    setCatSelected(name);
    handleShowModal()
}

const handleBtn = () => {
    handleShowModal()
    setSuggestClick(!suggestClick)
}

    return (
       <>   
            {categoryList.map((item, index) => {
                return (
                    <Col sm={6} lg={4} className='my-4 px-3 px-sm-2' key={item.idCategory}>
                        <Category 
                        key={item.idCategory}
                        name={item.strCategory} 
                        imageSrc={item.strCategoryThumb}
                        description={item.strCategoryDescription}
                        action1={() => handleClick(item.strCategory)}
                        action2={handleBtn}
                        />
                    </Col>
                ) 
            })}

           <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className='border-0'>
                <Modal.Title>Suggestion from {catSelected} category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     {Object.keys(catData).length > 0 ? (<>
                         <span>{catData.strMeal}</span>
                         <Image src={catData.strMealThumb} />
                         </>) : null }
                        <div className='d-flex justify-content-around mt-2'>
                            <PopoverBtn />
                            <Button variant='danger' onClick={()=> setSuggestClick(!suggestClick)}>Suggest again</Button>
                        </div>
                </Modal.Body>
            </Modal>
        </>
    )
}