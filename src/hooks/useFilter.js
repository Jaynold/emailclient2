import { useState, useEffect } from "react"


export const useFilter = (data = []) => {
    const [filter, setFilter] = useState(false)

    useEffect(() => {
        let didCancel = false;
        
        if(!didCancel && (filter?.name || filter?.type || filter?.isActive) ){
            data.filter((f) => {
                if(filter.name) 
                  return f.name.toLowerCase()
                  .includes(filter.name)
                  else {
                    let cond = f.type
                    .toLowerCase()
                    .includes(filter?.type);
                  const isActive = f.isActive ? "true" : "false";
                  cond = filter.isActive
                    ? isActive === filter.isActive &&
                      (!filter.type || cond)
                    : cond;
                    cond = filter.name
                    ? f.name.toLowerCase()
                    .includes(filter?.name) &&
                      (!filter.isActive || cond)
                    : cond;
                  return cond;
                  }
              })
        }else{
            data = null
        }
        return () => {
            didCancel = true
        }
    }, [filter, data])

    return [data, setFilter]
}