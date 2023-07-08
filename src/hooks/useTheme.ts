export type Theme = 'dark' | 'light' | 'system';

import useLocalStore from './useLocalStore.ts';

function useTheme(updateGlobal = false) {
  return useLocalStore<Theme>(
    'theme',
    'system',
    (v) => (v ? v : 'system'),
    (v) => (v === 'system' || v === 'dark' || v === 'light' ? v : undefined),
    (theme) => {
      if (updateGlobal) {
        if (
          theme === 'dark' ||
          (theme === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
      }
    },
  ) as [Theme, React.Dispatch<React.SetStateAction<Theme>>];
}
export default useTheme;
