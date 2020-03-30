import React, { useEffect, useState } from 'react';
import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';
import api from './services/api';
import DevItem from './components/DevItem';

function App() {
  const [username, setUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });

    loadDevs();
  }, []);

  const handleSubmitDev = async (e) => {
    e.preventDefault();
    try {
      const data = {
        github_username: username,
        techs,
        latitude,
        longitude
      }
      const resp = await api.post('/dev', { data });
      setUsername('');
      setTechs('');

      setDevs([...devs, resp.data]);

    } catch (error) {
      console.log(error.message);
    }
  }

  const loadDevs = async () => {
    try {
      const res = await api.get('/dev');
      setDevs(res.data);
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleSubmitDev}>
          <div className="input-block">
            <label htmlFor="username_github">Usuário do Github</label>
            <input type="text" id="username_github" className="username_github" required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input type="text" id="techs" className="techs" required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="text"
                id="latitude"
                className="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="text"
                id="longitude"
                className="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)} />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div >
  );
}

export default App;
