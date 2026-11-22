/**
 * ============================================================================
 * EASY-TO-EDIT STREET-FOOD GUIDE CONTENT
 * ============================================================================
 * Edit ANY text in this single file to adapt this guide to your own city,
 * or click "Edit Text" right inside the app to customize everything live.
 */

export type TimeVibe = 'Morning' | 'Midday' | 'Late Night';

export type DishIconType =
  | 'taco'
  | 'tostada'
  | 'tamale'
  | 'elote'
  | 'churro'
  | 'quesadilla'
  | 'torta'
  | 'birria';

export interface StreetFoodSpot {
  /** Numbered rank from 1 to 10 */
  id: number;
  /** Name of the stall, cart, or corner spot */
  name: string;
  /** Neighborhood or district */
  neighborhood: string;
  /** Street intersection or landmark directions */
  address: string;
  /** When the cart is usually open */
  hours: string;
  /** Typical spend per person */
  priceRange: string;
  /** Best time of day to visit */
  vibe: TimeVibe;
  /** The signature order — keep this punchy and specific */
  whatToOrder: string;
  /** Quick secondary drink or side pairing */
  pairWith: string;
  /** One-to-two sentence story on why this spot made the top 10 */
  story: string;
  /** Insider tip for ordering like a local */
  proTip: string;
  /** Position on the city map SVG canvas (x: 10–90, y: 12–88) */
  mapX: number;
  mapY: number;
  /** Optional editorial photograph URL (4 featured visual spotlights) */
  imageUrl?: string;
  /** Descriptive alt text for the photo */
  imageAlt?: string;
  /** Monochrome geometric stamp icon for typographic cards */
  stamp: DishIconType;
}

export interface SiteCopy {
  /** Short 1-word or 2-word brand title shown in top navigation */
  brandName: string;
  /** Your city name */
  cityName: string;
  /** Edition line above the main hero headline */
  editionLine: string;
  /** Big bold hero display headline */
  heroHeadline: string;
  /** Short intro paragraph under the hero headline */
  heroSubheadline: string;
  /** Hero photo caption */
  heroPhotoCaption: string;
  /** Map section heading */
  mapHeading: string;
  /** Map section short description */
  mapSubheading: string;
  /** Top 10 list section heading */
  listHeading: string;
  /** Top 10 list short description */
  listSubheading: string;
  /** Footer author / curator note */
  curatorNote: string;
}

export interface StreetFoodGuideData {
  site: SiteCopy;
  spots: StreetFoodSpot[];
}

export const HERO_IMAGE_URL =
  '/src/assets/images/hero_street_tacos_1795096287368.jpg';

export const DEFAULT_GUIDE_DATA: StreetFoodGuideData = {
  site: {
    brandName: 'Curbside',
    cityName: 'Mexico City',
    editionLine: 'Mexico City · Street-Food Map · 2026 Edition',
    heroHeadline: 'Ten corners. Zero bad bites.',
    heroSubheadline:
      'Skip the reservations. These are the plastic stools, sizzling planchas, and late-night sidewalk carts that define our city—mapped with the exact order to call out at each.',
    heroPhotoCaption:
      'Midnight al pastor shift off Insurgentes · 35mm street archive',
    mapHeading: 'The Curbside Map',
    mapSubheading:
      'Tap any numbered pin to inspect the corner, see the must-order dish, or trace a walking crawl across town.',
    listHeading: 'The Top 10 Spots',
    listSubheading:
      'Ranked by sheer craveability. Check off spots as you eat your way through the city, or tap Edit Text anytime to swap in your own local favorites.',
    curatorNote:
      'Curated on foot with cash in pocket. All text and spots are editable live.',
  },
  spots: [
    {
      id: 1,
      name: 'Tacos El Vilsito',
      neighborhood: 'Narvarte',
      address: 'Petén 248, corner of Universidad',
      hours: '8:00 PM – 3:00 AM',
      priceRange: '$4 – $7',
      vibe: 'Late Night',
      whatToOrder: '3 Tacos al Pastor con todo + 1 Volcán de Pastor',
      pairWith: 'Ice-cold glass-bottle Boing de Mango',
      story:
        'An auto-body repair shop by day that rolls up its metal shutters at dusk to reveal one of the sharpest glowing trompos in the city. The pork is shaved paper-thin with charred, caramelized edges.',
      proTip:
        'Ask the taquero for "doradito" so you get the crispiest outer slices, and squeeze lime over the sweet pineapple chunk first.',
      mapX: 54,
      mapY: 74,
      imageUrl: '/src/assets/images/dish_suadero_tacos_1795096286338.jpg',
      imageAlt: 'Three seared street tacos on wax paper with cilantro, onion, and fresh lime',
      stamp: 'taco',
    },
    {
      id: 2,
      name: 'Tamales Doña Emi',
      neighborhood: 'Roma Sur',
      address: 'Jalapa 278, corner of Tlaxcala',
      hours: '7:30 AM – 11:30 AM',
      priceRange: '$2 – $4',
      vibe: 'Morning',
      whatToOrder: '1 Tamal de Mole Negro + 1 Guayaba Sweet Tamal',
      pairWith: 'Steaming cup of Champurrado',
      story:
        'Steaming aluminum drums lined along a sunny tree-shaded corner. The masa is impossibly fluffy—never dense—wrapped tight in banana leaves and corn husks that sell out before noon.',
      proTip:
        'Arrive before 9:30 AM on weekends if you want the fig and cream cheese special before the pot hits bottom.',
      mapX: 43,
      mapY: 57,
      stamp: 'tamale',
    },
    {
      id: 3,
      name: 'Mariscos El Caguamo',
      neighborhood: 'Centro Histórico',
      address: 'Ayuntamiento 47, near Mercado San Juan',
      hours: '11:30 AM – 5:30 PM',
      priceRange: '$6 – $11',
      vibe: 'Midday',
      whatToOrder: '2 Tostadas de Atún Fresco + Aguachile Negro',
      pairWith: 'Chilled mineral water with salted lime',
      story:
        'A bustling sidewalk seafood counter where hand-fried corn tostadas come stacked high with ruby tuna, fanned avocado, and smoky salsa macha. Stand shoulder-to-shoulder at the steel rail.',
      proTip:
        'Ask for a splash of the house chiltepín oil—two drops turn the tuna tostada electric without overpowering the fish.',
      mapX: 66,
      mapY: 26,
      imageUrl: '/src/assets/images/dish_seafood_tostada_1795096287691.jpg',
      imageAlt: 'Crispy corn tostadas stacked with fresh tuna ceviche, avocado, and fried leek',
      stamp: 'tostada',
    },
    {
      id: 4,
      name: 'Tacos Cocuyos',
      neighborhood: 'Centro Histórico',
      address: 'Simón Bolívar 59, downtown alley',
      hours: '12:00 PM – 4:00 AM',
      priceRange: '$3 – $6',
      vibe: 'Late Night',
      whatToOrder: '2 Tacos de Suadero + 1 Campechano (Suadero & Longaniza)',
      pairWith: 'Horchata from the corner jug',
      story:
        'A tiny steel-clad window with a bubbling convex pot of confit beef cuts simmering slowly in their own rich juices. Zero seating, maximum flavor, nonstop rhythm from lunch until 4 AM.',
      proTip:
        'Point straight at the pot and order "mixto con tripa dorada" if you love deep, crunchy texture.',
      mapX: 73,
      mapY: 21,
      stamp: 'taco',
    },
    {
      id: 5,
      name: 'Quesadillas Señora Lupita',
      neighborhood: 'Condesa',
      address: 'Avenida Michoacán at Parque México edge',
      hours: '9:00 AM – 4:00 PM',
      priceRange: '$3 – $5',
      vibe: 'Midday',
      whatToOrder: 'Blue-Corn Quesadilla de Flor de Calabaza con Queso + Huitlacoche',
      pairWith: 'Freshly pressed hibiscus agua fresca',
      story:
        'Hand-pressed heirloom blue corn masa slapped straight onto an oiled comal until blistered and crisp. Stuffed with earthy squash blossoms, epazote, and strings of melting Oaxaca cheese.',
      proTip:
        'In this city, always specify "con queso" if you want cheese inside your quesadilla—and pile on the raw nopal salad.',
      mapX: 29,
      mapY: 50,
      stamp: 'quesadilla',
    },
    {
      id: 6,
      name: 'Esquites Don Beto',
      neighborhood: 'Juárez',
      address: 'Calle Havre & Reforma underpass corner',
      hours: '6:00 PM – 11:00 PM',
      priceRange: '$2 – $4',
      vibe: 'Late Night',
      whatToOrder: 'Charcoal-Grilled Elote Entero + Cup of Bone-Marrow Esquites',
      pairWith: 'Extra lime wedge on the side',
      story:
        'Follow the trail of hardwood charcoal smoke rising two blocks down the sidewalk. Sweet kernels are blistered over glowing embers, then slathered with tangy crema, aged cotija, and chile piquín.',
      proTip:
        'Ask for "del que pica" (the spicy chili powder) blended half-and-half with mild chili for the best smoky balance.',
      mapX: 46,
      mapY: 32,
      imageUrl: '/src/assets/images/dish_street_elote_1795096287204.jpg',
      imageAlt: 'Charcoal-grilled street corn elote dusted with cotija cheese and chili over a smoky brazier',
      stamp: 'elote',
    },
    {
      id: 7,
      name: 'Birria La Polar Express Cart',
      neighborhood: 'San Rafael',
      address: 'Guillermo Prieto 88, corner curb',
      hours: '8:30 AM – 3:00 PM',
      priceRange: '$4 – $8',
      vibe: 'Morning',
      whatToOrder: '2 Crispy Quesabirrias + 1 Large Consomé with Chickpeas',
      pairWith: 'Cold Tepache (fermented pineapple spice drink)',
      story:
        'Slow-braised spiced beef shredded to order and dunked onto a blazing griddle until the tortilla rims turn lacy and dark crimson. The fragrant broth alone can revive anyone on a Sunday morning.',
      proTip:
        'Drop a spoonful of diced raw onion, cilantro, and a half-lime straight into your consomé before your first dip.',
      mapX: 38,
      mapY: 22,
      stamp: 'birria',
    },
    {
      id: 8,
      name: 'Tortas de Chilaquiles La Esquina',
      neighborhood: 'Condesa',
      address: 'Alfonso Reyes & Tamaulipas corner',
      hours: '8:00 AM – 1:00 PM',
      priceRange: '$3 – $5',
      vibe: 'Morning',
      whatToOrder: 'Torta de Chilaquiles Verdes con Milanesa de Pollo',
      pairWith: 'Fresh orange-carrot street juice',
      story:
        'The ultimate carb-on-carb morning monument: crusty bolillo bread hollowed slightly and packed with crispy fried tortilla triangles drenched in bright tomatillo salsa, cream, cheese, and crispy breaded chicken.',
      proTip:
        'The line looks long around 10 AM, but three people assemble orders simultaneously—it moves in under 12 minutes.',
      mapX: 23,
      mapY: 60,
      stamp: 'torta',
    },
    {
      id: 9,
      name: 'Churros del Parque',
      neighborhood: 'Coyoacán',
      address: 'Jardín Centenario south sidewalk cart',
      hours: '5:00 PM – 12:00 AM',
      priceRange: '$2 – $5',
      vibe: 'Late Night',
      whatToOrder: '6 Hot Cinnamon-Sugar Churros + 1 Dipping Cup of Cajeta',
      pairWith: 'Thick Oaxacan Dark Hot Chocolate',
      story:
        'Piped straight into bubbling oil in one long spiral, snipped hot with shears, and tumbled in coarse sugar while still crackling. Crisp ridges outside, cloud-soft dough inside.',
      proTip:
        'Skip the pre-filled ones and order plain fresh-from-the-fryer churros with warm goat-milk cajeta on the side for dipping.',
      mapX: 48,
      mapY: 86,
      imageUrl: '/src/assets/images/dish_night_churros_1795096288022.jpg',
      imageAlt: 'Crisp sugar-dusted ridged churros on paper beside a ceramic mug of dark Mexican hot chocolate',
      stamp: 'churro',
    },
    {
      id: 10,
      name: 'Carnitas El Rincón Tarasco',
      neighborhood: 'Doctores',
      address: 'Dr. Vértiz 142, outside the hardware store',
      hours: '10:00 AM – 4:00 PM',
      priceRange: '$4 – $7',
      vibe: 'Midday',
      whatToOrder: '2 Tacos Surtidos (Maciza + Cuerito) + 1 Taco de Costilla',
      pairWith: 'Pickled jalapeños and carrots from the jar',
      story:
        'A hammered copper cazo gleaming on the curb, gently poaching Michoacán-style pork until melt-in-your-mouth tender. Chopped rhythmically on a thick tree-trunk block right in front of you.',
      proTip:
        'Ask for "surtida con poquito cuerito" for the ideal mix of lean meat and silky skin, topped with tangy salsa verde cruda.',
      mapX: 62,
      mapY: 47,
      stamp: 'taco',
    },
  ],
};
