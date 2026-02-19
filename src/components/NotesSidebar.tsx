import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { notes } from '../notes/notes'

interface NotesSidebarProps {
    currentSlug?: string
}

interface Folder {
    name: string
    subfolders: Record<string, Folder>
    notes: typeof notes
}

interface FolderItemProps {
    folder: Folder
    path: string
    depth: number
    collapsedFolders: Record<string, boolean>
    toggleFolder: (folder: string) => void
    currentSlug?: string
}

const FolderItem = ({ folder, path, depth, collapsedFolders, toggleFolder, currentSlug }: FolderItemProps) => {
    if (!folder) return null

    const isCollapsed = collapsedFolders[path]
    const hasChildren = (folder.subfolders && Object.keys(folder.subfolders).length > 0) || (folder.notes && folder.notes.length > 0)
    const paddingLeft = `${depth * 0.8 + 0.5}rem`

    if (!hasChildren) return null

    return (
        <div className="sidebar-folder-group">
            <button
                className={`sidebar-folder-label ${isCollapsed ? 'collapsed-label' : ''}`}
                onClick={() => toggleFolder(path)}
                style={{ paddingLeft }}
            >
                <div className="folder-icon-wrapper">
                    <svg
                        className={`folder-chevron ${isCollapsed ? 'folder-collapsed' : ''}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                    <svg className="folder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                <span className="folder-name">{folder.name}</span>
            </button>

            {!isCollapsed && (
                <div className="sidebar-folder-content">
                    {/* Render Subfolders */}
                    {Object.keys(folder.subfolders).map(subKey => (
                        <FolderItem
                            key={subKey}
                            folder={folder.subfolders[subKey]}
                            path={`${path}/${subKey}`}
                            depth={depth + 1}
                            collapsedFolders={collapsedFolders}
                            toggleFolder={toggleFolder}
                            currentSlug={currentSlug}
                        />
                    ))}

                    {/* Render Notes */}
                    {folder.notes.map(note => (
                        <Link
                            key={note.slug}
                            to={`/notes/${note.slug}`}
                            className={`sidebar-note-link ${currentSlug === note.slug ? 'active' : ''}`}
                            style={{ paddingLeft: `${depth * 0.8 + 1.8}rem` }}
                        >
                            {note.type === 'canvas' && (
                                <span className="sidebar-type-dot" title="Canvas">◇</span>
                            )}
                            {note.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function NotesSidebar({ currentSlug }: NotesSidebarProps) {
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)
    const isListPage = location.pathname === '/notes'

    // Track collapsed state for each folder
    const [collapsedFolders, setCollapsedFolders] = useState<Record<string, boolean>>({})

    const toggleFolder = (folder: string) => {
        setCollapsedFolders(prev => ({
            ...prev,
            [folder]: !prev[folder]
        }))
    }

    // 1. Build the folder tree
    const rootFolder: Folder = { name: 'Root', subfolders: {}, notes: [] }

    notes.forEach(note => {
        const parts = note.folder.split('/')
        let current = rootFolder

        parts.forEach(part => {
            if (!current.subfolders[part]) {
                current.subfolders[part] = { name: part, subfolders: {}, notes: [] }
            }
            current = current.subfolders[part]
        })
        current.notes.push(note)
    })

    return (
        <aside className={`notes-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <button
                className="sidebar-toggle"
                onClick={() => setCollapsed(!collapsed)}
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {collapsed
                        ? <path d="M9 18l6-6-6-6" />
                        : <path d="M15 18l-6-6 6-6" />
                    }
                </svg>
            </button>

            {!collapsed && (
                <>
                    <Link to="/" className="back-link">
                        ← Home
                    </Link>
                    <h2 className="sidebar-title">
                        <Link to="/notes" className="sidebar-notes-link">
                            Notes
                        </Link>
                    </h2>
                    <nav className="sidebar-folders">
                        {Object.keys(rootFolder.subfolders).map(key => (
                            <FolderItem
                                key={key}
                                folder={rootFolder.subfolders[key]}
                                path={key}
                                depth={0}
                                collapsedFolders={collapsedFolders}
                                toggleFolder={toggleFolder}
                                currentSlug={currentSlug}
                            />
                        ))}
                    </nav>

                    {!isListPage && (
                        <Link to="/notes" className="sidebar-all-notes-link">
                            ← All Notes
                        </Link>
                    )}

                    <div className="sidebar-footer">
                        <a
                            href="https://twitch.tv/kirasec"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sidebar-attribution"
                            title="Canvas implementation inspired by kirasec"
                        >
                            thanks to twitch.tv/kirasec for canvas
                        </a>
                    </div>
                </>
            )}
        </aside>
    )
}
