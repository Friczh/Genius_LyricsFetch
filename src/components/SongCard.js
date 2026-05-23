import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MD3 } from '../theme/MD3';

export default function SongCard({ song }) {
  return (
    <View style={styles.card}>
      {song.thumbnail ? (
        <Image source={{ uri: song.thumbnail }} style={styles.art} />
      ) : (
        <View style={[styles.art, styles.artPlaceholder]}>
          <Text style={styles.artPlaceholderText}>♪</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{song.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{song.artistNames}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MD3.elevation2,
    borderRadius: MD3.shapeLarge,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    gap: 14,
  },
  art: {
    width: 64,
    height: 64,
    borderRadius: MD3.shapeMedium,
  },
  artPlaceholder: {
    backgroundColor: MD3.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artPlaceholderText: {
    fontSize: 28,
    color: MD3.onPrimaryContainer,
  },
  info: { flex: 1 },
  title: {
    ...MD3.titleMedium,
    color: MD3.onSurface,
    marginBottom: 4,
  },
  artist: {
    ...MD3.bodyMedium,
    color: MD3.primary,
  },
});
