import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import { useThemeStore } from '@/shared/infrastructure/store/themeStore';

// Mock del theme store
vi.mock('@/shared/infrastructure/store/themeStore', () => ({
  useThemeStore: vi.fn(),
}));

describe('Button', () => {
  beforeEach(() => {
    vi.mocked(useThemeStore).mockReturnValue((selector: any) => selector({ theme: 'light' }));
  });

  it('debe renderizar el botón con el texto proporcionado', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('debe aplicar la variante primary por defecto', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-blue');
  });

  it('debe aplicar la variante secondary cuando se especifica', () => {
    render(<Button variant="secondary">Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-gray-200');
  });

  it('debe aplicar la variante danger cuando se especifica', () => {
    render(<Button variant="danger">Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-red-600');
  });

  it('debe aplicar el tamaño sm cuando se especifica', () => {
    render(<Button size="sm">Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('px-3 py-1.5 text-sm');
  });

  it('debe aplicar el tamaño lg cuando se especifica', () => {
    render(<Button size="lg">Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('px-6 py-3 text-lg');
  });

  it('debe aplicar fullWidth cuando se especifica', () => {
    render(<Button fullWidth>Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('w-full');
  });

  it('debe estar deshabilitado cuando disabled es true', () => {
    render(<Button disabled>Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('debe llamar onClick cuando se hace clic', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debe aplicar className personalizada', () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-class');
  });

  it('debe pasar props adicionales al botón', () => {
    render(<Button data-testid="custom-button" aria-label="Custom">Test</Button>);
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom');
  });
});

