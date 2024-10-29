'use client'

import { useState, useEffect } from 'react'

export default function FastAPITest() {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchJoke = () => {
            fetch('/api/python')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then(data => {
                    setMessage(data.message)
                    setError('') // Clear any previous error
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                    setError('Failed to fetch joke. Please try again later.')
                })
        }

        // Call fetchJoke immediately, then set interval
        fetchJoke()
        const intervalId = setInterval(fetchJoke, 10000)

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId)
    }, [])

    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    return (
        <p>{message || 'Loading joke...'}</p>
    )
}
