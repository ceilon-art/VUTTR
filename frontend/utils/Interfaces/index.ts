import { ButtonHTMLAttributes } from 'react';

export interface BannerProps {
  display: number;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

export const mapTypeToTitle = {
  success: 'Success!',
  warning: 'Ops!',
  error: 'An error ocurred',
  info: 'Side note...',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  hover?: string;
  loading?: number;
}

export interface ContainerProps {
  isModalOpen: number;
}