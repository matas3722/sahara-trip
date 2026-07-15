# Iš Kauno į Saharą — bendra kelionės svetainė

React + Vite svetainė su:
- esamu kelionės pristatymu ir komandos nuotraukomis;
- interaktyviu Leaflet / OpenStreetMap žemėlapiu;
- vietų paieška per Nominatim;
- realiu automobilių maršrutu per OSRM;
- bendru kelionės dienoraščiu;
- bendra nuotraukų galerija per Supabase;
- fullscreen nuotraukų peržiūra, aprašymais ir trynimu.

## 1. Sukurk Supabase projektą

1. Prisijunk prie `supabase.com` ir sukurk naują projektą.
2. Atidaryk **SQL Editor**.
3. Nukopijuok visą failo `supabase/schema.sql` turinį ir spausk **Run**.
4. Supabase skiltyje **Connect** nukopijuok:
   - Project URL;
   - Publishable key / anon key.

## 2. Pridėk kintamuosius Vercel

Vercel projekte atidaryk:

**Settings → Environment Variables**

Pridėk:

```text
VITE_SUPABASE_URL=https://TAVO-PROJEKTAS.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=TAVO_PUBLISHABLE_KEY
VITE_TRIP_ID=kaunas-sahara-2026
```

Pažymėk Production, Preview ir Development. Išsaugojęs sukurk naują deploymentą arba įkelk naują commitą į GitHub.

## 3. Įkelk į GitHub

Į esamą `sahara-trip` repozitoriją įkelk visus šio aplanko failus ant senų ir pasirink **Commit directly to main**.

Svarbu įkelti ir naujus failus:
- `.env.example`;
- `supabase/schema.sql`;
- `src/lib/supabase.js`;
- atnaujintą `src/main.jsx`;
- atnaujintą `src/styles.css`;
- `package.json`.

Vercel po commit turėtų automatiškai įdiegti naują versiją.

## Kaip veikia bendras albumas

Visi, atidarę tą pačią svetainę, matys tuos pačius sustojimus, užrašus ir nuotraukas. Duomenys saugomi Supabase, todėl jie neliks tik viename telefone.

Ši versija skirta privačiai draugų nuorodai. Pagal pateiktas SQL taisykles visi, turintys svetainės nuorodą, gali pridėti, redaguoti ir trinti turinį. Viešai reklamuojamai svetainei vėliau verta pridėti prisijungimą arba bendrą kelionės kodą su saugesnėmis serverio taisyklėmis.

## Vietinis paleidimas

```bash
cp .env.example .env.local
# Įrašyk tikrus Supabase duomenis į .env.local
npm install
npm run dev
```
