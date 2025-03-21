"use client";

import React, { useCallback, useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { MONTHS } from '@/lib/constants';



import { cn, formatDate, formatToCOP } from '@/lib/utils'

const TransactionsHistoryContent = ({ transactions }) => {

  const [monthSelected, setMonthSelected] = useState(new Date().getMonth())
  const [transactionsState, setTransactionsState] = useState(transactions)

  const filterTransactions = useCallback(async () => {
    const request1 = await fetch("https://finance-app-backend-stb9.onrender.com/movements/filterTransactions/2025/" + monthSelected.toString());
    const { transactions: newTransactions } = await request1.json();
    setTransactionsState(newTransactions)
  }, [monthSelected])

  useEffect(() => {
    filterTransactions()
  }, [filterTransactions])

  return (
    <div className='w-full flex flex-col items-center h-max md:pl-[110px] pt-[80px] md:py-[40px] px-[10px] md:pr-[30px]'>
      <h1 className='text-white fond-semibold text-4xl mb-6'>Transacitons History</h1>
      <div className='py-6 w-[95%] md:w-[80%] h-[80vh] bg-[#373838] flex flex-col items-center rounded-xl'>

        <div className='w-[100%] px-4 md:px-0 md:w-[90%] h-[80px] mb-8 flex items-center justify-between'>
            <h2 className='text-white text-2xl'>Filter by</h2>
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-gray-300 bg-transparent text-xs w-[100px] flex items-center justify-center border border-gray-300 rounded-xl h-[25px]" variant="outline">{MONTHS[monthSelected]}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Month</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                  MONTHS.map((item, index) => (
                    <DropdownMenuCheckboxItem
                      key={index}
                      checked={monthSelected === index}
                      onCheckedChange={() => setMonthSelected(index)} 
                    >
                      {item}
                    </DropdownMenuCheckboxItem>
                  ))
                }
              </DropdownMenuContent>
            </DropdownMenu>
        </div>

          <div className='w-[90%] h-full flex flex-col items-center overflow-y-auto scrollbar-hide'>
              {
                transactionsState.length === 0 ? <span className="text-xl md:text-2xl text-gray-500 mt-8 mb-4">No transactions found this month.</span>
                :
                transactionsState.map(transaction => (
                  <div key={transaction._id} className="flex items-center pb-2 my-2 justify-between w-full h-[70px] border-b border-gray-500"
                >
                  <div className="w-max h-full flex space-x-4">
                    <img className="w-[45px] h-[45px] object-contain rounded-full" src={transaction.category_image} alt="" />
                    <div className="h-full flex flex-col">
                      <strong className="text-gray-300 text-xs md:text-sm">{transaction.title}</strong>
                      <span className="text-gray-400 text-xs">{transaction.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">{transaction.payment_method}</span>
                        <img className="w-[10px] h-[10px] object-contain" src={transaction.payment_method_image} alt="" />
                      </div>
                    </div>
                  </div>
                    <div className="h-full flex flex-col items-end">
                      <span className={cn("font-medium text-sm md:text-base", transaction.type === "incoming" ? "text-green-400" : "text-red-400")}>
                        {transaction.type === "outgoing" ? "-" : "+"} {formatToCOP(transaction.amount)}
                      </span>
                      <span className="text-gray-400 text-xs">
                          {formatDate(transaction.date)}
                      </span>
                    </div>
                </div>
                ))
              }
          </div>
      </div>
    </div>
  )
}

export default TransactionsHistoryContent