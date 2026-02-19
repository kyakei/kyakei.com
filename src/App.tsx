import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { SiHackthebox, SiTryhackme, SiGithub, SiLinkedin, SiDiscord } from 'react-icons/si'
import {
    AppleHelloEnglishEffect,
    AppleHelloKoreanEffect,
    AppleHelloHindiEffect,
    AppleHelloItalianEffect,
    AppleHelloCzechEffect,
    AppleHelloJapaneseEffect
} from './components/apple-hello-effect'
import './App.css'

const languages = ['english', 'korean', 'hindi', 'italian', 'czech', 'japanese'] as const
type Language = typeof languages[number]

const ghostPattern = [
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]
]

const invaderPattern = [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0]
]

const heartPattern = [
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
]

const terminalPattern = [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1]
]

const PixelGrid = ({ pattern, style }: { pattern: number[][], style?: React.CSSProperties }) => {
    const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)

    const isGlowing = (row: number, col: number): boolean => {
        if (!hoveredCell) return false
        const { row: hRow, col: hCol } = hoveredCell
        if (col !== hCol) return false
        return row === hRow || row === hRow - 1 || row === hRow + 1
    }

    return (
        <div className="pixel-grid" style={style} aria-label="Decorative pixel art">
            {pattern.map((row, rowIndex) => (
                <div key={rowIndex} className="pixel-row">
                    {row.map((cell, cellIndex) => {
                        const isActive = cell === 1
                        const glowing = isActive && isGlowing(rowIndex, cellIndex)

                        return (
                            <div
                                key={cellIndex}
                                className={`pixel-cell ${isActive ? 'active' : ''} ${glowing ? 'glowing' : ''}`}
                                onMouseEnter={() => isActive && setHoveredCell({ row: rowIndex, col: cellIndex })}
                                onMouseLeave={() => setHoveredCell(null)}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

function App() {
    const [showIntro, setShowIntro] = useState(true)

    // Cycle through all languages before repeating any (cookie-based)
    const selectedLanguage = useMemo<Language>(() => {
        // Read seen languages from cookie
        const cookieMatch = document.cookie.match(/seen_hello_languages=([^;]+)/)
        let seen: string[] = cookieMatch ? cookieMatch[1].split(',') : []

        // Find languages the user hasn't seen yet
        let unseen = languages.filter(lang => !seen.includes(lang))

        // If all have been seen, reset the cycle
        if (unseen.length === 0) {
            seen = []
            unseen = [...languages]
        }

        // Pick a random one from the unseen list
        const candidate = unseen[Math.floor(Math.random() * unseen.length)]

        // Mark it as seen and save to cookie (30 day expiry)
        seen.push(candidate)
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()
        document.cookie = `seen_hello_languages=${seen.join(',')};expires=${expires};path=/`

        return candidate
    }, [])

    const handleAnimationComplete = () => {
        setTimeout(() => {
            setShowIntro(false)
        }, 500)
    }

    const renderHelloEffect = () => {
        const props = {
            className: "h-16",
            style: { maxWidth: '300px' },
            speed: 1,
            onAnimationComplete: handleAnimationComplete
        }

        switch (selectedLanguage) {
            case 'english':
                return <AppleHelloEnglishEffect {...props} />
            case 'korean':
                return <AppleHelloKoreanEffect {...props} className="h-24" style={{ maxWidth: '420px' }} />
            case 'hindi':
                return <AppleHelloHindiEffect {...props} />
            case 'italian':
                return <AppleHelloItalianEffect {...props} />
            case 'czech':
                return <AppleHelloCzechEffect {...props} />
            case 'japanese':
                return <AppleHelloJapaneseEffect {...props} />
            default:
                return <AppleHelloEnglishEffect {...props} />
        }
    }

    return (
        <AnimatePresence mode="wait">
            {showIntro && (
                <motion.main
                    key="intro"
                    className="intro-screen"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {renderHelloEffect()}
                </motion.main>
            )}

            {!showIntro && (
                <motion.main
                    key="main"
                    className="container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <nav className="top-nav">
                        <Link to="/notes">Notes</Link>
                        <Link to="/writeups">Writeups</Link>
                    </nav>
                    <header className="intro-container">
                        <div className="intro">
                            <h1 className="name">Hi</h1>
                            <div className="sub-text">
                                I'm <span className="changing-name">Yuvraj</span>
                            </div>
                        </div>
                        <p className="profession">Penetration Tester from New Delhi, India</p>

                        <div className="certifications-container">
                            <div className="cert-group">
                                <h3 className="cert-title">Certification</h3>
                                <p className="cert-item">CPTS</p>
                            </div>
                            <div className="cert-group">
                                <h3 className="cert-title">Prolabs</h3>
                                <p className="cert-item">Zephyr</p>
                                <p className="cert-item">Dante</p>
                            </div>
                        </div>

                    </header>



                    {/* Scattered Pixel Art */}
                    <PixelGrid
                        pattern={ghostPattern}
                        style={{ position: 'absolute', top: '15%', right: '15%', opacity: 0.6 }}
                    />
                    <PixelGrid
                        pattern={invaderPattern}
                        style={{ position: 'absolute', bottom: '20%', right: '10%', opacity: 0.6 }}
                    />
                    <PixelGrid
                        pattern={heartPattern}
                        style={{ position: 'absolute', top: '50%', right: '35%', opacity: 0.6 }}
                    />
                    <PixelGrid
                        pattern={terminalPattern}
                        style={{ position: 'absolute', top: '20%', left: '40%', opacity: 0.6 }}
                    />

                    <footer className="social-footer">
                        <a href="https://profile.hackthebox.com/profile/019c5795-f0d9-7105-911a-7e1167bf70cc" target="_blank" rel="noopener noreferrer"><SiHackthebox /> HackTheBox</a>
                        <span className="separator">•</span>
                        <a href="https://tryhackme.com/p/kyakei" target="_blank" rel="noopener noreferrer"><SiTryhackme /> TryHackMe</a>
                        <span className="separator">•</span>
                        <a href="https://github.com/kyakei" target="_blank" rel="noopener noreferrer"><SiGithub /> Github</a>
                        <span className="separator">•</span>
                        <a href="https://www.linkedin.com/in/kyakei/" target="_blank" rel="noopener noreferrer"><SiLinkedin /> LinkedIn</a>
                        <span className="separator">•</span>
                        <a href="https://discord.gg/YyHY9pMPZv" target="_blank" rel="noopener noreferrer"><SiDiscord /> Discord</a>
                    </footer>
                </motion.main>
            )}
        </AnimatePresence>
    )
}

export default App
