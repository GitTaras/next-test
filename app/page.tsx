import MapboxMap from "./components/mapbox";

export default function Home() {
  return (
    <div style={{"height": "700px"}}>
      <MapboxMap/>
      <>{console.log(process.env.NEXT_PUBLIC_PGSQL_STRING)}</>
      <>{console.log(process.env.NEXT_PUBLIC_MAPBOX_TOKEN)}</>
    </div>
  )
}
