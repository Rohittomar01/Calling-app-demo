import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // ✅ For icons
import { styles } from './CallScreen.styles';

type CallType = 'incoming' | 'outgoing';
type CallStatus = 'ringing' | 'connecting' | 'ongoing' | 'ended';

interface CallLog {
  name: string;
  phone: string;
  type: CallType;
  duration: number;
  timestamp: string;
  status: CallStatus;
}

export default function CallScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    type = 'outgoing',
    name = 'John Doe',
    phone = '+91 98200 33445',
  } = route.params as {
    type?: CallType;
    name?: string;
    phone?: string;
  };

  const [status, setStatus] = useState<CallStatus>(
    type === 'outgoing' ? 'connecting' : 'ringing',
  );
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start duration timer when call is ongoing
  useEffect(() => {
    if (status === 'ongoing') {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status]);
  

  // Navigate back after ending call
  useEffect(() => {
    if (status === 'ended') {
      saveCallLog();
      const timeout = setTimeout(() => navigation.goBack(), 1500);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  // Outgoing call auto-connect
  useEffect(() => {
    if (type === 'outgoing' && status === 'connecting') {
      const timeout = setTimeout(() => setStatus('ongoing'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [type, status]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Call controls
  const handleAccept = () => setStatus('ongoing');
  const handleDecline = () => setStatus('ended');
  const handleEnd = () => setStatus('ended');
  const toggleMute = () => setMuted(v => !v);
  const toggleSpeaker = () => setSpeaker(v => !v);

  // Save call log
  const saveCallLog = async () => {
    try {
      const newLog: CallLog = {
        name,
        phone,
        type,
        duration,
        timestamp: new Date().toISOString(),
        status,
      };
      const existingLogs = await AsyncStorage.getItem('callLogs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.unshift(newLog);
      await AsyncStorage.setItem('callLogs', JSON.stringify(logs));
      console.log('Call log saved:', newLog);
    } catch (err) {
      console.error('Error saving call log', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Contact Name */}
      <Text style={styles.name}>{name}</Text>

      {/* ✅ Phone Number with Icon */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <Icon name="call-outline" size={20} color="#00b894" style={{ marginRight: 6 }} />
        <Text style={styles.phoneText}>{phone}</Text>
      </View>

      {/* ✅ Status / Duration */}
      <Text style={styles.statusText}>
        {status === 'ongoing'
          ? formatDuration(duration)
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
      </View>

      {status !== 'ended' ? (
        <>
          <Text style={styles.incomingText}>
            {type === 'incoming' && status === 'ringing'
              ? 'Incoming Call'
              : type === 'outgoing' && status === 'connecting'
              ? 'Connecting...'
              : status === 'ongoing'
              ? 'On Call'
              : ''}
          </Text>

          {/* Incoming call */}
          {status === 'ringing' && type === 'incoming' && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.decline]}
                onPress={handleDecline}>
                <Text style={styles.buttonLabel}>Decline</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.accept]}
                onPress={handleAccept}>
                <Text style={styles.buttonLabel}>Accept</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Outgoing connecting */}
          {type === 'outgoing' && status === 'connecting' && (
            <View style={styles.wideButtonContainer}>
              <TouchableOpacity
                style={[styles.wideButton, styles.decline]}
                onPress={handleDecline}>
                <Text style={styles.buttonLabel}>Hang Up</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Ongoing controls */}
          {status === 'ongoing' && (
            <>
              <View style={styles.controlsRow}>
                {/* 🔇 Mute / Unmute */}
                <TouchableOpacity style={styles.controlButton} onPress={toggleMute}>
                  <Icon
                    name={muted ? 'mic-off-outline' : 'mic-outline'}
                    size={28}
                    color={muted ? '#d63031' : '#fff'}
                    style={{ marginBottom: 6 }}
                  />
                  <Text style={styles.controlText}>{muted ? 'Unmute' : 'Mute'}</Text>
                </TouchableOpacity>

                {/* 🔈 Speaker On / Off */}
                <TouchableOpacity style={styles.controlButton} onPress={toggleSpeaker}>
                  <Icon
                    name={speaker ? 'volume-high-outline' : 'volume-mute-outline'}
                    size={28}
                    color={speaker ? '#0984e3' : '#fff'}
                    style={{ marginBottom: 6 }}
                  />
                  <Text style={styles.controlText}>
                    {speaker ? 'Speaker Off' : 'Speaker On'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.wideButtonContainer}>
                <TouchableOpacity
                  style={[styles.wideButton, styles.decline]}
                  onPress={handleEnd}>
                  <Text style={styles.buttonLabel}>End Call</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      ) : (
        <Text style={styles.endedText}>Call Ended</Text>
      )}
    </View>
  );
}
