// 'use client'
import Link from "next/link"
import { data } from "../../data/tiendas"

const dashboard = () => {

  return (
    <div>
      <h1>Budget</h1>
      <ul>
        {data.weeks.map((w) => (
          <li key={w.id}>{<Link href={`/dashboard/${w.id}`} >{w.id}</Link>}</li>
        ))}
      </ul>
    </div>
  )
}

export default dashboard
