import { Raleway, Merriweather } from 'next/font/google'
 
export const raleway = Raleway({
  weight: ["200", "300", "400", "500", "600"],
  subsets: ['latin'],
  display: 'swap',
})
 
export const merriweather = Merriweather({
  weight: ["700"],
  subsets: ['latin'],
  display: 'swap',
})