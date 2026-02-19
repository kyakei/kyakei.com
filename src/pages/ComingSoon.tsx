import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

export default function ComingSoon() {
    return (
        <main className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>Coming Soon</h1>
                <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>
                    Access to Writeups is restricted or under construction.
                </p>
                <Link to="/" className="back-link" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                    ← Back to Home
                </Link>
            </motion.div>
        </main>
    )
}
