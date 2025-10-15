import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },

  callLogsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },

  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },

  callIconContainer: {
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 30,
  },

  actions: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },

  simulateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },

  simulateText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },

  callStateText: {
    marginTop: 10,
    color: '#555',
    fontSize: 14,
  },
});
