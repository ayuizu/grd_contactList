import { useState, useEffect, createContext } from "react"
import useLocalStorage3 from "./useLocalStorage3";

export const ContactContext = createContext<any>(null);

export const MyProvider = (props:any) => {

    const {  itemsList, setItemsList, getItem, loadItems, addItem, removeItem } = useLocalStorage3('itemList');

    const [contacts, setContacts] = useState<any[]>(itemsList);

    useEffect(() => {
            setContacts(itemsList);
        }, [contacts]);

    const addContact = (contacts: any) =>{
        addItem(contacts);
    }

    const removeContact = (index: number) =>{
        removeItem(index);
    }

    const getContact =  (index: string) =>{
        getItem(index);
    }

    const loadContacts = () =>{
        loadItems();
    }
    
    return (
        <ContactContext.Provider value={{ contacts, addContact, removeContact, getContact, loadContacts }}>
            {props.children}
        </ContactContext.Provider>
    )
}