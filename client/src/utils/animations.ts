import { MotionProps } from 'framer-motion';

const simpleOpacity: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideFromRight: MotionProps = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
};

const animations = {
  simpleOpacity,
  slideFromRight,
};

export default animations;
