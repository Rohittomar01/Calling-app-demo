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
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },

  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  contactName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },

  logDetails: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },

  timestamp: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: '#999',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});
