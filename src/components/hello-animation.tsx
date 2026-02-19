import { useMemo } from 'react'
import { motion } from 'motion/react'

type GreetingProps = {
    onAnimationComplete?: () => void
    speed?: number
}

const greetings = [
    { text: 'Hello', lang: 'en' },
    { text: 'Bonjour', lang: 'fr' },
    { text: 'नमस्ते', lang: 'hi' },
    { text: 'Hola', lang: 'es' },
    { text: 'こんにちは', lang: 'ja' },
    { text: '안녕하세요', lang: 'ko' },
]

// Font families for each language
const fontFamilies: Record<string, string> = {
    en: "'Dancing Script', cursive",
    fr: "'Dancing Script', cursive",
    es: "'Dancing Script', cursive",
    hi: "'Noto Sans Devanagari', sans-serif",
    ja: "'Noto Sans JP', sans-serif",
    ko: "'Noto Sans KR', sans-serif",
}

function HelloWritingAnimation({ onAnimationComplete, speed = 1 }: GreetingProps) {
    // Randomly select a greeting on mount
    const selectedGreeting = useMemo(() => {
        const index = Math.floor(Math.random() * greetings.length)
        return greetings[index]
    }, [])

    const duration = 2 * speed

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: duration,
                    ease: "easeOut",
                }}
                onAnimationComplete={onAnimationComplete}
                style={{
                    fontFamily: fontFamilies[selectedGreeting.lang],
                    fontSize: '6rem',
                    fontWeight: 400,
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                    display: 'inline-block',
                }}
            >
                {selectedGreeting.text.split('').map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.15 * speed,
                            ease: "easeOut",
                        }}
                        style={{ display: 'inline-block' }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </motion.div>
    )
}

export { HelloWritingAnimation, greetings }
