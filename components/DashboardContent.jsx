"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion" // Import Framer Motion

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn, formatToCOP, formatDate, defineHeight, defineCategory } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { Form, FormLabel } from '@/components/ui/form'
import FormInput from "./FormInput"
import { useMutation } from "@tanstack/react-query"
import { sendChangeTotalRequest, sendCreateTransactionRequest } from "@/app/dashboard/actions"
  

const DashboardContent = ({ total, transactions, totalByCategory, totalSpent }) => {

  const { mutate } = useMutation({
    mutationKey: ["transaction"], 
    mutationFn: sendCreateTransactionRequest, 
    onError: () => {
      console.log("Error")
    }
  })

  const { mutate: mutateTotal } = useMutation({
    mutationKey: ["total"], 
    mutationFn: sendChangeTotalRequest,
    onError: () => console.log("Error")
  })


  const goal = 72000000
  const percentage = Math.round((total.total / goal) * 100)
  const percentageThisMonth = Math.round((totalSpent / 1300000) * 100)
  
  const [showModal, setShowModal] = useState(false)
  const [showSetTotal, setShowSetTotal] = useState(false)
  const [currentCategory, setCurrentCategory] = useState("")
  const [accountSelected, setAccountSelected] = useState("all")
  const [paymentMethodSelected, setPaymentMethodSelected] = useState("")
  const [transactionType, setTransactionType] = useState("")
  const [filterByCategory, setFilterByCategory] = useState("all")

  const [transactionsState, setTransactionsState] = useState(transactions)


  const form = useForm({
    defaultValues: {
      amount: 0, 
      title: ""
    }
  });

  const totalForm = useForm({
    defaultValues: {
      total: total.total,
      bancolombia : total.bancolombia,
      nu: total.nu,
     monthly_goal : total.monthly_goal,
    }
  })

    useEffect(() => {
      if(filterByCategory !== "all"){
        const newTransactionsArray = transactions.filter(item => item.category.split(" ")[0].toLowerCase() === filterByCategory);
        setTransactionsState(newTransactionsArray)
      } else{
        setTransactionsState(transactions)
      }
    }, [filterByCategory])

  function onSubmit(values){
      const newTransaction = {
        id: Date.now(),
        date: Date.now(),
        title: values.title,
        category: currentCategory === "personal" ? "Personal spents" : currentCategory === "house" ? "House hold" : currentCategory === "food" ? "Food" : currentCategory === "incoming" ? "Incoming" : "Transport",
        amount: values.amount,
        category_image: currentCategory === "personal" ? "/suit.png" : currentCategory === "house" ? "/house.png" : currentCategory === "food" ? "/food.png" : currentCategory === "incoming" ? "/incoming.png" : "/transportation.png",
        payment_method: paymentMethodSelected,
        payment_method_image: paymentMethodSelected === "bancolombia transaction" ? "/bancolombia.png" : paymentMethodSelected === "nu transaction" ? "/nu.png" : "/mastercard.png",
        type: transactionType
      }

    

      mutate({
        title: values.title, 
        amount: values.amount,
        category: currentCategory === "personal" ? "Personal spents" : currentCategory === "house" ? "House hold" : currentCategory === "food" ? "Food" : currentCategory === "incoming" ? "Incoming" : "Transport",
        category_image: currentCategory === "personal" ? "/suit.png" : currentCategory === "house" ? "/house.png" : currentCategory === "food" ? "/food.png" : currentCategory === "incoming" ? "/incoming.png" : "/transportation.png",
        payment_method: paymentMethodSelected,
        payment_method_image: paymentMethodSelected === "bancolombia transaction" ? "/bancolombia.png" : paymentMethodSelected === "nu transaction" ? "/nu.png" : "/mastercard.png",
        type: transactionType
      })

    setTransactionsState((prev) => [newTransaction, ...prev])
  }


  function onSubmitTotal (values){
    const newTotal = { ...values, id: total._id }
    mutateTotal(newTotal)

  }

  return (
    <div className='w-full flex flex-col h-max lg:pl-[110px] pt-[90px] py-[40px] px-[30px]'>
      <h1 className='text-white fond-semibold text-4xl mb-6'>Dashboard</h1>
      <div className='w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <div className='w-full h-full md:col-span-2 rounded-xl bg-[#373838] flex flex-col items-center p-4 relative'>

          <div className='w-full h-[25%] flex justify-between items-center'>
            <h2 className='text-white font-medium text-3xl md:text-5xl'>{ accountSelected === "bancolombia" ? formatToCOP(total.bancolombia) : accountSelected === "nu" ? formatToCOP(total.nu) : formatToCOP(total.total) }</h2>
            

            <button onClick={() => setShowSetTotal(!showSetTotal)} className="text-gray-300 bg-transparent text-xs w-[100px] flex items-center justify-center border border-gray-300 rounded-xl h-[25px]">Change</button>

            <Dialog open={showSetTotal} onOpenChange={setShowSetTotal}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Total</DialogTitle>
                </DialogHeader>
                <Form {...totalForm}>
                    <form className="flex flex-col space-y-4" onSubmit={totalForm.handleSubmit(onSubmitTotal)}>
                      <FormInput form={totalForm} type="number" placeholder="Total" name="total" label="Total" />
                      <FormInput form={totalForm} type="number" placeholder="Bancolombia" name="bancolombia" label="Bancolombia" />
                      <FormInput form={totalForm} type="number" placeholder="Nu" name="nu" label="Nu" />
                      <FormInput form={totalForm} type="number" placeholder="Montly Goal" name="monthly_goal" label="Monthly Goal" />

                      <Button onClick={() => setShowSetTotal(false)} className="!mt-6" type="submit">
                        Change
                      </Button>

                    </form>
                  </Form>
              </DialogContent>
            </Dialog>

          </div>  

          <div className='w-full h-[45%] flex flex-col p-4 bg-[#2e2d2d] rounded-xl my-3'>
            <div className="w-full flex justify-between">
              <span className='text-white font-medium text-xl'>All accounts</span>
              <button className="text-gray-300 text-xs w-[100px] flex items-center justify-center border border-gray-300 rounded-xl h-[25px]">
                Add account
              </button>
            </div>
            <span className='text-gray-400'>
              {accountSelected === "bancolombia" ? "Bancolombia ahorros" : accountSelected === "nu" ? "Nu Bank" : "All accounts"}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="my-4 w-full md:w-[350px]" variant="outline">Select account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Your accounts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={accountSelected === "bancolombia"}
                  onCheckedChange={() => setAccountSelected("bancolombia")}
                >
                  Bancolombia Ahorros
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={accountSelected === "nu"}
                  onCheckedChange={() => setAccountSelected("nu")}
                >
                  Nu Bank
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={accountSelected === "all"}
                  onCheckedChange={() => setAccountSelected("all")}
                >
                  All
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className='w-full h-[45%] flex flex-col p-4 bg-[#2e2d2d] rounded-xl'>
            <div className="w-full flex justify-between">
              <span className="text-xl md:text-2xl text-gray-500 mb-4">Overall Goal</span>
              <button className="text-gray-300 text-xs w-[100px] flex items-center justify-center border border-gray-300 rounded-xl h-[25px]">
                Edit goal
              </button>
            </div>
            <h3 className="text-white font-medium text-xl md:text-3xl mb-4 mt-[-10px] md:mt-0">
              {percentage} % / {formatToCOP(goal)}
            </h3>
            <Progress value={percentage} className="w-[60%]" />
          </div>

        </div>

        {/* Transactions Section */}
        <div className='w-full max-h-[620px] rounded-xl bg-[#373838] p-4 pt-0 flex flex-col relative'>
          <div className="overflow-y-auto scrollbar-hide pb-6">
            <div className="w-full pt-4 sticky flex bg-[#373838] items-center justify-between top-[-1px]">
              <h2 className='text-white font-medium text-2xl md:text-3xl mb-8'>Transactions This Month</h2>
              <button
                onClick={() => setShowModal(true)}
                className="w-[30px] h-[30px] flex items-center justify-center bg-green-400 rounded-full absolute top-5 right-0"
              >
                <FaPlus className="text-black w-4 h-4"/>
              </button>
            </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="mb-10 mt-1 bg-transparent text-gray-300 text-xs w-[140px] flex items-center justify-center border border-gray-300 rounded-xl h-[25px]">
                            { defineCategory(filterByCategory) }
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                        <DropdownMenuCheckboxItem
                            checked={filterByCategory === "all"}
                            onCheckedChange={() => setFilterByCategory("all")}
                          >
                            All
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={filterByCategory === "personal"}
                            onCheckedChange={() => setFilterByCategory("personal")}
                          >
                            Personal expenses
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={filterByCategory === "house"}
                            onCheckedChange={() => setFilterByCategory("house")}
                          >
                            House hold
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={filterByCategory === "food"}
                            onCheckedChange={() => setFilterByCategory("food")}
                          >
                            Food
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={filterByCategory === "transport"}
                            onCheckedChange={() => setFilterByCategory("transport")}
                          >
                            Transport
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={filterByCategory === "incoming"}
                            onCheckedChange={() => setFilterByCategory("incoming")}
                          >
                            Incoming
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                        </DropdownMenu>

            <AnimatePresence>
              {transactionsState.map((transaction) => (
                <motion.div
                  key={transaction.id || transaction._id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: .8 }}
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create a new transaction</DialogTitle>
                <DialogDescription>
                </DialogDescription>

                  <Form {...form}>
                    <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                      <FormInput form={form} type="number" placeholder="Amount" name="amount" label="Amount" />
                      <FormInput form={form} type="text" placeholder="Title" name="title" label="Title" />

                      <div>
                      <FormLabel className="mr-2">Category: </FormLabel>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <FormLabel className="">
                            {currentCategory === "house" ? "House hold" : currentCategory === "food" ? "Food" : currentCategory === "personal" ? "Personal expenses" : currentCategory === "incoming" ? "Incoming" : "Transport"}
                          </FormLabel>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuCheckboxItem
                            checked={currentCategory === "personal"}
                            onCheckedChange={() => setCurrentCategory("personal")}
                          >
                            Personal expenses
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={currentCategory === "house"}
                            onCheckedChange={() => setCurrentCategory("house")}
                          >
                            House hold
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={currentCategory === "food"}
                            onCheckedChange={() => setCurrentCategory("food")}
                          >
                            Food
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={currentCategory === "transport"}
                            onCheckedChange={() => setCurrentCategory("transport")}
                          >
                            Transport
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={currentCategory === "incoming"}
                            onCheckedChange={() => setCurrentCategory("incoming")}
                          >
                            Incoming
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                        </DropdownMenu> 
                      </div>
                      <div>
                        <FormLabel className="mr-2">Payment method: </FormLabel>
                          <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <FormLabel className="">
                              {paymentMethodSelected === "bancolombia debit" ? "Bancolombia Debit" : paymentMethodSelected === "nu debit" ? "Nu debit" : paymentMethodSelected === "bancolombia transaction" ? "Bancolombia transaction" : paymentMethodSelected === "nu transaction" ? "Nu transaction" : "Cash"}
                            </FormLabel>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuCheckboxItem
                              checked={paymentMethodSelected === "bancolombia debit"}
                              onCheckedChange={() => setPaymentMethodSelected("bancolombia debit")}
                            >
                              Bancolombia Debit
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={paymentMethodSelected === "bancolombia transaction"}
                              onCheckedChange={() => setPaymentMethodSelected("bancolombia transaction")}
                            >
                              Bancolombia Transaction
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={paymentMethodSelected === "nu debit"}
                              onCheckedChange={() => setPaymentMethodSelected("nu debit")}
                            >
                              Nu Debit
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={paymentMethodSelected === "nu transaction"}
                              onCheckedChange={() => setPaymentMethodSelected("nu transaction")}
                            >
                              Nu Transaction
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={paymentMethodSelected === "cash"}
                              onCheckedChange={() => setPaymentMethodSelected("cash")}
                            >
                              Cash
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu> 
                      </div>
                      <div>
                        <FormLabel className="mr-2">Transaction type: </FormLabel>
                          <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <FormLabel className="">
                              {transactionType === "outgoing" ? "Outgoing" : "Incoming"}
                            </FormLabel>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuCheckboxItem
                              checked={transactionType === "outgoing"}
                              onCheckedChange={() => setTransactionType("outgoing")}
                            >
                              Outgoing
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                              checked={transactionType === "incoming"}
                              onCheckedChange={() => setTransactionType("incoming")}
                            >
                              Incoming
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu> 
                      </div>

                      <Button onClick={() => setShowModal(false)} className="!mt-6" type="submit">
                        Create
                      </Button>

                    </form>
                  </Form>


                </DialogHeader>
            </DialogContent>
        </Dialog>


        <div className='w-full flex flex-col p-4 h-full rounded-xl bg-[#373838]'>
          <span className="text-xl md:text-2xl text-gray-500 mb-4">Total Spent by category</span>
            <div className="flex mx-auto space-x-6 h-full justify-between">
              {
                totalByCategory.map((item, index) => (
                  <div key={index} className="w-[60px] h-[200px] flex flex-col items-center">
                    <span className="w-full h-[15%] break-words text-center text-[0.7rem] text-white">
                      {formatToCOP(item.totalSpent)}
                    </span>
                    <div className="w-[70%] h-[70%] flex items-end">
                      <div style={{ height: defineHeight(item.goal, item.totalSpent) }} className={cn("w-full", item.alert ? "bg-red-400" : "bg-green-400")}></div>
                    </div>
                    <span className="w-full h-[15%] break-words text-center text-xs mt-3 text-white flex items-end justify-center">
                      {item.name}
                    </span>
                  </div>
                ))
              }
            </div>
        </div>
        <div className='w-full h-full flex flex-col p-4 rounded-xl bg-[#373838]'>
            <div className="w-full flex justify-between">
              <span className="text-xl md:text-2xl text-gray-500 mb-4">Total Spent this month</span>
            </div>
            <h3 className="text-white font-medium text-xl md:text-2xl mb-4 mt-[-10px] md:mt-0">
              <span className={totalSpent > total.monthly_goal && "text-red-400"}>{ formatToCOP(totalSpent) }</span> / { formatToCOP(total.monthly_goal) }
            </h3>
            <Progress value={percentageThisMonth} className="w-[60%]" />
        </div>
      </div>
    </div>
  )
}

export default DashboardContent





