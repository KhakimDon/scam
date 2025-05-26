// src/types/i18n.d.ts
import 'vue-i18n';

declare module 'vue-i18n' {
  // Extend the global properties of Vue instance
  interface I18nGlobal {
    $t: (key: string, ...args: unknown[]) => string;
  }
}
