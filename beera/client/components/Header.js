import { useRouter } from 'next/router';
import styled from 'styled-components';

import Button from '../style/Button';
import Container from '../style/Container';
import Title from '../style/Title';

const Background = styled(Container)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  height: 4em;
  width: 100vw;
`;

const ClickableTitle = styled(Title)`
  cursor: pointer;
`;

const Header = () => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  return (
    <Background>
      {!isHomePage && (
        <>
          <Button onClick={() => router.back()}>👈 Back</Button>
          <div style={{ width: '20px' }} />
        </>
      )}
      <ClickableTitle onClick={() => router.push('/countdown')}>🍻 Beera 🍻</ClickableTitle>
      <div style={{ flexGrow: 20 }} />
      {isHomePage && <Button onClick={() => router.push('/beer/create')}>🖊 New Beer</Button>}
    </Background>
  );
};

export default Header;
