import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './CallLogs.style';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CallLog {
  name: string;
  phone?: string;
  type: 'incoming' | 'outgoing';
  duration: number;
  timestamp: string;
  status: string;
}

export default function CallLogsScreen() {
  const [logs, setLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const data = await AsyncStorage.getItem('callLogs');
      if (data) {
        setLogs(JSON.parse(data));
      }
    } catch (err) {
      console.error('Error loading call logs:', err);
    } finally {
      setLoading(false);
    }
  };



  const clearLogs = async () => {
    await AsyncStorage.removeItem('callLogs');
    setLogs([]);
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString();
  };

  // ✅ Navigate to CallScreen with log data
  const handleLogPress = (log: CallLog) => {

    navigation.navigate('CallScreen', {
      type: 'outgoing',
      name: log.name,
      phone: log.phone || '+91 99999 99999', 
    });
  };

  const renderItem = ({ item }: { item: CallLog }) => (
    <TouchableOpacity
      style={styles.logItem}
      onPress={() => handleLogPress(item)}
      activeOpacity={0.7}>
      <Ionicons
        name={item.type === 'incoming' ? 'call' : 'call-outline'}
        size={24}
        color={item.type === 'incoming' ? '#4CAF50' : '#4CAF50'}
        style={{ marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.contactName}>{item?.name}</Text>
        <Text style={styles.logDetails}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)} |{' '}
          {item.status === 'ended'
            ? `Duration: ${formatDuration(item.duration)}`
            : item.status}
        </Text>
        <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Call Logs</Text>
        <TouchableOpacity onPress={clearLogs}>
          <Ionicons name="trash" size={24} color="#d33" />
        </TouchableOpacity>
      </View>

      {/* Logs List */}
      {logs.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="call-outline" size={60} color="#aaa" />
          <Text style={styles.emptyText}>No call logs yet</Text>
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 5 }}
        />
      )}
    </SafeAreaView>
  );
}
