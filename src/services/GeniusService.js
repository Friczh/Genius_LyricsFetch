// ─────────────────────────────────────────────
//  GeniusService.js
//  Ported from EeveeSpotifyReborn (Swift)
//  No token needed — uses genius.com/api directly
// ─────────────────────────────────────────────

const BASE_URL = 'https://genius.com/api';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/91.0 Mobile Safari/537.36',
  'Accept': 'application/json',
};

export async function searchSong(query) {
  const url = `${BASE_URL}/search/multi?per_page=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);

  const json = await res.json();
  const sections = json?.response?.sections;
  if (!sections?.length) throw new Error('No results found');

  const hits = sections.flatMap(s => s.hits ?? []);
  if (!hits.length) throw new Error('No hits found');

  const result = hits[0].result;
  return {
    id: result.id,
    title: result.title,
    artistNames: result.artist_names ?? result.artistNames,
    thumbnail: result.song_art_image_thumbnail_url,
    url: result.url,
  };
}

export async function fetchLyrics(songId) {
  const url = `${BASE_URL}/songs/${songId}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`Lyrics fetch failed: ${res.status}`);

  const json = await res.json();
  const plain = json?.response?.song?.lyrics?.plain;
  if (!plain) throw new Error('Lyrics not available for this song');
  return plain;
}

export async function getLyrics(query) {
  const song = await searchSong(query);
  const lyrics = await fetchLyrics(song.id);
  return { song, lyrics };
}
