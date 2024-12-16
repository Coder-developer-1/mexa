// "use client"

// import { getServerSession } from 'next-auth/next'
// import { redirect } from 'next/navigation'
// import { authOptions } from '../api/auth/[...nextauth]/route'

// export default async function Dashboard() {
//   const session = await getServerSession(authOptions)

//   if (!session) {
//     redirect('/signin')
//   }

//   return (
//     <div className="min-h-screen bg-gray-600 flex flex-col justify-center items-center">
//       <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
//       <div className="bg-slate-800 p-8 rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Welcome, {session.user?.email}</h2>
//         <p className="mb-4">You are successfully logged in to the Music Studio dashboard.</p>
//         <button
//           onClick={() => signOut()}
//           className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
//         >
//           Sign Out
//         </button>
//       </div>
//     </div>
//   )
// }




'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-600 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="bg-slate-800 p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome, {session.user?.email}</h2>
        <p className="mb-4">You are successfully logged in to the Music Studio dashboard.</p>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

