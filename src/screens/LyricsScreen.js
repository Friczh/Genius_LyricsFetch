import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, ActivityIndicator,
  StyleSheet, StatusBar, Animated, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MD3 } from '../theme/MD3';
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import LyricsCard from '../components/LyricsCard';
import { getLyrics } from '../services/GeniusService';

export default function LyricsScreen() {
  const [song, setSong] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  async function handleSearch(query) {
    setLoading(true);
    setError('');
    setLyrics('');
    setSong(null);
    fadeAnim.setValue(0);

    try {
      const { song: songInfo, lyrics: fetchedLyrics } = await getLyrics(query);
      setSong(songInfo);
      setLyrics(fetchedLyrics);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={MD3.background} />

      {/* Top App Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>LyricsFetch</Text>
        <Text style={styles.topBarBadge}>Genius</Text>
      </View>

      {/* Search */}
      <SearchBar onSearch={handleSearch} loading={loading} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Loading */}
        {loading && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={MD3.primary} />
            <Text style={styles.loadingText}>Finding lyrics...</Text>
          </View>
        )}

        {/* Error */}
        {!!error && !loading && (
          <View style={styles.errorContainer}>
            <View style={styles.errorCard}>
              <Text style={styles.errorIcon}>!</Text>
              <View style={styles.errorText}>
                <Text style={styles.errorTitle}>Couldn't find that</Text>
                <Text style={styles.errorBody}>{error}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Results */}
        {song && !loading && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <SongCard song={song} />
            {!!lyrics && <LyricsCard lyrics={lyrics} />}
          </Animated.View>
        )}

        {/* Empty state */}
        {!loading && !lyrics && !error && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>♪</Text>
            </View>
            <Text style={styles.emptyTitle}>Search for a song</Text>
            <Text style={styles.emptyBody}>
              Type an artist or song name above to fetch its lyrics instantly
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: MD3.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: MD3.onSurface,
    letterSpacing: 0,
  },
  topBarBadge: {
    ...MD3.labelMedium,
    color: MD3.onSecondaryContainer,
    backgroundColor: MD3.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: MD3.shapeFull,
    overflow: 'hidden',
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingTop: 8,
    flexGrow: 1,
  },
  centered: {
    alignItems: 'center',
    paddingTop: 80,
    gap: 16,
  },
  loadingText: {
    ...MD3.bodyMedium,
    color: MD3.onSurfaceVariant,
  },
  errorContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MD3.errorContainer,
    borderRadius: MD3.shapeMedium,
    padding: 16,
    gap: 12,
  },
  errorIcon: {
    fontSize: 20,
    color: MD3.error,
    fontWeight: '700',
    width: 32,
    textAlign: 'center',
  },
  errorText: { flex: 1 },
  errorTitle: {
    ...MD3.titleSmall,
    color: MD3.error,
    marginBottom: 2,
  },
  errorBody: {
    ...MD3.bodySmall,
    color: MD3.error,
    opacity: 0.8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
    gap: 12,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: MD3.shapeFull,
    backgroundColor: MD3.secondaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emptyIcon: {
    fontSize: 36,
    color: MD3.onSecondaryContainer,
  },
  emptyTitle: {
    ...MD3.titleLarge,
    color: MD3.onSurface,
    textAlign: 'center',
  },
  emptyBody: {
    ...MD3.bodyMedium,
    color: MD3.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },
});
