/** Shared motion/react animation variants used across section components. */

export const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: "easeOut" as const } },
};

export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};
