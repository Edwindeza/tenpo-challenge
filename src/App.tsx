import { AppRouter } from '@/shared/routing/AppRouter';
import { QueryProvider } from '@/shared/infrastructure/query/queryProvider';

function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
