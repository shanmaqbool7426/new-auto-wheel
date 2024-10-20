import TruckComparisonModule from "@/modules/comparison"

const TruckComparison = ({params,searchParams}) => {
  return (
    <div>
      <TruckComparisonModule params={params} searchParams={searchParams} type="truck"/>
    </div>
  )
}

export default TruckComparison