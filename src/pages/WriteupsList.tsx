import { useState } from 'react'
import { Link } from 'react-router-dom'
import { writeups } from '../posts/writeups'
import './Writeups.css'

function WriteupsList() {
    const [search, setSearch] = useState('')

    const filtered = writeups.filter((w) => {
        const q = search.toLowerCase()
        return (
            w.title.toLowerCase().includes(q) ||
            w.platform.toLowerCase().includes(q) ||
            w.tags.some((t) => t.toLowerCase().includes(q))
        )
    })

    return (
        <main className="writeups-page">
            <nav className="writeups-nav">
                <Link to="/" className="back-link">
                    ← Home
                </Link>
                <div className="search-wrapper">
                    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search writeups..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </nav>

            <header className="writeups-header">
                <h1>Writeups</h1>
                <p className="subtitle">Security research & CTF walkthroughs</p>
                <p className="post-count">{filtered.length} post{filtered.length !== 1 ? 's' : ''}</p>
            </header>

            <section className="writeups-list">
                {filtered.length > 0 ? (
                    filtered.map((writeup) =>
                        writeup.locked ? (
                            <div
                                key={writeup.slug}
                                className="writeup-row locked"
                            >
                                <span className="row-date">{writeup.date}</span>
                                <div className="row-content">
                                    <span className="row-title">
                                        <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        {writeup.title}
                                    </span>
                                    <div className="row-tags">
                                        {writeup.tags.map((tag) => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="row-meta">
                                    <span className="platform-pill">{writeup.platform}</span>
                                    <span className="locked-badge">Active</span>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={writeup.slug}
                                to={`/writeups/${writeup.slug}`}
                                className="writeup-row"
                            >
                                <span className="row-date">{writeup.date}</span>
                                <div className="row-content">
                                    <span className="row-title">{writeup.title}</span>
                                    <div className="row-tags">
                                        {writeup.tags.map((tag) => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="row-meta">
                                    <span className="platform-pill">{writeup.platform}</span>
                                    <span className="difficulty-dot" title={writeup.difficulty} />
                                    <span className="arrow">→</span>
                                </div>
                            </Link>
                        )
                    )
                ) : (
                    <p className="no-results">No writeups found for "{search}"</p>
                )}
            </section>
        </main>
    )
}

export default WriteupsList
