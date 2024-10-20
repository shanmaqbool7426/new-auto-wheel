import CarComparisonModule from "@/modules/comparison"

const CarComparison = ({params,searchParams}) => {
  return (
    <div>
      <CarComparisonModule params={params} searchParams={searchParams} type="car"/>
    </div>
  )
}

export default CarComparison

