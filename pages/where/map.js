import ReactMapboxGl, {
  Marker,
  ScaleControl,
  RotationControl,
  ZoomControl,
} from 'react-mapbox-gl'

// NOTE: doesn't work, needed to add it in document
// import 'mapbox-gl/dist/mapbox-gl.css'

const Map = ReactMapboxGl({ accessToken: process.env.NEXT_STATIC_MAPBOX_TOKEN })

const INGLORIOUS_HQ_COORDS = [7.658785500000022, 45.0932463]

const mapStyle = { width: '100%', height: '100%' }

export default () => (
  <Map
    style="mapbox://styles/mapbox/streets-v8"
    containerStyle={mapStyle}
    center={INGLORIOUS_HQ_COORDS}
    zoom={[14]}>
    <Marker coordinates={INGLORIOUS_HQ_COORDS} anchor="bottom">
      <div className="marker">
        <div className="icon" />
      </div>
    </Marker>
    <ScaleControl />
    <RotationControl style={{ top: 80 }} />
    <ZoomControl />

    <style jsx>{`
      // NOTE: see https://codepen.io/EskoCruz/pen/OVgZqX
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
