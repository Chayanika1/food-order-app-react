import { useState,useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals(){
    const[loadedMeals,setLoadedMeals] = useState([])
    useEffect(()=>{
        async function fetchMeals(){
            
            try{
                const response = await fetch('http://localhost:3000/meals');
            if(!response.ok){
                throw new Error('something went wrong')
            }
            const resData = await response.json();
            setLoadedMeals(resData)
    
            }catch(error){
    
            }
            
        }
        fetchMeals()
    },[])
    
    return <ul id='meals'>
        {
            loadedMeals.map((meal=><MealItem key={meal.id} meal={meal}/>))
        }

    </ul>
}