/* Content for the whole site. Edit this file to update any page.
   To add a real photo: upload the image next to index.html and add src: "yourfile.jpg" to that photo.
   Entries without src show generated placeholder art. */
window.SITE = {
  profile: {
    name: 'Matthew Wang',
    location: 'San Diego, California',
    short: 'San Diego, CA',
    tz: 'America/Los_Angeles',
    roles: ['Photographer', 'Collector', 'Engineer'],
    links: [
      {label: 'Instagram', href: 'https://www.instagram.com/mathieu_wang/'},
      {label: 'LinkedIn', href: 'https://www.linkedin.com/in/teng-yen-wang-a97999340/'}
    ]
  },

  /* Contact form. Paste the access key from web3forms.com between the quotes.
     The key is safe to publish. Messages go to the email you used to create it,
     and that email address never appears on the site. */
  contact: {accessKey: ''},

  /* Photography: albums and photos (placeholders for now). kind is the placeholder art: hills or city. */
  albums: [
    {id: 'landscapes', name: 'Landscapes'},
    {id: 'city', name: 'City'},
    {id: 'travel', name: 'Travel'}
  ],
  photos: [
    {id: 'p1', album: 'landscapes', title: 'Landscape sample 1', w: 1500, h: 1000, art: {kind: 'hills', seed: 11, hue: 205}},
    {id: 'p2', album: 'city',       title: 'City sample 1',      w: 1000, h: 1500, art: {kind: 'city',  seed: 4,  hue: 250}},
    {id: 'p3', album: 'travel',     title: 'Travel sample 1',    w: 1200, h: 1200, art: {kind: 'hills', seed: 27, hue: 28}},
    {id: 'p4', album: 'landscapes', title: 'Landscape sample 2', w: 1600, h: 900,  art: {kind: 'hills', seed: 5,  hue: 168}},
    {id: 'p5', album: 'city',       title: 'City sample 2',      w: 1000, h: 1250, art: {kind: 'city',  seed: 19, hue: 215}},
    {id: 'p6', album: 'travel',     title: 'Travel sample 2',    w: 1500, h: 1000, art: {kind: 'hills', seed: 33, hue: 340}},
    {id: 'p7', album: 'landscapes', title: 'Landscape sample 3', w: 1000, h: 1500, art: {kind: 'hills', seed: 8,  hue: 190}},
    {id: 'p8', album: 'city',       title: 'City sample 3',      w: 1200, h: 800,  art: {kind: 'city',  seed: 41, hue: 280}},
    {id: 'p9', album: 'travel',     title: 'Travel sample 3',    w: 1200, h: 1200, art: {kind: 'hills', seed: 14, hue: 48}}
  ],

  /* Collections: each has items. Items without src show generated placeholder art (kind: bricks or car). */
  collections: [
    {id: 'lego', name: 'LEGO', blurb: 'Sets I have built and kept.',
     items: [
       {id: 'l1', title: 'LEGO set 1', meta: 'Add the set name and number', art: {kind: 'bricks', seed: 3,  hue: 4}},
       {id: 'l2', title: 'LEGO set 2', meta: 'Add the set name and number', art: {kind: 'bricks', seed: 9,  hue: 210}},
       {id: 'l3', title: 'LEGO set 3', meta: 'Add the set name and number', art: {kind: 'bricks', seed: 15, hue: 45}},
       {id: 'l4', title: 'LEGO set 4', meta: 'Add the set name and number', art: {kind: 'bricks', seed: 21, hue: 150}},
       {id: 'l5', title: 'LEGO set 5', meta: 'Add the set name and number', art: {kind: 'bricks', seed: 27, hue: 280}},
       {id: 'l6', title: 'LEGO set 6', meta: 'Add the set name and number', art: {kind: 'bricks', seed: 33, hue: 20}}
     ]},
    {id: 'model-car', name: 'Model car', blurb: 'Scale models of cars I like.',
     items: [
       {id: 'm1', title: 'Model car 1', meta: 'Add the make, model and scale', art: {kind: 'car', seed: 2,  hue: 355}},
       {id: 'm2', title: 'Model car 2', meta: 'Add the make, model and scale', art: {kind: 'car', seed: 8,  hue: 215}},
       {id: 'm3', title: 'Model car 3', meta: 'Add the make, model and scale', art: {kind: 'car', seed: 14, hue: 42}},
       {id: 'm4', title: 'Model car 4', meta: 'Add the make, model and scale', art: {kind: 'car', seed: 20, hue: 160}},
       {id: 'm5', title: 'Model car 5', meta: 'Add the make, model and scale', art: {kind: 'car', seed: 26, hue: 270}},
       {id: 'm6', title: 'Model car 6', meta: 'Add the make, model and scale', art: {kind: 'car', seed: 32, hue: 25}}
     ]}
  ],

  /* Career: education only, newest first. href makes the school name a link. */
  education: [
    {when: '2025 to 2027', title: 'University of California San Diego (UCSD)', href: 'https://ucsd.edu/',
     sub: 'M.S., Electrical and Computer Engineering, medical imaging track', note: 'Expected graduation in 2027.'},
    {when: '2019 to 2023', title: 'National Cheng Kung University', href: 'https://www.ncku.edu.tw/',
     sub: 'B.S., Electrical Engineering', note: ''},
    {when: '2015 to 2019', title: 'National Tainan First Senior High School', href: '',
     sub: 'Tainan, Taiwan', note: ''}
  ]
};
