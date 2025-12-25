/**
 * Settings Feature Types
 */

export interface UserSettings {
  locale: 'en' | 'fr' | 'ar';
  notifications: boolean;
  haptics: boolean;
  autoPlay: boolean;
}

export interface AccountInfo {
  email: string;
  name: string;
  createdAt: string;
  subscriptionStatus?: 'active' | 'expired' | 'none';
}

export interface SettingsState {
  user: AccountInfo | null;
  settings: UserSettings;
  isLoading: boolean;
  error: string | null;
}

