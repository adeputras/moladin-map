import MoladinMap from './lib/components/Map';

function App() {
  return (
    <div className="App">
      <MoladinMap
        apiKey="AIzaSyAJLGAiiDcJDw_4Fs6puOiG1Reeu3ZPYTQ"
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
