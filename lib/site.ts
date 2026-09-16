export type Locale = "ko" | "en";
export type PageKey = "home" | "about" | "filming" | "stay" | "mainHouse" | "experiences" | "gallery" | "guide" | "explore" | "location" | "reservation";

export const site = {
  name: "강산재",
  englishName: "Kangsanjae",
  address: "강원 홍천군 서면 고루개길 110",
  addressEn: "110 Gorugae-gil, Seo-myeon, Hongcheon-gun, Gangwon-do, South Korea",
  instagram: "https://www.instagram.com/hanokhotel_kangsanjae/",
  airbnb: "https://www.airbnb.co.kr/rooms/940154417346539031",
  naverBooking: null as string | null,
};

export const paths: Record<PageKey, string> = {
  home: "", about: "about", filming: "about/filming", stay: "stay",
  mainHouse: "stay/main-house", experiences: "experiences", gallery: "gallery",
  guide: "guide", explore: "explore", location: "location", reservation: "reservation",
};

export const keys = Object.keys(paths) as PageKey[];
export const href = (locale: Locale, key: PageKey) => `/${locale}${paths[key] ? `/${paths[key]}` : ""}`;
export const routeKey = (segments: string[]): PageKey | undefined => keys.find(key => paths[key] === segments.join("/"));
export const isLocale = (value: string): value is Locale => value === "ko" || value === "en";

type Label = { ko: string; en: string };
export const labels: Record<PageKey, Label> = {
  home: { ko: "홈", en: "Home" },
  about: { ko: "강산재 이야기", en: "Our Story" },
  filming: { ko: "드라마 촬영지", en: "Filming Location" },
  stay: { ko: "객실 안내", en: "Stay" },
  mainHouse: { ko: "본채", en: "Main House" },
  experiences: { ko: "즐길 거리", en: "Experiences" },
  gallery: { ko: "갤러리", en: "Gallery" },
  guide: { ko: "이용 안내", en: "Stay Guide" },
  explore: { ko: "주변 여행", en: "Explore Nearby" },
  location: { ko: "오시는 길", en: "Getting Here" },
  reservation: { ko: "예약·문의", en: "Book & Enquire" },
};

export const descriptions: Record<PageKey, Label> = {
  home: { ko: "홍천의 자연 속 한옥 숙소 강산재. 한옥에 머물고, 자연의 속도로 쉬어 보세요.", en: "Stay in a traditional Korean hanok at Kangsanjae, a peaceful retreat in Hongcheon." },
  about: { ko: "한옥과 마당, 숲이 어우러진 강산재의 공간을 소개합니다.", en: "Discover the hanok, garden and forest at Kangsanjae." },
  filming: { ko: "〈XO, Kitty〉 시즌 2 촬영지로 소개된 강산재의 실제 공간을 만나보세요.", en: "Explore Kangsanjae, listed by its host as an XO, Kitty Season 2 filming location." },
  stay: { ko: "강산재의 확인된 본채 숙소를 소개합니다.", en: "Explore the verified Main House listing at Kangsanjae." },
  mainHouse: { ko: "본채의 실내, 침구, 욕실, 주방과 예약 정보를 확인하세요.", en: "See the Main House interiors, sleeping spaces, kitchen, bathroom and booking link." },
  experiences: { ko: "강산재의 마당, 숲길과 한옥에서 보내는 시간을 소개합니다.", en: "Experience time in the courtyard, forest and hanok at Kangsanjae." },
  gallery: { ko: "강산재의 전경, 실내, 사계절과 야경 사진을 둘러보세요.", en: "Browse photos of Kangsanjae in every season, inside and out." },
  guide: { ko: "예약 전 확인할 이용 정보를 안내합니다.", en: "Practical information to check before booking Kangsanjae." },
  explore: { ko: "강산재가 자리한 홍천군 서면의 여행 정보를 살펴보세요.", en: "Explore places around Seo-myeon, Hongcheon." },
  location: { ko: "강산재 주소와 지도 링크를 확인하세요.", en: "Find Kangsanjae's address and open directions in a map." },
  reservation: { ko: "검증된 강산재 본채 예약 상품과 문의 채널을 안내합니다.", en: "Book the verified Main House listing or contact Kangsanjae." },
};

export const photo = (name: string) => `/images/${name}.jpg`;

export const galleryPhotos = [
  { file: "hero-hanok", category: "exterior", ko: "마당에서 바라본 한옥", en: "Hanok across the courtyard" },
  { file: "main-exterior", category: "exterior", ko: "강산재 본채 전경", en: "Main House exterior" },
  { file: "courtyard", category: "exterior", ko: "한옥과 마당", en: "Hanok and courtyard" },
  { file: "hanok-eaves", category: "exterior", ko: "한옥 처마와 나무 기둥", en: "Timber pillars and eaves" },
  { file: "mountain-view", category: "exterior", ko: "한옥 너머의 산", en: "Mountain beyond the hanok" },
  { file: "living-room", category: "interior", ko: "한옥의 밝은 실내", en: "Sunlit hanok interior" },
  { file: "dining-kitchen", category: "interior", ko: "식탁과 주방", en: "Dining table and kitchen" },
  { file: "bedroom", category: "interior", ko: "실내 침대 공간", en: "Bedroom" },
  { file: "floor-bedding", category: "interior", ko: "바닥 침구 공간", en: "Floor bedding room" },
  { file: "loft-bedroom", category: "interior", ko: "다락 침구 공간", en: "Loft sleeping area" },
  { file: "bathroom", category: "interior", ko: "욕실", en: "Bathroom" },
  { file: "green-lawn", category: "seasons", ko: "초록빛 마당", en: "Green courtyard" },
  { file: "winter-house", category: "seasons", ko: "눈 내린 한옥", en: "Hanok in snow" },
  { file: "snow-jars", category: "seasons", ko: "눈 쌓인 장독대", en: "Jars after snowfall" },
  { file: "pond", category: "seasons", ko: "정원의 연못", en: "Garden pond" },
  { file: "evening-hanok", category: "night", ko: "저녁의 강산재", en: "Hanok at dusk" },
  { file: "blue-hour", category: "night", ko: "푸른 저녁 하늘 아래 한옥", en: "Hanok at blue hour" },
  { file: "firepit", category: "night", ko: "마당의 모닥불", en: "Fire in the courtyard" },
] as const;
