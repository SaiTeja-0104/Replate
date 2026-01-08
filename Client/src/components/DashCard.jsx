import parcel from '../assets/parcel.png'
import clock from '../assets/clock.png'
import love from '../assets/love.png'

import bell from '../assets/bell.png'
import box from '../assets/box.png'
import food from '../assets/food.png'

const DashCard = ({title,count,img}) => {
    const list = [parcel,love,clock,box,food,bell];
  return (
    <div className='bg-white sm:min-w-[275px] font-inter'>
        <div className='border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300'>
            <div className='text-xl text-gray-700 mb-3'>{title}</div>
            <div className='flex items-center justify-between'>
                <div className='font-semibold text-4xl sm:text-5xl leading-normal'>{count}</div>
                <div><img className='w-15' src={list[img]} alt="" /></div>
            </div>
        </div>
    </div>
  )
}

export default DashCard
