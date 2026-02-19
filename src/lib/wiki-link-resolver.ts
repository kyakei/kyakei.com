import { notes } from '../notes/notes'

export const resolveWikiLink = (name: string) => {
    // 0. Split the name from the anchor/fragment if present
    const [baseName] = name.split('#')

    // 1. Normalize the link text
    const cleanName = baseName.trim().toLowerCase()
    const cleanNameKebab = cleanName.replace(/ /g, '-').replace(/\//g, '-')

    // 2. Try to find a direct match in the notes list
    const foundNote = notes.find(note => {
        const lowerTitle = note.title.toLowerCase()
        const lowerSlug = note.slug.toLowerCase()

        // Exact match on slug
        if (lowerSlug === cleanNameKebab) return true

        // Exact match on title
        if (lowerTitle === cleanName) return true

        // Match on "Folder/Title" format
        // e.g. [[File Transfer/FTP]] -> folder: "file transfer", title: "ftp"
        if (name.includes('/')) {
            const parts = name.split('/')
            const folderPart = parts[0].trim().toLowerCase()
            const filePart = parts[1].trim().toLowerCase()

            // Check if folder matches somewhat
            if (note.folder.toLowerCase().includes(folderPart)) {
                // Check if title or slug matches the file part
                const titleMatch = lowerTitle.includes(filePart)
                const slugMatch = lowerSlug.includes(filePart.replace(/ /g, '-'))
                if (titleMatch || slugMatch) return true
            }
        }

        return false
    })

    if (foundNote) {
        return [foundNote.slug]
    }

    // 3. Fallback: return kebab-cased version (might 404 but better than nothing)
    return [cleanNameKebab]
}
