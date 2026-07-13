import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDown, BedDouble, CalendarDays, Camera, Check, ChevronRight,
  Clock3, MapPinned, Moon, Music2, Navigation, Plane, Plus, Route,
  Sparkles, Sun, TentTree, UsersRound, X
} from 'lucide-react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { initialTasks, packing, team, tripDays, type TripDay } from './data/trip'

const markerIcon = L.divIcon({
  className: 'custom-marker',
  html: '<span></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
})

const countdownTarget = new Date('2026-08-24T02:30:00+03:00').getTime()

function useCountdown() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])
  const distance = Math.max(0, countdownTarget - now)
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor(distance / 3_600_000) % 24,
    minutes: Math.floor(distance / 60_000) % 60,
    seconds: Math.floor(distance / 1000) % 60,
  }
}

function SectionTitle({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-index">{index}</span>
        <span className="eyebrow-dark">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <p>{copy}</p>
    </div>
  )
}

function TripModal({ day, onClose }: { day: TripDay | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {day && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.article
            className="trip-modal"
            initial={{ opacity: 0, y: 40, scale: .97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: .98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="icon-button close-button" onClick={onClose}><X size={20} /></button>
            <img src={day.image} alt={day.title} />
            <div className="trip-modal-content">
              <span className="date-chip">{day.date}</span>
              <h3>{day.title}</h3>
              <p className="route-line"><Route size={17} /> {day.route}</p>
              <div className="modal-grid">
                <div><span>Sustojimai</span>{day.stops.map((stop) => <b key={stop}>{stop}</b>)}</div>
                <div><span>Nakvynė</span><b><BedDouble size={16} /> {day.overnight}</b></div>
              </div>
              <blockquote>“{day.note}”</blockquote>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const countdown = useCountdown()
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, .25], [0, 110])
  const [selectedDay, setSelectedDay] = useState<TripDay | null>(null)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('sahara-tasks-v3')
    return saved ? JSON.parse(saved) as typeof initialTasks : initialTasks
  })
  const [packed, setPacked] = useState<string[]>(() => JSON.parse(localStorage.getItem('sahara-packed-v3') || '[]'))
  const [dark, setDark] = useState(false)
  const [toast, setToast] = useState('')
  const [middleSeat, setMiddleSeat] = useState('')
  const [song, setSong] = useState('')
  const [playlist, setPlaylist] = useState<string[]>(() => JSON.parse(localStorage.getItem('sahara-playlist-v3') || '["Desert Rose — Sting","Road Trippin’ — Red Hot Chili Peppers"]'))

  useEffect(() => { localStorage.setItem('sahara-tasks-v3', JSON.stringify(tasks)) }, [tasks])
  useEffect(() => { localStorage.setItem('sahara-packed-v3', JSON.stringify(packed)) }, [packed])
  useEffect(() => { localStorage.setItem('sahara-playlist-v3', JSON.stringify(playlist)) }, [playlist])

  const preparedness = useMemo(() => {
    const completed = tasks.filter((task) => task.done).length + packed.length
    const total = tasks.length + packing.length
    return Math.round((completed / total) * 100)
  }, [tasks, packed])

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const chooseMiddleSeat = () => {
    const candidates = team.map((person) => person.name)
    const choice = candidates[Math.floor(Math.random() * candidates.length)]
    setMiddleSeat(choice)
  }

  const addSong = () => {
    const clean = song.trim()
    if (!clean) return
    setPlaylist((current) => [clean, ...current])
    setSong('')
  }

  const mapPoints: [number, number][] = [
    [54.8985, 23.9036], [52.2297, 21.0122], [41.9028, 12.4964], [31.6295, -7.9811],
    [31.047, -7.129], [31.508, -5.918], [31.0801, -4.0134], [30.693, -6.446], [42.6977, 23.3219],
  ]

  const mapLabels = ['Kaunas', 'Varšuva', 'Italija', 'Marakešas', 'Aït Ben Haddou', 'Dades', 'Merzouga', 'Agdz', 'Bulgarija']

  return (
    <main className={dark ? 'app dark' : 'app'}>
      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <nav className="topbar">
        <a className="brand" href="#top"><span>SAHARA</span> 2026</a>
        <div className="nav-links">
          <a href="#route">Maršrutas</a>
          <a href="#crew">Komanda</a>
          <a href="#ready">Pasiruošimas</a>
          <a href="#map">Žemėlapis</a>
        </div>
        <button className="icon-button" onClick={() => setDark((value) => !value)} aria-label="Keisti temą">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      <section id="top" className="hero">
        <motion.div className="hero-media" style={{ y: heroY }}>
          <img src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2200&q=92" alt="Sacharos kopos" />
        </motion.div>
        <div className="hero-overlay" />
        <div className="hero-content container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
            <span className="hero-kicker"><Sparkles size={15} /> 5 žmonės · 1 automobilis · 1600+ km</span>
            <h1>Pakeliui<br />į Sacharą.</h1>
            <p>Matas, Ariana, Adrijus, Kornelija ir Nojus. Iš Kauno autobusų stoties iki Erg Chebbi kopų.</p>
          </motion.div>

          <motion.div className="countdown" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7 }}>
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{({ days: 'dienos', hours: 'val.', minutes: 'min.', seconds: 'sek.' } as Record<string, string>)[label]}</span></div>
            ))}
          </motion.div>

          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>
            <a className="primary-button" href="#route">Žiūrėti maršrutą <ArrowDown size={17} /></a>
            <button className="ghost-button" onClick={() => showToast('Ne, bet važiuojam.')}>Ar mes pasiruošę?</button>
          </motion.div>
        </div>
        <div className="hero-route container">
          {['Kaunas', 'Varšuva', 'Italija', 'Marakešas', 'Dades', 'Merzouga'].map((place, index, array) => (
            <div key={place} className="hero-route-item"><span>{place}</span>{index < array.length - 1 && <ChevronRight size={15} />}</div>
          ))}
        </div>
      </section>

      <section id="route" className="section container">
        <SectionTitle index="01" eyebrow="MAROKO ROAD TRIP" title="Kelias iki Sacharos" copy="Svarbiausia logika paprasta: 26 dieną nakvojame Dades slėnyje, o 27 dieną per Todros tarpeklį pasiekiame Merzougą." />
        <div className="timeline-rail">
          {tripDays.map((day, index) => (
            <motion.button
              key={day.date}
              className="trip-card"
              onClick={() => setSelectedDay(day)}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: .25 }}
              transition={{ delay: index * .06 }}
              whileHover={{ y: -8 }}
            >
              <img src={day.image} alt={day.title} />
              <div className="trip-card-gradient" />
              <div className="trip-card-copy">
                <span>{day.date}</span>
                <h3>{day.title}</h3>
                <p>{day.route}</p>
                <div className="overnight"><BedDouble size={15} /> {day.overnight}</div>
              </div>
              <div className="trip-card-number">0{index + 1}</div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="stay-section">
        <div className="container stay-layout">
          <div>
            <span className="eyebrow-dark">NAKVYNIŲ LOGIKA</span>
            <h2>Dades pirmiau.<br />Merzouga kitą dieną.</h2>
          </div>
          <div className="stay-track">
            {[
              ['25 d.', 'Aït Ben Haddou / Ouarzazate'],
              ['26 d.', 'Dades slėnis'],
              ['27 d.', 'Merzouga'],
              ['28 d.', 'Sacharos stovykla'],
              ['29 d.', 'Agdz / Drâa'],
            ].map(([date, place], index) => (
              <div className="stay-stop" key={place}>
                <div className="stay-dot"><BedDouble size={17} /></div>
                <div><small>{date}</small><b>{place}</b></div>
                {index < 4 && <div className="stay-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="crew" className="section container">
        <SectionTitle index="02" eyebrow="KOMANDA" title="Penki žmonės, penkios problemos" copy="Ne profilio formos, o aiškios rolės ir vienas svarbus faktas apie kiekvieną." />
        <div className="crew-grid">
          {team.map((person, index) => (
            <motion.article className="crew-card" key={person.name} whileHover={{ y: -8 }}>
              <div className={`portrait portrait-${index + 1}`}><span>{person.name[0]}</span></div>
              <div className="crew-copy">
                <span>{person.role}</span>
                <h3>{person.name}</h3>
                <p>{person.stat}</p>
                <div className="battery"><div style={{ width: `${person.battery}%` }} /><small>Miego atsargos {person.battery}%</small></div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="ready" className="section container">
        <SectionTitle index="03" eyebrow="PASIRUOŠIMAS" title={`${preparedness}% pasiruošę`} copy="Užduotys ir daiktai vienoje vietoje. Žymint progresas iškart keičiasi." />
        <div className="readiness-bar"><motion.div animate={{ width: `${preparedness}%` }} /></div>
        <div className="ready-grid">
          <article className="panel">
            <div className="panel-title"><div><Check size={18} /><h3>Ką dar reikia padaryti</h3></div><span>{tasks.filter((task) => !task.done).length} liko</span></div>
            <div className="check-list">
              {tasks.map((task) => (
                <label className={task.done ? 'checked' : ''} key={task.id}>
                  <input type="checkbox" checked={task.done} onChange={() => setTasks((current) => current.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))} />
                  <span className="fake-check"><Check size={14} /></span>
                  <b>{task.title}</b>
                </label>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-title"><div><TentTree size={18} /><h3>Bendri daiktai</h3></div><span>{packed.length}/{packing.length}</span></div>
            <div className="check-list">
              {packing.map((item) => {
                const done = packed.includes(item.id)
                return (
                  <label className={done ? 'checked' : ''} key={item.id}>
                    <input type="checkbox" checked={done} onChange={() => setPacked((current) => done ? current.filter((id) => id !== item.id) : [...current, item.id])} />
                    <span className="fake-check"><Check size={14} /></span>
                    <b>{item.title}</b><small>{item.owner}</small>
                  </label>
                )
              })}
            </div>
          </article>
        </div>
      </section>

      <section id="map" className="map-section">
        <div className="container">
          <SectionTitle index="04" eyebrow="ŽEMĖLAPIS" title="Nuo Kauno iki kopų" copy="Kelionė per Europą, tada visas Maroko ratas viename žemėlapyje." />
          <div className="map-card">
            <MapContainer center={[36, 8]} zoom={4} scrollWheelZoom={false}>
              <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Polyline positions={mapPoints} pathOptions={{ color: '#f26a2e', weight: 4, dashArray: '9 11' }} />
              {mapPoints.map((position, index) => (
                <Marker position={position} icon={markerIcon} key={mapLabels[index]}>
                  <Popup><b>{mapLabels[index]}</b><br />{index === 5 ? 'Nakvynė Dades slėnyje' : index === 6 ? 'Merzouga ir Sachara' : 'Kelionės taškas'}</Popup>
                </Marker>
              ))}
            </MapContainer>
            <div className="map-floating"><MapPinned size={18} /><span>Marakešas → Dades → Merzouga → Agdz</span></div>
          </div>
        </div>
      </section>

      <section className="section container fun-grid">
        <article className="middle-seat-card">
          <div className="fun-icon"><UsersRound /></div>
          <span className="eyebrow-dark">LABAI SVARBUS SPRENDIMAS</span>
          <h2>Kas sėdi per vidurį?</h2>
          <AnimatePresence mode="wait">
            <motion.div className="middle-result" key={middleSeat || 'empty'} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {middleSeat || 'Spausk. Likimas nuspręs.'}
            </motion.div>
          </AnimatePresence>
          <button className="primary-button" onClick={chooseMiddleSeat}>Traukti burtus <Sparkles size={17} /></button>
        </article>

        <article className="playlist-card">
          <div className="panel-title"><div><Music2 size={18} /><h3>Road trip playlistas</h3></div><span>{playlist.length} dainos</span></div>
          <div className="song-form"><input value={song} onChange={(event) => setSong(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addSong()} placeholder="Daina — atlikėjas" /><button onClick={addSong}><Plus size={18} /></button></div>
          <div className="songs">
            {playlist.map((item, index) => <div key={`${item}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><b>{item}</b></div>)}
          </div>
        </article>
      </section>

      <footer>
        <div className="container footer-inner">
          <div><span className="brand"><span>SAHARA</span> 2026</span><p>Penki žmonės. Vienas Dusteris. Labai daug smėlio.</p></div>
          <div className="footer-meta"><span><CalendarDays size={15} /> 2026-08-24</span><span><Navigation size={15} /> Kaunas → Merzouga</span><span><Plane size={15} /> 4 skrydžiai</span></div>
        </div>
      </footer>

      <TripModal day={selectedDay} onClose={() => setSelectedDay(null)} />
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{toast}</motion.div>}</AnimatePresence>
    </main>
  )
}

export default App
