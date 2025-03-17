import DashboardContent from "@/components/DashboardContent"

const Dashboard = async () => {

  const response1 = await fetch(process.env.DATABASE_URL + "/total/get", { next: { tags: ["total"] } })
  const total = await response1.json();

  const response2 = await fetch(process.env.DATABASE_URL + "/movements/getCurrentMonthTransactions", { next: { tags: ["transactions"] } })
  const { transactions, transactionsArray, totalSpent } = await response2.json();

  return (
    <DashboardContent total={total} transactions={transactions.reverse()} totalByCategory={transactionsArray} totalSpent={totalSpent}/>
  )
}

export default Dashboard

