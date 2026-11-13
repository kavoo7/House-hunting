import { readDemoSettings, type DemoPlatformSettings } from "@/data/demo-settings";
import { getEmailAction, getPhoneAction, getWhatsAppAction, isValidEmailAddress, isValidPhoneNumber, isValidWhatsAppNumber } from "@/data/contact-links";

export type SupportContactActions = {
  phone: { display: string; href: string } | null;
  whatsapp: { display: string; href: string } | null;
  email: { display: string; href: string } | null;
};

export function isValidSupportPhone(value: string) {
  return isValidPhoneNumber(value);
}

export function isValidSupportWhatsApp(value: string) {
  return isValidWhatsAppNumber(value);
}

export function isValidSupportEmail(value: string) {
  return isValidEmailAddress(value);
}

export function getSupportContactActions(settings: DemoPlatformSettings = readDemoSettings()): SupportContactActions {
  return {
    phone: getPhoneAction(settings.supportPhone),
    whatsapp: getWhatsAppAction(settings.supportWhatsApp),
    email: getEmailAction(settings.supportEmail),
  };
}
