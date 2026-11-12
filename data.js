/* Content for the whole site. Edit this file to update any page.
   Text shown on the site is written as {en: '...', zh: '...'} so it can switch between English and Traditional Chinese.
   Photos load from Google Drive: put the picture in a Drive folder shared as "Anyone with the link: Viewer",
   copy the file id from its link (drive.google.com/file/d/FILE_ID/view) and write drive: 'FILE_ID' on the entry.
   w and h only need to say whether the photo is wide (w bigger) or tall (h bigger): the gallery shows wide photos
   at 3:2, and tall photos as high as two wide photos plus the gap. caption is the short description shown under the photo in the viewer. An entry can also use src: "yourfile.jpg"
   for a file uploaded next to index.html. Entries with neither show generated placeholder art. */
window.SITE = {
  /* Site version, shown in the footer after the legal line. Every update gets a new longer code (four parts, like 1.8897.288.90; the middle numbers can be anything) and the new date. */
  version: {number: '1.6139.527.34', date: '2026-11-12'},

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

  /* Contact form. Messages are forwarded to your inbox by FormSubmit (formsubmit.co).
     formId is the random string FormSubmit gave you after you activated the form. It stands in for your email
     address, so the address itself never appears on the site, and it is safe to publish.
     (accessKey is an optional alternative: a key from web3forms.com. Leave it empty.) */
  contact: {formId: 'e7150ffdfb35b916eef77496f1489613', accessKey: ''},

  /* Photography: albums and photos. Pictures are fetched from Google Drive by file id. */
  albums: [
    {id: 'landscapes', name: {en: 'Landscapes', zh: '風景'}},
    {id: 'city',       name: {en: 'City',       zh: '城市'}},
    {id: 'travel',     name: {en: 'Travel',     zh: '旅行'}},
    {id: 'sky',        name: {en: 'Sky',        zh: '天空'}},
    {id: 'wildlife',   name: {en: 'Wildlife',   zh: '野生動物'}},
    {id: 'pets',       name: {en: 'Pets',       zh: '寵物'}},
    {id: 'objects',    name: {en: 'Objects',    zh: '小物'}}
  ],
  photos: [
      {id: 'p3424', album: 'landscapes', drive: '1gkXgxCXFl3cgCHsadrAIayQNQrUI_uvy', w: 1600, h: 1067,
       title: {en: 'Purple meadow', zh: '紫色花田'},
       caption: {en: 'A meadow of purple flowers with a small shed beside it.', zh: '一片紫色花田，旁邊有間小屋。'}},
      {id: 'p0757', album: 'travel', drive: '1aoZ6VFeNjfJzogP3LvfnuvE3m16ltdEY', w: 1600, h: 1067,
       title: {en: 'Sensō-ji', zh: '淺草寺'},
       caption: {en: 'The main hall and a willow tree at Sensō-ji in Asakusa, Tokyo.', zh: '東京淺草寺的本堂，旁邊有一株垂柳。'}},
      {id: 'p0838', album: 'city', drive: '1UorYD7yhsUwn9DUslIpssrStakndWo0c', w: 1600, h: 1067,
       title: {en: 'Night lights', zh: '夜色燈海'},
       caption: {en: 'City lights after dark.', zh: '入夜後的城市燈火。'}},
      {id: 'p3236', album: 'pets', drive: '1ygSYpXHSI8H2N6JoBpL-EzZc_zczVsta', w: 1600, h: 1067,
       title: {en: 'Olaf, wrapped up', zh: 'Olaf 裹著毯子'},
       caption: {en: 'Olaf, my cream long-haired dachshund, tucked into a blanket.', zh: '我的奶油色長毛臘腸狗 Olaf，窩在毯子裡。'}},
      {id: 'p4166', album: 'sky', drive: '1ZW84CBBmwcTZE7bWA-grybpuw7aFmheu', w: 1600, h: 2400,
       title: {en: 'Balloons over the hills', zh: '山丘上的熱氣球'},
       caption: {en: 'Hot air balloons above the hills, with a red train crossing a viaduct below.', zh: '熱氣球飄在山丘上方，下方有一列紅色火車駛過高架橋。'}},
      {id: 'p4083', album: 'landscapes', drive: '1_TRA0MChABvGhZ4odqM1bFC7q-aPSoMn', w: 1600, h: 1067,
       title: {en: 'Rocky shore', zh: '岩岸'},
       caption: {en: 'A rocky shore beside deep blue water.', zh: '深藍海水旁的岩石海岸。'}},
      {id: 'p0194', album: 'travel', drive: '1qENAuFfFJHLq82Lbi2BQiy2aHvyK5vGC', w: 1600, h: 1067,
       title: {en: 'Fairytale castle', zh: '童話城堡'},
       caption: {en: 'A fairytale castle at a theme park.', zh: '主題樂園裡的童話城堡。'}},
      {id: 'p3303', album: 'city', drive: '1B4GA-b9oD5EL4Aw_HcO9VHIzGToZRAHn', w: 1600, h: 1067,
       title: {en: 'Golden figure at dusk', zh: '黃昏的金色雕像'},
       caption: {en: 'A golden winged statue on top of a dome at dusk.', zh: '圓頂上的金色有翼雕像，攝於黃昏。'}},
      {id: 'p3485', album: 'pets', drive: '1aBl064rENlZDzywpFBt0vKr0DR99pTyD', w: 1600, h: 1067,
       title: {en: 'Olaf in the grass', zh: 'Olaf 在草地上'},
       caption: {en: 'Olaf, wearing a harness, out on the grass.', zh: '穿著胸背帶的 Olaf，站在草地上。'}},
      {id: 'p3467', album: 'wildlife', drive: '1gSdCMdSWAHNmknke_8Wit6wHjIIBVcEG', w: 1600, h: 1067,
       title: {en: 'Black drongo', zh: '黑捲尾'},
       caption: {en: 'A black drongo perched on a branch.', zh: '棲息在枝頭的黑捲尾。'}},
      {id: 'p4140', album: 'sky', drive: '1wcfH1LmZ_llI-lq94I6S06XEl2tBCPIr', w: 1600, h: 1067,
       title: {en: 'Airship', zh: '飛艇'},
       caption: {en: 'An airship and banners in a blue sky.', zh: '藍天裡的飛艇與旗幟。'}},
      {id: 'p4214', album: 'landscapes', drive: '1q8FLGy0GlCXWNkhbj7vocRaREEWNQ4XG', w: 1600, h: 1067,
       title: {en: 'Winter light', zh: '冬日光影'},
       caption: {en: 'Sunlight through bare trees over a snowy path.', zh: '陽光穿過光禿的樹木，灑在積雪的小徑上。'}},
      {id: 'p0797', album: 'city', drive: '151CAWiB182Sox5Wzmh4_lgXP-Jh8dJen', w: 1600, h: 2400,
       title: {en: 'Tracks through the towers', zh: '穿過高樓的軌道'},
       caption: {en: 'Train tracks curving between dense high-rises.', zh: '軌道彎進密集的高樓之間。'}},
      {id: 'p0780', album: 'travel', drive: '1lKTUsHnnDIwskOltgAEnduOqX4DaWKuW', w: 1600, h: 1067,
       title: {en: 'Temple gate', zh: '寺院大門'},
       caption: {en: 'A temple gate crowded with visitors in Asakusa.', zh: '淺草一座擠滿遊客的寺院大門。'}},
      {id: 'p3503', album: 'wildlife', drive: '1QXcB1tGe6ea9QqDn_ijxWHSeuROzhjvF', w: 1600, h: 1067,
       title: {en: 'Egret by the water', zh: '水邊的白鷺'},
       caption: {en: 'An egret standing on a grassy bank beside the water.', zh: '白鷺站在水邊的草坡上。'}},
      {id: 'p4127', album: 'landscapes', drive: '1M1tX6tD_vqbbhCNukHJ7vMwbpJpgu_ht', w: 1600, h: 1067,
       title: {en: 'Deep blue', zh: '深藍'},
       caption: {en: 'Birds flying over deep blue waves.', zh: '鳥群飛過深藍色的海浪。'}},
      {id: 'p0291', album: 'travel', drive: '1aLJhQlonMNdzOpjXBz1eMBRfh5wX-2fR', w: 1600, h: 1067,
       title: {en: 'Shaping glass', zh: '玻璃工藝'},
       caption: {en: 'A craftsman shaping glass in a workshop.', zh: '工匠在工坊裡塑形玻璃。'}},
      {id: 'p4048', album: 'city', drive: '1l4MjWwLxBJGnwKTiaP3fnFGM0P1vDqnW', w: 1600, h: 1067,
       title: {en: 'Skyline across the bay', zh: '海灣對岸的天際線'},
       caption: {en: 'A hazy downtown skyline seen across a bay.', zh: '隔著海灣望見朦朧的市中心天際線。'}},
      {id: 'p0051', album: 'objects', drive: '1cIIqijsIVM2QDcaYDqPSz89fHCe-MZOo', w: 1600, h: 1067,
       title: {en: 'Blue dial', zh: '藍色錶盤'},
       caption: {en: 'A blue-dial watch on a leather strap.', zh: '皮革錶帶搭配藍色錶盤的手錶。'}},
      {id: 'p3442', album: 'pets', drive: '1slvGdb6p1yrNsNd2IKFC9KWKYxtGw7OS', w: 1600, h: 1067,
       title: {en: 'Olaf resting', zh: 'Olaf 小憩片刻'},
       caption: {en: 'Olaf lying down on a patch of dirt.', zh: 'Olaf 趴在一塊泥土地上休息。'}},
      {id: 'p4236', album: 'city', drive: '1aMPYowkMCvtT56EBsqFZ3M8bVvK1xb-L', w: 1600, h: 1067,
       title: {en: 'Dusk glow', zh: '暮色'},
       caption: {en: 'Dusk sky behind a lit modern building.', zh: '暮色天空下，一棟亮著燈的現代建築。'}},
      {id: 'p4031', album: 'landscapes', drive: '1zw7DjDH3Y1ApJ6MnzfAMOJb4N4bYX_Gp', w: 1600, h: 1067,
       title: {en: 'The long pier', zh: '長長的碼頭'},
       caption: {en: 'A long pier reaching into a hazy sea, seen from the hills.', zh: '從山坡望向伸入海中的長碼頭，海面一片朦朧。'}},
      {id: 'p4191', album: 'sky', drive: '1JbO587JskO9kFg8x2Velkx_5HsMMQYYy', w: 1600, h: 2400,
       title: {en: 'Balloons and train', zh: '熱氣球與列車'},
       caption: {en: 'Hot air balloons drifting over the hills, with a red train below.', zh: '熱氣球飄過山丘，下方有一列紅色火車。'}},
      {id: 'p4038', album: 'city', drive: '1-FHPMfK0TEyAuYE18fuq3-PhP5GvAar9', w: 1600, h: 1067,
       title: {en: 'Freeway toward the haze', zh: '通往遠山的公路'},
       caption: {en: 'A wide view of the city, with a freeway running toward hazy mountains.', zh: '城市全景，一條高速公路通向霧濛濛的遠山。'}},
      {id: 'p0035', album: 'pets', drive: '1ql97wJl3TDzaar9CwMS5Hqf5dnSPmpuZ', w: 1600, h: 1067,
       title: {en: 'Belly up', zh: '肚皮朝天'},
       caption: {en: 'A small cream-colored dog rolled onto its back.', zh: '奶油色的小狗四腳朝天，一派悠閒。'}},
      {id: 'p0023', album: 'objects', drive: '1tkqHT0v8osPnjWwNaPmgME-mJCYr1s8F', w: 1600, h: 1067,
       title: {en: 'Jeweled tiara', zh: '寶石頭冠'},
       caption: {en: 'A jeweled tiara replica in a display case.', zh: '展示櫃裡的寶石頭冠複製品。'}},
      {id: 'pIMG_3861', album: 'pets', drive: '1uYCLqwvOlbF5cvaE9X1Bw1u_XshHcLaW', w: 1600, h: 2136,
       title: {en: 'Puppy on a cushion', zh: '坐墊上的小狗'},
       caption: {en: 'A fluffy puppy on a cushion.', zh: '蓬鬆的小狗坐在坐墊上。'}},
      {id: 'p4049', album: 'city', drive: '1ZwhjK1w_KmAsQcDYNBPb8ufuFFtFxIgX', w: 1600, h: 2400,
       title: {en: 'Skyline and trees', zh: '樹與天際線'},
       caption: {en: 'The skyline rising hazily above water and trees.', zh: '天際線在水面與樹林之上若隱若現。'}},
      {id: 'p4036', album: 'city', drive: '1zOmiWjU_WZCAkxeVvbGTHuooBihKklgZ', w: 1600, h: 1067,
       title: {en: 'Temple spires', zh: '城中寺塔'},
       caption: {en: 'White temple spires among city buildings.', zh: '白色的寺廟塔尖矗立在城市建築之間。'}},
      {id: 'p0046', album: 'objects', drive: '1VhEiQLScn1ZdlD4ZiGQsfNIsO4G7Ioy2', w: 1600, h: 1067,
       title: {en: 'Watch in its case', zh: '收納盒裡的手錶'},
       caption: {en: 'A wristwatch resting in a travel case.', zh: '放在旅行收納盒裡的手錶。'}},
      {id: 'p3367', album: 'objects', drive: '1D1LDfonOvMPTjYRZg5OYIUBUq5m6xK2d', w: 1600, h: 1067,
       title: {en: 'Parked by the meadow', zh: '停在草地旁'},
       caption: {en: 'The back of a car with a red roof spoiler and a UC San Diego sticker, parked beside a meadow.', zh: '停在草地旁的車尾，裝有紅色車頂尾翼，貼著加州大學聖地牙哥分校的貼紙。'}}
  ],

  /* Collections: each has items. Items without src show generated placeholder art (kind: bricks or car). */
  collections: [
    {id: 'lego', name: {en: 'LEGO', zh: '樂高'}, blurb: {en: 'Sets I have built and kept.', zh: '我組好並收藏的樂高。'},
     /* My LEGO shop, shown at the top of this collection. The block stays hidden if url is empty. */
     shop: {url: 'https://mall.iopenmall.tw/020343/', title: {en: 'My LEGO shop', zh: '我的樂高商店'}, text: {en: 'Trading and selling my collections!', zh: '我的收藏品開放交換與出售！'}},
     items: [
       {id: 'l1', drive: '1hKA481EY6_se5KQP57ZNuEtaRkAGH6rG', w: 1600, h: 2400,
        title: {en: 'LEGO castle', zh: '樂高城堡'},
        meta: {en: 'Castle display with minifigures', zh: '城堡展示，附人偶'},
        caption: {en: 'A castle display built from LEGO, with colorful stars and minifigures.', zh: '以樂高組成的城堡展示，點綴著彩色星星與人偶。'}}
     ]},
    {id: 'model-car', name: {en: 'Model car', zh: '模型車'}, blurb: {en: 'Scale models of cars I like.', zh: '收藏我喜歡的車款，以比例模型呈現。'},
     /* Shown at the top of this collection. id is the part after v= in the video link. */
     youtube: {id: 'gVmvFTwi5FQ', url: 'https://www.youtube.com/watch?v=gVmvFTwi5FQ'},
     items: [
       {id: 'm1', title: {en: 'Model car 1', zh: '模型車 1'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 2,  hue: 355}},
       {id: 'm2', title: {en: 'Model car 2', zh: '模型車 2'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 8,  hue: 215}},
       {id: 'm3', title: {en: 'Model car 3', zh: '模型車 3'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 14, hue: 42}},
       {id: 'm4', title: {en: 'Model car 4', zh: '模型車 4'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 20, hue: 160}},
       {id: 'm5', title: {en: 'Model car 5', zh: '模型車 5'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 26, hue: 270}},
       {id: 'm6', title: {en: 'Model car 6', zh: '模型車 6'}, meta: {en: 'Add the make, model and scale', zh: '請補上廠牌、車型與比例'}, art: {kind: 'car', seed: 32, hue: 25}}
     ]}
  ],

  /* My life: photos and YouTube videos, grouped like the Photography albums.
     A photo is {id, album, title, caption, w, h, drive: 'FILE_ID'}.
     A video is {id, album, title, w: 1600, h: 900, video: "ID"}, where ID is the part after v= in the YouTube link. */
  life: {
    albums: [
      {id: 'moments', name: {en: 'Moments', zh: '生活點滴'}}
      /* To add videos later: add an album {id: 'videos', name: {en: 'Videos', zh: '影片'}} here (after a comma), then an item
         {id: 'v1', album: 'videos', title: {...}, w: 1600, h: 900, video: 'YOUTUBE_ID'} below. */
    ],
    items: [
      {id: 'f3273', album: 'moments', drive: '1p3W_pVseHWklwjYSdp1g3lay-EvVi-ZH', w: 1600, h: 1067,
       title: {en: 'With a dog', zh: '與狗狗合照'},
       caption: {en: 'Holding a dog in a green vest.', zh: '抱著穿綠色背心的小狗。'}},
      {id: 'f5470', album: 'moments', drive: '1QhPwqG4CRrmVjS2ldESM9pocaUvMpiCw', w: 1600, h: 1067,
       title: {en: 'By the lake', zh: '湖邊'},
       caption: {en: 'In a UCSD hoodie by a lake, with mountains behind.', zh: '穿著 UCSD 帽 T，在湖邊與遠山合影。'}}
    ]
  },

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
