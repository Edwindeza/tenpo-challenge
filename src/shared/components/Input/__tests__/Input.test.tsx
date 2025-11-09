import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';
import { useThemeStore } from '@/shared/infrastructure/store/themeStore';

// Mock del theme store
vi.mock('@/shared/infrastructure/store/themeStore', () => ({
  useThemeStore: vi.fn(),
}));

describe('Input', () => {
  beforeEach(() => {
    vi.mocked(useThemeStore).mockReturnValue((selector: any) => selector({ theme: 'light' }));
  });

  it('debe renderizar el input sin label', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('debe renderizar el label cuando se proporciona', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('debe asociar el label con el input usando htmlFor', () => {
    render(<Input id="email-input" label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('id', 'email-input');
  });

  it('debe mostrar el mensaje de error cuando se proporciona', () => {
    render(<Input error="Este campo es requerido" />);
    expect(screen.getByText('Este campo es requerido')).toBeInTheDocument();
    expect(screen.getByText('Este campo es requerido')).toHaveAttribute('role', 'alert');
  });

  it('debe aplicar estilos de error cuando hay un error', () => {
    render(<Input error="Error" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('border-red-500');
  });

  it('debe tener aria-invalid cuando hay error', () => {
    render(<Input error="Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('debe tener aria-describedby cuando hay error', () => {
    render(<Input id="test-input" error="Error" />);
    const input = screen.getByRole('textbox');
    const errorId = input.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    expect(screen.getByText('Error')).toHaveAttribute('id', errorId!);
  });

  it('debe permitir escribir en el input', async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'test@example.com');
    expect(input).toHaveValue('test@example.com');
  });

  it('debe aplicar className personalizada', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('custom-class');
  });

  it('debe pasar props adicionales al input', () => {
    render(<Input type="email" placeholder="Enter email" required />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
    expect(input).toBeRequired();
  });

  it('debe generar un ID único cuando no se proporciona', () => {
    render(<Input label="Test" />);
    const input = screen.getByLabelText('Test');
    const id = input.getAttribute('id');
    expect(id).toBeTruthy();
    expect(id).toContain('input-');
  });
});

