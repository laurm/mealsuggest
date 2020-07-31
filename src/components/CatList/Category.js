import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default (props) => {
    // const [catSelected, setCatSelected] = useState('posts')
    // const [catData, setCatData] = useState([])



    // useEffect(() => {
    //     // fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catSelected}`)
    //     fetch(`https://jsonplaceholder.typicode.com/${catSelected}`)
    //     .then(res => 
    //         res.json()
    //     )
    //     .then(data => setCatData(data))
    //     .catch(err => console.log(err))
    // }, [catSelected])
    
    // const handleClick = (name) => {
    //     setCatSelected(name);
    //     const date = Math.floor(Math.random() * catData.length)
    //     console.log(catData)
    // }

    return (
        <Card bg='light' className='card-cat'>
            <Card.Img variant='top' src={props.imageSrc} className='p-3 rounded' alt='meal' />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className='multi-line-truncate'>
                    {props.description}
                </Card.Text>
                <Button variant='outline-dark' onClick={props.action1}>Suggest</Button>
            </Card.Body>
        </Card>
    )
}