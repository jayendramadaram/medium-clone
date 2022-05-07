// import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

function Header() {
  return (
    <div className="mx-auto flex max-w-7xl justify-between p-5">
      <div className="flex items-center space-x-3">
        <Link href="/">
          <img className="w-44" src="/medium.png" alt="Jays medium" />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3>ABOUT</h3>
          <h3>CONTRACT</h3>
          <h3 className="rounded-full bg-green-600 px-4 py-1 text-white">
            FOLLOW
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        <h3>SIGN IN</h3>
        <h3 className="rounded-full border border-green-500 px-4 py-1">
          GET STARTED
        </h3>
      </div>
    </div>
  )
}

export default Header
