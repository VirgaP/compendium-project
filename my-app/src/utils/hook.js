import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import WebMercatorViewport, {
  Bounds,
  ViewportProps
} from "viewport-mercator-project"
import http from '../services/http'
import { getBounds } from "../utils/mapUtils"


function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  })

  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
}

function useDidMount() {
  const [didMount, setDidMount] = useState(false)
  useEffect(() => { setDidMount(true) }, [])

  return didMount
}

const useAxiosLoader = () => {
  const ax =  http.axiosInstance
  const [counter, setCounter] = useState(0);
  const inc = useCallback(() => setCounter(counter => counter + 1), [setCounter]); // add to counter
  const dec = useCallback(() => setCounter(counter => counter - 1), [setCounter]); // remove from counter
  
  const interceptors = useMemo(() => ({
    request: config => (inc(), config),
    response: response => (dec(), response),
    error: error => (dec(), Promise.reject(error)),
  }), [inc, dec]); // create the interceptors
  
  useEffect(() => {
    // add request interceptors
    const reqInterceptor = ax.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    const resInterceptor =  ax.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      // remove all intercepts when done
      ax.interceptors.request.eject(reqInterceptor);
      ax.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);
  
  return [counter > 0];
}

const useUnload = fn => {
  const cb = useRef(fn); // init with fn, so that type checkers won't assume that current might be undefined

  useEffect(() => {
    cb.current = fn;
  }, [fn]);

  useEffect(() => {
    const onUnload = cb.current;

    window.addEventListener("beforeunload", onUnload);

    return () => window.removeEventListener("beforeunload", onUnload);
  }, [])
}

const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  
  const onChange = ({coords}) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error) => {
    setError(error.message);
  };
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    let watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return {...position, error};
}


const useMap = ({ width, height, markers, lat, long, zoom, isLocationSearch }) => {
  const [viewport, setViewport] = useState({
    width: width || 700,
    height: height || 400,
    latitude:lat,
    longitude:long,
    zoom:zoom
  })

  useEffect(() => {
        if (width && height && markers.length) {
          const MARKERS_BOUNDS = getBounds(markers);
          setViewport((viewport) => {
            const nextViewport = new WebMercatorViewport({
              ...(viewport),
              width,
              height
            });
            if(!isLocationSearch){
              return nextViewport.fitBounds(MARKERS_BOUNDS, {
                padding: 80
              });
            }
            else{return nextViewport;}
          })
        }
  }, [width, height, markers]);

  //   if (width && height && markers.length) {
  //     const MARKERS_BOUNDS = getBounds(markers);
  //     setViewport((viewport) => {
  //       const nextViewport = new WebMercatorViewport({
  //         ...(viewport),
  //         width,
  //         height
  //       }).fitBounds(MARKERS_BOUNDS, {
  //         padding: 80
  //       });
        
  //       return nextViewport;
  //     })
  //   }
  // }, [width, height, markers]);


  const onViewportChange = (nextViewport) =>
    setViewport(nextViewport)

  return {
    onViewportChange,
    viewport
  }
}

export default { useWindowSize, usePrevious, useIsMount, useDidMount, useAxiosLoader, useUnload, usePosition, useMap }
