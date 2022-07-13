import MoladinMap from './lib/components/Map';

function App() {
  return (
    <div className="App">
      <MoladinMap
        apiKey={process.env.REACT_APP_API_KEY_GOOGLE_MAP}
        lat={-6.22477}
        lng={106.82562}
        draggableMarker
        onDragEnd={(coords, results) => {
          console.log('coords:', coords);
          console.log('results:', results);
        }}
        customMarker="https://cdn.moladin.com/static-images/b2c/v2/marker.svg"
      />
    </div>
  );
}

export default App;
