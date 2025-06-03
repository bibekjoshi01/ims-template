import { FormField } from '@/components/app-form/types';
import * as z from 'zod';

// 1. Define Schema and Types
export const settingsSchema = z.object({
  emailNotification: z.boolean(),
  copyToPersonalEmail: z.boolean(),
  haveNewNotifications: z.boolean(),
  directMessage: z.boolean(),
  featureUpdates: z.boolean(),
  tipsOutOfPCTthemes: z.boolean(),
  thingsYouMissed: z.boolean(),
  businessProducts: z.boolean()
});

export type SettingsFormDataType = z.infer<typeof settingsSchema>;

export type SettingsGroup = {
  id: string;
  cardTitle: string;
  cardDescription: string;
  fields: FormField<SettingsFormDataType>[];
};

// 2. Define the form fields with group names and types
export const settings: SettingsGroup[] = [
  {
    id: 'emailSettings',
    cardTitle: 'Email Settings',
    cardDescription: 'Setup Email Notification',
    fields: [
      { name: 'emailNotification', label: 'Email Notification', type: 'switch', defaultValue: true },
      { name: 'copyToPersonalEmail', label: 'Send Copy To Personal Email', type: 'switch', defaultValue: false }
    ] as FormField<SettingsFormDataType>[]
  },
  {
    id: 'activityRelatedEmails',
    cardTitle: 'Activity Related Emails',
    cardDescription: 'When to email?',
    fields: [
      { name: 'haveNewNotifications', label: 'Have new notifications', type: 'switch', defaultValue: true },
      { name: 'directMessage', label: 'You’re sent a direct message', type: 'switch', defaultValue: false }
    ] as FormField<SettingsFormDataType>[]
  },
  {
    id: 'updatesFromSystemNotification',
    cardTitle: 'Updates from System Notification',
    cardDescription: 'Email you with?',
    fields: [
      { name: 'featureUpdates', label: 'Tips on upcoming PCT-themes products', type: 'checkbox', defaultValue: true },
      { name: 'tipsOutOfPCTthemes', label: 'Tips on getting more out of PCT-themes', type: 'checkbox', defaultValue: false },
      { name: 'thingsYouMissed', label: 'Things you missed since you last logged into PCT-themes', type: 'checkbox', defaultValue: false },
      { name: 'businessProducts', label: 'Tips and document business products', type: 'checkbox', defaultValue: true }
    ] as FormField<SettingsFormDataType>[]
  }
];

// 3. Define the default values for the form
export const defaultValues: SettingsFormDataType = settings.reduce<SettingsFormDataType>((acc, setting) => {
  setting.fields.forEach((field) => {
    acc[field.name as keyof SettingsFormDataType] = field.defaultValue;
  });
  return acc;
}, {} as SettingsFormDataType);
