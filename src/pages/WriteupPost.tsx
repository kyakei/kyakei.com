import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { writeups } from '../posts/writeups'
import CodeBlock from '../components/CodeBlock'
import './Writeups.css'

function WriteupPost() {
    const { slug } = useParams<{ slug: string }>()
    const writeup = writeups.find((w) => w.slug === slug)

    if (!writeup) {
        return (
            <main className="writeup-post">
                <Link to="/writeups" className="back-link">
                    ← Back to writeups
                </Link>
                <h1>404 — Writeup Not Found</h1>
                <p style={{ color: 'rgba(255,255,255,0.4)' }}>Looks like this exploit doesn't exist... yet.</p>
            </main>
        )
    }

    if (writeup.locked) {
        return (
            <main className="writeup-post">
                <Link to="/writeups" className="back-link">
                    ← Writeups
                </Link>

                <header className="post-header">
                    <h1>{writeup.title}</h1>
                    <div className="post-meta">
                        <span className="platform-badge">{writeup.platform}</span>
                        <span>{writeup.difficulty}</span>
                        <span>·</span>
                        <span>{writeup.date}</span>
                    </div>
                </header>

                <section className="locked-content">
                    <svg className="locked-content-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <h2>This machine is still active</h2>
                    <p>Writeup will be published once the machine is retired.</p>
                </section>
            </main>
        )
    }

    return (
        <main className="writeup-post">
            <Link to="/writeups" className="back-link">
                ← Writeups
            </Link>

            <header className="post-header">
                <h1>{writeup.title}</h1>
                <div className="post-meta">
                    <span className="platform-badge">{writeup.platform}</span>
                    <span>{writeup.difficulty}</span>
                    <span>·</span>
                    <span>{writeup.date}</span>
                </div>
                <div className="post-tags">
                    {writeup.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            </header>

            <article className="writeup-content">
                <ReactMarkdown
                    components={{
                        pre: CodeBlock
                    }}
                    remarkPlugins={[remarkGfm]}
                >
                    {writeup.content}
                </ReactMarkdown>
            </article>
        </main>
    )
}

export default WriteupPost
