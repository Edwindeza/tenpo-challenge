import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { ProtectedRoute } from '../ProtectedRoute';
import { useAuthStore } from '@/shared/infrastructure/store/authStore';
import { ROUTE_PATHS } from '../routePaths';

// Mock del auth store
vi.mock('@/shared/infrastructure/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

// Mock de Navigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Navigate: ({ to }: { to: string }) => <div data-testid="navigate" data-to={to} />,
  };
});

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar los children cuando el usuario está autenticado', () => {
    vi.mocked(useAuthStore).mockImplementation((selector: any) =>
      selector({ isAuthenticated: true })
    );

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByTestId('navigate')).not.toBeInTheDocument();
  });

  it('debe redirigir a login cuando el usuario no está autenticado', () => {
    vi.mocked(useAuthStore).mockImplementation((selector: any) =>
      selector({ isAuthenticated: false })
    );

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute('data-to', ROUTE_PATHS.LOGIN);
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('debe renderizar múltiples children cuando está autenticado', () => {
    vi.mocked(useAuthStore).mockImplementation((selector: any) =>
      selector({ isAuthenticated: true })
    );

    render(
      <ProtectedRoute>
        <div>Child 1</div>
        <div>Child 2</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});

