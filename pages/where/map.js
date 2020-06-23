import ReactMapboxGl, {
  Marker,
  ScaleControl,
  RotationControl,
  ZoomControl,
} from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = ReactMapboxGl({ accessToken: process.env.NEXT_STATIC_MAPBOX_TOKEN })

const OFFICES = { torino: [7.605567, 45.0735886], roma: [12.3959151, 41.9102415], rossano: [16.6301855, 39.5773908], pittulongu: [9.5608871, 40.9460781], panama: [-81.2266042, 8.3788373], sydney: [150.6517959, -33.8473567,], newyork: [-74.1197639, 40.6976637] }

const mapStyle = { width: '100%', height: '100%' }

export default () => (
  <Map
    style="mapbox://styles/mapbox/streets-v8"
    injectCSS={false}
    containerStyle={mapStyle}
    center={[14.2399618, 15.4114625]}
    zoom={[1]}
    >
      {Object.keys(OFFICES).map(key => <Marker key={key} coordinates={OFFICES[key]} anchor="bottom">
      <div className="marker">
        <div className="icon" />
      </div>
    </Marker>)}
    <ScaleControl />
    <RotationControl style={{ top: 80 }} />
    <ZoomControl />

    <style jsx>{`
      /* @NOTE: see https://codepen.io/EskoCruz/pen/OVgZqX */
      .marker {
        width: 2rem;
        height: 2rem;
        border-radius: 50% 50% 50% 0;
        box-shadow: -1px 1px 4px rgba(0, 0, 0, 0.5);
        background: #429aef;
        transform: perspective(40px) rotateX(20deg) rotateZ(-45deg);
        transform-origin: 50% 50%;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .icon {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        background: url('/static/icons/android-chrome-192x192.png');
        background-size: cover;
        transform: rotateZ(45deg);
      }
    `}</style>
  </Map>
)
