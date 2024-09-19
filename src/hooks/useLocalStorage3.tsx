import { useState, useEffect } from "react";

const useLocalStorage3 = (key: string) => {

    //Estado para armazenar item no localStorage
    interface Item {
        [key: string]: any; 
    }
    const [item, setItem] = useState<Item>({value:''});

    //Estado para armazenar array de itens no localStorage
    const [itemsList, setItemsList] = useState<Item[]>([]);

    // Carregar dados do localStorage ao iniciar
    useEffect(() => {
        try {
            const storedList = window.localStorage.getItem(key);
            const parsedList = storedList ? JSON.parse(storedList) : [];
            if (Array.isArray(parsedList)) {
                setItemsList(parsedList); // Somente definir se for array
            } else {
                setItemsList([]); // Definir como array vazio caso não seja array
            }
        } catch (error) {
            console.log(error);
            setItemsList([]); 
        }
    },[]);


    //Atualizar o localStorage sempre que o valor armazenado (storedItem) ou a chave (key) mudarem
    useEffect(() => {
        try {
            window.localStorage.setItem('itemsList', JSON.stringify(itemsList));
        } catch (error) {
            console.log(error);
        }
        return () =>{

        };
    }, [itemsList]);
    
    //Obter ID para item adicionado
    const getNextId = (): string =>{
        const currentId = window.localStorage.getItem('itemIdCounter');
        const nextId = currentId ? parseInt(currentId, 10) + 1 : 1;
        window.localStorage.setItem('itemIdCounter', nextId.toString());
        console.log(nextId);
        return JSON.stringify(nextId);

    }
    //Adicionar item ao localStorage
    const addItem = (item: any) => {
        try{
            const id = getNextId();
            if(item!==''){
                const newItem : Item = {id, value:item};
                setItemsList([...itemsList, newItem]);
                setItem({value:''});
                
            }
        }catch(error){
            console.log(error);
        };
    };
    
    //Obter um item no local storage
    const getItem = (id: string) => {
        try{
            const item = window.localStorage.getItem(id);
            if(item){
                return JSON.parse(item);
            };
        }catch(error){
            console.log(error);
        }
    }

    //Obter todos os itens do localStorage
    const loadItems = () =>{
        const items = {...localStorage};
        return items;
    }

    //Remover um item no local storage
    const removeItem = (id:number) =>{
        try{
            const newList = itemsList.filter(item => item.id !== id); //Nova lista removendo item pelo ID
            setItemsList(newList); //Atualiza estado
            console.log("Item " + id + "removido com sucesso.");
            window.localStorage.setItem('itemsList', JSON.stringify(newList)); //Atualiza localStorage
        }catch(error){
            console.log(error);
        }
    }

    return {itemsList, setItemsList, addItem, getItem, loadItems, removeItem};

}

export default useLocalStorage3;