import { NextUIProvider } from '@nextui-org/react';
import PromptWizard from './components/PromptWizard';

function App() {
  return (
    <NextUIProvider>
      <PromptWizard />
    </NextUIProvider>
  );
}

export default App;