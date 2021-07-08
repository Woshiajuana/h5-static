
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import messages from './lang/zh-CN'
import { langOptions } from './config'

const DEFAULT_LANG = 'zh-CN'
const $$LOCALE_LANG = '$$LOCALE_LANG'
const loadedLanguages = [$$LOCALE_LANG] // 我们的预装默认语言

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: DEFAULT_LANG,
    fallbackLocale: DEFAULT_LANG,
    messages: {[DEFAULT_LANG]: messages},
});

function setI18nLanguage (lang) {
    i18n.locale = lang
    window.localStorage.setItem($$LOCALE_LANG, lang);
    const l = lang.split('-')[0]
    axios.defaults.headers.common['Accept-Language'] = l
    document.querySelector('html').setAttribute('lang', l)
    return lang
}

// 动态加载语言
export function loadLanguageAsync(lang = getLocale(), meta) {
    // 如果语言相同
    if (i18n.locale === lang) {
        setPageTitle(meta);
        return Promise.resolve()
    }
    // 如果语言已经加载
    if (loadedLanguages.includes(lang)) {
        setI18nLanguage(lang)
        setPageTitle(meta);
        return Promise.resolve()
    }
    // 如果尚未加载语言
    return import(/* webpackChunkName: "lang-[request]" */ `src/locale/lang/${lang}.js`).then(
        messages => {
            i18n.setLocaleMessage(lang, messages.default)
            loadedLanguages.push(lang)
            setI18nLanguage(lang)
            return setPageTitle(meta);
        }
    )
}

export function getLocale () {
    return window.localStorage.getItem($$LOCALE_LANG) || DEFAULT_LANG;
}

function setPageTitle (meta) {
    const { title } = meta || {};
    if (title) {
        document.title = '\u200E';
        setTimeout(() => {
            document.title = i18n.t(title).toString();
        }, 30);
    }
}

i18n.langOptions = langOptions;
i18n.getLocale = getLocale;
i18n.loadLanguageAsync = loadLanguageAsync;

export default i18n;
