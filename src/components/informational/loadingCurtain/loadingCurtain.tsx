import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Image, useColorMode } from '@chakra-ui/react';

interface LoadingCurtaingProps {
  cargado: boolean;
}

export const LoadingCurtaing: React.FC<LoadingCurtaingProps> = ({ cargado }) => {
  const { colorMode } = useColorMode();
  const [darkMode, setDarkMode] = useState(colorMode === 'dark');
  const [FinCarga, setFinCarga] = useState(false);
  const [progress, setProgress] = useState(0);
  const [centerEmoji, setCenterEmoji] = useState(``);
  const progressTime = cargado ? 2.5 : 0.5;

  const controlsContainer = useAnimation();
  const controlsMainContainer = useAnimation();
  const controls = useAnimation();
  const controlsBox = useAnimation();
  const controlsLogo = useAnimation();

  

  const emojis = useMemo(() => ['😀', '😂', '😎', '😍', '🤔', '😢', '😡', '🥳', '😱', '😴'], []);

const getRandomEmojis = useCallback(() => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}, [emojis]);

  const startBoxAnimation = useCallback(
    (currentProgress: number) => {
      const gradient = darkMode ? '#FEFEFEFE' : '#ED330C';
      const backgroundGradient1 = `linear-gradient(-40deg, ${gradient} ${currentProgress}%, transparent ${currentProgress}%)`;
      const backgroundGradient2 = `linear-gradient(40deg, ${gradient} ${currentProgress}%, transparent ${currentProgress}%)`;
      const backgroundGradient3 = `linear-gradient(0deg, ${gradient} ${currentProgress}%, transparent ${currentProgress}%)`;

      controlsBox.start({
        left: `${currentProgress}%`,
        background: [backgroundGradient1, backgroundGradient2, backgroundGradient3],
        rotate: [0, -30, 0],
        transition: { duration: progressTime }
      });
    },
    [controlsBox, darkMode, progressTime]
  );

  const destruirComponente = useCallback(async () => {
    startBoxAnimation(100);
    setProgress(100);

    const idTimeout = setTimeout(async () => {
      if (!FinCarga) {
        await controlsContainer.start({ opacity: 0, transition: { duration: 0.5 } });
        await controlsLogo.start({ opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } });
        await controlsMainContainer.start({ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } });
        setFinCarga(true);
      }
    }, 2500);

    return () => clearTimeout(idTimeout);
  }, [FinCarga, controlsContainer, controlsLogo, controlsMainContainer, startBoxAnimation]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleColorSchemeChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleColorSchemeChange);
    return () => mediaQuery.removeEventListener('change', handleColorSchemeChange);
  }, []);

  useEffect(() => {
    controls.start({ width: `${progress}%`, transition: { duration: progressTime } });
  }, [progress, controls, progressTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!cargado) {
        setProgress((prevProgress) => {
          let newProgress = prevProgress + (Math.floor(Math.random() * 10) % 80);
          if (newProgress > 80) newProgress = 0;
          startBoxAnimation(newProgress);
          return newProgress;
        });
      } else {
        clearInterval(interval);
        destruirComponente();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cargado, startBoxAnimation, destruirComponente]);

  useEffect(() => {
    if (centerEmoji === ``) {
      const emoji = getRandomEmojis();
      setCenterEmoji(emoji);
    }
  }, [centerEmoji, getRandomEmojis]);

  if (FinCarga) return null;

  // Styles
  const progressBarContainerStyle: React.CSSProperties = {
    width: '75%',
    backgroundColor: darkMode ? '#ED330C' : '#e0e0e0',
    height: '20px',
    overflow: 'visible',
    borderRadius: '10px',
    border: `5px solid ${darkMode ? '#ED330C' : '#fff'}`,
    borderColor: darkMode ? '#1565C0' : '#fff'
  };

  const progressBarStyle: React.CSSProperties = {
    height: '100%',
    backgroundColor: darkMode ? '#FEFEFEFE' : '#ED330C',
    overflow: 'visible',
    borderRadius: '10px'
  };

  const logoStyle: React.CSSProperties = {
    width: '75%',
    height: '20px',
    position: 'absolute',
    top: '50%',
    borderRadius: '10px',
    opacity: '0'
  };

  const mainContainerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: darkMode ? '#111111' : '#1565C0',
    pointerEvents: 'none',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1
  };

  return (
    <motion.div style={mainContainerStyle} animate={controlsMainContainer}>
      <motion.div style={progressBarContainerStyle} animate={controlsContainer}>
        <motion.div style={{ ...progressBarStyle, width: '0%' }} animate={controls} />
      </motion.div>
      <motion.div style={logoStyle} animate={controlsLogo}>
        <picture>
          <Image src="/images/logo.svg" alt="Logo" margin="auto" height="140" backgroundColor="transparent" />
        </picture>
      </motion.div>
    </motion.div>
  );
};
