import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios';

import Category from './Category';

import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'

export default () => {
    const [categoryList, setCategoryList] = useState([]);

    const [catSelected, setCatSelected] = useState('Beef')
    const [catData, setCatData] = useState([])
    const [randMeal, setRandMeal] = useState({})

    const [showModal, setShowModal] = useState(false);

    // const [mealData, setMealData] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

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
        // if (catSelected.length > 0) {
        //     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catSelected}`)
        // .then(res => 
        //     res.json()
        // )
        // .then(data => {
        //     const rand = Math.floor(Math.random() * data.meals.length)
        //     setCatData(data.meals)
        //     setRandMeal(data.meals[rand])
        //     setIsLoading(false)
        //     })
        // .catch(err => console.log(err))
        // }

        const getMealData = async () => {
            try {
                const data = await axios
                .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catSelected}`)
                .then(res => {
                    const rand = Math.floor(Math.random() * res.data.meals.length)
                    setCatData(res.data.meals)
                    setRandMeal(res.data.meals[rand]);
                })
            } catch (e) {
                console.log(e)
            }
        };    

        getMealData()
    }, [catSelected])

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
        

    const getRandomMeal = () => {
        
        const rand = Math.floor(Math.random() * catData.length)
        setRandMeal(catData[rand]);
    }

    const callCatSet = (name) => {
        setRandMeal({})
        setCatSelected(name)
        getRandomMeal()
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
                    <span>{randMeal.strMeal}</span>
                    <Image src={randMeal.strMealThumb} />
                        <div className='d-flex justify-content-around mt-2'>
                            <Link to={`/recipe/${randMeal.idMeal}`}><Button variant='success'>Check Recipe</Button></Link>
                            <Button variant='danger' onClick={() => getRandomMeal()}>Suggest again</Button>
                        </div>
                </Modal.Body>
                 
               
            </Modal>
        </>
        )
}