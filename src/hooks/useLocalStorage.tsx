


/*We have Unspoken rule in some organizations: a custom hook should use another hook.
Anything else might violate the React Rules of Hooks. These rules ensure that hooks are called in the same order on every render and
that they are not conditionally called. Violating these rules can lead to unexpected behavior in your components.*/

const useLocalStorage = (key: string) => {
    
    //Definir item no local storage
    const setItem = (value: unknown) => {
        try{
            window.localStorage.setItem(key, JSON.stringify(value));
        }catch(error){
            console.log(error);
        };
    };

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

    const removeItem = () =>{
        try{
            window.localStorage.removeItem(key);
        }catch(error){
            console.log(error);
        }
    }

    return {setItem, getItem, removeItem};

}

export default useLocalStorage;