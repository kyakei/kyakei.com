import htbLameMd from './htb-lame.md?raw'
import thmKenobiMd from './thm-kenobi.md?raw'

export interface Writeup {
    slug: string
    title: string
    date: string
    platform: string
    difficulty: string
    tags: string[]
    content: string
    locked?: boolean  // true = active machine, content hidden
}

// Add new writeups here — newest first
export const writeups: Writeup[] = [
    {
        slug: 'thm-kenobi',
        title: 'TryHackMe — Kenobi',
        date: '2025-02-15',
        platform: 'TryHackMe',
        difficulty: 'Easy',
        tags: ['SMB', 'ProFTPD', 'SUID', 'NFS'],
        content: thmKenobiMd,
        locked: true,  // Active machine — locked
    },
    {
        slug: 'htb-lame',
        title: 'HackTheBox — Lame',
        date: '2025-02-10',
        platform: 'HackTheBox',
        difficulty: 'Easy',
        tags: ['Samba', 'CVE', 'Metasploit'],
        content: htbLameMd,
        locked: true,
    },
]
