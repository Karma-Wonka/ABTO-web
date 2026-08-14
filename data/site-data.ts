/* ============================================================
   ABTO — STATIC SITE DATA
   Member names, live news/events/documents come from the Neon
   database (see lib/live-data.ts). Everything here is content
   that isn't in the CMS yet: policy library, classifieds,
   festival calendar, destinations, partners, board, FAQs.
   Ported from the original legacy/script1.js data arrays.
   ============================================================ */

export const SPECS = [
  'Cultural Tours',
  'Trekking',
  'Birding',
  'Cycling',
  'Photography',
  'Pilgrimage',
  'Textiles & Craft',
  'Adventure',
  'Wellness',
  'Festivals',
  'Rafting',
  'Fly Fishing'
] as const;

export const REGIONS = [
  'Thimphu',
  'Paro',
  'Punakha',
  'Bumthang',
  'Trashigang',
  'Phuentsholing',
  'Gelephu',
  'Wangdue',
  'Haa',
  'Trongsa'
] as const;

export const LANGS = [
  'English',
  'Japanese',
  'German',
  'French',
  'Mandarin',
  'Hindi',
  'Thai',
  'Spanish',
  'Italian',
  'Korean'
] as const;

export type Policy = {
  t: string;
  cat: string;
  yr: number;
  size: string;
  type: string;
  x: string;
};

export const POLICIES: Policy[] = [
  { t: 'Tourism Levy Act of Bhutan 2022', cat: 'Legislation', yr: 2022, size: '412 KB', type: 'PDF', x: 'Establishes the Sustainable Development Fee and its administration.' },
  { t: 'Tourism Levy Rules and Regulations', cat: 'Regulation', yr: 2023, size: '680 KB', type: 'PDF', x: 'Operational rules for levy collection, exemptions and remittance.' },
  { t: 'Tour Operator Licensing Guidelines', cat: 'Licensing', yr: 2023, size: '295 KB', type: 'PDF', x: 'Requirements, renewal cycle and conditions attached to a tour operation licence.' },
  { t: 'Minimum Service Standards for Tour Operators', cat: 'Standards', yr: 2024, size: '518 KB', type: 'PDF', x: 'Accommodation, transport, guiding and guest-care benchmarks.' },
  { t: 'Tourist Guide Certification Framework', cat: 'Standards', yr: 2024, size: '340 KB', type: 'PDF', x: 'Categories of guide licence, competency requirements and renewal.' },
  { t: 'Visa and Permit Procedures for Visitors', cat: 'Immigration', yr: 2024, size: '224 KB', type: 'PDF', x: 'Application flow, processing timelines and route permit requirements.' },
  { t: 'Trekking Route Regulations and Camp Management', cat: 'Regulation', yr: 2023, size: '756 KB', type: 'PDF', x: 'Permitted routes, waste protocols, campsite allocation and porter welfare.' },
  { t: 'Vehicle and Transport Standards Notification', cat: 'Standards', yr: 2024, size: '188 KB', type: 'PDF', x: 'Vehicle age, insurance and safety-equipment requirements for tourist transport.' },
  { t: 'Homestay Registration and Operating Rules', cat: 'Licensing', yr: 2022, size: '271 KB', type: 'PDF', x: 'Village homestay standards and the registration procedure.' },
  { t: 'Sustainable Tourism Policy Framework', cat: 'Policy', yr: 2023, size: '902 KB', type: 'PDF', x: 'The high-value, low-volume approach and its environmental safeguards.' },
  { t: 'Code of Conduct for Tourism Service Providers', cat: 'Standards', yr: 2021, size: '156 KB', type: 'PDF', x: 'Ethical obligations toward guests, communities and heritage sites.' },
  { t: 'Annual Tourism Monitor: Arrival Statistics', cat: 'Statistics', yr: 2024, size: '1.4 MB', type: 'PDF', x: 'Arrivals by market, season, purpose and average length of stay.' }
];

export type Classified = {
  t: string;
  cat: string;
  price: string;
  loc: string;
  feat: boolean;
  x: string;
  by: string;
  d: string;
};

export const CLASSIFIEDS: Classified[] = [
  { t: 'Toyota Hiace 2021, tourist-licensed, 11 seats', cat: 'Vehicles', price: 'Nu. 1,850,000', loc: 'Thimphu', feat: true, x: 'Single owner, full service history, tourist permit current to 2026. Ideal for cultural circuits.', by: 'Member operator', d: '2025-05-18' },
  { t: 'Experienced cultural guide seeking placement', cat: 'Jobs', price: 'Negotiable', loc: 'Paro', feat: false, x: 'Nine years’ experience, licensed cultural guide, fluent English and conversational Japanese. Available from September.', by: 'Individual', d: '2025-05-14' },
  { t: 'Trekking equipment, 12 four-season tents', cat: 'Equipment', price: 'Nu. 220,000 (lot)', loc: 'Thimphu', feat: true, x: 'Used two seasons, all poles and flysheets present, stored dry. Selling as a complete lot only.', by: 'Member operator', d: '2025-05-09' },
  { t: 'Office space to let, central Thimphu', cat: 'Property', price: 'Nu. 32,000 / month', loc: 'Thimphu', feat: false, x: 'Ground floor, 62 sqm, street frontage suitable for a tour desk. Parking for two vehicles.', by: 'Member operator', d: '2025-05-02' },
  { t: 'Seeking DMC partner for the European market', cat: 'Partnership', price: 'N/A', loc: 'Thimphu', feat: false, x: 'Established operator seeking a European partner for joint product development in the shoulder season.', by: 'Member operator', d: '2025-04-27' },
  { t: 'Reservations officer, full time', cat: 'Jobs', price: 'Nu. 22,000–28,000', loc: 'Thimphu', feat: false, x: 'Two years’ experience with GDS or OTA systems preferred. Written English essential.', by: 'Member operator', d: '2025-04-21' },
  { t: 'Hyundai Staria 2023, low mileage', cat: 'Vehicles', price: 'Nu. 2,400,000', loc: 'Paro', feat: false, x: 'Under 30,000 km, comprehensive insurance to March 2026, airport-transfer configuration.', by: 'Member operator', d: '2025-04-15' },
  { t: 'Camping kitchen and dining set', cat: 'Equipment', price: 'Nu. 95,000', loc: 'Bumthang', feat: false, x: 'Complete trek kitchen: stoves, gas, dining tent, tables and seating for twelve.', by: 'Member operator', d: '2025-04-08' }
];

export type Festival = { n: string; p: string; d25: string; d26: string; dz: string };

export const FESTIVALS: Festival[] = [
  { n: 'Punakha Drubchen', p: 'Punakha Dzong', d25: '05 – 07 Mar 2025', d26: '22 – 24 Feb 2026', dz: 'Punakha' },
  { n: 'Punakha Tshechu', p: 'Punakha Dzong', d25: '08 – 10 Mar 2025', d26: '25 – 27 Feb 2026', dz: 'Punakha' },
  { n: 'Paro Tshechu', p: 'Rinpung Dzong, Paro', d25: '09 – 13 Apr 2025', d26: '29 Mar – 02 Apr 2026', dz: 'Paro' },
  { n: 'Domkhar Tshechu', p: 'Domkhar, Chumey', d25: '08 – 10 Apr 2025', d26: '28 – 30 Mar 2026', dz: 'Bumthang' },
  { n: 'Ura Yakchoe', p: 'Ura Lhakhang', d25: '11 – 15 Apr 2025', d26: '31 Mar – 04 Apr 2026', dz: 'Bumthang' },
  { n: 'Nimalung Tshechu', p: 'Nimalung Dratshang', d25: '04 – 06 Jul 2025', d26: '23 – 25 Jun 2026', dz: 'Bumthang' },
  { n: 'Kurjey Tshechu', p: 'Kurjey Lhakhang', d25: '06 Jul 2025', d26: '25 Jun 2026', dz: 'Bumthang' },
  { n: 'Haa Summer Festival', p: 'Haa Valley', d25: '12 – 13 Jul 2025', d26: '11 – 12 Jul 2026', dz: 'Haa' },
  { n: 'Wangdue Tshechu', p: 'Tencholing Ground', d25: '01 – 03 Oct 2025', d26: '20 – 22 Sep 2026', dz: 'Wangdue' },
  { n: 'Thimphu Drubchen', p: 'Tashichho Dzong', d25: '01 Oct 2025', d26: '20 Sep 2026', dz: 'Thimphu' },
  { n: 'Thimphu Tshechu', p: 'Tashichho Dzong', d25: '03 – 05 Oct 2025', d26: '22 – 24 Sep 2026', dz: 'Thimphu' },
  { n: 'Gangtey Tshechu', p: 'Gangtey Gonpa', d25: '05 – 07 Oct 2025', d26: '24 – 26 Sep 2026', dz: 'Wangdue' },
  { n: 'Jakar Tshechu', p: 'Jakar Dzong', d25: '01 – 05 Nov 2025', d26: '21 – 25 Oct 2026', dz: 'Bumthang' },
  { n: 'Black-Necked Crane Festival', p: 'Gangtey Gonpa, Phobjikha', d25: '11 Nov 2025', d26: '11 Nov 2026', dz: 'Wangdue' },
  { n: 'Mongar Tshechu', p: 'Mongar Dzong', d25: '29 Nov – 02 Dec 2025', d26: '18 – 21 Nov 2026', dz: 'Mongar' },
  { n: 'Trashigang Tshechu', p: 'Trashigang Dzong', d25: '30 Nov – 03 Dec 2025', d26: '19 – 22 Nov 2026', dz: 'Trashigang' },
  { n: 'Lhuentse Tshechu', p: 'Lhuentse Dzong', d25: '28 – 30 Dec 2025', d26: '17 – 19 Dec 2026', dz: 'Lhuentse' },
  { n: 'Trongsa Tshechu', p: 'Trongsa Dzong', d25: '29 – 31 Dec 2025', d26: '18 – 20 Dec 2026', dz: 'Trongsa' }
];

export type Destination = { t: string; x: string; tag: string };

export const DESTS: Destination[] = [
  { t: 'Paro Valley', x: 'Taktsang Monastery, Rinpung Dzong, and the country’s only international airport.', tag: 'Cultural' },
  { t: 'Thimphu', x: 'The capital, home to Tashichho Dzong, the Buddha Dordenma and the weekend market.', tag: 'Capital' },
  { t: 'Punakha', x: 'The former winter capital, its dzong set at the confluence of two rivers.', tag: 'Heritage' },
  { t: 'Bumthang', x: 'The spiritual heartland, four valleys of ancient temples and sacred sites.', tag: 'Pilgrimage' },
  { t: 'Phobjikha', x: 'Glacial valley and winter roost of the endangered black-necked crane.', tag: 'Nature' },
  { t: 'Haa Valley', x: 'A quiet western valley, opened to visitors relatively recently.', tag: 'Off-path' },
  { t: 'Trashigang', x: 'The eastern hub, gateway to Merak, Sakteng and the Brokpa communities.', tag: 'East' },
  { t: 'Gelephu', x: 'Southern gateway and site of the Gelephu Mindfulness City project.', tag: 'Gateway' }
];

export const PARTNERS = [
  'Department of Tourism',
  'Royal Government of Bhutan',
  'Druk Air',
  'Bhutan Airlines',
  'EU SUSTOUR',
  'Guide Association of Bhutan',
  'Hotel & Restaurant Association',
  'Bhutan Chamber of Commerce',
  'Royal Society for Protection of Nature',
  'Bhutan Convention Bureau',
  'Bhutan Media Foundation',
  'Department of Immigration'
];

export type Experience = { t: string; icon: string; x: string };

export const EXPERIENCES: Experience[] = [
  { t: 'Trekking', icon: 'i-plane', x: 'Multi-day routes from the gentle Druk Path to the three-week Snowman Trek, crossing passes above 5,000 m with full camp support.' },
  { t: 'Hiking', icon: 'i-pin', x: 'Day walks around Paro, Thimphu and the central valleys — accessible ways to reach dzongs, lhakhangs and viewpoints without a multi-day itinerary.' },
  { t: 'Birding', icon: 'i-globe', x: 'Over 700 recorded species across altitude bands, from the black-necked cranes of Phobjikha to Zhemgang’s broadleaf forest specialists.' },
  { t: 'Textile & Craft', icon: 'i-doc', x: 'Backstrap weaving in Khoma and Lhuentse, thangka painting, and the thirteen traditional arts practised across the dzongkhags.' },
  { t: 'Architecture', icon: 'i-user', x: 'Dzong fortresses, cantilever bridges and rammed-earth farmhouses — Bhutan’s building tradition read through the guides who explain it.' },
  { t: 'Ecotourism', icon: 'i-check', x: 'Protected corridors and community-managed forest linking more than half the country, supporting wildlife tourism that funds local conservation.' },
  { t: 'Homestays', icon: 'i-pin', x: 'Registered village homestays that put visitor spending directly into rural households, alongside the standard hotel and lodge network.' }
];

export type HorseContractor = { name: string; region: string; contact: string; sample: boolean };

/* Placeholder entries — replace with the official ABTO horse contractor list when supplied */
export const HORSE_CONTRACTORS: HorseContractor[] = [
  { name: 'Contractor name to be confirmed', region: 'Paro / Druk Path routes', contact: 'Pending', sample: true },
  { name: 'Contractor name to be confirmed', region: 'Bumthang / Central treks', contact: 'Pending', sample: true },
  { name: 'Contractor name to be confirmed', region: 'Laya / Snowman route', contact: 'Pending', sample: true }
];

export type BoardMember = { r: string; x: string; email: string; phone: string };

export const BOARD: BoardMember[] = [
  { r: 'Kinley Gyeltshen', x: 'Chairman, Gangri Tours & Travels Pvt Ltd', email: 'ratugangri@gmail.com', phone: '+975 17110027' },
  { r: 'Chencho Wangdi', x: 'Vice Chairman, Exotic Destinations', email: 'exoticdestination98@gmail.com', phone: '+975 17600332' },
  { r: 'Duptho Rinzin Dorji', x: 'Board Member, Shangrila Bhutan Tours & Treks', email: 'shangrilabhutan@gmail.com', phone: '+975 17111011' },
  { r: 'Anan Gurung', x: 'Board Member, Keys to Bhutan', email: 'mail@keystobhutan.com', phone: '+975 2 327232' },
  { r: 'Karma Wangdi', x: 'Board Member, Bhutan Yarden Tours and Treks', email: 'Yardentours@gmail.vom', phone: '+975 17604549' },
  { r: 'Kinga Dechen', x: 'Board Member, Windhorse Tours & Treks', email: 'kinga@windhorsetours.com', phone: '+975 17117477' },
  { r: 'Eutha Karchung', x: 'Board Member, Etho Metho Tours & Treks', email: 'eutha@ethometho.com.bt', phone: '+975 17117575' },
  { r: 'Karma Namgay', x: 'Board Member, Mercury Bhutan Travel', email: 'bhutan@mercurybhutan.com', phone: '+975 17127188' },
  { r: 'Tsewang Rinchen', x: 'Board Member, Original Bhutan Travels', email: 'md@originalbhutan.com', phone: '+975 17223888' },
  { r: 'Chencho Dorji', x: 'Board Member, Active Bhutan Tours', email: 'activebhutantours@gmail.com', phone: '+975 77700017' }
];

export const SECRETARIAT: BoardMember[] = [
  { r: 'Thuji Pem', x: 'Executive Director', email: 'ed@abto.org.bt', phone: '+975 2 335684' },
  { r: 'Tshering Wangmo', x: 'Finance', email: 'tshewangmo@gmail.com', phone: '+975 17609924' }
];

export type GalleryItem = { title: string; photo: string | null; local: boolean };

export const GALLERY_ITEMS: GalleryItem[] = [
  { title: "Tshechu mask dance, Thimphu", photo: "photo-1585904194096-15ef66ccd234", local: false },
  { title: "Trashichho Dzong at dusk", photo: "photo-1665479004228-a8ca0d701836", local: false },
  { title: "Snowman Trek, Laya", photo: null, local: false },
  { title: "Black-necked cranes, Phobjikha", photo: "photo-1580649851649-992b28f56e98", local: false },
  { title: "Taktsang Monastery", photo: "photo-1578556881767-c2cf0bfc9ea3", local: false },
  { title: "ABTO Annual General Meeting", photo: null, local: false },
  { title: "Punakha Dzong, spring", photo: "photo-1602058033339-b9325bb3a6c3", local: false },
  { title: "EU SUSTOUR workshop", photo: null, local: false },
  { title: "Weaving in Khoma", photo: null, local: false },
  { title: "Bumthang valley, autumn", photo: "photo-1617469165786-8007eda3caa7", local: false },
  { title: "Guide certification field day", photo: null, local: false },
  { title: "Thimphu weekend market", photo: null, local: false },
  { title: "Panel discussion, Regenerative Bhutan Forum", photo: "rbf-panel-discussion", local: true },
  { title: "Why Farming & Hospitality, RBF 2025", photo: "rbf-farming-hospitality", local: true },
  { title: "From Supply Chain to Ecosystem, RBF 2025", photo: "rbf-supply-chain-talk", local: true },
  { title: "Panel 3: Greener Supply Chains, RBF 2025", photo: "rbf-panel3-title", local: true },
  { title: "Keynote address, Regenerative Bhutan Forum", photo: "rbf-keynote-audience", local: true }
];

export const PHOTO_CREDITS: [string, string][] = [
  ["Paro Taktsang (Tiger's Nest)", "Aaron Santelices"],
  ["Buddha Dordenma, Thimphu", "Unma Desai"],
  ["Buildings on the Wang Chhu, Thimphu", "Pema Gyamtsho"],
  ["Punakha Dzong", "Arghya Mondal"],
  ["Bhutanese temple on the mountainside", "Raimond Klavins"],
  ["Valley lake and greenery", "Nihar Modi"],
  ["Mountain valley homestead", "Raul Taciu"],
  ["Hillside house, eastern Bhutan", "Gaurav Bagdi"],
  ["Festival mask dancers", "Pema Gyamtsho"]
];

export const FAQS: [string, string][] = [
  ['Who is eligible for ABTO membership?', 'Any tour operator holding a valid tour operation licence issued by the Department of Tourism, Royal Government of Bhutan. Membership is open to the whole licensed sector. There is no quota and no invitation requirement.'],
  ['What does membership cost?', 'An annual membership fee of Nu. 3,000. It is paid when you first join and then again each year to renew, either at the ABTO office or by bank deposit when registering or renewing online.'],
  ['How do I register?', 'Two routes. Visit the ABTO office during office hours with a copy of your tour operation licence and pay the Nu. 3,000 fee. Or register online: download the registration form, deposit the fee, then email the completed form together with a scanned copy of your licence and the deposit slip to the secretariat.'],
  ['How long does approval take?', 'Applications are reviewed as they arrive. Once your licence and deposit are verified, your company is added to the public member directory.'],
  ['What do I get as a member?', 'Representation in policy consultation, a listing in the national member directory, a digital Membership Certificate renewed each year, subsidised in-country and overseas training, service standards and sustainability certification programmes, collective trade fair presence, the classifieds board, and the association’s advocacy on matters no single operator can pursue alone.'],
  ['How does the Membership Certificate work?', 'Once your annual fee is confirmed, a digital Membership Certificate for that year becomes available to download from your member account. It is official recognition that your company is an active, licensed ABTO member in good standing.'],
  ['Can a foreign company join?', 'ABTO’s primary membership is Bhutanese tour operators. Overseas travel companies interested in working with Bhutan should contact the secretariat about partnership arrangements.'],
  ['How do I update my directory listing?', 'Download the Member Directory Update Form from the Downloads section, or email the secretariat directly with the changes.'],
  ['Is ABTO a government body?', 'No. ABTO is an independent, not-for-profit organisation guided by a Board and headed by an Executive Director, working within the framework of its own articles.']
];
