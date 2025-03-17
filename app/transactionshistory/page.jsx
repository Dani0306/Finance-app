import TransactionsHistoryContent from './TransactionsHistoryContent';

const page = async () => {

    const request1 = await fetch(process.env.DATABASE_URL + "/movements/filterTransactions/2025/1");
    const { transactions } = await request1.json();

  return (
    <TransactionsHistoryContent transactions={transactions}/>
  )
}

export default page