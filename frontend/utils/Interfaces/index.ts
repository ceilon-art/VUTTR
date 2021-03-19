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


export interface UserData {
  id: number;
  name: string;
  email: string;
}

export interface UserContextData {
  jwt: string;
  setJwt(jwt: string): void;
  clearLocalStorage(): void;
  user: UserData;
  setUser(userObj: UserData): void;
}

export interface ToolData {
  id: number;
  user_id: number;
  title: string;
  link: string;
  description: string;
  tags: string[];
}

export interface ResponseData {
  total: string;
  perPage: number;
  page: number;
  lastPage: number;
  data: ToolData[];
}