import { useState, useEffect } from "react";


const useLocalStorage2 = (key: string, initial: unknown) => {
    //Estado storedItem para armazenar dados no localStorage - iniciar com o valor do localStorage (se houver)
    const [storedItem, setStoredItem] = useState(()=>{
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initial;
        } catch (error) {
            console.log(error);
            return initial;
        }
    });

    //Atualizar o localStorage sempre que o valor armazenado (storedItem) ou a chave (key) mudamem
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedItem));
        } catch (error) {
            console.log(error);
        }
    }, [key, storedItem]);


    //Definir item no local storage
    const setItem = (value: unknown) => {
        try{
            window.localStorage.setItem(key, JSON.stringify(value));
        }catch(error){
            console.log(error);
        };
    };

    
    //Obter um item no local storage
    const getItem = () => {
        try{
            const item = window.localStorage.getItem(key);
            if(item){
                return JSON.parse(item);
            };
        }catch(error){
            console.log(error);
        }
    }

    //Remover um item no local storage
    const removeItem = () =>{
        try{
            window.localStorage.removeItem(key);
            setStoredItem(initial);
        }catch(error){
            console.log(error);
        }
    }

    return {storedItem, setItem, getItem, removeItem};

}

export default useLocalStorage2;