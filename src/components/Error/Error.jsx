import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <main>
    <div className="text-center">
      <p className="text-warning fs-3">404</p>
      <h2 className="mt-4 font-bold fs-1">Page not found</h2>
      <p className="mt-4 text-muted">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="flex items-center justify-center">
        <Link to='home' className="btn btn-outline-info text-light">Go back home</Link>
      </div>
    </div>
  </main>
  )
}
