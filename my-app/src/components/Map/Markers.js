import * as React from 'react'
import {PureComponent} from 'react'
import {Marker} from 'react-map-gl'
import point from '../../assets/svg/pin.svg'


// PureComponent ensures that the markers are only rerendered when data changes
class Markers extends PureComponent {
  
  render() {
    const {data} = this.props
    return data.map(
      pin => 
      <Marker key={pin.uuid} longitude={pin.longitude} latitude={pin.latitude} offsetLeft={-17.5} offsetTop={-38} >
          <img src={point} onClick={()=>this.props.action(pin)}/>
          <div>{pin.name}</div>
      </Marker>
    )
  }
}

export default Markers