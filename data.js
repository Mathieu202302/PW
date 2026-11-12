/* Content for the whole site. Edit this file to update any page.
   Text shown on the site is written as {en: '...', zh: '...'} so it can switch between English and Traditional Chinese.
   To add a real photo: upload the image next to index.html and add src: "yourfile.jpg" to that photo.
   Entries without src show generated placeholder art. */
window.SITE = {
  profile: {
    name: {en: 'Matthew Wang', zh: '馬修'},
    location: {en: 'San Diego, California', zh: '美國加州聖地牙哥'},
    short: {en: 'San Diego, CA', zh: '美國 聖地牙哥'},
    tz: 'America/Los_Angeles',
    roles: [
      {en: 'Photographer', zh: '攝影師'},
      {en: 'Collector', zh: '收藏家'},
      {en: 'Engineer', zh: '工程師'}
    ],
    links: [
      {label: 'Instagram', href: 'https://www.instagram.com/mathieu_wang/'},
      {label: 'LinkedIn', href: 'https://www.linkedin.com/in/teng-yen-wang-a97999340/'}
    ]
  },

  /* Contact form. Paste the access key from web3forms.com between the quotes.
     The key is safe to publish. Messages go to the email you used to create it,
     and that email address never appears on the site. */
  contact: {accessKey: ''},

  /* Photography: albums and photos (placeholders for now). kind is the placeholder art: hills, city or paw. */
  albums: [
    {id: 'landscapes', name: {en: 'Landscapes', zh: '風景'}},
    {id: 'city',       name: {en: 'City',       zh: '城市'}},
    {id: 'travel',     name: {en: 'Travel',     zh: '旅行'}},
    {id: 'pets',       name: {en: 'Pets',       zh: '寵物'}}
  ],
  photos: [
    {id: 'p1', album: 'landscapes', title: {en: 'Landscape sample 1', zh: '風景範例 1'}, w: 1500, h: 1000, art: {kind: 'hills', seed: 11, hue: 205}},
    {id: 'p2', album: 'city',       title: {en: 'City sample 1',      zh: '城市範例 1'}, w: 1000, h: 1500, art: {kind: 'city',  seed: 4,  hue: 250}},
    {id: 'p3', album: 'travel',     title: {en: 'Travel sample 1',    zh: '旅行範例 1'}, w: 1200, h: 1200, art: {kind: 'hills', seed: 27, hue: 28}},
    {id: 'p4', album: 'landscapes', title: {en: 'Landscape sample 2', zh: '風景範例 2'}, w: 1600, h: 900,  art: {kind: 'hills', seed: 5,  hue: 168}},
    {id: 'p5', album: 'city',       title: {en: 'City sample 2',      zh: '城市範例 2'}, w: 1000, h: 1250, art: {kind: 'city',  seed: 19, hue: 215}},
    {id: 'p6', album: 'travel',     title: {en: 'Travel sample 2',    zh: '旅行範例 2'}, w: 1500, h: 1000, art: {kind: 'hills', seed: 33, hue: 340}},
    {id: 'p7', album: 'landscapes', title: {en: 'Landscape sample 3', zh: '風景範例 3'}, w: 1000, h: 1500, art: {kind: 'hills', seed: 8,  hue: 190}},
    {id: 'p8', album: 'city',       title: {en: 'City sample 3',      zh: '城市範例 3'}, w: 1200, h: 800,  art: {kind: 'city',  seed: 41, hue: 280}},
    {id: 'p9', album: 'travel',     title: {en: 'Travel sample 3',    zh: '旅行範例 3'}, w: 1200, h: 1200, art: {kind: 'hills', seed: 14, hue: 48}},
    {id: 'p10', album: 'pets',      title: {en: 'Pet sample 1',       zh: '寵物範例 1'}, w: 1200, h: 1200, art: {kind: 'paw',   seed: 6,  hue: 28}},
    {id: 'p11', album: 'pets',      title: {en: 'Pet sample 2',       zh: '寵物範例 2'}, w: 1000, h: 1250, art: {kind: 'paw',   seed: 17, hue: 198}},
    {id: 'p12', album: 'pets',      title: {en: 'Pet sample 3',       zh: '寵物範例 3'}, w: 1500, h: 1000, art: {kind: 'paw',   seed: 29, hue: 335}}
  ],

  /* Collections: each has items. Items without src show generated placeholder art (kind: bricks or car). */
  collections: [
    {id: 'lego', name: {en: 'LEGO', zh: '樂高'}, blurb: {en: 'Sets I have built and kept.', zh: '我組好並收藏的樂高套組。'},
     items: [
       {id: 'l1', title: {en: 'LEGO set 1', zh: '樂高套組 1'}, meta: {en: 'Add the set name and number', zh: '請補上套組名稱與編號'}, art: {kind: 'bricks', seed: 3,  hue: 4}},
       {id: 'l2', title: {en: 'LEGO set 2', zh: '樂高套組 2'}, meta: {en: 'Add the set name and number', zh: '請補上套組名稱與編號'}, art: {kind: 'bricks', seed: 9,  hue: 210}},
       {id: 'l3', title: {en: 'LEGO set 3', zh: '樂高套組 3'}, meta: {en: 'Add the set name and number', zh: '請補上套組名稱與編號'}, art: {kind: 'bricks', seed: 15, hue: 45}},
       {id: 'l4', title: {en: 'LEGO set 4', zh: '樂高套組 4'}, meta: {en: 'Add the set name and number', zh: '請補上套組名稱與編號'}, art: {kind: 'bricks', seed: 21, hue: 150}},
       {id: 'l5', title: {en: 'LEGO set 5', zh: '樂高套組 5'}, meta: {en: 'Add the set name and number', zh: '請補上套組名稱與編號'}, art: {kind: 'bricks', seed: 27, hue: 280}},
       {id: 'l6', title: {en: 'LEGO set 6', zh: '樂高套組 6'}, meta: {en: 'Add the set name and number', zh: '請補上套組名稱與編號'}, art: {kind: 'bricks', seed: 33, hue: 20}}
     ]},
    {id: 'model-car', name: {en: 'Model car', zh: '模型車'}, blurb: {en: 'Scale models of cars I like.', zh: '我喜歡的車款，以比例模型收藏。'},
     items: [
       {id: 'm1', title: {en: 'Model car 1', zh: '模型車 1'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 2,  hue: 355}},
       {id: 'm2', title: {en: 'Model car 2', zh: '模型車 2'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 8,  hue: 215}},
       {id: 'm3', title: {en: 'Model car 3', zh: '模型車 3'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 14, hue: 42}},
       {id: 'm4', title: {en: 'Model car 4', zh: '模型車 4'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 20, hue: 160}},
       {id: 'm5', title: {en: 'Model car 5', zh: '模型車 5'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 26, hue: 270}},
       {id: 'm6', title: {en: 'Model car 6', zh: '模型車 6'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 32, hue: 25}}
     ]}
  ],

  /* YouTube shown at the bottom of the Collections page. id is the part after v= in the video link. */
  youtube: {id: 'gVmvFTwi5FQ', url: 'https://www.youtube.com/watch?v=gVmvFTwi5FQ'},

  /* Career: education only, newest first. href makes the school name a link. */
  education: [
    {when: {en: '2025 to 2027', zh: '2025 至 2027'},
     title: {en: 'University of California San Diego (UCSD)', zh: '加州大學聖地牙哥分校（UCSD）'}, href: 'https://ucsd.edu/',
     sub: {en: 'M.S., Electrical and Computer Engineering, medical imaging track', zh: '電機與電腦工程碩士（M.S.），醫學影像組'},
     note: {en: 'Expected graduation in 2027.', zh: '預計 2027 年畢業。'}},
    {when: {en: '2019 to 2023', zh: '2019 至 2023'},
     title: {en: 'National Cheng Kung University', zh: '國立成功大學'}, href: 'https://www.ncku.edu.tw/',
     sub: {en: 'B.S., Electrical Engineering', zh: '電機工程學士（B.S.）'}, note: ''},
    {when: {en: '2015 to 2019', zh: '2015 至 2019'},
     title: {en: 'National Tainan First Senior High School', zh: '國立臺南第一高級中學'}, href: '',
     sub: {en: 'Tainan, Taiwan', zh: '臺灣臺南'}, note: ''}
  ]
};
