import { useContext, useState } from "react";
import Modal from 'react-modal';
import classes from './RegistrationForm.module.css';
import useLocalStorage3 from "../hooks/useLocalStorage3";
import { ContactContext } from "../hooks/contactContext";

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}
  
Modal.setAppElement("#root");

//Formulário para registro de novos contatos
const RegistrationForm = ({ isOpen, onRequestClose }: ModalProps) =>{

    // Definir o tipo do objeto formData
    /*
    interface FormData {
        name: string;
        email: string;
        phone: string;
    }*/

    //Estado 'formData' para armazenar dados do formulário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone:''
    });
  

    //useLocalStorage
    const { addContact } = useContext(ContactContext);

    // Definir o tipo do objeto de erros
    interface Errors {
        [key: string]: string; 
    }
    
    //Estado 'errors' para armazenar mensagens de erro
    const [errors, setErrors] = useState<Errors>({});
    
    //Estado 'submitted' para verificar se o formulário foi enviado com sucesso
    const [submitted, setSubmitted] = useState(false);

    //Função para considerar apenas números na entrada do telefone
    function justNumbers(input:string) {
        return input.replace(/[^0-9]/g,'');
    }

    //Função para validar dados do formulário
    const validate = () =>{

        //Objeto para armazenar erros
        let newErrors: Errors = {};

        //Validação do campo nome
        if(!formData.name) newErrors.name = 'Nome é obrigatório';
        
        //Validação do campo e-mail
        if(!formData.email){
            newErrors.email='Email é obrigatório';
        }else if(!/\S+@\S+\.\S+/.test(formData.email)){
            newErrors.email='Email inválido. Por favor, digite um e-mail com o padrão nome@dominio.com.'
        }

        //Validação do campo telefone
        if(!formData.phone){
            newErrors.phone='Telefone é obrigatório';
        }else if(justNumbers(formData.phone).length!==10 && justNumbers(formData.phone).length!==11){
            console.log(justNumbers(formData.phone).length);
            newErrors.phone='Telefone inválido. Por favor, digite um telefone com 10 ou 11 dígitos.'
        }

        return newErrors;
    };

    //Função para lidar com mudanças nos campos do formulário
    const handleChange = (event: any) => {
        // Atualiza o estado formData com o valor do campo modificado
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (event:any) => {
        // Previne o recarregamento da página
        event.preventDefault();

        // Chama a função validate para validar os dados do formulário
        const validationErrors = validate();

        // Verifica se não há erros de validação
        if (Object.keys(validationErrors).length === 0) {
            // Define submitted como verdadeiro se não houver erros
            setSubmitted(true);
            //Armazena no Local Storage
            addContact(formData);
            // Limpa os erros, caso existam
            setErrors({});
            // Limpa formulário
            setFormData({
                name: '',
                email: '',
                phone:''
            });
        } else {
            // Define os erros de validação no estado errors
            setErrors(validationErrors);
        }
    };

    //Função para limpar estados submitted, errors e formData ao fechar modal
    const handleClose = () => {

        // Reseta estados
            setSubmitted(false);
            setErrors({});
            setFormData({
                name: '',
                email: '',
                phone:''
            });
            onRequestClose();
    };


    return(
        <div>
            <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={classes.modal}
            >
                <div className={classes.addModal}>
                <h2>Cadastro de Novo Contato</h2>
                {/* Mensagem de sucesso no cadastro do contato */}
                {submitted ? <p className={classes.successMessage}>Contato adicionado com sucesso!</p> : 
                    <form>
                        <div>
                            <label>Nome: </label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                            {/* Mensagem de erro se houver erro no campo 'name' */}
                            {errors.name && <p className={classes.errorMessage}>{errors.name}</p>}
                        </div>
                        <div>
                            <label>E-mail: </label>
                            <input
                                type="text"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {/* Exibe a mensagem de erro se houver erro no campo 'email' */}
                            {errors.email && <p className={classes.errorMessage}>{errors.email}</p>}
                        </div>
                        <div>
                            <label>Telefone: </label>
                            <input
                                type="text"
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {/* Exibe a mensagem de erro se houver erro no campo 'email' */}
                            {errors.phone && <p className={classes.errorMessage}>{errors.phone}</p>}
                        </div>
                        {/* Botão para submeter o formulário */}
                        <button onClick={handleSubmit}>Cadastrar</button>
                    </form>}
                    <button onClick={handleClose}>Fechar</button>
                </div>
            </Modal>
        </div>
    );
}

export default RegistrationForm;