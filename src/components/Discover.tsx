import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../styles/discover.css'
import { Logo } from './Logo'
import axios from 'axios'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Weight {
  imperial: string;
  metric: string;
}

interface Breed {
  weight: Weight;
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}

interface Cat {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
}
gsap.registerPlugin(ScrollTrigger);

const Discover = () => {
  const [cats, setCats] = useState<Cat[]>([])
  const [filteredCats, setFilteredCats] = useState<Cat[]>([])
  const [selectedIndec, setSelectedIndec] = useState< number | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const discoverRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const fetchCats = async () => {
      axios.get('https://api.thecatapi.com/v1/images/search?limit=9&has_breeds=1&api_key=' + import.meta.env.VITE_APP_CAT_API_KEY)
      .then(response => {
        setCats([...cats, ...response.data])
        setFilteredCats([...cats, ...response.data])
      })
  }
    useEffect(() => {
      fetchCats()
    }, [])

  useLayoutEffect(() => {
    if (discoverRef.current && gridRef.current) {
      const gridTL = gsap.timeline({
        scrollTrigger: {
          trigger: discoverRef.current,
          start: "top 75%",
          scrub: true,
          end: "bottom bottom",
        }
      });

      const searchTL = gsap.timeline({
        scrollTrigger: {
          trigger: discoverRef.current,
          start: "top 50%",
          scrub: true,
          end: "bottom bottom",
        }
      });

      const cats = gridRef.current.querySelectorAll('.cat-card');
      const catsImg = gridRef.current.querySelectorAll('.cat-img');
      const search = discoverRef.current.querySelector('.search-bar');

      cats.forEach((cat, index) => {
        gridTL.fromTo(cat, 
          { opacity: 0, y: 50, }, 
          { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out'}, 
          index * 0.5
        );
      });

      catsImg.forEach((img, index) => {
        gridTL.fromTo(img, 
          { scale: 1.1,  }, 
          { scale: 1, duration: 1, ease: 'expo.out'}, 
          index * 0.5
        );
      });

      searchTL.fromTo(search, 
        { opacity: 0, y: 50, }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out'}, 
        0
      );

    }
  }, [cats]); 

  useEffect(() => {
    if (searchTerm) {
      let tempFilteredCats = filteredCats.filter((cat: { breeds: { name: string }[] })  => cat.breeds[0].name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredCats(tempFilteredCats)
    } else {
      setFilteredCats(cats)
    }
  }, [searchTerm])

  useEffect(() => {
   if(gridRef.current) {
      const cats = gridRef.current.querySelectorAll('.cat-card');

      cats.forEach((cat, index) => {
        if (index === selectedIndec) {
          gsap.to(cat, { scale: 1.2, zIndex: 10, duration: 1, filter: 'blur(0px)', ease: 'expo.out' });
         
        } else {
          gsap.to(cat, { position: 'relative', scale: 1, duration: 0.5, filter: 'blur(2px)', zIndex: 0, ease: 'expo.out' });
        }
        if (selectedIndec === null) {
          gsap.to(cat, { position: 'relative', scale: 1, zIndex: 10, duration: 0.5, filter: 'blur(0px)', ease: 'expo.out' });
        } 
      });
   }

  }, [selectedIndec]);


  return (
    <div ref={discoverRef} data-scroll-section  className="discover">
      <div className="discover-top">
       <Logo />
      </div>
      <div className="search-bar-wrapper">
        <div className="search-bar">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search' />
        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.0779 26.0228L21.646 19.5908C23.1945 17.5293 24.0305 15.0201 24.0276 12.4418C24.0276 5.85606 18.6696 0.498047 12.0839 0.498047C5.49814 0.498047 0.140137 5.85606 0.140137 12.4418C0.140137 19.0275 5.49814 24.3855 12.0839 24.3855C14.6622 24.3884 17.1714 23.5524 19.2329 22.0039L25.6648 28.4358C25.9904 28.7269 26.4151 28.8822 26.8516 28.87C27.2881 28.8578 27.7034 28.6789 28.0122 28.3701C28.321 28.0613 28.4999 27.6461 28.5121 27.2095C28.5243 26.773 28.369 26.3483 28.0779 26.0228ZM3.55264 12.4418C3.55264 10.7545 4.05299 9.10505 4.99041 7.70209C5.92784 6.29913 7.26024 5.20566 8.81912 4.55995C10.378 3.91424 12.0934 3.74529 13.7483 4.07447C15.4032 4.40365 16.9233 5.21617 18.1164 6.40929C19.3095 7.60241 20.122 9.12253 20.4512 10.7774C20.7804 12.4323 20.6114 14.1477 19.9657 15.7066C19.32 17.2654 18.2266 18.5978 16.8236 19.5353C15.4206 20.4727 13.7712 20.973 12.0839 20.973C9.82209 20.9703 7.65371 20.0706 6.05438 18.4713C4.45505 16.872 3.55535 14.7036 3.55264 12.4418Z" fill="black"/>
        </svg>
        </div>
      </div>
       { selectedIndec !== null && <div onClick={() => setSelectedIndec(null)} className="overlay"></div>}
      <div className="discover-main">
        <div ref={gridRef} className="cat-grid">
        {filteredCats && filteredCats.map((cat, index) => (
          <div onClick={() => selectedIndec === null ? setSelectedIndec(index) : setSelectedIndec(null)} className={`cat-card ${index === selectedIndec ? 'active' : ''}`} key={index}>
            <div className="cat-img-wrapper">
            <img className='cat-img' src={cat.url} alt="cat" />
            </div>
            <div className="cat-card-info">
              <h3 className='cat-name'>
                {cat.breeds[0].name}
                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.9808 1.23291C14.1769 1.23291 12.3019 4.98291 12.3019 4.98291C12.3019 4.98291 10.4269 1.23291 6.62296 1.23291C3.53156 1.23291 1.08351 3.81924 1.05187 6.90537C0.987415 13.3114 6.1337 17.8671 11.7745 21.6956C11.93 21.8014 12.1138 21.858 12.3019 21.858C12.49 21.858 12.6737 21.8014 12.8292 21.6956C18.4694 17.8671 23.6157 13.3114 23.5519 6.90537C23.5202 3.81924 21.0722 1.23291 17.9808 1.23291Z" stroke="#444444" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </h3>
              <p className='cat-temperament'>{cat.breeds[0].temperament}</p>
              <div className="more-info">
                <h3 className="cat-name">{cat.breeds[0].name}</h3>
                <p className='cat-description'>{cat.breeds[0].description}</p>
                <a href={cat.breeds[0].cfa_url} className='cat-link'>See more</a>
              </div>
            </div>
          </div>
        ))}
        <div onClick={() => fetchCats()} className="cat-card perm">
          <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.85993 12.9857C6.06302 9.80034 9.95795 7.64995 11.88 6.97292C14.9677 7.16979 19.0357 14.0923 17.25 15.5776C15.8214 16.7658 12.5153 16.1641 11.0408 15.7147C9.22923 16.1323 5.65684 16.171 5.85993 12.9857Z" fill="white"/>
            <ellipse cx="1.87306" cy="2.60954" rx="1.87306" ry="2.60954" transform="matrix(0.843216 -0.537574 0.58233 0.812952 0.567871 6.45337)" fill="white"/>
            <path d="M10.3557 3.23168C10.5667 4.57297 9.77786 5.78898 8.59377 5.94796C7.40968 6.10694 6.61327 5.11508 6.40223 3.77379C6.19119 2.43251 6.24635 1.06655 7.43045 0.907568C8.61454 0.748587 10.1446 1.89039 10.3557 3.23168Z" fill="white"/>
            <path d="M17.7374 5.48059C17.232 6.74467 16.393 7.05675 15.2729 6.64945C14.1528 6.24216 13.965 5.01233 14.4704 3.74826C14.9758 2.48418 16.5396 1.87018 17.6598 2.27748C18.7799 2.68478 18.2428 4.21652 17.7374 5.48059Z" fill="white"/>
            <path d="M19.9612 10.722C19.0989 11.4572 18.3667 11.3884 17.7119 10.7018C17.0571 10.0153 17.4021 9.06193 18.2645 8.32674C19.1268 7.59156 20.0791 7.40527 20.734 8.09179C21.3888 8.77832 20.8236 9.98681 19.9612 10.722Z" fill="white"/>
          </svg>
             View More
        </div>
        </div>
      </div>
    </div>
  )
}

export default Discover