import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import mapIcon from '../utils/mapIcon';

import api from '../services/api';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanage-map.css';

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanageMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas criancas estao esperando a sua visista :)</p>
                </header>
                <footer>
                    <strong>Santa Terezinha</strong>
                    <span>Paraná</span>
                </footer>
            </aside>
            <Map 
                center={[-25.452997, -54.403270]}
                zoom={15}
                style={{width: '100%', height: '100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                {orphanages.map(orphanage => {
                    return(
                        <Marker 
                        icon={mapIcon} 
                        position={[orphanage.latitude, orphanage.longitude]}
                        key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}><FiArrowRight size={32} color="#fff"/></Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanageMap;