import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserInfo } from 'src/hooks/useUserInfo';

import { useAuth } from '../hooks/useAuth';

const AuthPageWrapper = styled(Box)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageBackground = styled(Box)`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
`;

export const AuthForm = styled(Box)(({ theme }) => ({
  background: '#fff',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(5),
  width: '483px',
}));

export const FormLabel = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 600,
  marginBottom: theme.spacing(5),
}));

export const FormStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormButton = styled(Button)(({ theme }) => ({
  height: theme.spacing(4.5),
  marginTop: theme.spacing(5),
  textTransform: 'initial',
}));

type AuthPageProps = {
  children?: React.ReactNode;
};

function AuthPage({ children }: AuthPageProps) {
  const { loggedIn: isLoggedIn, onLogOut } = useAuth();
  const userInfo = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    const expireTime = userInfo?.exp ? new Date(userInfo.exp * 1000) : null;
    if (isLoggedIn) {
      // TODO: We need a validate token api request instead of checking date, because token can be invalidated
      if (expireTime && expireTime > new Date()) {
        router.replace('/dashboard/metrics');
      } else if (userInfo) {
        // Session expired
        onLogOut();
      }
    }
  }, [isLoggedIn, onLogOut, router, userInfo]);

  return (
    <AuthPageWrapper>
      <PageBackground>
        <Image
          alt="Auth background"
          layout="fill"
          objectFit="cover"
          quality={100}
          src="/authBackground.png"
        />
      </PageBackground>
      <Box>{children}</Box>
    </AuthPageWrapper>
  );
}

export default AuthPage;
