import { Roboto_Mono } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const roboto_mono = Roboto_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto_mono.className}>
      <Component {...pageProps} />
    </main>
  );
}
