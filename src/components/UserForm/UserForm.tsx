import { useState } from 'react';
import './UserForm.css';

const CREATE_USER_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/user`;

const UserForm: React.FC = () => {

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [isCreatedSuccessfully, setCreatedSuccessfully] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, token })
    }
    fetch(CREATE_USER_ENDPOINT, requestOptions)
    .then(() => setCreatedSuccessfully(true));
  }

  return (
    <div className='user-form'>
      <button className='button' onClick={() => setFormVisible(!isFormVisible)}>Afficher / cacher le formulaire</button>
      {isFormVisible ?
        <form className='form' onSubmit={handleSubmit}>
          <div className='field'>
            <label htmlFor='username'>Username :</label>
            <input id='username' type='text' value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className='field'>
            <label htmlFor='token'>Token :</label>
            <input id='token' type='password' value={token} onChange={(event) => setToken(event.target.value)} />
          </div>
          <button className='button' type='submit'>Valider</button>
          <span className='validation-message'>{isCreatedSuccessfully ? 'Utilisateur créé' : ''}</span>
        </form> : <></>
      }
    </div>
  );
}

export default UserForm;