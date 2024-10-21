import BikeComparisonModule from "@/modules/comparison"

const BikeComparison = ({params,searchParams}) => {
  return (
    <div>
      <BikeComparisonModule params={params} searchParams={searchParams} type="bike"/>
    </div>
  )
}

export default BikeComparison