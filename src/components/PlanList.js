import React from 'react'
import Plan from './Plan'

export default function PlanList({plans}) {

if(plans.length === 0){

  return (
    <div className = "empty-search">
      <h3>Unfortunately places matched your search
      </h3>
    </div>
  )
}

return <section className = "roomlist">
    <div className = "roomslist-center">
      {
        plans.map(item => {
          return <Plan key={item.id} plan={item}/>;
        })
      }
    </div>
  </section>
    
}
