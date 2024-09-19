import { useState, useEffect, useContext } from "react";
import useLocalStorage3 from "../hooks/useLocalStorage3";
import RegistrationForm2 from "./RegistrationForm2";
import { ContactContext, MyProvider } from "../hooks/contactContext";

const ContactList2 = () =>{

    // Acesso ao estado useLocalStorage
    const { contacts, removeContact, loadContacts } = useContext(ContactContext);

    const [updateData, setUpdateData] = useState(false);

    useEffect(()=>{
        console.log(loadContacts());
    },[updateData])

    //Estado local para forçar re-renderização
    // const [contacts, setContacts] = useState<any[]>([]);

    // useEffect para atualizar a lista de contatos sempre que itemsList mudar
    // useEffect(() => {
    //     setContacts(itemsList);
    // }, [itemsList]);

    //Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    function handleOpenModal() {
      setIsModalOpen(true);
      setUpdateData(false);
      console.log("Abriu" + updateData);
      console.log(contacts);
    }
    function handleCloseModal() {
      setIsModalOpen(false);
      setUpdateData(true);
      console.log("fechou" + updateData);
    }


    return (
        <MyProvider>
        <h1>Lista de Contatos </h1>
         <div>
            <div>
                <button onClick={handleOpenModal}>Adicionar Novo Contato</button>
                <RegistrationForm2 isOpen={isModalOpen} onRequestClose={handleCloseModal}/>
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
                        {contacts && contacts.length > 0 ? (
                            contacts.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.value.name}</td>
                                    <td>{item.value.email}</td>
                                    <td>{item.value.phone}</td>
                                    <td><button>Editar</button> <button onClick={()=>removeContact(item.id)}>Remover</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>Nenhum contato encontrado</td>
                            </tr>
                        )}
                </tbody>
                <button onClick={loadContacts()}>Atualiar</button>
            </table>


          </div>
          </MyProvider>

      );

}

export default ContactList2;