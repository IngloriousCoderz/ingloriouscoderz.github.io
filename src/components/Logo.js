import React from 'react'

const styles = {
  background: {
    fill: '#000000',
    // display: 'none'
  },
  i: {
    fill: '#00ffff',
    fillOpacity: .5,
    stroke: '#00bfc0',
    strokeOpacity: 0.5
  },
  c: {
    fill: '#8080ff',
    fillOpacity: .5,
    stroke: '#8080c0',
    strokeOpacity: .5
  }
}

const Logo = ({size}) => (
  <svg height={size} width={size} alt='logo'>
    <g transform='scale(2)'>
      <g style={styles.i}>
        <polygon points="6,1 8,0 10,1 10,15 8,16 6,15"/>
      </g>
      <g style={styles.c}>
        <polygon points="0,4 8,0 16,4 12,6 8,4 4,6 4,10 8,12 12,10 16,12 8,16 0,12"/>
      </g>
    </g>
    {/* <g transform='skewX(-12)'>
      <g style={styles.i}>
        <polygon points='20.5,2.5 23,5 23,12.5 20.5,15 18,12.5 18,5'/>
        <polygon points='20.5,16 23,18.5 23,26 20.5,28.5 18,26 18,18.5'/>
      </g>

      <g style={styles.c}>
        <polygon points='10,0 20,0 20,2 18,4 12,4 9,1'/>
        <polygon points='21,0 31,0 32,1 29,4 23,4 21,2'/>
        <polygon points='8,2 11,5 11,13 9,15 7,15 7,3'/>
        <polygon points='7,16 9,16 11,18 11,26 8,29 7,28'/>
        <polygon points='12,27 18,27 20,29 20,31 10,31 9,30'/>
        <polygon points='23,27 29,27 32,30 31,31 21,31 21,29'/>
      </g>
    </g> */}
  </svg>
)

export default Logo
