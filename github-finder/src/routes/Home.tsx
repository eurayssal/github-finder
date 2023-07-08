import { UserProps } from '../types/user';
import { useState } from 'react';

import Search from '../components/Search';
import User from '../components/User';
import Error from '../components/Error';
import Loader from '../components/Loader';

/*
TODO
 -Criar a página de resposta
 -Css da página de respostas
-Button de voltar na página de respostas 
*/
const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadUser = async (userName: string) => {
    setError(false)
    setUser(null)

    const res = await fetch(`https://api.github.com/users/${userName}`)
    
    const data = await res.json();

    if (res.status === 404){
      setError(true);
      return;
    }

      const { avatar_url, login, location, followers, following } = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
    };

    setUser(userData)
  }

  return (
    <div>
      <Search loadUser={loadUser} />
      {user && <User {...user} />}
      {loading && <Loader></Loader>}
      {error && <Error></Error>}
    </div>

  )
}

export default Home