import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { StepMap as StepMapData } from '../types'

// Real street map (OpenStreetMap tiles) with one highlighted area and a
// few labelled places. Loaded lazily so Leaflet isn't in the main bundle.
export default function StepMap({ map }: { map: StepMapData }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const m = L.map(ref.current, {
      scrollWheelZoom: false,  // don't hijack page scrolling with the mouse wheel
      zoomSnap: 0.25,
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(m)

    const area = L.polygon(map.highlight.polygon, {
      color: '#0f766e',
      weight: 3,
      dashArray: '6 4',
      fillColor: '#14b8a6',
      fillOpacity: 0.35,
    }).addTo(m)
    area.bindTooltip(map.highlight.name, {
      permanent: true,
      direction: 'top',
      offset: [0, -14],
      className: 'map-label map-label--highlight',
    })

    for (const p of map.places) {
      L.circleMarker([p.lat, p.lng], {
        radius: 5,
        color: '#ffffff',
        weight: 2,
        fillColor: '#334155',
        fillOpacity: 1,
      })
        .bindTooltip(p.name, { permanent: true, direction: p.direction ?? 'right', className: 'map-label' })
        .addTo(m)
    }

    m.fitBounds(map.bounds, { padding: [4, 4] })
    return () => {
      m.remove()
    }
  }, [map])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={map.alt}
      className="w-full h-72 sm:h-96 rounded-xl border border-slate-200 overflow-hidden z-0"
    />
  )
}
