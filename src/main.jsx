import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, Bus, Plane, CarFront, MapPin, Music2, Camera, Smartphone, Moon, Navigation, Gauge } from 'lucide-react';
import './styles.css';

const crew = [
  {
    name: 'Matas',
    role: 'Kelionės organizatorius',
    image: '/images/matas.png',
    icon: Gauge,
    text: 'Vairuotojas, planuotojas ir žmogus, kuris dar prieš kelionę žino, kur sustosim pavalgyti. Tikėtina, kad dažniausiai sakys: „ramiai, viską spėjam“.'
  },
  {
    name: 'Ariana',
    role: 'Kelionės filmuotoja',
    image: '/images/ariana.png',
    icon: Moon,
    text: 'Pramiega pusę kelionės, bet atsibunda tiksliai tada, kai reikia nufilmuoti gražiausią vaizdą. Atsakinga už video archyvą ir geriausius prisiminimus.'
  },
  {
    name: 'Kornelija',
    role: 'Fotografė',
    image: '/images/kornelija.jpg',
    icon: Smartphone,
    text: 'Fotografė, turinio kūrėja ir žmogus, kurio telefonas kelionėje dirbs viršvalandžius. Jeigu nėra nuotraukos – vadinasi, nebuvo.'
  },
  {
    name: 'Nojus',
    role: 'DJ žmogus',
    image: '/images/nojus.jpg',
    icon: Music2,
    text: 'Atsakingas už muziką automobilyje ir su viskuo sutinka. Pasakai „važiuojam“ – važiuoja. Pasakai „dar viena stotelė“ – irgi gerai.'
  },
  {
    name: 'Adrijus',
    role: 'Navigatorius',
    image: '/images/adrijus.jpeg',
    icon: Navigation,
    text: 'Kelionės metu nemiega, seka kelią ir laiku pamato posūkį, kurį visi kiti būtų pravažiavę. Žmogus, kuriuo pasitikim labiau nei Google Maps.'
  }
];

const route = [
  { place: 'Kauno autobusų stotis', note: 'Kelionės pradžia', icon: Bus },
  { place: 'Varšuva', note: 'Trumpas poilsis ir kelias į oro uostą', icon: MapPin },
  { place: 'Milanas · Malpensa', note: 'Persėdimas Italijoje', icon: Plane },
  { place: 'Marakešas', note: 'Čia prasideda tikras nuotykis', icon: Plane },
  { place: 'Atlaso kalnai', note: 'Posūkiai, vaizdai ir pirmas rimtas testas Dusteriui', icon: CarFront },
  { place: 'Sachara', note: 'Pagrindinis kelionės tikslas', icon: MapPin },
  { place: 'Bulgarija', note: 'Ilgas persėdimas grįžtant', icon: Plane },
  { place: 'Lenkija', note: 'Paskutinis skrydis ir autobusas namo', icon: Plane },
  { place: 'Kaunas', note: 'Grįžtam su per daug nuotraukų ir istorijų', icon: Bus }
];

function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    const diff = Math.max(0, target.getTime() - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const minutes = Math.floor((diff / 60000) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }, [now, target]);
}

function App() {
  const countdown = useCountdown(new Date('2026-08-24T02:30:00+03:00'));

  return (
    <main>
      <section className="hero">
        <img className="hero-image" src="/images/group.jpeg" alt="Kelionės komanda prie krioklio" />
        <div className="hero-overlay" />
        <nav className="nav shell">
          <span className="brand">KNS / 2026</span>
          <div className="nav-links">
            <a href="#crew">Komanda</a>
            <a href="#route">Maršrutas</a>
            <a href="#car">Dusteris</a>
          </div>
        </nav>
        <div className="hero-content shell">
          <p className="eyebrow">24–31 RUGPJŪČIO · 5 DRAUGAI · 1 NUOTYKIS</p>
          <h1>Iš Kauno<br />į Saharą</h1>
          <p className="lead">Penki draugai, viena Dacia ir maršrutas, kuris prasideda Kauno autobusų stotyje, o baigiasi tarp Sacharos kopų.</p>
          <div className="hero-actions">
            <a className="primary" href="#route">Žiūrėti maršrutą <ArrowDown size={18} /></a>
            <span className="tiny">Inshallah, grįšim.</span>
          </div>
        </div>
      </section>

      <section className="countdown-section">
        <div className="shell countdown-wrap">
          <div>
            <p className="eyebrow dark">IKI IŠVYKIMO</p>
            <h2>Laikas tiksi.</h2>
          </div>
          <div className="countdown">
            {Object.entries(countdown).map(([key, val]) => (
              <div className="time" key={key}><strong>{String(val).padStart(2,'0')}</strong><span>{{days:'dienos',hours:'val.',minutes:'min.',seconds:'sek.'}[key]}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section id="crew" className="section shell">
        <div className="section-head">
          <p className="eyebrow dark">KOMANDA</p>
          <h2>Penki žmonės.<br />Penki skirtingi darbai.</h2>
          <p>Ir maždaug nulis šansų, kad viskas vyks tiksliai pagal planą.</p>
        </div>
        <div className="crew-grid">
          {crew.map((person, index) => {
            const Icon = person.icon;
            return (
              <article className={`crew-card card-${index+1}`} key={person.name}>
                <img src={person.image} alt={person.name} />
                <div className="crew-shade" />
                <div className="crew-copy">
                  <div className="crew-icon"><Icon size={18} /></div>
                  <span>{person.role}</span>
                  <h3>{person.name}</h3>
                  <p>{person.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="route" className="route-section">
        <div className="shell route-layout">
          <div className="route-intro">
            <p className="eyebrow">MARŠRUTAS</p>
            <h2>Nuo stoties<br />iki kopų.</h2>
            <p>Autobusai, keturi oro uostai, ilgi persėdimai ir keli šimtai kilometrų per Maroką.</p>
          </div>
          <div className="route-list">
            {route.map((stop, i) => {
              const Icon = stop.icon;
              return (
                <div className="route-stop" key={stop.place}>
                  <div className="route-no">{String(i+1).padStart(2,'0')}</div>
                  <div className="route-icon"><Icon size={20}/></div>
                  <div><h3>{stop.place}</h3><p>{stop.note}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="car" className="car-section">
        <div className="shell car-card">
          <div className="car-copy">
            <p className="eyebrow dark">MŪSŲ KOVOS VEŽIMAS</p>
            <h2>Dacia Duster<br />2026</h2>
            <p>Penki žmonės, bagažas savaitei, Atlaso kalnų serpantinai ir ilgas kelias iki dykumos. Automobilis dar nežino, kas jo laukia.</p>
            <div className="car-tags"><span>5 keleiviai</span><span>SUV</span><span>Maroko keliai</span><span>Dideli planai</span></div>
          </div>
          <div className="car-visual" aria-label="Stilizuotas Dacia Duster siluetas">
            <div className="sun" />
            <div className="dune dune-one" />
            <div className="dune dune-two" />
            <CarFront size={148} strokeWidth={1.2} />
            <strong>DUSTER</strong>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-wrap">
          <div><p className="eyebrow">PASKUTINIS PLANAS</p><h2>Važiuojam ir žiūrim.</h2></div>
          <p>Kaunas → Varšuva → Malpensa → Marakešas → Sahara → Bulgarija → Lenkija → Kaunas</p>
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
