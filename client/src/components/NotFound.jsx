import React from 'react'

function NotFound() {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-900 text-white min-h-screen flex flex-col items-center justify-center font-sans">
    <div className="text-center">
        <h1 className="text-9xl font-bold animate-fadeIn">404</h1>
        <p className="text-2xl mt-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>Page Not Found</p>
        <p className="mt-2 text-gray-300 animate-fadeIn" style={{ animationDelay: '1s' }}>
            Sorry, the page you’re looking for doesn’t exist.
        </p>
        <div className="mt-6">
            <a href="/" className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md transition-transform duration-300 transform hover:scale-110 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
                Go Back Home
            </a>
        </div>
    </div>
</div>  )
}

export default NotFound