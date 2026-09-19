/**
 * Quraflip
 * @format
 */

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';

function App() {
  return (
    <SafeAreaProvider>
      {/* App UI is always light/white-themed, so the bar is always dark-content
          by default; Splash overrides it locally while its gradient is showing.
          (Android is edge-to-edge, so StatusBar no longer takes a backgroundColor —
          the safe-area insets in each screen paint that region instead.) */}
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
