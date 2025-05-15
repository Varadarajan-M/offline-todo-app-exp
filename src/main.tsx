import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import App from './App'

import { registerSW } from 'virtual:pwa-register';
registerSW({
    onNeedRefresh() {
        console.log('🔄 New service worker available!');
    },
    onOfflineReady() {
        console.log('✅ App ready to work offline');
    },
    onRegisterError(err) {
        console.error('❌ Service worker registration failed:', err);
    },
});


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

const rootElement = document.getElementById('root') as HTMLElement

createRoot(rootElement).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister }}
  >
    <App />
  </PersistQueryClientProvider>,
)