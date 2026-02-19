import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { notes } from '../notes/notes'
import NotesSidebar from '../components/NotesSidebar'
import '../pages/Writeups.css'

function NotesList() {
    const [search, setSearch] = useState('')
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

    const filtered = notes.filter((n) => {
        const q = search.toLowerCase()
        return (
            n.title.toLowerCase().includes(q) ||
            n.folder.toLowerCase().includes(q) ||
            n.tags.some((t) => t.toLowerCase().includes(q))
        )
    })

    // Group notes by folder
    const grouped = useMemo(() => {
        return filtered.reduce<Record<string, typeof filtered>>((acc, note) => {
            if (!acc[note.folder]) acc[note.folder] = []
            acc[note.folder].push(note)
            return acc
        }, {})
    }, [filtered])

    const folderNames = Object.keys(grouped)

    const toggleFolder = (folder: string) => {
        setCollapsed((prev) => ({ ...prev, [folder]: !prev[folder] }))
    }

    return (
        <main className="notes-layout">
            <NotesSidebar />

            <section className="notes-main">
                <header className="writeups-header">
                    <div className="notes-top-bar">
                        <div>
                            <h1>Notes</h1>
                            <p className="subtitle">Cheatsheets, references & learning notes</p>
                            <p className="post-count">{filtered.length} note{filtered.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="search-wrapper">
                            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search notes..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                {filtered.length > 0 ? (
                    folderNames.map((folder) => (
                        <section
                            key={folder}
                            id={`folder-${folder}`}
                            className="notes-folder"
                        >
                            <button
                                className="folder-heading-btn"
                                onClick={() => toggleFolder(folder)}
                            >
                                <svg
                                    className={`chevron ${collapsed[folder] ? 'collapsed' : ''}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                                <svg className="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                </svg>
                                <span>{folder}</span>
                                <span className="folder-heading-count">{grouped[folder].length}</span>
                            </button>

                            {!collapsed[folder] && (
                                <div className="writeups-list">
                                    {grouped[folder].map((note) => (
                                        <Link
                                            key={note.slug}
                                            to={`/notes/${note.slug}`}
                                            className="writeup-row"
                                        >
                                            <span className="row-date">{note.date}</span>
                                            <div className="row-content">
                                                <span className="row-title">
                                                    {note.type === 'canvas' && (
                                                        <span className="type-badge">canvas</span>
                                                    )}
                                                    {note.title}
                                                </span>
                                                <div className="row-tags">
                                                    {note.tags.map((tag) => (
                                                        <span key={tag} className="tag">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="row-meta">
                                                <span className="arrow">→</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </section>
                    ))
                ) : (
                    <p className="no-results">No notes found for "{search}"</p>
                )}
            </section>
        </main>
    )
}

export default NotesList
