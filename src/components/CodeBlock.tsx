import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import './CodeBlock.css'

interface CodeBlockProps {
    children?: React.ReactNode
    className?: string
    node?: any
    [key: string]: any
}

export default function CodeBlock({ children, className, node, ...props }: CodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false)

    // Extract text content recursively
    const getTextContent = (node: React.ReactNode): string => {
        if (!node) return ''
        if (typeof node === 'string') return node
        if (Array.isArray(node)) return node.map(getTextContent).join('')
        if (typeof node === 'object' && 'props' in node) {
            return getTextContent((node as any).props.children)
        }
        return ''
    }

    const handleCopy = async () => {
        const text = getTextContent(children)
        try {
            await navigator.clipboard.writeText(text)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    // Ensure we handle the className from react-markdown properly
    // It usually passes 'language-xxx' which we want on the pre
    return (
        <div className="code-block-wrapper">
            <button
                onClick={handleCopy}
                className="code-block-copy-btn"
                aria-label="Copy code"
                title="Copy code"
            >
                {isCopied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
            </button>
            <pre
                className={`code-block-pre ${className || ''}`}
                {...props}
            >
                {children}
            </pre>
        </div>
    )
}
