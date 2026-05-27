import { useMemo, useState, type FormEvent } from 'react'
import { MaxHeap } from './utils/maxHeap'
import { Trie } from './utils/trie'
import { UndirectedGraph } from './utils/graph'
import type { Song } from './types/music'
import './App.scss'

const baseSongs = [
  {
    id: 's1',
    title: 'Canguro',
    artist: 'Wos',
    genre: 'Rap',
    plays: 2840,
  },
  {
    id: 's2',
    title: 'Lo Malo de Ser Bueno',
    artist: 'El Cuarteto de Nos',
    genre: 'Rock',
    plays: 3120,
  },
  {
    id: 's3',
    title: 'Tú Me Dejaste de Querer',
    artist: 'C. Tangana',
    genre: 'Flamenco urbano',
    plays: 2980,
  },
  {
    id: 's4',
    title: 'Stronger',
    artist: 'Kanye West',
    genre: 'Hip hop',
    plays: 2550,
  },
  {
    id: 's5',
    title: 'Yendo a la Casa de Damián',
    artist: 'El Cuarteto de Nos',
    genre: 'Rock',
    plays: 2265,
  },
  {
    id: 's6',
    title: 'Gold Digger',
    artist: 'Kanye West',
    genre: 'Hip hop',
    plays: 2890,
  },
  {
    id: 's7',
    title: 'Melón Vino',
    artist: 'Wos',
    genre: 'Rap',
    plays: 2740,
  },
  {
    id: 's8',
    title: 'Nunca Estoy',
    artist: 'C. Tangana',
    genre: 'Flamenco urbano',
    plays: 2410,
  },
  {
    id: 's9',
    title: 'Ya No Sé Qué Hacer Conmigo',
    artist: 'El Cuarteto de Nos',
    genre: 'Rock',
    plays: 2670,
  },
  {
    id: 's10',
    title: 'Flashing Lights',
    artist: 'Kanye West',
    genre: 'Hip hop',
    plays: 3030,
  },
  {
    id: 's11',
    title: 'Ateo',
    artist: 'C. Tangana & Nathy Peluso',
    genre: 'Flamenco urbano',
    plays: 2585,
  },
  {
    id: 's12',
    title: '44',
    artist: 'Wos',
    genre: 'Rap',
    plays: 2195,
  },
  {
    id: 's13',
    title: 'POWER',
    artist: 'Kanye West',
    genre: 'Hip hop',
    plays: 2910,
  },
  {
    id: 's14',
    title: 'Contrapunto Para Humano y Computadora',
    artist: 'El Cuarteto de Nos',
    genre: 'Rock',
    plays: 2080,
  },
] as const

type SongFormState = {
  title: string
  artist: string
  genre: string
  plays: string
  relatedSongIds: string
}

const emptyForm: SongFormState = {
  title: '',
  artist: '',
  genre: '',
  plays: '',
  relatedSongIds: '',
}

function createSeededRandom(seed: number) {
  let state = seed

  return () => {
    state += 0x6d2b79f5
    let value = Math.imul(state ^ (state >>> 15), state | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(values: T[], random: () => number) {
  const copy = [...values]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }

  return copy
}

function buildRandomRelations(songBase: typeof baseSongs) {
  const random = createSeededRandom(27)
  const relatedSongSets = new Map(songBase.map((song) => [song.id, new Set<string>()]))

  songBase.forEach((song, index) => {
    const candidates = shuffle(
      songBase.map((candidate) => candidate.id).filter((songId) => songId !== song.id),
      random,
    )
    const relationCount = 2 + Math.floor(random() * 3)

    candidates.slice(0, relationCount).forEach((candidateId) => {
      relatedSongSets.get(song.id)!.add(candidateId)
      relatedSongSets.get(candidateId)!.add(song.id)
    })

    if (relatedSongSets.get(song.id)!.size === 0) {
      const fallbackId = songBase[(index + 1) % songBase.length].id
      relatedSongSets.get(song.id)!.add(fallbackId)
      relatedSongSets.get(fallbackId)!.add(song.id)
    }
  })

  return songBase.map((song) => ({
    ...song,
    relatedSongIds: Array.from(relatedSongSets.get(song.id)!).sort(),
  })) satisfies Song[]
}

const initialSongs = buildRandomRelations(baseSongs)

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

function buildTrie(songs: Song[]) {
  const trie = new Trie<Song>((song) => song.title)

  songs.forEach((song) => {
    trie.insert(song)
  })

  return trie
}

function buildHeapRanking(songs: Song[]) {
  const heap = new MaxHeap<Song>((left, right) => left.plays - right.plays)

  songs.forEach((song) => {
    heap.push(song)
  })

  return heap.toSortedArray()
}

function buildGraph(songs: Song[]) {
  const graph = new UndirectedGraph<string>()

  songs.forEach((song) => {
    graph.addNode(song.id)
  })

  songs.forEach((song) => {
    song.relatedSongIds.forEach((relatedSongId) => {
      graph.addEdge(song.id, relatedSongId)
    })
  })

  return graph
}

function formatPlays(plays: number) {
  return new Intl.NumberFormat('es-ES').format(plays)
}

function App() {
  const [songs, setSongs] = useState<Song[]>(initialSongs)
  const [selectedSongId, setSelectedSongId] = useState<string>(initialSongs[0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [form, setForm] = useState<SongFormState>(emptyForm)

  const songsById = useMemo(() => new Map(songs.map((song) => [song.id, song])), [songs])
  const trie = useMemo(() => buildTrie(songs), [songs])
  const graph = useMemo(() => buildGraph(songs), [songs])
  const ranking = useMemo(() => buildHeapRanking(songs), [songs])
  const selectedSong = songsById.get(selectedSongId) ?? songs[0]

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) {
      return []
    }

    return trie.suggestByPrefix(searchQuery, 6)
  }, [searchQuery, trie])

  const recommendedSongs = useMemo(() => {
    if (!selectedSong) {
      return []
    }

    const directRecommendations = graph.recommend(selectedSong.id, songsById, 3)

    return directRecommendations.map((song) => ({
      song,
      relationLevel: selectedSong.relatedSongIds.includes(song.id)
        ? 'Parecida a esta cancion'
        : 'Te puede interesar...',
    }))
  }, [graph, selectedSong, songsById])

  const handleSelectSong = (song: Song) => {
    setSelectedSongId(song.id)
    setSearchQuery(song.title)
  }

  const resolveRelatedSongIds = (value: string) => {
    const references = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    const lookup = new Map(songs.map((song) => [normalizeText(song.title), song.id]))

    return Array.from(
      new Set(
        references
          .map((item) => lookup.get(normalizeText(item)))
          .filter((songId): songId is string => Boolean(songId)),
      ),
    )
  }

  const resetForm = () => {
    setForm(emptyForm)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const title = form.title.trim()
    const artist = form.artist.trim()
    const genre = form.genre.trim()
    const plays = Number(form.plays)

    if (!title || !artist || !genre || Number.isNaN(plays) || plays < 0) {
      return
    }

    const relatedSongIds = resolveRelatedSongIds(form.relatedSongIds)

    const newSong: Song = {
      id: `song-${Date.now()}`,
      title,
      artist,
      genre,
      plays,
      relatedSongIds,
    }

    setSongs((currentSongs) => [...currentSongs, newSong])
    setSelectedSongId(newSong.id)
    setSearchQuery(title)
    setForm(emptyForm)
  }

  const totalPlays = useMemo(
    () => songs.reduce((sum, song) => sum + song.plays, 0),
    [songs],
  )

  const averagePlays = songs.length ? Math.round(totalPlays / songs.length) : 0

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Next Song Studio</p>
          <h1>Una playlist simple para tus canciones favoritas.</h1>
          <p className="lead">Agrega tus canciones favoritas y organiza tu playlist con Next Song Studio!</p>

          <div className="hero-metrics">
            <article>
              <span>Canciones totales</span>
              <strong>{songs.length}</strong>
            </article>
            <article>
              <span>Reproducciones</span>
              <strong>{formatPlays(totalPlays)}</strong>
            </article>
            <article>
              <span>Promedio</span>
              <strong>{formatPlays(averagePlays)}</strong>
            </article>
          </div>
        </div>

        <form className="song-form card" onSubmit={handleSubmit}>
          <div className="card-heading">
            <div>
              <p className="card-kicker">Añadir canciones</p>
              <h2>Guarda una canción nueva</h2>
            </div>
          </div>

          <label>
            Título
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            />
          </label>

          <div className="two-columns">
            <label>
              Artista
              <input
                value={form.artist}
                onChange={(event) => setForm((current) => ({ ...current, artist: event.target.value }))}
              />
            </label>
            <label>
              Género
              <input
                value={form.genre}
                onChange={(event) => setForm((current) => ({ ...current, genre: event.target.value }))}
              />
            </label>
          </div>

          <div className="two-columns">
            <label>
              Reproducciones
              <input
                type="number"
                min="0"
                value={form.plays}
                onChange={(event) => setForm((current) => ({ ...current, plays: event.target.value }))}
              />
            </label>
            <label>
              Relacionadas
              <input
                value={form.relatedSongIds}
                onChange={(event) =>
                  setForm((current) => ({ ...current, relatedSongIds: event.target.value }))
                }
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="ghost-button" onClick={resetForm}>
              Limpiar
            </button>
            <button type="submit" className="primary-button">
              Añadir canción
            </button>
          </div>
        </form>
      </section>

      <section className="dashboard-grid">
        <article className="card search-card">
          <div className="card-heading">
            <div>
              <p className="card-kicker">Buscador</p>
              <h2>Encuentra canciones escribiendo su titulo</h2>
            </div>
          </div>

          <input
            className="search-input"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <div className="mini-list">
            {suggestions.length ? (
              suggestions.map((song) => (
                <button
                  key={song.id}
                  type="button"
                  className="result-row"
                  onClick={() => handleSelectSong(song)}
                >
                  <strong>{song.title}</strong>
                  <span>
                    {song.artist} · {song.genre}
                  </span>
                </button>
              ))
            ) : (
              <p className="empty-state">Escribe al menos un carácter para mostrar sugerencias.</p>
            )}
          </div>
        </article>

        <article className="card ranking-card">
          <div className="card-heading">
            <div>
              <p className="card-kicker">Ranking</p>
              <h2>Canciones más escuchadas</h2>
            </div>
          </div>

          <ol className="ranking-list">
            {ranking.slice(0, 5).map((song, index) => (
              <li key={song.id}>
                <button type="button" className="ranking-row" onClick={() => handleSelectSong(song)}>
                  <span className="ranking-position">{index + 1}</span>
                  <span className="ranking-meta">
                    <strong>{song.title}</strong>
                    <span>{song.artist}</span>
                  </span>
                  <span className="ranking-plays">{formatPlays(song.plays)}</span>
                </button>
              </li>
            ))}
          </ol>
        </article>

        <article className="card recommendations-card">
          <div className="card-heading">
            <div>
              <p className="card-kicker">Relaciones</p>
              <h2>Recomendaciones relacionadas</h2>
            </div>
          </div>

          {selectedSong ? (
            <div className="selected-song">
              <p className="selected-label">Selección actual</p>
              <h3>{selectedSong.title}</h3>
              <p>
                {selectedSong.artist} · {selectedSong.genre}
              </p>
            </div>
          ) : null}

          <div className="recommendation-list">
            {recommendedSongs.length ? (
              recommendedSongs.map(({ song, relationLevel }) => (
                <button
                  key={song.id}
                  type="button"
                  className="recommendation-row"
                  onClick={() => handleSelectSong(song)}
                >
                  <div>
                    <strong>{song.title}</strong>
                    <span>{song.artist}</span>
                  </div>
                  <p>{relationLevel}</p>
                </button>
              ))
            ) : (
              <p className="empty-state">Selecciona una canción para ver sus conexiones.</p>
            )}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
