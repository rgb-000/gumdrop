import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button, Modal } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useWallet } from '@solana/wallet-adapter-react';
import suns from './suns.gif';

import closeSvg from './close.svg';
import {
  Cog,
  CurrentUserBadge,
  CurrentUserBadgeMobile,
} from '../CurrentUserBadge';
import { ConnectButton } from '../ConnectButton';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowDimensions(),
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const LogoLink = () => {
  return (
    <Link to={`/`}>
      <img className="app-logo" src={suns}></img>
    </Link>
  );
};

export const MetaplexMenu = () => {
  const { width } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const { connected } = useWallet();

  if (width <= 768)
    return (
      <>
        <Modal
          title={<LogoLink />}
          visible={isModalVisible}
          footer={null}
          className={'modal-box'}
          closeIcon={
            <img onClick={() => setIsModalVisible(false)} src={closeSvg} />
          }
        >
          <div className="site-card-wrapper mobile-menu-modal">
            <div className="actions">
              {!connected ? (
                <div className="actions-buttons">
                  <ConnectButton onClick={() => setIsModalVisible(false)}>
                    Connect Wallet
                  </ConnectButton>
                </div>
              ) : (
                <>
                  <CurrentUserBadgeMobile
                    showBalance={false}
                    showAddress={true}
                    iconSize={24}
                    closeModal={() => {
                      setIsModalVisible(false);
                    }}
                  />
                  <div className="wallet-wrapper">
                    <Button
                      className="wallet-key"
                      onClick={() => setIsModalVisible(false)}
                    >
                      <Link to="/">{homeSvg(location.pathname === '/')}</Link>
                    </Button>
                  </div>

                  <Cog />
                </>
              )}
            </div>
          </div>
        </Modal>
        <MenuOutlined
          onClick={() => setIsModalVisible(true)}
          style={{ fontSize: '1.4rem' }}
        />
      </>
    );

  return null;
};
export const MobileNavbar = () => {
  return (
    <div id="mobile-navbar">
      <LogoLink />
      <div className="mobile-menu">
        <MetaplexMenu />
      </div>
    </div>
  );
};

const homeSvg = (filled: boolean) => {
  const props = filled
    ? {
        fill: 'none',
        stroke: '#fbb954',
        strokeWidth: '1',
      }
    : {
        fill: 'none',
        stroke: '#fbb954',
        strokeWidth: '1',
      };
  return (
    <svg
      aria-label="Home"
      height="20"
      width="20"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
    </svg>
  );
};

export const AppBar = () => {
  const { connected } = useWallet();
  const location = useLocation();
  return (
    <>
      <MobileNavbar />
      <div id="desktop-navbar">
        <div className="app-left">
          <LogoLink />
        </div>
        <div className="app-right">
          {!connected && (
            <ConnectButton
              style={{ padding: '16px 12px', fontFamily: 'Roboto Mono' }}
            >
              Connect Wallet
            </ConnectButton>
          )}
          {connected && (
            <>
              <CurrentUserBadge
                showBalance={false}
                showAddress={true}
                iconSize={24}
              />
              <div className="wallet-wrapper">
                <Button className="wallet-key">
                  <Link to="/">{homeSvg(location.pathname === '/')}</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
