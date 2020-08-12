import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

import dinnerSVG from '../assets/dinner.svg';

import axios from 'axios';

export default () => {
    const [mealSuggest, setMealSuggest] = useState({});
    const [getSuggest, setGetSuggest] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [suggestID, setSuggestID] = useState('');
    

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => {
            const [meal] = res.data.meals;
            setMealSuggest(meal)
        })
        .catch(err => console.log(err)
        )
    }, [getSuggest]);


    const handleBtn = () => {
        handleShowModal()
        setGetSuggest(!getSuggest)
    }



    return (
        <section className='py-5'>
            <Container className='pt-3'>
            <Row>
                <Col md>
                <Image src={dinnerSVG} fluid />
                </Col>
                <Col md className='d-flex flex-column align-items-center justify-content-center mt-3 mt-md-0'>
                    <p className='heroText p-3 text-center'>You have no idea about your next meal? Let us suggest something for you!</p>
                    <Button variant='dark' size='lg' onClick={handleBtn}>Suggest</Button>
                </Col>
            </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className='border-0'>
                    <Modal.Title>We suggest..</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {mealSuggest.strMeal }
                    {mealSuggest.strCategory ? (<><br /><span>({mealSuggest.strCategory} recipe)</span></>) : null           
                } 
                        {/* <span>Area: </span>{mealSuggest.strArea} */}
                        <Image src={mealSuggest.strMealThumb} />
                        <div className='d-flex justify-content-around mt-2'>
                            <Link to={`/recipe/${mealSuggest.idMeal}`}><Button variant='success'>Check Recipe</Button></Link>
                            <Button variant='danger' onClick={() => {setGetSuggest(!getSuggest)}}>Suggest again</Button>
                        </div>
                </Modal.Body>
            </Modal>

        </section>
        
    )
}