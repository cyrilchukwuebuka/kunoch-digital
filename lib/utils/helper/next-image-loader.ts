export default function ijeImageLoader({ src, width, quality }: any) {
  return `${src}?w=${width}&q=${quality || 75}`
}
