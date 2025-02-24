import { jsx as _jsx } from "react/jsx-runtime";
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
createInertiaApp({
    resolve: name => {
        // @ts-ignore
        const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
        return pages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(_jsx(App, Object.assign({}, props)));
    },
    progress: {
        color: 'red',
        includeCSS: true,
        showSpinner: true
    }
});
