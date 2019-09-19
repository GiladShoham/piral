import { deref } from '@dbeining/react-atom';
import { PiletApi, PiletMetadata, GlobalStateContext } from 'piral-core';
import { Localizer } from './localize';
import { PiletLocaleApi, LocalizationMessages, LocaleConfig } from './types';

/**
 * Sets up a new localizer by using the given config.
 * @param config The configuration for the new localizer.
 */
export function setupLocalizer(config: LocaleConfig = {}) {
  const msgs = config.messages || {};
  const lang = config.language || Object.keys(msgs)[0] || 'en';
  return new Localizer(msgs, lang, config.fallback);
}

/**
 * Creates a new Piral localization API extension.
 */
export function createLocaleApi(_api: PiletApi, _target: PiletMetadata, context: GlobalStateContext): PiletLocaleApi {
  let localTranslations: LocalizationMessages = {};
  const localizer = deref(context.state).localizer;
  return {
    setTranslations(messages) {
      localTranslations = messages;
    },
    getTranslations() {
      return localTranslations;
    },
    translate(tag, variables) {
      return localizer.localizeLocal(localTranslations, tag, variables);
    },
  };
}
