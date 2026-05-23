import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, ScrollView, Image,
  StyleSheet, StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { getLyrics } from '../services/GeniusService';

export default function LyricsScreen() {
  const [query, setQuery] = useState('');
  const [song, setSong] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setLyrics('');
    setSong(null);

    try {
      const { song: songInfo, lyrics: fetchedLyrics } = await getLyrics(query);
      setSong(songInfo);
      setLyrics(fetchedLyrics);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎵 LyricsFetch</Text>
        <Text style={styles.headerSub}>Powered by Genius</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Artist - Song name..."
          placeholderTextColor="#555"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={[styles.searchBtn, loading && styles.searchBtnDisabled]}
          onPress={handleSearch}
          disabled={loading}
        >
          <Text style={styles.searchBtnText}>GO</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {loading && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#7c6aff" />
            <Text style={styles.loadingText}>Fetching lyrics...</Text>
          </View>
        )}

        {!!error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        )}

        {song && !loading && (
          <View style={styles.songCard}>
            {song.thumbnail
              ? <Image source={{ uri: song.thumbnail }} style={styles.thumbnail} />
              : null}
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artistNames}</Text>
            </View>
          </View>
        )}

        {!!lyrics && !loading && (
          <View style={styles.lyricsBox}>
            <Text style={styles.lyricsText}>{lyrics}</Text>
          </View>
        )}

        {!loading && !lyrics && !error && (
          <View style={styles.centered}>
            <Text style={styles.emptyEmoji}>🎤</Text>
            <Text style={styles.emptyText}>Search for any song to get its lyrics</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0a0a0f' },
  header: { paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#1a1a2e' },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#ffffff', letterSpacing: -0.5 },
  headerSub: { fontSize: 12, color: '#7c6aff', marginTop: 2, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase' },
  searchRow: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 16, gap: 10 },
  input: { flex: 1, backgroundColor: '#13131f', borderWidth: 1, borderColor: '#2a2a40', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, color: '#fff', fontSize: 15 },
  searchBtn: { backgroundColor: '#7c6aff', borderRadius: 12, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' },
  searchBtnDisabled: { opacity: 0.5 },
  searchBtnText: { color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  centered: { alignItems: 'center', paddingTop: 80, gap: 12 },
  loadingText: { color: '#555', marginTop: 12, fontSize: 14 },
  errorBox: { backgroundColor: '#2a1a1a', borderWidth: 1, borderColor: '#ff4444', borderRadius: 12, padding: 16, marginTop: 12 },
  errorText: { color: '#ff6666', fontSize: 14 },
  songCard: { flexDirection: 'row', backgroundColor: '#13131f', borderRadius: 16, padding: 14, marginBottom: 16, alignItems: 'center', gap: 14, borderWidth: 1, borderColor: '#2a2a40' },
  thumbnail: { width: 60, height: 60, borderRadius: 10, backgroundColor: '#1e1e30' },
  songInfo: { flex: 1 },
  songTitle: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  songArtist: { color: '#7c6aff', fontSize: 13, marginTop: 3, fontWeight: '500' },
  lyricsBox: { backgroundColor: '#13131f', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#2a2a40' },
  lyricsText: { color: '#d0d0e8', fontSize: 15, lineHeight: 26, fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New' },
  emptyEmoji: { fontSize: 48 },
  emptyText: { color: '#444', fontSize: 15, textAlign: 'center' },
});
