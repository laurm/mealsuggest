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
    const [catData, setCatData] = useState([])
    const [randMeal, setRandMeal] = useState({})

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => {
            setCategoryList(res.data.categories)
            })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        if (catSelected.length > 0) {
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catSelected}`)
        .then(res => 
            res.json()
        )
        .then(data => {
            const rand = Math.floor(Math.random() * data.meals.length)
            setCatData(data.meals)
            setRandMeal(data.meals[rand])
            })
        .catch(err => console.log(err))
        }
    }, [catSelected])

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
        

    const getRandomMeal = () => {
        const rand = Math.floor(Math.random() * catData.length)
        setRandMeal(catData[rand]);
    }

    const callCatSet = (name) => {
        setCatSelected(name)
        handleShowModal()
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
                        action={() => callCatSet(item.strCategory)}
                        />
                    </Col>
                ) 
            })}

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className='border-0'>
                <Modal.Title>Suggestion from {catSelected} category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.keys(randMeal).length > 0 ? (<>
                        <span>{randMeal.strMeal}</span>
                        <Image src={randMeal.strMealThumb} />
                        </>) : null }
                        <div className='d-flex justify-content-around mt-2'>
                            <PopoverBtn />
                            <Button variant='danger' onClick={() => getRandomMeal()}>Suggest again</Button>
                        </div>
                </Modal.Body>
            </Modal>
        </>
        )
}