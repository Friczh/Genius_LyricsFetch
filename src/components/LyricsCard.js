import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Platform, Clipboard,
} from 'react-native';
import { MD3 } from '../theme/MD3';

export default function LyricsCard({ lyrics }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    Clipboard.setString(lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>LYRICS</Text>
        <TouchableOpacity
          style={[styles.copyBtn, copied && styles.copyBtnActive]}
          onPress={handleCopy}
          activeOpacity={0.7}
        >
          <Text style={[styles.copyText, copied && styles.copyTextActive]}>
            {copied ? '✓ Copied' : 'Copy'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <Text style={styles.lyrics}>{lyrics}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: MD3.surfaceContainer,
    borderRadius: MD3.shapeLarge,
    marginHorizontal: 16,
    marginBottom: 32,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  label: {
    ...MD3.labelMedium,
    color: MD3.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  copyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: MD3.shapeFull,
    borderWidth: 1,
    borderColor: MD3.outline,
  },
  copyBtnActive: {
    backgroundColor: MD3.primaryContainer,
    borderColor: MD3.primaryContainer,
  },
  copyText: {
    ...MD3.labelMedium,
    color: MD3.onSurfaceVariant,
  },
  copyTextActive: {
    color: MD3.onPrimaryContainer,
  },
  divider: {
    height: 1,
    backgroundColor: MD3.outlineVariant,
    marginHorizontal: 20,
    opacity: 0.5,
  },
  lyrics: {
    ...MD3.bodyLarge,
    color: MD3.onSurface,
    padding: 20,
    lineHeight: 28,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New',
  },
});
