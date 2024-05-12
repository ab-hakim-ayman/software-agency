import React, { useEffect } from 'react'

export default function text() {
    const Mainarray = []

    const [CurrentPage, setCurrentPage] = useState(1)
    const [PerPage] = useState(6)
    const [TotalData, setTotalData] = useState(Mainarray.length)
    const [FilterArray, setFilterArray] = useState(Mainarray)

    useEffect(() => {
        setTotalData(Mainarray.length)
    }, [Mainarray])

    function filterFunctionForPagination(){
        startpoint = (CurrentPage-1) * PerPage
        Endpoint = CurrentPage* PerPage
        const filterData = Mainarray.map((data,i)=>{
            return startpoint-1 < i  &&  i < Endpoint && data
        })

        setFilterArray(filterData)

    }

    useEffect(() => {
        filterFunctionForPagination()
    }, [CurrentPage])
    
    

  return (
    <div>
      
    </div>
  )
}
