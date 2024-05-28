export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'arttice',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': ['step', ['get', 'point_count'], '#878EA1', 100, '#878EA1', 750, '#878EA1'],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
    }
  }
  
  export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'arttice',
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 16,
    },
    paint: {
      "text-color": "#ffffff"
    }
  }
  
  export const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'arttice',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': [  
        "case",
        ["==",['get', 'type'], 0], "#FF5B5B",
        ["==", ['get', 'type'], 1], "#1E77F2",
        ["==",['get', 'type'], 2], "#FF9F84",
        ["==", ['get', 'type'], 3], "#7245B2",
        "#202"
    ],
      'circle-radius': 6,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  }


  export const unclusteredPointLayerText = {
    id: 'unclustered-point-text',
    type: 'symbol',
    source: 'arttice',
    filter: ['!', ['has', 'point_count']],
    layout: {
      'text-field': ['get', 'name'],
      'text-font': [
      'Open Sans Bold',
      'Arial Unicode MS Bold'
      ],
      'text-size': 9,
      'text-transform': 'lowercase',
      'text-letter-spacing': 0.05,
      'text-offset': [0, 1.5]
      },
      paint: {
        "text-color" : [
          "case",
          ["==",['get', 'type'], 0], "#FF5B5B",
          ["==", ['get', 'type'], 1], "#1E77F2",
          ["==",['get', 'type'], 2], "#FF9F84",
          ["==", ['get', 'type'], 3], "#7245B2",
          "#202"
        ],
      'text-halo-color': '#fff',
      'text-halo-width': 2
      },
  }

 