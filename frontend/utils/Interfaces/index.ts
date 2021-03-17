import { ButtonHTMLAttributes } from 'react';

import warningSVG from '../../assets/banner/warning.svg';
import errorSVG from '../../assets/banner/error.svg';
import successSVG from '../../assets/banner/success.svg';
import infoSVG from '../../assets/banner/info.svg';

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