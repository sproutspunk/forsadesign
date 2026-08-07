// Isolated module so Vite can tree-shake and split framer-motion animation
// features into a separate async chunk, keeping them out of the initial bundle.
export { domAnimation as default } from "framer-motion";
