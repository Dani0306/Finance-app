import React from 'react'
import ReportContent from './ReportContent'

const page = async () => {

  const request1 = await fetch(process.env.DATABASE_URL + `/report/2025/03`);
  const { report } = await request1.json()

  return (
    <ReportContent report={report}/>
  )
}

export default page