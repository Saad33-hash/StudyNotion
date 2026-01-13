import React from 'react'
import { useState } from 'react'

const Tab = () => {
     const tabsName=[
            "Student",
            "Instructor"
        ]
    
    const [currentTab,setCurrentTab]=useState(tabsName[0])
    function chnageTab(tab){
    setCurrentTab(tab)
    }
  return (
    <div>
    {/* tab*/}
        <div className='flex bg-richblack-600 gap-5 rounded-2xl p-1 cursor-pointer'>
            {tabsName.map((element,index)=>{
                return(
                <div
                className={`flex items-center justify-center px-2 py-1 rounded-xl transition-all duration-200 ${currentTab === element ? "bg-richblack-900 text-richblack-5"
                    :"text-richblack-200 bg-richblack-600"
                }` }
               key={index}
               onClick={()=>chnageTab(element)}
             
               >
                  {element}
                </div>
                )
            })}
        </div>
            </div>
  )
}

export default Tab
