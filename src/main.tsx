import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import WriteupsList from './pages/WriteupsList.tsx'
import WriteupPost from './pages/WriteupPost.tsx'
import NotesList from './pages/NotesList.tsx'
import NotePost from './pages/NotePost.tsx'

import SmoothCursor from './components/SmoothCursor.tsx'

import ComingSoon from './pages/ComingSoon.tsx'
import NotFound from './pages/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <SmoothCursor />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/writeups" element={<ComingSoon />} />
                <Route path="/writeups/:slug" element={<WriteupPost />} />
                <Route path="/notes" element={<NotesList />} />
                <Route path="/notes/:slug" element={<NotePost />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
