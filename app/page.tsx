import MapboxMap from "./components/mapbox";

const testenv = process.env.NEXT_PUBLIC_TEST_ENV;
const testenv1 = process.env.TEST_ENV;

export default function Home() {
  return (
    <div style={{"height": "700px"}}>
      <MapboxMap/>
      <div>public Test env is: {testenv}</div>
      <div>private Test env is: {testenv1}</div>
    </div>
  )
}
