import React from 'react';

import './styles.css';

export default function SideBar() {
    return (
        <aside>
            <strong>Cadastrar</strong>
            <form>
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
                <button type="submit" onClick={handleSubmitDev}>Salvar</button>
            </form>
        </aside>
    );
}
