import React, { useState } from 'react';
import {
  View, TextInput, TouchableOpacity,
  StyleSheet, Animated,
} from 'react-native';
import { MD3 } from '../theme/MD3';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  function handleSubmit() {
    if (query.trim() && !loading) onSearch(query.trim());
  }

  return (
    <View style={[styles.container, focused && styles.containerFocused]}>
      {/* Leading search icon */}
      <View style={styles.leadingIcon}>
        <View style={[styles.iconDot, { backgroundColor: MD3.onSurfaceVariant }]} />
        <View style={[styles.iconHandle, { backgroundColor: MD3.onSurfaceVariant }]} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search songs..."
        placeholderTextColor={MD3.onSurfaceVariant}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
        selectionColor={MD3.primary}
      />

      {query.length > 0 && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => setQuery('')}
        >
          <View style={styles.clearIcon}>
            <View style={[styles.clearLine1, { backgroundColor: MD3.onSurfaceVariant }]} />
            <View style={[styles.clearLine2, { backgroundColor: MD3.onSurfaceVariant }]} />
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.searchBtn, loading && styles.searchBtnDisabled]}
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.7}
      >
        <View style={styles.searchBtnInner}>
          <View style={[styles.btnDot, { backgroundColor: MD3.onPrimary }]} />
          <View style={[styles.btnHandle, { backgroundColor: MD3.onPrimary }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MD3.surfaceContainerHigh,
    borderRadius: MD3.shapeFull,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  containerFocused: {
    borderColor: MD3.primary,
    backgroundColor: MD3.surfaceContainerHighest,
  },
  leadingIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 3,
    left: 3,
    opacity: 0.7,
  },
  iconHandle: {
    width: 2,
    height: 7,
    borderRadius: 1,
    position: 'absolute',
    bottom: 2,
    right: 5,
    transform: [{ rotate: '45deg' }],
    opacity: 0.7,
  },
  input: {
    flex: 1,
    color: MD3.onSurface,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  clearBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  clearIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearLine1: {
    width: 12,
    height: 2,
    borderRadius: 1,
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
  },
  clearLine2: {
    width: 12,
    height: 2,
    borderRadius: 1,
    position: 'absolute',
    transform: [{ rotate: '-45deg' }],
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: MD3.shapeFull,
    backgroundColor: MD3.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  searchBtnDisabled: { opacity: 0.4 },
  searchBtnInner: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  btnHandle: {
    width: 2,
    height: 6,
    borderRadius: 1,
    position: 'absolute',
    bottom: 1,
    right: 4,
    transform: [{ rotate: '45deg' }],
  },
});
