"use client"

import React from 'react'
import { cn, defineHeight, formatTitle } from '@/lib/utils'

import { formatToCOP, formatDate, defineWidth } from '@/lib/utils'
import { Progress } from "@/components/ui/progress"

const ReportContent = ({ report }) => {
  
  return (
    <div className='w-full flex flex-col h-max lg:pl-[110px] pt-[90px] lg:py-[40px] px-[20px]'>
      <h1 className='text-white fond-semibold text-2xl sm:text-3xl mb-6'>Last Month Report</h1>
      <div className='w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>


        <div className='w-full h-[1000px] lg:h-[620px] max-h-full md:col-span-2 rounded-xl bg-[#373838] flex flex-col justify-between md:flex-row p-4 relative'>
          <div className='w-full h-[50%] md:h-[90%] md:w-[45%] flex flex-col'>
            <span className='text-white font-medium text-xl mb-8'>Expenses last month</span>
            <div className='w-full h-full flex items-center justify-evenly'>
              {
                report.totalSpentByCategory.map((item, index) => (
                  <div key={index} className='w-[70px] h-full flex flex-col items-center justify-end'>
                      <span className="w-full h-[15%] break-words text-center text-xs mt-3 text-white flex items-start justify-center">
                        {item.name}
                      </span>
                    <div className='w-[60px] h-[75%] flex items-end'>
                      <div style={{ height: defineHeight(item.goal, item.totalSpent) }} className={cn("w-full", item.alert ? "bg-red-400" : "bg-green-400")} />
                    </div>
                    <span className="w-full h-[10%] break-words text-center text-xs mt-3 text-white flex items-end justify-center">
                      {formatToCOP(item.totalSpent)}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='w-full md:w-[45%] h-[50%] md:h-[90%] flex flex-col pt-10 md:pt-0'>
            <span className='text-white font-medium text-xl mb-8'>Expenses by payment method</span>
              <div className='w-full h-full flex flex-col items-center justify-center space-y-6'>
                {
                  report.totalSpentByPaymentMethod.map((item, index) => (
                <div key={index} className='w-full h-[50px] flex items-center justify-between px-3'>
                  <div className='w-[25%] h-full flex items-center justify-start pr-3'>
                    <span className='break-words text-xs text-white'>{formatTitle(item.name)}</span>
                  </div>
                  <div className='w-[65%] pl-3 pr-5 h-full flex items-center'>
                    <div style={{ width: defineWidth(report.totalSpentByPaymentMethod)[index] }} className='bg-green-400 h-[60%]'>

                    </div>
                  </div>
                  <div className='w-[10%] h-full flex items-center'>
                    <span className='text-white text-[0.6rem] xl:text-xs'>{formatToCOP(item.total)}</span>
                  </div>
                </div>
                  ))
                }
              </div>
          </div>

        </div>

      <div className='w-full max-h-[620px] rounded-xl bg-[#373838] p-4 pt-0 flex flex-col relative'>
      <div className="overflow-y-auto scrollbar-hide pb-6">
            <div className="w-full pt-4 sticky flex bg-[#373838] items-center justify-between top-[-1px]">
              <h2 className='text-white font-medium text-xl md:text-2xl mb-8'>Transactions Last Month</h2>
            </div>
              {report.transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center pb-2 my-2 justify-between w-full h-[70px] border-b border-gray-500"
                >
                  <div className="w-max h-full flex space-x-4">
                    <img className="w-[45px] h-[45px] object-contain rounded-full" src={transaction.category_image} alt="" />
                    <div className="h-full flex flex-col">
                      <strong className="text-gray-300 text-xs 2xl:text-sm">{transaction.title}</strong>
                      <span className="text-gray-400 text-xs">{transaction.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">{transaction.payment_method}</span>
                        <img className="w-[15px] h-[15px] object-contain" src={transaction.payment_method_image} alt="" />
                      </div>
                    </div>
                  </div>
                    <div className="h-full flex flex-col items-end">
                      <span className={cn("font-medium text-sm xl:text-base", transaction.type === "incoming" ? "text-green-400" : "text-red-400")}>
                        {transaction.type === "outgoing" ? "-" : "+"} {formatToCOP(transaction.amount)}
                      </span>
                      <span className="text-gray-400 text-xs">
                          {formatDate(transaction.date)}
                      </span>
                    </div>
                </div>
              ))}
          </div>
      </div>

      <div className='w-full h-full flex flex-col p-4 rounded-xl bg-[#373838]'>
            <div className="w-full flex justify-between">
              <span className="text-xl md:text-2xl text-gray-500 mb-4">Total Saved Last Month</span>
            </div>
            <h3 className="text-white font-medium text-xl md:text-2xl mb-4 mt-[-10px] md:mt-0">
              {formatToCOP(report.totalSaved)}
            </h3>
        </div>

        <div className='w-full h-full flex flex-col p-4 rounded-xl bg-[#373838]'>
            <div className="w-full flex justify-between">
              <span className="text-xl md:text-2xl text-gray-500 mb-4">Total Spent Last Month</span>
            </div>
            <h3 className="text-white font-medium text-xl md:text-2xl mb-4 mt-[-10px] md:mt-0">
              {formatToCOP(report.totalExpenses)}
            </h3>
        </div>
      
      </div>
  </div>
  )
}

export default ReportContent