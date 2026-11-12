/* Content for the whole site. Edit this file to update any page.
   To add a real photo: upload the image next to index.html and add src: "yourfile.jpg" to that photo.
   Entries without src show generated placeholder art. */
window.SITE = {
  profile: {
    name: 'Matthew Wang',
    email: 'you@example.com',
    location: 'San Diego, California',
    short: 'San Diego, CA',
    tz: 'America/Los_Angeles',
    links: [
      {label: 'GitHub', href: 'https://github.com/'},
      {label: 'LinkedIn', href: 'https://www.linkedin.com/'}
    ]
  },

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

  /* Collections: each has items. Items without src show generated placeholder art (kind: box). */
  collections: [
    {id: 'lorcana', name: 'Disney Lorcana', blurb: 'Sealed booster boxes and other sealed product.',
     items: [
       {id: 'c1', title: 'Sealed booster box', meta: 'Add the set and year', art: {kind: 'box', seed: 3,  hue: 262}},
       {id: 'c2', title: 'Sealed booster box', meta: 'Add the set and year', art: {kind: 'box', seed: 9,  hue: 200}},
       {id: 'c3', title: 'Sealed booster box', meta: 'Add the set and year', art: {kind: 'box', seed: 15, hue: 340}},
       {id: 'c4', title: 'Sealed booster box', meta: 'Add the set and year', art: {kind: 'box', seed: 21, hue: 28}},
       {id: 'c5', title: 'Sealed booster box', meta: 'Add the set and year', art: {kind: 'box', seed: 27, hue: 160}},
       {id: 'c6', title: 'Sealed booster box', meta: 'Add the set and year', art: {kind: 'box', seed: 33, hue: 48}}
     ]}
  ],

  /* Career */
  education: [
    {when: '2025 to 2027', title: 'M.S., Electrical and Computer Engineering', sub: 'Medical imaging track, San Diego, California', note: 'Expected graduation in 2027.'}
  ],
  work: [ /* sample entry, replace with your own */
    {when: '2026', title: 'Research assistant', sub: 'Imaging lab', sample: true,
     note: 'Replace this with a role of your own: what you worked on, what you built, and what changed because of it.'}
  ],
  projects: [ /* sample entries, replace with your own */
    {id: 'sparse-ct', year: '2026', title: 'Sparse-view CT reconstruction',
     summary: 'How few projection angles can a scanner use before filtered back projection breaks down, and what iterative methods recover.',
     tags: ['Reconstruction'], tools: ['CT reconstruction', 'Inverse problems', 'Linear algebra', 'Python'],
     role: 'Course project, solo', toolsText: 'Python, NumPy, a total-variation solver',
     result: 'Compared filtered back projection with an iterative solver across a range of view counts.'},
    {id: 'mri-prior', year: '2026', title: 'Undersampled MRI with a learned prior',
     summary: 'Recovering an MRI slice from a fraction of its k-space samples using a small neural network as the regularizer.',
     tags: ['Reconstruction', 'Machine learning'], tools: ['MRI', 'Fourier analysis', 'PyTorch', 'Python'],
     role: 'Research rotation', toolsText: 'PyTorch, fastMRI-style data, FFT utilities',
     result: 'Showed where the learned prior helps and where it invents detail.'},
    {id: 'nodule-seg', year: '2025', title: 'Lung nodule segmentation',
     summary: 'A 3D U-Net that outlines small nodules in chest CT, with attention to false positives near vessels.',
     tags: ['Machine learning'], tools: ['Image segmentation', 'Statistics', 'PyTorch', 'Python'],
     role: 'Team project, model and evaluation', toolsText: 'PyTorch, public chest CT data, Dice and sensitivity metrics',
     result: 'Reported per-nodule sensitivity alongside overlap scores.'},
    {id: 'us-beam', year: '2025', title: 'Ultrasound beamforming simulator',
     summary: 'A simulator that shows how delay-and-sum beamforming trades resolution against clutter for a linear array.',
     tags: ['Signal processing'], tools: ['Ultrasound', 'Fourier analysis', 'MATLAB', 'C++'],
     role: 'Lab assignment, extended', toolsText: 'MATLAB for design, C++ for the fast inner loop',
     result: 'Produced point-spread plots for several array and apodization choices.'}
  ],
  skillGroups: [
    {title: 'Imaging', items: ['CT reconstruction', 'MRI', 'Ultrasound', 'Image segmentation']},
    {title: 'Signals and math', items: ['Fourier analysis', 'Inverse problems', 'Linear algebra', 'Statistics']},
    {title: 'Software', items: ['Python', 'PyTorch', 'MATLAB', 'C++']}
  ]
};
