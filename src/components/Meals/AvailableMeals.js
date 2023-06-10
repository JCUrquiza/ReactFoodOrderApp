import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://react-http-81b99-default-rtdb.firebaseio.com/meals.json');
            const responseData = await response.json();
            // Convertir objeto a array:
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }
            
            setMeals(loadedMeals);
        };

        fetchMeals();
    }, []);
    


    return (
        <section className={ classes.meals }>
            <Card>
                <ul>
                    {
                        meals.map((meal) => (
                            <MealItem 
                                key={meal.id} 
                                id={meal.id}
                                name={meal.name} 
                                description={meal.description}
                                price={meal.price}
                            />
                        ))
                    }
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;

