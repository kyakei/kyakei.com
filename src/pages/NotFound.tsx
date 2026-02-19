import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

export default function NotFound() {
    return (
        <main className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.1)', lineHeight: 1 }}>404</h1>
                <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>Page Not Found</h2>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', marginBottom: '3rem' }}>
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="back-link" style={{ fontSize: '1rem', color: '#fff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', padding: '0.8rem 1.5rem', borderRadius: '8px' }}>
                    Go Home
                </Link>
            </motion.div>
        </main>
    )
}
