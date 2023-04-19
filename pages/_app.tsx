import 'src/styles/globals.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme as MuiTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { LicenseInfo } from '@mui/x-license-pro';
import { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { useMemo } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import createEmotionCache from 'src/createEmotionCache';
import AuthProvider from 'src/providers/AuthProvider';
import theme, { colors } from 'src/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
  emotionCache: EmotionCache;
};

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

LicenseInfo.setLicenseKey(
  'fbd921b1f514ba9a120dcac455236ed4Tz00OTIxNCxFPTE2OTIyODAwNzc0MzksUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
);

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  // We want a different set of caches per ssr request
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <CacheProvider value={emotionCache}>
              <Head>
                <meta
                  content="initial-scale=1, width=device-width"
                  name="viewport"
                />
              </Head>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <NextNProgress color={colors.primary[400]} />
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </CacheProvider>
          </Hydrate>
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}
