import { motion, type Transition } from "framer-motion";
import { ReactNode, useRef } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Cinematic fade with subtle zoom effect
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "none",
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  duration: 0.5,
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
      onAnimationComplete={(variant) => {
        // Framer Motion resuelve filter: "none" como "blur(0px)" para poder interpolar,
        // lo que deja un filter no-"none" en el DOM y rompe position:fixed en descendientes
        // (cualquier filter distinto de "none" crea un containing block). Lo limpiamos a mano.
        if (variant === "animate" && ref.current) {
          ref.current.style.filter = "";
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Film reel overlay effect for more dramatic transitions
export const FilmReelTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen relative"
    >
      {/* Cinematic bars overlay */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="fixed inset-0 z-50 pointer-events-none origin-top"
      >
        <div className="absolute top-0 left-0 right-0 h-[15vh] bg-background" />
        <div className="absolute bottom-0 left-0 right-0 h-[15vh] bg-background" />
      </motion.div>
      
      {children}
    </motion.div>
  );
};
