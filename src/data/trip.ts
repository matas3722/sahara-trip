export type TripDay = {
  date: string
  title: string
  route: string
  stops: string[]
  overnight: string
  note: string
  image: string
  accent: string
}

export const team = [
  { name: 'Matas', role: 'Pagrindinis vairuotojas', stat: 'Sako „dar 20 min.“', battery: 34 },
  { name: 'Ariana', role: 'Fotografė', stat: 'Ras geriausią kadrą', battery: 78 },
  { name: 'Adrijus', role: 'DJ', stat: 'Skipina po 18 sek.', battery: 61 },
  { name: 'Kornelija', role: 'Nakvynių ekspertė', stat: 'Tikrina reviews', battery: 84 },
  { name: 'Nojus', role: 'Navigatorius', stat: 'Maršrutas „beveik“ teisingas', battery: 49 },
]

export const tripDays: TripDay[] = [
  {
    date: 'RUG 25',
    title: 'Iš Marakešo į Atlasą',
    route: 'Marakešas → Aït Ben Haddou / Ouarzazate',
    stops: ['Tizi n’Tichka', 'Telouet', 'Aït Ben Haddou'],
    overnight: 'Aït Ben Haddou arba Ouarzazate',
    note: 'Po labai trumpo miego – pati optimistiškiausia vairavimo diena.',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1600&q=88',
    accent: '#f26a2e',
  },
  {
    date: 'RUG 26',
    title: 'Kelias į Dades',
    route: 'Ouarzazate → Dades slėnis',
    stops: ['Skoura', 'Rožių slėnis', 'Dades serpantinai'],
    overnight: 'Dades slėnyje',
    note: 'Vairuotojas žiūri į kelią. Visi kiti – pro langą.',
    image: 'https://images.unsplash.com/photo-1548018560-c7196548f7c2?auto=format&fit=crop&w=1600&q=88',
    accent: '#bf7843',
  },
  {
    date: 'RUG 27',
    title: 'Pagaliau – Merzouga',
    route: 'Dades → Todra → Merzouga',
    stops: ['Todra tarpeklis', 'Erfoud', 'Erg Chebbi'],
    overnight: 'Merzougoje',
    note: 'Ryte Dades, vakare pirmos tikros Sacharos kopos.',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=88',
    accent: '#dd9b42',
  },
  {
    date: 'RUG 28',
    title: 'Sacharos diena',
    route: 'Merzouga → Erg Chebbi',
    stops: ['Keturračiai', 'Kupranugariai', 'Saulėlydis'],
    overnight: 'Sacharos stovykloje',
    note: 'Instagramo turinys iki kitų metų ir smėlis visur.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=88',
    accent: '#e3a64d',
  },
  {
    date: 'RUG 29',
    title: 'Atgal per pietus',
    route: 'Merzouga → Agdz',
    stops: ['Rissani', 'Alnif', 'Drâa slėnis'],
    overnight: 'Agdz arba Drâa slėnyje',
    note: 'Kas miega automobilyje, netenka teisės kritikuoti muziką.',
    image: 'https://images.unsplash.com/photo-1548018560-c7196548f7c2?auto=format&fit=crop&w=1600&q=88',
    accent: '#8b5a3c',
  },
  {
    date: 'RUG 30',
    title: 'Grįžimas į Marakešą',
    route: 'Agdz → Marakešas',
    stops: ['Atlaso kalnai', 'Automobilio grąžinimas', 'Jemaa el-Fnaa'],
    overnight: 'Marakeše',
    note: 'Dusterį grąžiname tokį patį. Bent jau iš toliau.',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1600&q=88',
    accent: '#9c4a31',
  },
]

export const initialTasks = [
  { id: '1', title: 'Patvirtinti tikslius skrydžių laikus', done: false },
  { id: '2', title: 'Užsakyti nakvynę Dades slėnyje', done: false },
  { id: '3', title: 'Patvirtinti Merzougos nakvynę', done: false },
  { id: '4', title: 'Užsakyti Sacharos stovyklą', done: false },
  { id: '5', title: 'Galutinai patvirtinti Dusterį', done: true },
  { id: '6', title: 'Nusipirkti eSIM', done: false },
  { id: '7', title: 'Sudėti bendrą playlistą', done: false },
  { id: '8', title: 'Suplanuoti 18 val. Bulgarijoje', done: false },
]

export const packing = [
  { id: 'p1', title: 'Pasai ir dokumentų kopijos', owner: 'Matas' },
  { id: 'p2', title: 'Powerbankai ir laidai', owner: 'Adrijus' },
  { id: 'p3', title: 'Kremas nuo saulės', owner: 'Kornelija' },
  { id: 'p4', title: 'Veiksmo kamera', owner: 'Nojus' },
  { id: 'p5', title: 'Kelionės draudimas', owner: 'Ariana' },
  { id: 'p6', title: 'Automobilinis įkroviklis', owner: 'Adrijus' },
]
