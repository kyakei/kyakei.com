import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkCallout from '@r4ai/remark-callout'
import remarkWikiLink from 'remark-wiki-link'
import remarkObsidianCompat from '../lib/remark-obsidian-compat'
import { resolveWikiLink } from '../lib/wiki-link-resolver'
import { notes } from '../notes/notes'
import CanvasRenderer from '../components/CanvasRenderer'
import NotesSidebar from '../components/NotesSidebar'
import CodeBlock from '../components/CodeBlock'
import '../pages/Writeups.css'

function NotePost() {
    const { slug } = useParams<{ slug: string }>()
    const note = notes.find((n) => n.slug === slug)

    if (!note) {
        return (
            <main className="notes-layout">
                <NotesSidebar />
                <section className="notes-main">
                    <div className="writeup-post" style={{ minHeight: 'auto' }}>
                        <Link to="/notes" className="back-link">
                            ← Back to notes
                        </Link>
                        <h1>404 — Note Not Found</h1>
                        <p style={{ color: 'rgba(255,255,255,0.4)' }}>This note doesn't exist... yet.</p>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className="notes-layout">
            <NotesSidebar currentSlug={slug} />
            <section className="notes-main">
                <div className="writeup-post" style={{ minHeight: 'auto', padding: '2rem 0' }}>
                    <header className="post-header">
                        <h1>{note.title}</h1>
                        <div className="post-meta">
                            <span className="platform-badge">{note.folder}</span>
                            {note.type === 'canvas' && (
                                <span className="platform-badge">Canvas</span>
                            )}
                            <span>{note.date}</span>
                        </div>
                        <div className="post-tags">
                            {note.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </header>

                    {note.type === 'canvas' ? (
                        <CanvasRenderer content={note.content} />
                    ) : (
                        <article className="writeup-content">
                            <ReactMarkdown
                                components={{
                                    pre: CodeBlock
                                }}
                                remarkPlugins={[
                                    remarkGfm,
                                    remarkObsidianCompat,
                                    remarkCallout,
                                    [remarkWikiLink, {
                                        aliasDivider: '|',
                                        pageResolver: (name: string) => resolveWikiLink(name),
                                        hrefTemplate: (permalink: string) => `/notes/${permalink}`
                                    }]
                                ]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {note.content}
                            </ReactMarkdown>
                        </article>
                    )}
                </div>
            </section>
        </main>
    )
}

export default NotePost
