import { createContext, useContext ,useEffect,useState} from "react";
import axios from 'axios';
const AppContext = createContext();

const getFromLocalStorage =()=>{
    let initial = localStorage.getItem('items');
    if(initial){
        initial = JSON.parse(localStorage.getItem('items'))
    }else{
        initial = [];
    }
    return initial;
}

const AppProvider = ({children}) =>{
    const [loading,setLoading] = useState(false);
    const [itemList,setItemList] = useState([]);
    const [isError,setIsError] = useState(false);
    
    const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const fetchItems = async(url) =>{
        setLoading(true);
        try{
            const {data} = await axios(url);
            if(data.meals){
                setItemList(data.meals);
            }else{
                setItemList([]);
            }
        }catch(error){
            setIsError(true)
            console.log(error);
        }
        setLoading(false);
    }

    const saveItems = (itemLists)=>{
        localStorage.setItem('items',JSON.stringify(itemLists))
    }

    const loadMore =()=>{

        const items = getFromLocalStorage()
        setItemList([...itemList,...items])
        console.log(itemList)
    }


    useEffect(()=>{
        fetchItems(allMealsUrl);
        setIsError(false)
    },[])

    useEffect(()=>{
        saveItems(itemList)
    },[itemList])


    return <AppContext.Provider value={{itemList,loading,loadMore,isError}}> 
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext,AppProvider};

