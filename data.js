/* Content for the whole site. Edit this file to update any page.
   Text shown on the site is written as {en: '...', zh: '...'} so it can switch between English and Traditional Chinese.
   Photos load from Google Drive: put the picture in a Drive folder shared as "Anyone with the link: Viewer",
   copy the file id from its link (drive.google.com/file/d/FILE_ID/view) and write drive: 'FILE_ID' on the entry.
   w and h only need to say whether the photo is wide (w bigger) or tall (h bigger): the gallery shows wide photos
   at 3:2, and tall photos as high as two wide photos plus the gap. caption is the short description shown under the photo in the viewer. An entry can also use src: "yourfile.jpg"
   for a file uploaded next to index.html. Entries with neither show generated placeholder art. */
window.SITE = {
  /* Site version, shown in the footer after the legal line. Every update gets a new longer code (four parts, like 1.8897.288.90; the middle numbers can be anything) and the new date. */
  version: {number: '1.9348.1017.72', date: '2026-11-13'},

  /* Opening screen of the home page: a full-screen photo with the word Welcome written over it.
     drive is the file id of the photo; pos is the part of the photo kept in view (x y). */
  hero: {drive: '1UorYD7yhsUwn9DUslIpssrStakndWo0c', pos: '50% 18%', caption: {en: 'Tokyo, 2025', zh: '東京，2025'}},

  profile: {
    name: {en: 'Matthew Wang', zh: '馬修'},
    nameHome: {en: 'Matthew Wang', zh: '馬修 王'},   /* name shown in the home page greeting (the Chinese greeting is followed by the English name) */
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

  /* Google Drive sync. url is the web address of the Apps Script that lists the album folders (see Claude_drive_sync.gs).
     Leave it empty to turn the sync off. */
  sync: {url: 'https://script.google.com/macros/s/AKfycbxohk4lyXhFX1k34P1hCR0_dncOvm_JCShaBkjey_sd2CYybwYQu6krCKnuIJEVvEHrwQ/exec'},

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
      {id: 'p3141', album: 'city', drive: '1cGvF7HVpHBLF-T0w6F-J-Oc_UNSoKzoF', orig: '1ccNNJsw-Knt7nVCbwGGSAOI3ZbXTqFI_', wm: 1, w: 1536, h: 2048,
       title: {en: 'Taipei 101', zh: '台北101'},
       caption: {en: 'The tip of Taipei 101 rising out of low cloud, with palm trees in front.', zh: '台北101的塔尖穿出低垂的雲層，前方是一排棕櫚樹。'}},
      {id: 'p3424', album: 'landscapes', drive: '1zcBgWTG_8y3GKTEmAKptSij_hizYWAw-', orig: '1gkXgxCXFl3cgCHsadrAIayQNQrUI_uvy', wm: 1, w: 1600, h: 1067,
       title: {en: 'Purple meadow', zh: '紫色花田'},
       caption: {en: 'A meadow of purple flowers with a small shed beside it.', zh: '一片紫色花田，旁邊有間小屋。'}},
      {id: 'p0757', album: 'travel', drive: '1WHJKazbzeRGcQBz3v_AbZwfvVIxQx2fn', orig: '1aoZ6VFeNjfJzogP3LvfnuvE3m16ltdEY', wm: 1, w: 1600, h: 1067,
       title: {en: 'Sensō-ji', zh: '淺草寺'},
       caption: {en: 'The main hall and a willow tree at Sensō-ji in Asakusa, Tokyo.', zh: '東京淺草寺的本堂，旁邊有一株垂柳。'}},
      {id: 'p0838', album: 'city', drive: '1RXB8TM8M93gpsAE-TbH4lTMh5nX1jgmW', orig: '1UorYD7yhsUwn9DUslIpssrStakndWo0c', wm: 1, w: 1600, h: 1067,
       title: {en: 'Night lights', zh: '夜色燈海'},
       caption: {en: 'City lights after dark.', zh: '入夜後的城市燈火。'}},
      {id: 'p3236', album: 'pets', drive: '17qGlXPdShhoINkfA6pTNXg6boEAgfEec', orig: '1ygSYpXHSI8H2N6JoBpL-EzZc_zczVsta', wm: 1, w: 1600, h: 1067,
       title: {en: 'Olaf, wrapped up', zh: 'Olaf 裹著毯子'},
       caption: {en: 'Olaf, my cream long-haired dachshund, tucked into a blanket.', zh: '我的奶油色長毛臘腸狗 Olaf，窩在毯子裡。'}},
      {id: 'p4166', album: 'sky', drive: '1qjW47gTl5F6X7Q9w8ZVzXPhcHzIWBL0n', orig: '1ZW84CBBmwcTZE7bWA-grybpuw7aFmheu', wm: 1, w: 1600, h: 2400,
       title: {en: 'Balloons over the hills', zh: '山丘上的熱氣球'},
       caption: {en: 'Hot air balloons above the hills, with a red train crossing a viaduct below.', zh: '熱氣球飄在山丘上方，下方有一列紅色火車駛過高架橋。'}},
      {id: 'p4083', album: 'landscapes', drive: '1v1bkjbbC4wUTd5zTO1SJezKrUE3C8g9Y', orig: '1_TRA0MChABvGhZ4odqM1bFC7q-aPSoMn', wm: 1, w: 1600, h: 1067,
       title: {en: 'Rocky shore', zh: '岩岸'},
       caption: {en: 'A rocky shore beside deep blue water.', zh: '深藍海水旁的岩石海岸。'}},
      {id: 'p0194', album: 'travel', drive: '1fPm1sfjphESWx5Puif1DMMP0IJk7H-sb', orig: '1qENAuFfFJHLq82Lbi2BQiy2aHvyK5vGC', wm: 1, w: 1600, h: 1067,
       title: {en: 'Fairytale castle', zh: '童話城堡'},
       caption: {en: 'A fairytale castle at a theme park.', zh: '主題樂園裡的童話城堡。'}},
      {id: 'p3303', album: 'city', drive: '1b19UtnIxH1cdJHMsvk-PIgyhjxo31h1k', orig: '1B4GA-b9oD5EL4Aw_HcO9VHIzGToZRAHn', wm: 1, w: 1600, h: 1067,
       title: {en: 'Golden figure at dusk', zh: '黃昏的金色雕像'},
       caption: {en: 'A golden winged statue on top of a dome at dusk.', zh: '圓頂上的金色有翼雕像，攝於黃昏。'}},
      {id: 'p3485', album: 'pets', drive: '1Ql9mIxO6EfbZxnoAjNB0l7akgbCcLP3-', orig: '1aBl064rENlZDzywpFBt0vKr0DR99pTyD', wm: 1, w: 1600, h: 1067,
       title: {en: 'Olaf in the grass', zh: 'Olaf 在草地上'},
       caption: {en: 'Olaf, wearing a harness, out on the grass.', zh: '穿著胸背帶的 Olaf，站在草地上。'}},
      {id: 'p3467', album: 'wildlife', drive: '1EMLHC5P6bhwDo6802Rk6IgFxq1wSOAZ0', orig: '1gSdCMdSWAHNmknke_8Wit6wHjIIBVcEG', wm: 1, w: 1600, h: 1067,
       title: {en: 'Black drongo', zh: '黑捲尾'},
       caption: {en: 'A black drongo perched on a branch.', zh: '棲息在枝頭的黑捲尾。'}},
      {id: 'p4140', album: 'sky', drive: '1HRgAxSY6b4sTOQqgu8aM49Hf96RlzkGi', orig: '1wcfH1LmZ_llI-lq94I6S06XEl2tBCPIr', wm: 1, w: 1600, h: 1067,
       title: {en: 'Airship', zh: '飛艇'},
       caption: {en: 'An airship and banners in a blue sky.', zh: '藍天裡的飛艇與旗幟。'}},
      {id: 'p4214', album: 'landscapes', drive: '1WJgvmHiaeHnuKLM7YrXqCQ6Y40CCOCS1', orig: '1q8FLGy0GlCXWNkhbj7vocRaREEWNQ4XG', wm: 1, w: 1600, h: 1067,
       title: {en: 'Winter light', zh: '冬日光影'},
       caption: {en: 'Sunlight through bare trees over a snowy path.', zh: '陽光穿過光禿的樹木，灑在積雪的小徑上。'}},
      {id: 'p0797', album: 'city', drive: '1CZoJPkyJcNiLMx9VnXAUMkHwd3KRdTV-', orig: '151CAWiB182Sox5Wzmh4_lgXP-Jh8dJen', wm: 1, w: 1600, h: 2400,
       title: {en: 'Tracks through the towers', zh: '穿過高樓的軌道'},
       caption: {en: 'Train tracks curving between dense high-rises.', zh: '軌道彎進密集的高樓之間。'}},
      {id: 'p0780', album: 'travel', drive: '12GgL3LSPxJVMMIVI5W1kAsRNbrfQIlrp', orig: '1lKTUsHnnDIwskOltgAEnduOqX4DaWKuW', wm: 1, w: 1600, h: 1067,
       title: {en: 'Temple gate', zh: '寺院大門'},
       caption: {en: 'A temple gate crowded with visitors in Asakusa.', zh: '淺草一座擠滿遊客的寺院大門。'}},
      {id: 'p3503', album: 'wildlife', drive: '1v30i2FY6pMHuaP_whxHFohUli9QA69j0', orig: '1QXcB1tGe6ea9QqDn_ijxWHSeuROzhjvF', wm: 1, w: 1600, h: 1067,
       title: {en: 'Egret by the water', zh: '水邊的白鷺'},
       caption: {en: 'An egret standing on a grassy bank beside the water.', zh: '白鷺站在水邊的草坡上。'}},
      {id: 'p4127', album: 'landscapes', drive: '1BHHhgqPKudp5NW-MAm_lEX1Iq90ZB4po', orig: '1M1tX6tD_vqbbhCNukHJ7vMwbpJpgu_ht', wm: 1, w: 1600, h: 1067,
       title: {en: 'Deep blue', zh: '深藍'},
       caption: {en: 'Birds flying over deep blue waves.', zh: '鳥群飛過深藍色的海浪。'}},
      {id: 'p0291', album: 'travel', drive: '1fMr4B3ou7qmHQy9U9TOrqgGz46Y3nT-H', orig: '1aLJhQlonMNdzOpjXBz1eMBRfh5wX-2fR', wm: 1, w: 1600, h: 1067,
       title: {en: 'Shaping glass', zh: '玻璃工藝'},
       caption: {en: 'A craftsman shaping glass in a workshop.', zh: '工匠在工坊裡塑形玻璃。'}},
      {id: 'p4048', album: 'city', drive: '1IgObYEL5e4Kv05vadzt1f1py9enrZaS0', orig: '1l4MjWwLxBJGnwKTiaP3fnFGM0P1vDqnW', wm: 1, w: 1600, h: 1067,
       title: {en: 'Skyline across the bay', zh: '海灣對岸的天際線'},
       caption: {en: 'A hazy downtown skyline seen across a bay.', zh: '隔著海灣望見朦朧的市中心天際線。'}},
      {id: 'p0051', album: 'objects', drive: '1f4IUJIyXJxVtCTV3XFaeCISyt4PnXosL', orig: '1cIIqijsIVM2QDcaYDqPSz89fHCe-MZOo', wm: 1, w: 1600, h: 1067,
       title: {en: 'Blue dial', zh: '藍色錶盤'},
       caption: {en: 'A blue-dial watch on a leather strap.', zh: '皮革錶帶搭配藍色錶盤的手錶。'}},
      {id: 'p3442', album: 'pets', drive: '1FV8L5YFYZ64YrTj7tf10PLRaidNHum5C', orig: '1slvGdb6p1yrNsNd2IKFC9KWKYxtGw7OS', wm: 1, w: 1600, h: 1067,
       title: {en: 'Olaf resting', zh: 'Olaf 小憩片刻'},
       caption: {en: 'Olaf lying down on a patch of dirt.', zh: 'Olaf 趴在一塊泥土地上休息。'}},
      {id: 'p4236', album: 'city', drive: '1dS0bEFjuWwHGQeye9N1swhfaF0N5dc8B', orig: '1aMPYowkMCvtT56EBsqFZ3M8bVvK1xb-L', wm: 1, w: 1600, h: 1067,
       title: {en: 'Dusk glow', zh: '暮色'},
       caption: {en: 'Dusk sky behind a lit modern building.', zh: '暮色天空下，一棟亮著燈的現代建築。'}},
      {id: 'p4031', album: 'landscapes', drive: '17ubFENaLoKBMMh2iokAZ7ygWcppmIB2r', orig: '1zw7DjDH3Y1ApJ6MnzfAMOJb4N4bYX_Gp', wm: 1, w: 1600, h: 1067,
       title: {en: 'The long pier', zh: '長長的碼頭'},
       caption: {en: 'A long pier reaching into a hazy sea, seen from the hills.', zh: '從山坡望向伸入海中的長碼頭，海面一片朦朧。'}},
      {id: 'p4191', album: 'sky', drive: '1MSUHwSEC_0JPT1Dm332RHUJgFpISwrzr', orig: '1JbO587JskO9kFg8x2Velkx_5HsMMQYYy', wm: 1, w: 1600, h: 2400,
       title: {en: 'Balloons and train', zh: '熱氣球與列車'},
       caption: {en: 'Hot air balloons drifting over the hills, with a red train below.', zh: '熱氣球飄過山丘，下方有一列紅色火車。'}},
      {id: 'p4038', album: 'city', drive: '1Su6k7kBim3B70OZgb7zV70HoTwcJW1jW', orig: '1-FHPMfK0TEyAuYE18fuq3-PhP5GvAar9', wm: 1, w: 1600, h: 1067,
       title: {en: 'Freeway toward the haze', zh: '通往遠山的公路'},
       caption: {en: 'A wide view of the city, with a freeway running toward hazy mountains.', zh: '城市全景，一條高速公路通向霧濛濛的遠山。'}},
      {id: 'p0035', album: 'pets', drive: '1DFfpI1Kd6f8oci_jx9PytVqjomUc76Xn', orig: '1ql97wJl3TDzaar9CwMS5Hqf5dnSPmpuZ', wm: 1, w: 1600, h: 1067,
       title: {en: 'Belly up', zh: '肚皮朝天'},
       caption: {en: 'A small cream-colored dog rolled onto its back.', zh: '奶油色的小狗四腳朝天，一派悠閒。'}},
      {id: 'p0023', album: 'objects', drive: '1-HT5gbgINxqFWTDXvNUP_6ckrHjEHor6', orig: '1tkqHT0v8osPnjWwNaPmgME-mJCYr1s8F', wm: 1, w: 1600, h: 1067,
       title: {en: 'Jeweled tiara', zh: '寶石頭冠'},
       caption: {en: 'A jeweled tiara replica in a display case.', zh: '展示櫃裡的寶石頭冠複製品。'}},
      {id: 'pIMG_3861', album: 'pets', drive: '1_gfuUaw88mqbj2Y3CDDCVuUwAs9sK4ve', orig: '1uYCLqwvOlbF5cvaE9X1Bw1u_XshHcLaW', wm: 1, w: 1600, h: 2136,
       title: {en: 'Puppy on a cushion', zh: '坐墊上的小狗'},
       caption: {en: 'A fluffy puppy on a cushion.', zh: '蓬鬆的小狗坐在坐墊上。'}},
      {id: 'p4049', album: 'city', drive: '1pcTm3eRaYLhNOocX-c6iyGl0tsheUk0E', orig: '1ZwhjK1w_KmAsQcDYNBPb8ufuFFtFxIgX', wm: 1, w: 1600, h: 2400,
       title: {en: 'Skyline and trees', zh: '樹與天際線'},
       caption: {en: 'The skyline rising hazily above water and trees.', zh: '天際線在水面與樹林之上若隱若現。'}},
      {id: 'p4036', album: 'city', drive: '1v1fjOR47vqH5gXEwLDtlE_fBFKR3T__Y', orig: '1zOmiWjU_WZCAkxeVvbGTHuooBihKklgZ', wm: 1, w: 1600, h: 1067,
       title: {en: 'Temple spires', zh: '城中寺塔'},
       caption: {en: 'White temple spires among city buildings.', zh: '白色的寺廟塔尖矗立在城市建築之間。'}},
      {id: 'p0046', album: 'objects', drive: '1C15qguWOaEkRSdvtzvjyii4G-f5_QgkN', orig: '1VhEiQLScn1ZdlD4ZiGQsfNIsO4G7Ioy2', wm: 1, w: 1600, h: 1067,
       title: {en: 'Watch in its case', zh: '收納盒裡的手錶'},
       caption: {en: 'A wristwatch resting in a travel case.', zh: '放在旅行收納盒裡的手錶。'}},
      {id: 'p3367', album: 'objects', drive: '1OKRZ9kRIfpsX15LZDVA7bayI9EF58PJw', orig: '1D1LDfonOvMPTjYRZg5OYIUBUq5m6xK2d', wm: 1, w: 1600, h: 1067,
       title: {en: 'Parked by the meadow', zh: '停在草地旁'},
       caption: {en: 'The back of a car with a red roof spoiler and a UC San Diego sticker, parked beside a meadow.', zh: '停在草地旁的車尾，裝有紅色車頂尾翼，貼著加州大學聖地牙哥分校的貼紙。'}}
  ],

  /* Collections: each has items. Items without src show generated placeholder art (kind: bricks or car). */
  collections: [
    {id: 'lego', name: {en: 'LEGO', zh: '樂高'}, blurb: {en: 'Sets I have built and kept.', zh: '我組好並收藏的樂高。'},
     /* My LEGO shop, shown at the top of this collection. The block stays hidden if url is empty. */
     shop: {url: 'https://mall.iopenmall.tw/020343/', title: {en: 'My LEGO shop', zh: '我的樂高商店'}, text: {en: 'Trading and selling my collections!', zh: '我的收藏品開放交換與出售！'}},
     items: [
       {id: 'l1', drive: '1ewMaiAE60x7Unr2zTsex0XIA-2t6Ba0x', orig: '1hKA481EY6_se5KQP57ZNuEtaRkAGH6rG', wm: 1, w: 1600, h: 2400,
        title: {en: 'LEGO castle', zh: '樂高城堡'},
        meta: {en: 'Castle display with minifigures', zh: '城堡展示，附人偶'},
        caption: {en: 'A castle display built from LEGO, with colorful stars and minifigures.', zh: '以樂高組成的城堡展示，點綴著彩色星星與人偶。'}}
     ]},
    {id: 'model-car', land: 1, name: {en: 'Model car', zh: '模型車'}, blurb: {en: 'Scale models of cars I like.', zh: '收藏我喜歡的車款，以比例模型呈現。'},
     /* Shown at the top of this collection. id is the part after v= in the video link. */
     youtube: {id: 'gVmvFTwi5FQ', url: 'https://www.youtube.com/watch?v=gVmvFTwi5FQ'},
     items: [
       {id: 'm1', drive: '1rOfobrD7KMJ6xhnYyhu5N_EnErQwyPye', wm: 1, title: {en: 'Alfa Romeo Giulia GTAm', zh: '愛快羅密歐 Giulia GTAm'}, meta: {en: 'BBR Models', zh: 'BBR Models'}},
       {id: 'm2', drive: '1a_i_R2ywCx-OksBl24e08J5zcdDYe6Db', wm: 1, title: {en: 'Aston Martin DB11, 007 Version', zh: '奧斯頓·馬丁 DB11，007 版'}, meta: {en: 'Autoart', zh: 'Autoart'}},
       {id: 'm3', drive: '1tMYLlXr_3jTnBwWMNeCffovr5BYi7usy', wm: 1, title: {en: 'Aston Martin DB11, 007 Version', zh: '奧斯頓·馬丁 DB11，007 版'}, meta: {en: 'Autoart', zh: 'Autoart'}},
       {id: 'm4', drive: '1MFwGFXoJI7NvUlLDR5E4cs9osYjPIoaM', wm: 1, title: {en: 'Bugatti Veyron', zh: '布加迪 Veyron'}, meta: {en: 'Dino Models', zh: 'Dino Models'}},
       {id: 'm5', drive: '1jv0zx8ox2ixntFoIASYjb7ULQR4bzdp5', wm: 1, title: {en: 'Bugatti Veyron, Ceramic Dragon', zh: '布加迪 Veyron，陶瓷龍款'}, meta: {en: 'Henson and Heaven Models', zh: 'Henson and Heaven Models'}},
       {id: 'm6', drive: '1FHXDq7OQ1jK1BzWPKf8i_b4wWMRx4Hvb', wm: 1, title: {en: 'Bugatti Chiron', zh: '布加迪 Chiron'}, meta: {en: 'MR Collections Models', zh: 'MR Collections Models'}},
       {id: 'm7', drive: '1CSY8866qVFcg56WpRN5iala6GCR685vG', wm: 1, title: {en: 'Bugatti Chiron Supersport 300', zh: '布加迪 Chiron Supersport 300'}, meta: {en: 'MR Collections Models', zh: 'MR Collections Models'}},
       {id: 'm8', drive: '1buF2ENyT3qtvLDOOx-bDzohDZeCWWuQ8', wm: 1, title: {en: 'Bugatti Chiron, Black Ceramic Dragon', zh: '布加迪 Chiron，黑色陶瓷龍款'}, meta: {en: 'Henson and Heaven Models', zh: 'Henson and Heaven Models'}},
       {id: 'm9', drive: '1V3qsgnzaTRbbtwhwdiRB0tLO3uf-yRxS', wm: 1, title: {en: 'Bugatti Divo', zh: '布加迪 Divo'}, meta: {en: 'MR Collections Models', zh: 'MR Collections Models'}},
       {id: 'm10', drive: '1VYwVIGKuj7_vTcehwzq6TMgEPmlkUfT5', wm: 1, title: {en: 'Ferrari Purosangue, Verde Dore', zh: '法拉利 Purosangue，Verde Dore'}, meta: {en: 'BBR Models', zh: 'BBR Models'}},
       {id: 'm11', drive: '1ZGBTDYga2wm18ep9bwtMn5LKPqdYz_6X', wm: 1, title: {en: 'Ferrari LaFerrari', zh: '法拉利 LaFerrari'}, meta: {en: 'Davis & Giovanni Models', zh: 'Davis & Giovanni Models'}},
       {id: 'm12', drive: '14UJ2kgCuypDhdfUkrhg2zAipFr69dtMA', wm: 1, title: {en: 'Ferrari LaFerrari', zh: '法拉利 LaFerrari'}, meta: {en: 'BBR Models', zh: 'BBR Models'}},
       {id: 'm13', drive: '1F4zVqdEArrPTVXi5bcsY0v89yiHYzzvS', wm: 1, title: {en: 'Ferrari LaFerrari', zh: '法拉利 LaFerrari'}, meta: {en: 'BBR Models', zh: 'BBR Models'}},
       {id: 'm14', drive: '1ndhYzJffS3J5eMOT1p4nrs-Y_zyuiQ5u', wm: 1, title: {en: 'Ferrari LaFerrari, Chrome Blue', zh: '法拉利 LaFerrari，電鍍藍'}, meta: {en: 'BBR Models Deluxe', zh: 'BBR Models Deluxe'}},
       {id: 'm15', drive: '1D8K07hE6UTpTK61Ubvs_OQK6ybOQDAsT', wm: 1, title: {en: 'Ferrari 488 Pista, Chameleon', zh: '法拉利 488 Pista，變色龍款'}, meta: {en: 'Davis & Giovanni Models', zh: 'Davis & Giovanni Models'}},
       {id: 'm16', drive: '1jgPYghpShOIuoAV1vHe4JLUnJNT0yvQl', wm: 1, title: {en: 'Ferrari FXX-K Evo', zh: '法拉利 FXX-K Evo'}, meta: {en: 'BBR Models', zh: 'BBR Models'}},
       {id: 'm17', drive: '1Gv-UbCAgAf9XiUjf_oUNRIOP4d5XbuJR', wm: 1, title: {en: 'Ferrari 599XX Evo', zh: '法拉利 599XX Evo'}, meta: {en: 'Davis & Giovanni Models', zh: 'Davis & Giovanni Models'}},
       {id: 'm18', drive: '1do8m4TQMop7pAZLm2ks9mjDZdFF3o4mn', wm: 1, title: {en: 'Ferrari Portofino M', zh: '法拉利 Portofino M'}, meta: {en: 'BBR Models', zh: 'BBR Models'}},
       {id: 'm19', drive: '1YtvCzkriq8AY7riRaNXAveB9waPeRiQ0', wm: 1, title: {en: 'Ferrari 812 Competizione, Charles Leclerc Livery', zh: '法拉利 812 Competizione，勒克萊爾彩繪'}, meta: {en: 'BBR Models Deluxe', zh: 'BBR Models Deluxe'}},
       {id: 'm20', drive: '1XeVXuNJHFYSp7gBeE-YPOX5S3_2V0P8T', wm: 1, title: {en: 'Lamborghini Aventador, Battle Gray', zh: '藍寶堅尼 Aventador，戰鬥灰'}, meta: {en: 'Davis & Giovanni Models', zh: 'Davis & Giovanni Models'}},
       {id: 'm21', drive: '1erM4hsp_U96cOgLsibizxrFknDuTnL1y', wm: 1, title: {en: 'Lamborghini Aventador SVJ 63', zh: '藍寶堅尼 Aventador SVJ 63'}, meta: {en: 'Make Up Models', zh: 'Make Up Models'}},
       {id: 'm22', drive: '1Dii7-yljCU58YdfkVsour2Ws7Dl0P4ju', wm: 1, title: {en: 'McLaren P1', zh: '麥拉倫 P1'}, meta: {en: 'Dino Models', zh: 'Dino Models'}},
       {id: 'm23', drive: '1U08F_hWc39_NZuoVvM-3N_nF2oIX4ejo', wm: 1, title: {en: 'McLaren P1', zh: '麥拉倫 P1'}, meta: {en: 'Dino Models', zh: 'Dino Models'}},
       {id: 'm24', drive: '1EIG3VUK1RtAlfhJjTpN_BghxjpyGlLQD', wm: 1, title: {en: 'McLaren 720S', zh: '麥拉倫 720S'}, meta: {en: 'Davis & Giovanni Models', zh: 'Davis & Giovanni Models'}},
       {id: 'm25', drive: '1aVo0U04su36xRCwcGsrvCmDYER3lZnaj', wm: 1, title: {en: 'Mercedes-Benz 300 SL Gullwing', zh: '賓士 300 SL 鷗翼'}, meta: {en: 'Schuco', zh: 'Schuco'}},
       {id: 'm26', drive: '1GJgKzV5vhfQp-0vM0gnCfVtjlNbGfJRt', wm: 1, title: {en: 'Porsche 911 GT3 RS', zh: '保時捷 911 GT3 RS'}, meta: {en: 'Make Up Models', zh: 'Make Up Models'}},
       {id: 'm27', drive: '1YHMREVJsiKLc3hgI8VvsqqcdMrU8E6tH', wm: 1, title: {en: 'Porsche 911 Dakar', zh: '保時捷 911 Dakar'}, meta: {en: 'Porsche', zh: 'Porsche'}},
       {id: 'm28', drive: '1gdwGnqdLTw16RHs__nSrUdcpDT_SCvp5', wm: 1, title: {en: 'Rolls-Royce Cullinan, Richie Rich Version', zh: '勞斯萊斯 Cullinan，Richie Rich 版'}, meta: {en: 'Henson and Heaven Models', zh: 'Henson and Heaven Models'}},
       {id: 'm29', drive: '1sNaXo_mBQ53uqArlPKtVWCDch-UssFge', wm: 1, title: {en: 'Tesla Cybertruck', zh: '特斯拉 Cybertruck'}, meta: {en: 'Tesla', zh: 'Tesla'}}
     ]}
  ],

  /* My life: photos and YouTube videos, grouped like the Photography albums.
     A photo is {id, album, title, caption, w, h, drive: 'FILE_ID'}.
     wm: 1 marks a photo whose Drive file already carries the signature watermark (the copies in the Watermarked folder); orig is the id of the untouched original in the album folder.
     A video is {id, album, title, w: 1600, h: 900, video: "ID"}, where ID is the part after v= in the YouTube link. */
  life: {
    /* Pinned at the top of the My life page, above the albums. id is the part after v= (or after youtu.be/) in the video link. */
    featured: {id: 'QpUdVg1Rvlc', url: 'https://youtu.be/QpUdVg1Rvlc', title: {en: '2026 USA Grand Tour', zh: '2026 USA Grand Tour'}},
    albums: [
      {id: 'moments', name: {en: 'Moments', zh: '生活點滴'}}
      /* To add videos later: add an album {id: 'videos', name: {en: 'Videos', zh: '影片'}} here (after a comma), then an item
         {id: 'v1', album: 'videos', title: {...}, w: 1600, h: 900, video: 'YOUTUBE_ID'} below. */
    ],
    items: [
      {id: 'f3273', album: 'moments', drive: '1f5AuCY5NBKNX1wJXF3Det1a-j4G0O6W3', orig: '1p3W_pVseHWklwjYSdp1g3lay-EvVi-ZH', wm: 1, w: 1600, h: 1067,
       title: {en: 'With a dog', zh: '與狗狗合照'},
       caption: {en: 'Holding a dog in a green vest.', zh: '抱著穿綠色背心的小狗。'}},
      {id: 'f5470', album: 'moments', drive: '1jjRoziBEOnxEQZf12BqmA1fIVtAywpwA', orig: '1QhPwqG4CRrmVjS2ldESM9pocaUvMpiCw', wm: 1, w: 1600, h: 1067,
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
