import { visit } from 'unist-util-visit'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { notes } from '../notes/notes'
import { resolveWikiLink } from './wiki-link-resolver'

export default function remarkObsidianCompat() {
    return (tree: any) => {
        // Use a persistent processor to avoid recreating it for every node
        const processor = unified().use(remarkParse).use(remarkGfm)

        visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
            if (index === undefined || !parent) return

            const value = node.value

            // 1. Handle Block IDs: clean up styling
            // Strip caret block IDs from the end of the text
            if (value.match(/(\s\^([a-zA-Z0-9-]+))$/)) {
                node.value = value.replace(/(\s\^([a-zA-Z0-9-]+))$/, '')
            }
            node.value = node.value.replace(/\n\^([a-zA-Z0-9-]+)$/g, '')
            node.value = node.value.replace(/^\^([a-zA-Z0-9-]+)$/g, '')

            // 2. Handle Embeds: ![[Link#^Block]] -> Transclude Content
            const embedRegex = /!\[\[([^\]]+)\]\]/g

            if (embedRegex.test(node.value)) {
                const nodes: any[] = []
                let lastIndex = 0

                embedRegex.lastIndex = 0
                let m
                while ((m = embedRegex.exec(node.value)) !== null) {
                    // Text before the match
                    if (m.index > lastIndex) {
                        nodes.push({ type: 'text', value: node.value.slice(lastIndex, m.index) })
                    }

                    const linkContent = m[1]

                    // Check if it is an image
                    if (/\.(png|jpg|jpeg|gif|webp|svg|bmp)$/i.test(linkContent)) {
                        nodes.push({
                            type: 'image',
                            url: `/notes/${linkContent}`,
                            alt: linkContent,
                            title: null
                        })
                    } else {
                        const [linkName, blockIdWithHashes] = linkContent.split('#')
                        const blockId = blockIdWithHashes ? blockIdWithHashes.replace('^', '') : null

                        // 1. Find the Note
                        const [slug] = resolveWikiLink(linkName)
                        const targetNote = notes.find(n => n.slug === slug)

                        let embedFound = false

                        if (targetNote && blockId) {
                            // 2. Find the Block in the content
                            const safeBlockId = blockId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                            // Regex to find content ending with ^blockId
                            // Matches: (Start of Line OR Newline) (Content) (Whitespace) ^blockId (End of Line OR Newline)
                            const blockRegex = new RegExp(`(?:^|\\n)(.*?)\\s*\\^${safeBlockId}(?:$|\\n)`)

                            const content = targetNote.content
                            const blockMatch = content.match(blockRegex)

                            if (blockMatch) {
                                const rawBlockContent = blockMatch[1].trim()

                                // 3. Parse the Block Content
                                try {
                                    const parsedRoot = processor.parse(rawBlockContent) as any

                                    // 4. Check for phrasing content to unwrap
                                    if (parsedRoot.children.length > 0) {
                                        // If we have paragraphs, unwrap them if possible to merge inline
                                        // For block transclusions, usually we want the block.
                                        // But since we are likely replacing a text node inside a paragraph, inserting blocks is tricky.
                                        // However, react-markdown usually handles mixed content fine.
                                        // Let's just push the children of the root (paragraphs, lists, etc.)
                                        // Actually, let's unwrap the FIRST paragraph if it's the only child.
                                        // This aligns with inline embed expectations.
                                        if (parsedRoot.children.length === 1 && parsedRoot.children[0].type === 'paragraph') {
                                            nodes.push(...parsedRoot.children[0].children)
                                        } else {
                                            nodes.push(...parsedRoot.children)
                                        }
                                        embedFound = true
                                    }
                                } catch (e) {
                                    // console.error('Failed to parse embedded block content', e)
                                }
                            }
                        }

                        if (!embedFound) {
                            // Fallback: regular link
                            const url = slug ? `/notes/${slug}` : '#'
                            nodes.push({
                                type: 'link',
                                url: url,
                                title: linkName,
                                children: [{ type: 'text', value: linkName }]
                            })
                        }
                    }

                    lastIndex = m.index + m[0].length
                }

                // Text after last match
                if (lastIndex < node.value.length) {
                    nodes.push({ type: 'text', value: node.value.slice(lastIndex) })
                }

                // Replace the original text node with the new list of nodes
                if (parent && typeof index === 'number') { // This check is redundant with initial check but safe for TS
                    parent.children.splice(index, 1, ...nodes)
                    return index + nodes.length
                }
            }
        })
    }
}
