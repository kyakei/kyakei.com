import { useRef, useState, useEffect, useCallback, useMemo, memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkCallout from '@r4ai/remark-callout'
import remarkWikiLink from 'remark-wiki-link'
import remarkObsidianCompat from '../lib/remark-obsidian-compat'
import { resolveWikiLink } from '../lib/wiki-link-resolver'
import './CanvasRenderer.css'

interface CanvasNode {
    id: string
    x: number
    y: number
    width: number
    height: number
    type: string
    text?: string
}

interface CanvasEdge {
    id: string
    fromNode: string
    toNode: string
    fromSide: string
    toSide: string
}

interface CanvasData {
    nodes: CanvasNode[]
    edges: CanvasEdge[]
}

function getSidePoint(node: CanvasNode, side: string) {
    switch (side) {
        case 'top':
            return { x: node.x + node.width / 2, y: node.y }
        case 'bottom':
            return { x: node.x + node.width / 2, y: node.y + node.height }
        case 'left':
            return { x: node.x, y: node.y + node.height / 2 }
        case 'right':
            return { x: node.x + node.width, y: node.y + node.height / 2 }
        default:
            return { x: node.x + node.width / 2, y: node.y + node.height / 2 }
    }
}

import CodeBlock from './CodeBlock'

// ... existing imports

// Memoized Node Component to prevent re-renders of Markdown content
const CanvasNodeComponent = memo(({ node, minX, minY, padding }: { node: CanvasNode, minX: number, minY: number, padding: number }) => {
    return (
        <div
            className="canvas-node"
            style={{
                left: node.x - minX + padding,
                top: node.y - minY + padding,
                width: node.width,
                minHeight: node.height,
            }}
        >
            {node.text && (
                <div className="canvas-node-inner">
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
                        {node.text}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    )
}, (prev, next) => {
    // Custom comparison if needed, but simple props check should suffice
    return prev.node.id === next.node.id &&
        prev.node.x === next.node.x &&
        prev.node.y === next.node.y &&
        prev.minX === next.minX &&
        prev.minY === next.minY
})

export default function CanvasRenderer({ content }: { content: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(0.45)
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [initialised, setInitialised] = useState(false)
    // Container size tracking for virtualization
    const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 })

    const dragStart = useRef({ x: 0, y: 0 })
    const offsetStart = useRef({ x: 0, y: 0 })
    const scaleRef = useRef(0.45)
    const offsetRef = useRef({ x: 0, y: 0 })

    // Keep refs in sync
    scaleRef.current = scale
    offsetRef.current = offset

    const data: CanvasData = useMemo(() => {
        try {
            return JSON.parse(content)
        } catch {
            return { nodes: [], edges: [] }
        }
    }, [content])

    const nodeMap = useMemo(() => new Map(data.nodes.map((n) => [n.id, n])), [data])

    const bounds = useMemo(() => {
        if (data.nodes.length === 0) return { minX: 0, minY: 0, w: 0, h: 0 }
        const minX = Math.min(...data.nodes.map((n) => n.x))
        const minY = Math.min(...data.nodes.map((n) => n.y))
        const maxX = Math.max(...data.nodes.map((n) => n.x + n.width))
        const maxY = Math.max(...data.nodes.map((n) => n.y + n.height))
        return { minX, minY, w: maxX - minX, h: maxY - minY }
    }, [data])

    const padding = 200

    // Center on load
    const centerCanvas = useCallback(() => {
        const container = containerRef.current
        if (!container || bounds.w === 0) return
        const cw = container.clientWidth
        const ch = container.clientHeight
        setViewportSize({ w: cw, h: ch })

        const fitScale = Math.min(
            cw / (bounds.w + padding * 2),
            ch / (bounds.h + padding * 2)
        )
        const s = Math.min(Math.max(fitScale, 0.35), 1)

        const worldCenterX = (bounds.w + padding * 2) / 2
        const worldCenterY = (bounds.h + padding * 2) / 2
        const ox = cw / 2 - worldCenterX * s
        const oy = ch / 2 - worldCenterY * s

        setScale(s)
        setOffset({ x: ox, y: oy })
    }, [bounds])

    useEffect(() => {
        if (!initialised) {
            centerCanvas()
            setInitialised(true)
        }
        const ro = new ResizeObserver((entries) => {
            // Update viewport size on resize
            for (const entry of entries) {
                setViewportSize({ w: entry.contentRect.width, h: entry.contentRect.height })
            }
            if (!initialised) centerCanvas()
        })
        if (containerRef.current) ro.observe(containerRef.current)
        return () => ro.disconnect()
    }, [centerCanvas, initialised])

    // Wheel zoom
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handler = (e: WheelEvent) => {
            e.preventDefault()
            const rect = container.getBoundingClientRect()
            const mx = e.clientX - rect.left
            const my = e.clientY - rect.top
            const s = scaleRef.current
            const o = offsetRef.current

            const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1
            const newScale = Math.min(Math.max(s * factor, 0.08), 4)

            const newOffX = mx - (mx - o.x) * (newScale / s)
            const newOffY = my - (my - o.y) * (newScale / s)

            setScale(newScale)
            setOffset({ x: newOffX, y: newOffY })
        }

        container.addEventListener('wheel', handler, { passive: false })
        return () => container.removeEventListener('wheel', handler)
    }, [])

    // Drag to pan
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.button !== 0) return
        setIsDragging(true)
        dragStart.current = { x: e.clientX, y: e.clientY }
        offsetStart.current = { ...offsetRef.current }
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging) return
        setOffset({
            x: offsetStart.current.x + (e.clientX - dragStart.current.x),
            y: offsetStart.current.y + (e.clientY - dragStart.current.y),
        })
    }, [isDragging])

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    if (data.nodes.length === 0) {
        return <p style={{ color: 'rgba(255,255,255,0.4)' }}>Empty or invalid canvas.</p>
    }

    const { minX, minY, w, h } = bounds
    const svgW = w + padding * 2
    const svgH = h + padding * 2
    const zoomPercent = Math.round(scale * 100)

    // --- Virtualization Logic ---
    // Calculate visible nodes based on offset/scale

    // Add a safety buffer (e.g. 500px) around the viewport so nodes don't pop in too visibly
    // Visible region relative to .canvas-world origin (0,0):
    const viewWorldLeft = -offset.x / scale
    const viewWorldTop = -offset.y / scale
    const viewWorldRight = viewWorldLeft + (viewportSize.w / scale)
    const viewWorldBottom = viewWorldTop + (viewportSize.h / scale)

    const cullPadding = 500 // Render extra around edges

    const visibleNodes = data.nodes.filter(node => {
        const nodeLeft = node.x - minX + padding
        const nodeTop = node.y - minY + padding
        const nodeRight = nodeLeft + node.width
        const nodeBottom = nodeTop + node.height

        return !(
            nodeRight < viewWorldLeft - cullPadding ||
            nodeLeft > viewWorldRight + cullPadding ||
            nodeBottom < viewWorldTop - cullPadding ||
            nodeTop > viewWorldBottom + cullPadding
        )
    })

    // Include edges connected to visible nodes OR roughly inside view
    // Simpler heuristic: just render all edges for now as they are cheap (SVG), 
    // OR filter them if we have tons. Let's filter to be safe.
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id))
    const visibleEdges = data.edges.filter(edge =>
        visibleNodeIds.has(edge.fromNode) || visibleNodeIds.has(edge.toNode)
    )

    return (
        <section className="canvas-wrapper">
            <nav className="canvas-toolbar">
                <button onClick={centerCanvas} className="canvas-btn" title="Center & fit">
                    ⊞ Fit
                </button>
                <button
                    onClick={() => {
                        const container = containerRef.current
                        if (!container) return
                        const rect = container.getBoundingClientRect()
                        const cx = rect.width / 2
                        const cy = rect.height / 2
                        const s = scaleRef.current
                        const o = offsetRef.current
                        const ns = Math.min(s * 1.3, 4)
                        setScale(ns)
                        setOffset({
                            x: cx - (cx - o.x) * (ns / s),
                            y: cy - (cy - o.y) * (ns / s),
                        })
                    }}
                    className="canvas-btn"
                    title="Zoom in"
                >
                    +
                </button>
                <button
                    onClick={() => {
                        const container = containerRef.current
                        if (!container) return
                        const rect = container.getBoundingClientRect()
                        const cx = rect.width / 2
                        const cy = rect.height / 2
                        const s = scaleRef.current
                        const o = offsetRef.current
                        const ns = Math.max(s / 1.3, 0.08)
                        setScale(ns)
                        setOffset({
                            x: cx - (cx - o.x) * (ns / s),
                            y: cy - (cy - o.y) * (ns / s),
                        })
                    }}
                    className="canvas-btn"
                    title="Zoom out"
                >
                    −
                </button>
                <span className="canvas-zoom-label">{zoomPercent}%</span>
                <span className="canvas-debug" style={{ marginLeft: 10, fontSize: 10, opacity: 0.5 }}>
                    Nodes: {visibleNodes.length}/{data.nodes.length}
                </span>
            </nav>

            <div
                ref={containerRef}
                className={`canvas-container ${isDragging ? 'grabbing' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    ref={containerRef}
                    className="canvas-world"
                    style={{
                        width: svgW,
                        height: svgH,
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                        transformOrigin: '0 0',
                        // Force hardware acceleration
                        willChange: 'transform',
                    }}
                >
                    {/* Edges */}
                    <svg className="canvas-edges" width={svgW} height={svgH} style={{ pointerEvents: 'none' }}>
                        <defs>
                            <marker
                                id="arrow"
                                markerWidth="10"
                                markerHeight="8"
                                refX="10"
                                refY="4"
                                orient="auto"
                            >
                                <polygon points="0 0, 10 4, 0 8" fill="rgba(255,255,255,0.15)" />
                            </marker>
                        </defs>
                        {visibleEdges.map((edge) => {
                            const from = nodeMap.get(edge.fromNode)
                            const to = nodeMap.get(edge.toNode)
                            if (!from || !to) return null

                            const start = getSidePoint(from, edge.fromSide)
                            const end = getSidePoint(to, edge.toSide)

                            const sx = start.x - minX + padding
                            const sy = start.y - minY + padding
                            const ex = end.x - minX + padding
                            const ey = end.y - minY + padding

                            const dist = Math.abs(ex - sx) * 0.45
                            const c1x = sx + (edge.fromSide === 'right' ? dist : edge.fromSide === 'left' ? -dist : 0)
                            const c1y = sy + (edge.fromSide === 'bottom' ? dist : edge.fromSide === 'top' ? -dist : 0)
                            const c2x = ex + (edge.toSide === 'left' ? -dist : edge.toSide === 'right' ? dist : 0)
                            const c2y = ey + (edge.toSide === 'top' ? -dist : edge.toSide === 'bottom' ? dist : 0)

                            return (
                                <path
                                    key={edge.id}
                                    d={`M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="2"
                                    markerEnd="url(#arrow)"
                                />
                            )
                        })}
                    </svg>

                    {/* Nodes */}
                    {visibleNodes.map((node) => (
                        <CanvasNodeComponent
                            key={node.id}
                            node={node}
                            minX={minX}
                            minY={minY}
                            padding={padding}
                        />
                    ))}
                </div>
            </div>

        </section>
    )
}
