import MapboxMap from "./components/mapbox";

const testenv = process.env.NEXT_PUBLIC_TEST_ENV;

export default function Home() {
  return (
    <div style={{"height": "700px"}}>
      <MapboxMap/>
      <div>Test env is: {testenv}</div>
    </div>
  )
}
