import CarComparisonModule from "@/modules/car-comparison"

const CarComparison = ({params,searchParams}) => {
  return (
    <div>
      <CarComparisonModule params={params} searchParams={searchParams}/>
    </div>
  )
}

export default CarComparison

