import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Layout from '../Layout';
import NewSection from '..//NewSection'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

import styles from './recipe.module.css'

export default () => {

    const [mealObj, setMealObj] = useState({})
    const [ingredients, setIngredients] = useState([])

    useEffect(()=>{
        const getIngredients = (obj) => {
            let ing = [],
            meas = [],
            finalIng=[];
            for (let i=1; i<21; i++) {
                if (obj[`strMeasure${i}`] == undefined) {i++}
                else {
                    meas.push(obj[`strMeasure${i}`].trim())
                }
                ing.push(obj[`strIngredient${i}`])
            }
            const newing = ing.filter((el) => el)
            newing.forEach((el, i) => {
                finalIng.push((`${meas[i]} ${el}`))
            })
            return finalIng;
        }
        
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res => res.json())
            .then(data => {
                const [meal] = data.meals
                setMealObj(meal)
                setIngredients(getIngredients(meal))

            })
            .catch(err => console.log(err))
        
    }, [])

    
    let { id } = useParams();
    return ( 
        <Layout>
            <NewSection title={`The Recipe for ${mealObj.strMeal}`}
                containerClass='my-4' 
                subtitle='Let us tell you the recipe for your choice'>
                <Container className='d-flex flex-column'>
                    <Row>
                        <Col md={6}>
                            {/* <Image src={mealObj.strMealThumb} className={styles.mainImage} /> */}
                            <Card bg='light' className='card-cat'>
                    <Card.Img variant='top' src={mealObj.strMealThumb} className='p-3 rounded' alt='meal recipe' />
                </Card>
                        </Col>
                        <Col md={6} className='mt-4 mt-md-0 d-flex flex-column justify-content-around'>
                            <div>
                                <strong>Area: </strong> <span style={{fontWeight:"300"}}>{mealObj.strArea}</span>
                                <strong className='ml-5'>Category: </strong> <span style={{fontWeight:"300"}}>{mealObj.strCategory}</span>
                            </div>
                            
                            <div><strong>Ingredients: </strong><span style={{fontWeight:"300"}}>{ingredients.join(', ')}</span></div>
                            <div> <hr />
                                <strong>Instructions: </strong>
                                <p className={styles.instructions}>{mealObj.strInstructions}</p>
                            </div>
                            
                        </Col>
                    </Row>

               
                    
                 
                </Container>
                    
            </NewSection>
      </Layout>
    )
}