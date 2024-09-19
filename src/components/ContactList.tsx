import { useState, useEffect } from "react";
import useLocalStorage3 from "../hooks/useLocalStorage3";
import RegistrationForm from "./RegistrationForm";

const ContactList = () =>{

    // Acesso ao estado useLocalStorage
    const { itemsList, setItemsList, getItem, loadItems, removeItem } = useLocalStorage3('itemsList');

    // const loadContacts = () => {
    //     return loadItems();
    // }

    //Estado local para forçar re-renderização
    // const [contacts, setContacts] = useState<any[]>([]);

    // useEffect para atualizar a lista de contatos sempre que itemsList mudar
    // useEffect(() => {
    //     setContacts(itemsList);
    // }, [itemsList]);

    //Estado para atualizar tabela
    const [reload,setReload]=useState(false);
    //Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    function handleOpenModal() {
      setIsModalOpen(true);
    }
    function handleCloseModal() {
      setIsModalOpen(false);
      setReload(!reload);
    }

    useEffect(() => {
        loadItems();
        console.log("atualizando");
    }, [reload]);

    return (
        <div>
             <h1>Lista de Contatos </h1>
         <div>
            <div>
                <button onClick={handleOpenModal}>Adicionar Novo Contato</button>
                <RegistrationForm isOpen={isModalOpen} onRequestClose={handleCloseModal}/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                        {itemsList && itemsList.length > 0 ? (
                            itemsList.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.value.name}</td>
                                    <td>{item.value.email}</td>
                                    <td>{item.value.phone}</td>
                                    <td><button>Editar</button> <button onClick={()=>removeItem(item.id)}>Remover</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>Nenhum contato encontrado</td>
                            </tr>
                        )}
                </tbody>
            </table>
            {/* <button onClick={loadContacts}>Atualizar</button> */}


          </div>
        </div>
      );

}

export default ContactList;