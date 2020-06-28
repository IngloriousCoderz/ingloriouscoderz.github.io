import ReactMapboxGl, {
  Marker,
  ScaleControl,
  RotationControl,
  ZoomControl,
} from 'react-mapbox-gl'

const Map = ReactMapboxGl({ accessToken: process.env.NEXT_STATIC_MAPBOX_TOKEN })

const mapStyle = { flex: 1 }

export default ({ offices }) => (
  <Map
    style="mapbox://styles/mapbox/streets-v8"
    injectCSS={false}
    containerStyle={mapStyle}
    center={[14.2399618, 15.4114625]}
    zoom={[1]}
  >
    {Object.keys(offices).map((key) => (
      <Marker key={key} coordinates={offices[key]} anchor="bottom">
        <div className="marker">
          <div className="icon" />
        </div>
      </Marker>
    ))}
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
