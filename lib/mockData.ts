import type {
  Country,
  EducationLevel,
  Curriculum,
  School,
  Classroom,
  Subject,
  Topic,
  Lesson,
  User,
  ProgressRecord,
} from './types';

export const schools: School[] = [
  {
    id: 'school-khs',
    name: 'Kampala High School',
    countryId: 'ug',
    curriculumId: 'ug-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-02-01',
  },
  {
    id: 'school-lss',
    name: 'Lusaka Secondary School',
    countryId: 'zm',
    curriculumId: 'zm-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-03-15',
  },
  {
    id: 'school-ia',
    name: 'International Academy',
    countryId: 'int',
    curriculumId: 'int-igcse-cur',
    subscriptionStatus: 'inactive',
    joinedAt: '2024-06-01',
  },
];

export const classrooms: Classroom[] = [
  { id: 'cls-khs-s1a', schoolId: 'school-khs', name: 'S1A', level: 'Senior 1' },
  { id: 'cls-khs-s2b', schoolId: 'school-khs', name: 'S2B', level: 'Senior 2' },
  { id: 'cls-khs-s3c', schoolId: 'school-khs', name: 'S3C', level: 'Senior 3' },
  { id: 'cls-lss-g10a', schoolId: 'school-lss', name: 'Grade 10A', level: 'Grade 10' },
  { id: 'cls-lss-g11b', schoolId: 'school-lss', name: 'Grade 11B', level: 'Grade 11' },
  { id: 'cls-lss-g12c', schoolId: 'school-lss', name: 'Grade 12C', level: 'Grade 12' },
  { id: 'cls-ia-y10', schoolId: 'school-ia', name: 'Year 10', level: 'Year 10' },
  { id: 'cls-ia-y11', schoolId: 'school-ia', name: 'Year 11', level: 'Year 11' },
  { id: 'cls-ia-y12', schoolId: 'school-ia', name: 'Year 12', level: 'Year 12' },
];

export const countries: Country[] = [
  { id: 'ug', name: 'Uganda', code: 'UG' },
  { id: 'zm', name: 'Zambia', code: 'ZM' },
  { id: 'int', name: 'International', code: 'INT' },
];

export const educationLevels: EducationLevel[] = [
  { id: 'ug-primary', name: 'Primary', countryId: 'ug' },
  { id: 'ug-secondary', name: 'Secondary', countryId: 'ug' },
  { id: 'zm-secondary', name: 'Secondary', countryId: 'zm' },
  { id: 'int-igcse', name: 'IGCSE', countryId: 'int' },
];

export const curricula: Curriculum[] = [
  { id: 'ug-primary-cur', name: 'Uganda Primary Curriculum', countryId: 'ug', levelId: 'ug-primary' },
  { id: 'ug-secondary-cur', name: 'Uganda Secondary Curriculum', countryId: 'ug', levelId: 'ug-secondary' },
  { id: 'zm-secondary-cur', name: 'Zambia Secondary Curriculum', countryId: 'zm', levelId: 'zm-secondary' },
  { id: 'int-igcse-cur', name: 'Cambridge IGCSE', countryId: 'int', levelId: 'int-igcse' },
];

export const subjects: Subject[] = [
  { id: 'math-ug-sec', name: 'Mathematics', curriculumId: 'ug-secondary-cur', description: 'Core mathematical concepts including algebra, geometry, and calculus.', icon: 'calculator', color: '#1e3a5f' },
  { id: 'eng-ug-sec', name: 'English', curriculumId: 'ug-secondary-cur', description: 'Language skills, comprehension, grammar, and literature.', icon: 'book-open', color: '#1a4731' },
  { id: 'phy-ug-sec', name: 'Physics', curriculumId: 'ug-secondary-cur', description: 'Laws of nature covering mechanics, electricity, and waves.', icon: 'zap', color: '#3b2a6e' },
  { id: 'chem-ug-sec', name: 'Chemistry', curriculumId: 'ug-secondary-cur', description: 'Study of matter, chemical reactions, and the periodic table.', icon: 'flask', color: '#4a1a1a' },
  { id: 'bio-ug-sec', name: 'Biology', curriculumId: 'ug-secondary-cur', description: 'Life sciences covering cells, ecology, and human body systems.', icon: 'leaf', color: '#1a4020' },
  { id: 'hist-ug-sec', name: 'History', curriculumId: 'ug-secondary-cur', description: 'African and world history from ancient civilisations to modern times.', icon: 'globe', color: '#3d2b1f' },
  { id: 'geo-ug-sec', name: 'Geography', curriculumId: 'ug-secondary-cur', description: 'Physical and human geography with emphasis on East Africa.', icon: 'map', color: '#1a3a4a' },
  { id: 'math-zm-sec', name: 'Mathematics', curriculumId: 'zm-secondary-cur', description: 'Zambia secondary mathematics curriculum.', icon: 'calculator', color: '#1e3a5f' },
  { id: 'eng-zm-sec', name: 'English', curriculumId: 'zm-secondary-cur', description: 'Zambia secondary English curriculum.', icon: 'book-open', color: '#1a4731' },
  { id: 'math-igcse', name: 'Mathematics', curriculumId: 'int-igcse-cur', description: 'Cambridge IGCSE Mathematics.', icon: 'calculator', color: '#1e3a5f' },
  { id: 'sci-igcse', name: 'Combined Science', curriculumId: 'int-igcse-cur', description: 'Cambridge IGCSE Combined Science.', icon: 'zap', color: '#2a3a1e' },
];

export const topics: Topic[] = [
  // Mathematics - Uganda Secondary
  { id: 'math-algebra', name: 'Algebra', subjectId: 'math-ug-sec', order: 1, description: 'Expressions, equations, and algebraic manipulation.' },
  { id: 'math-geometry', name: 'Geometry', subjectId: 'math-ug-sec', order: 2, description: 'Shapes, angles, and spatial reasoning.' },
  { id: 'math-trigonometry', name: 'Trigonometry', subjectId: 'math-ug-sec', order: 3, description: 'Sine, cosine, tangent and their applications.' },
  { id: 'math-probability', name: 'Probability & Statistics', subjectId: 'math-ug-sec', order: 4, description: 'Chance, data analysis, and statistical methods.' },
  { id: 'math-calculus', name: 'Calculus', subjectId: 'math-ug-sec', order: 5, description: 'Differentiation and integration fundamentals.' },

  // English - Uganda Secondary
  { id: 'eng-grammar', name: 'Grammar & Syntax', subjectId: 'eng-ug-sec', order: 1, description: 'Parts of speech, sentence structure, and punctuation.' },
  { id: 'eng-comprehension', name: 'Reading Comprehension', subjectId: 'eng-ug-sec', order: 2, description: 'Strategies for understanding and analysing texts.' },
  { id: 'eng-writing', name: 'Composition & Writing', subjectId: 'eng-ug-sec', order: 3, description: 'Essay writing, creative writing, and reports.' },
  { id: 'eng-literature', name: 'Literature', subjectId: 'eng-ug-sec', order: 4, description: 'Poetry, prose, and drama analysis.' },

  // Physics - Uganda Secondary
  { id: 'phy-mechanics', name: 'Mechanics', subjectId: 'phy-ug-sec', order: 1, description: 'Forces, motion, and Newton\'s laws.' },
  { id: 'phy-electricity', name: 'Electricity & Magnetism', subjectId: 'phy-ug-sec', order: 2, description: 'Circuits, current, voltage, and magnetic fields.' },
  { id: 'phy-waves', name: 'Waves & Optics', subjectId: 'phy-ug-sec', order: 3, description: 'Wave properties, light, and sound.' },
  { id: 'phy-thermal', name: 'Thermal Physics', subjectId: 'phy-ug-sec', order: 4, description: 'Heat, temperature, and thermodynamics.' },
  { id: 'phy-nuclear', name: 'Atomic & Nuclear Physics', subjectId: 'phy-ug-sec', order: 5, description: 'Atomic structure, radioactivity, and nuclear energy.' },

  // Chemistry - Uganda Secondary
  { id: 'chem-periodic', name: 'The Periodic Table', subjectId: 'chem-ug-sec', order: 1, description: 'Elements, periods, groups, and periodic trends.' },
  { id: 'chem-bonding', name: 'Chemical Bonding', subjectId: 'chem-ug-sec', order: 2, description: 'Ionic, covalent, and metallic bonding.' },
  { id: 'chem-reactions', name: 'Chemical Reactions', subjectId: 'chem-ug-sec', order: 3, description: 'Types of reactions, rates, and equilibrium.' },
  { id: 'chem-organic', name: 'Organic Chemistry', subjectId: 'chem-ug-sec', order: 4, description: 'Carbon compounds, hydrocarbons, and functional groups.' },

  // Biology - Uganda Secondary
  { id: 'bio-cells', name: 'Cell Biology', subjectId: 'bio-ug-sec', order: 1, description: 'Cell structure, function, and division.' },
  { id: 'bio-ecology', name: 'Ecology', subjectId: 'bio-ug-sec', order: 2, description: 'Ecosystems, food chains, and environmental interactions.' },
  { id: 'bio-genetics', name: 'Genetics & Evolution', subjectId: 'bio-ug-sec', order: 3, description: 'Inheritance, DNA, and evolutionary theory.' },
  { id: 'bio-human', name: 'Human Body Systems', subjectId: 'bio-ug-sec', order: 4, description: 'Organ systems including digestion, circulation, and respiration.' },
  { id: 'bio-plants', name: 'Plant Biology', subjectId: 'bio-ug-sec', order: 5, description: 'Photosynthesis, plant structure, and reproduction.' },

  // History - Uganda Secondary
  { id: 'hist-africa-precolonial', name: 'Pre-Colonial Africa', subjectId: 'hist-ug-sec', order: 1, description: 'African kingdoms and societies before European contact.' },
  { id: 'hist-colonialism', name: 'Colonialism in Africa', subjectId: 'hist-ug-sec', order: 2, description: 'European partition, colonial rule, and its impact.' },
  { id: 'hist-independence', name: 'African Independence Movements', subjectId: 'hist-ug-sec', order: 3, description: 'Nationalist movements and the struggle for independence.' },
  { id: 'hist-world-wars', name: 'World Wars', subjectId: 'hist-ug-sec', order: 4, description: 'Causes, events, and consequences of WWI and WWII.' },

  // Geography - Uganda Secondary
  { id: 'geo-physical', name: 'Physical Geography', subjectId: 'geo-ug-sec', order: 1, description: 'Landforms, climate systems, and natural processes.' },
  { id: 'geo-human', name: 'Human Geography', subjectId: 'geo-ug-sec', order: 2, description: 'Population, settlement, and economic activities.' },
  { id: 'geo-eastafrica', name: 'East Africa', subjectId: 'geo-ug-sec', order: 3, description: 'Physical and human geography of East Africa.' },
  { id: 'geo-mapwork', name: 'Map Reading & Cartography', subjectId: 'geo-ug-sec', order: 4, description: 'Reading topographical maps, scales, and grid references.' },

  // Mathematics - Zambia Secondary
  { id: 'math-zm-algebra', name: 'Algebra', subjectId: 'math-zm-sec', order: 1, description: 'Expressions, equations, and algebraic manipulation.' },
  { id: 'math-zm-geometry', name: 'Geometry', subjectId: 'math-zm-sec', order: 2, description: 'Shapes, angles, and spatial reasoning.' },
  { id: 'math-zm-trigonometry', name: 'Trigonometry', subjectId: 'math-zm-sec', order: 3, description: 'Sine, cosine, tangent and their applications.' },
  { id: 'math-zm-statistics', name: 'Statistics & Probability', subjectId: 'math-zm-sec', order: 4, description: 'Data handling, probability, and statistical methods.' },
  { id: 'math-zm-calculus', name: 'Calculus', subjectId: 'math-zm-sec', order: 5, description: 'Differentiation and integration fundamentals.' },

  // English - Zambia Secondary
  { id: 'eng-zm-grammar', name: 'Grammar & Usage', subjectId: 'eng-zm-sec', order: 1, description: 'Parts of speech, sentence structure, and punctuation.' },
  { id: 'eng-zm-comprehension', name: 'Reading Comprehension', subjectId: 'eng-zm-sec', order: 2, description: 'Strategies for understanding and analysing texts.' },
  { id: 'eng-zm-writing', name: 'Writing Skills', subjectId: 'eng-zm-sec', order: 3, description: 'Essay writing, creative writing, and reports.' },
  { id: 'eng-zm-literature', name: 'Literature', subjectId: 'eng-zm-sec', order: 4, description: 'Poetry, prose, and drama analysis.' },

  // Mathematics - IGCSE
  { id: 'math-igcse-number', name: 'Number', subjectId: 'math-igcse', order: 1, description: 'Number systems, operations, and number theory.' },
  { id: 'math-igcse-algebra', name: 'Algebra & Graphs', subjectId: 'math-igcse', order: 2, description: 'Algebraic manipulation, equations, and graphing.' },
  { id: 'math-igcse-geometry', name: 'Geometry', subjectId: 'math-igcse', order: 3, description: 'Shape, space, and measurement.' },
  { id: 'math-igcse-statistics', name: 'Statistics & Probability', subjectId: 'math-igcse', order: 4, description: 'Data analysis, probability, and statistical measures.' },

  // Combined Science - IGCSE
  { id: 'sci-igcse-biology', name: 'Biology', subjectId: 'sci-igcse', order: 1, description: 'Living organisms, cells, and biological processes.' },
  { id: 'sci-igcse-chemistry', name: 'Chemistry', subjectId: 'sci-igcse', order: 2, description: 'Matter, reactions, and the periodic table.' },
  { id: 'sci-igcse-physics', name: 'Physics', subjectId: 'sci-igcse', order: 3, description: 'Forces, energy, waves, and electricity.' },
];

export const lessons: Lesson[] = [
  // ALGEBRA
  {
    id: 'alg-l1', title: 'Introduction to Algebraic Expressions', topicId: 'math-algebra', order: 1,
    content: [
      'An algebraic expression is a combination of variables, constants, and arithmetic operations. Unlike numerical expressions, algebraic expressions contain at least one variable — a symbol (usually a letter) that represents an unknown or changing value.',
      'The building blocks of algebraic expressions are terms. A term is a single number, a variable, or a product of numbers and variables. For example, in the expression 3x + 5y − 2, the terms are 3x, 5y, and −2. Terms that contain the same variables raised to the same powers are called like terms and can be combined.',
      'Simplifying algebraic expressions means collecting like terms to write the expression in its most compact form. This skill is fundamental to all further work in algebra and will be used throughout your study of mathematics.',
    ],
    example: {
      title: 'Simplifying an Expression',
      body: 'Simplify: 4x + 3y − 2x + 7y\nGroup like terms: (4x − 2x) + (3y + 7y)\nResult: 2x + 10y',
    },
    practiceQuestion: {
      question: 'Simplify the expression: 6a + 2b − 3a + 5b − a',
      hint: 'Collect all the \'a\' terms together and all the \'b\' terms together, then combine.',
    },
  },
  {
    id: 'alg-l2', title: 'Solving Linear Equations', topicId: 'math-algebra', order: 2,
    content: [
      'A linear equation is an equation in which the highest power of the variable is 1. The goal when solving a linear equation is to isolate the variable on one side of the equation by performing the same operation on both sides.',
      'The key principle is the balance rule: whatever you do to one side of the equation, you must do to the other. You can add, subtract, multiply, or divide both sides by the same value without changing the solution.',
      'Once you have found a solution, always verify it by substituting back into the original equation. If both sides equal the same value, your solution is correct.',
    ],
    example: {
      title: 'Solving a Linear Equation',
      body: 'Solve: 3x − 7 = 14\nAdd 7 to both sides: 3x = 21\nDivide both sides by 3: x = 7\nVerify: 3(7) − 7 = 21 − 7 = 14 ✓',
    },
    practiceQuestion: {
      question: 'Solve for x: 5x + 3 = 28',
      hint: 'Start by subtracting 3 from both sides, then divide.',
    },
  },
  {
    id: 'alg-l3', title: 'Factorisation', topicId: 'math-algebra', order: 3,
    content: [
      'Factorisation is the process of expressing an algebraic expression as a product of its factors. It is the reverse of expanding brackets. Recognising how to factorise efficiently is one of the most important skills in algebra.',
      'The simplest form of factorisation involves finding the highest common factor (HCF) of all terms and taking it outside a bracket. For quadratic expressions of the form ax² + bx + c, you look for two numbers that multiply to give ac and add to give b.',
      'Factorisation has many practical applications — it is used to solve quadratic equations, simplify algebraic fractions, and analyse polynomial functions.',
    ],
    example: {
      title: 'Factorising a Quadratic',
      body: 'Factorise: x² + 5x + 6\nFind two numbers that multiply to 6 and add to 5: 2 and 3\nResult: (x + 2)(x + 3)\nVerify by expanding: x² + 3x + 2x + 6 = x² + 5x + 6 ✓',
    },
    practiceQuestion: {
      question: 'Factorise: x² + 7x + 12',
      hint: 'Find two numbers that multiply to 12 and add to 7.',
    },
  },

  // GEOMETRY
  {
    id: 'geo-l1', title: 'Angles and Their Properties', topicId: 'math-geometry', order: 1,
    content: [
      'An angle is formed when two rays share a common endpoint called the vertex. Angles are measured in degrees (°) or radians. Understanding angle types and their properties is foundational to all of geometry.',
      'Angles are classified by their measure: acute angles (less than 90°), right angles (exactly 90°), obtuse angles (between 90° and 180°), and reflex angles (between 180° and 360°). When two lines intersect, they form two pairs of vertically opposite angles, which are always equal.',
      'Angles on a straight line sum to 180°, and angles around a point sum to 360°. These two facts, combined with the properties of parallel lines, allow us to solve a wide range of geometric problems.',
    ],
    example: {
      title: 'Finding Missing Angles',
      body: 'Two angles on a straight line are 3x° and (x + 20)°.\nSince they sum to 180°: 3x + x + 20 = 180\n4x = 160, so x = 40\nAngles: 120° and 60°',
    },
    practiceQuestion: {
      question: 'Angles on a straight line are (2x + 10)° and (4x − 4)°. Find x and both angles.',
      hint: 'The two angles must sum to 180°.',
    },
  },
  {
    id: 'geo-l2', title: 'Properties of Triangles', topicId: 'math-geometry', order: 2,
    content: [
      'A triangle is a three-sided polygon. The interior angles of any triangle always sum to 180°. Triangles are classified by their side lengths (equilateral, isosceles, scalene) and by their angles (acute, right-angled, obtuse).',
      'The Pythagorean theorem applies specifically to right-angled triangles: a² + b² = c², where c is the hypotenuse (the longest side, opposite the right angle). This theorem is one of the most powerful tools in geometry and has widespread applications in navigation, construction, and physics.',
      'Congruent triangles are identical in shape and size. Two triangles are congruent if they satisfy one of these conditions: SSS (three equal sides), SAS (two equal sides and the included angle), ASA (two equal angles and the included side), or RHS (right angle, hypotenuse, and one side).',
    ],
    example: {
      title: 'Using the Pythagorean Theorem',
      body: 'A right-angled triangle has legs of length 6 cm and 8 cm. Find the hypotenuse.\nc² = 6² + 8² = 36 + 64 = 100\nc = √100 = 10 cm',
    },
    practiceQuestion: {
      question: 'A right-angled triangle has a hypotenuse of 13 cm and one leg of 5 cm. Find the other leg.',
      hint: 'Use a² + b² = c², where c = 13 and one value of a or b = 5.',
    },
  },
  {
    id: 'geo-l3', title: 'Circles and Their Properties', topicId: 'math-geometry', order: 3,
    content: [
      'A circle is a set of all points in a plane that are equidistant from a fixed point called the centre. The distance from the centre to any point on the circle is called the radius (r). The diameter (d) passes through the centre and equals 2r.',
      'The circumference (perimeter) of a circle is given by C = 2πr = πd. The area is given by A = πr². These formulas appear throughout mathematics, engineering, and the natural sciences.',
      'There are several important circle theorems: the angle at the centre is twice the angle at the circumference subtended by the same arc; angles in the same segment are equal; and the angle in a semicircle is always 90°.',
    ],
    example: {
      title: 'Calculating Area and Circumference',
      body: 'A circle has radius 7 cm. Find its area and circumference (use π ≈ 3.14).\nArea = π × 7² = 3.14 × 49 = 153.86 cm²\nCircumference = 2 × 3.14 × 7 = 43.96 cm',
    },
    practiceQuestion: {
      question: 'A circular field has a diameter of 50 m. Find its area and circumference to 2 decimal places. (π ≈ 3.14159)',
      hint: 'First find the radius: r = d ÷ 2.',
    },
  },

  // TRIGONOMETRY
  {
    id: 'trig-l1', title: 'Introduction to Trigonometry', topicId: 'math-trigonometry', order: 1,
    content: [
      'Trigonometry is the branch of mathematics that studies relationships between the sides and angles of triangles. The three primary trigonometric ratios — sine (sin), cosine (cos), and tangent (tan) — are defined with respect to a right-angled triangle.',
      'For a right-angled triangle with an acute angle θ: sin θ = opposite ÷ hypotenuse, cos θ = adjacent ÷ hypotenuse, tan θ = opposite ÷ adjacent. The memory aid SOH-CAH-TOA helps recall these definitions.',
      'These ratios allow us to find unknown sides and angles in right-angled triangles, which has enormous practical value in surveying, navigation, architecture, and engineering.',
    ],
    example: {
      title: 'Finding a Side Using Trigonometry',
      body: 'A right-angled triangle has a hypotenuse of 10 cm and an angle of 30°. Find the opposite side.\nsin 30° = opposite ÷ 10\nopposite = 10 × sin 30° = 10 × 0.5 = 5 cm',
    },
    practiceQuestion: {
      question: 'A ladder of length 8 m leans against a wall at an angle of 60° to the ground. How high up the wall does the ladder reach?',
      hint: 'Use sin 60° = opposite ÷ hypotenuse.',
    },
  },
  {
    id: 'trig-l2', title: 'Trigonometric Graphs', topicId: 'math-trigonometry', order: 2,
    content: [
      'The sine and cosine functions are periodic — they repeat their values in a regular cycle. The sine function (y = sin x) starts at 0, rises to a maximum of 1 at 90°, returns to 0 at 180°, falls to −1 at 270°, and returns to 0 at 360°. The cosine function (y = cos x) starts at 1 and follows a similar wave one quarter-period shifted from sine.',
      'The period of both y = sin x and y = cos x is 360° (or 2π radians). The amplitude is 1. The tangent function has a period of 180° and has vertical asymptotes where cos x = 0.',
      'Transformations such as y = a sin(bx + c) + d modify the amplitude (a), period (360/b), phase shift (c/b), and vertical shift (d) of the standard sine curve.',
    ],
    example: {
      title: 'Sketching a Transformed Sine Graph',
      body: 'For y = 2sin(x) + 1:\nAmplitude = 2 (oscillates between −1 and 3)\nPeriod = 360°\nVertical shift = +1 (midline at y = 1)\nMaximum value = 3, Minimum value = −1',
    },
    practiceQuestion: {
      question: 'State the amplitude, period, and midline of the function y = 3cos(2x) − 2.',
      hint: 'Amplitude = coefficient of cos; Period = 360° ÷ coefficient of x; midline = vertical shift.',
    },
  },
  {
    id: 'trig-l3', title: 'The Sine and Cosine Rules', topicId: 'math-trigonometry', order: 3,
    content: [
      'The sine rule and cosine rule extend trigonometry beyond right-angled triangles, allowing us to solve any triangle when given sufficient information. These rules are especially important in navigation and surveying.',
      'The sine rule states: a/sin A = b/sin B = c/sin C, where a, b, c are sides and A, B, C are the opposite angles. It is used when you know two angles and a side, or two sides and a non-included angle.',
      'The cosine rule states: a² = b² + c² − 2bc cos A. It is used when you know three sides (to find an angle) or two sides and the included angle (to find the third side).',
    ],
    example: {
      title: 'Using the Sine Rule',
      body: 'In triangle ABC, angle A = 40°, angle B = 70°, side a = 8 cm. Find side b.\nb/sin 70° = 8/sin 40°\nb = 8 × sin 70° ÷ sin 40° ≈ 8 × 0.940 ÷ 0.643 ≈ 11.7 cm',
    },
    practiceQuestion: {
      question: 'In a triangle, two sides are 7 cm and 9 cm with an included angle of 50°. Find the third side using the cosine rule.',
      hint: 'Use c² = a² + b² − 2ab cos C, where a = 7, b = 9, C = 50°.',
    },
  },

  // PROBABILITY
  {
    id: 'prob-l1', title: 'Basic Probability', topicId: 'math-probability', order: 1,
    content: [
      'Probability measures how likely an event is to occur, expressed as a number between 0 (impossible) and 1 (certain). The probability of event A is written P(A) = number of favourable outcomes ÷ total number of equally likely outcomes.',
      'Events can be described as independent (the outcome of one does not affect the other), mutually exclusive (they cannot both occur), or complementary (one event is the non-occurrence of the other). The complement rule states P(A) + P(A\') = 1.',
      'The addition rule for mutually exclusive events: P(A or B) = P(A) + P(B). For non-mutually exclusive events: P(A or B) = P(A) + P(B) − P(A and B). The multiplication rule for independent events: P(A and B) = P(A) × P(B).',
    ],
    example: {
      title: 'Finding Probability',
      body: 'A bag contains 4 red, 3 blue, and 2 green balls. One is drawn at random.\nP(red) = 4/9\nP(not red) = 1 − 4/9 = 5/9\nP(red or blue) = 4/9 + 3/9 = 7/9',
    },
    practiceQuestion: {
      question: 'A die is rolled once. Find: (a) P(even number) (b) P(greater than 4) (c) P(not a 3).',
      hint: 'A standard die has 6 equally likely outcomes: 1, 2, 3, 4, 5, 6.',
    },
  },
  {
    id: 'prob-l2', title: 'Data Representation', topicId: 'math-probability', order: 2,
    content: [
      'Collecting and representing data clearly is the foundation of statistical analysis. Data can be qualitative (descriptive categories) or quantitative (numerical). Quantitative data can be discrete (countable values) or continuous (any value within a range).',
      'Common ways to represent data include frequency tables, bar charts, pie charts, histograms, and stem-and-leaf diagrams. Choosing the right representation depends on the type of data and the story you want to tell.',
      'A frequency table groups data into classes and counts how many values fall in each class. The relative frequency is the class frequency divided by the total number of observations. Cumulative frequency adds up frequencies progressively.',
    ],
    example: {
      title: 'Constructing a Frequency Table',
      body: 'Scores (out of 10): 7, 5, 8, 7, 6, 9, 5, 7, 8, 6\nScore | Frequency\n  5   |    2\n  6   |    2\n  7   |    3\n  8   |    2\n  9   |    1\nTotal: 10',
    },
    practiceQuestion: {
      question: 'Draw a frequency table for the following heights (cm): 150, 155, 150, 162, 155, 158, 162, 150, 158, 162.',
      hint: 'List each unique value and count how many times it appears.',
    },
  },
  {
    id: 'prob-l3', title: 'Measures of Central Tendency', topicId: 'math-probability', order: 3,
    content: [
      'Measures of central tendency describe the centre or typical value of a dataset. The three main measures are the mean, median, and mode. Each captures a different aspect of the data\'s central location.',
      'The mean (arithmetic average) is calculated by summing all values and dividing by the count. It is sensitive to extreme values (outliers). The median is the middle value when data is arranged in order — it is not affected by outliers. The mode is the most frequently occurring value.',
      'Choosing the appropriate measure depends on the data. For skewed distributions or data with outliers, the median is often more representative than the mean. The mode is most useful for categorical data.',
    ],
    example: {
      title: 'Calculating Mean, Median, and Mode',
      body: 'Dataset: 4, 7, 2, 7, 9, 3, 7\nMean = (4+7+2+7+9+3+7) ÷ 7 = 39 ÷ 7 ≈ 5.57\nOrdered: 2, 3, 4, 7, 7, 7, 9 → Median = 7\nMode = 7 (appears 3 times)',
    },
    practiceQuestion: {
      question: 'Find the mean, median, and mode of: 12, 15, 11, 15, 18, 11, 15, 14, 13.',
      hint: 'Order the data first to find the median easily.',
    },
  },

  // CALCULUS
  {
    id: 'calc-l1', title: 'Introduction to Differentiation', topicId: 'math-calculus', order: 1,
    content: [
      'Differentiation is the process of finding the derivative of a function — the rate at which the function\'s output changes with respect to its input. Geometrically, the derivative at a point gives the gradient of the tangent to the curve at that point.',
      'The power rule is the most fundamental rule of differentiation: if f(x) = xⁿ, then f\'(x) = nxⁿ⁻¹. This rule, combined with the sum rule (differentiate term by term) and the constant multiple rule, allows us to differentiate any polynomial.',
      'Differentiation has wide applications: finding the velocity from a displacement function, finding the rate of change in economics, and determining maximum and minimum values of functions.',
    ],
    example: {
      title: 'Differentiating a Polynomial',
      body: 'Differentiate: f(x) = 3x⁴ − 5x² + 2x − 7\nApply the power rule to each term:\nf\'(x) = 12x³ − 10x + 2\n(The constant −7 differentiates to 0)',
    },
    practiceQuestion: {
      question: 'Find the derivative of f(x) = 4x³ − 6x² + 3x − 1.',
      hint: 'Apply the power rule to each term: multiply by the exponent, then reduce the exponent by 1.',
    },
  },
  {
    id: 'calc-l2', title: 'Applications of Differentiation', topicId: 'math-calculus', order: 2,
    content: [
      'One of the most powerful uses of differentiation is finding the stationary points (turning points) of a function — the points where the gradient is zero. At a stationary point, f\'(x) = 0. The second derivative test determines whether the point is a local maximum or minimum.',
      'If f\'\'(x) > 0 at a stationary point, it is a local minimum (curve is concave up). If f\'\'(x) < 0, it is a local maximum (curve is concave down). If f\'\'(x) = 0, further investigation is needed.',
      'These techniques are used in optimisation problems: finding the dimensions that minimise cost, the production level that maximises profit, or the time at which a projectile reaches its greatest height.',
    ],
    example: {
      title: 'Finding a Maximum',
      body: 'f(x) = −x² + 4x + 1\nf\'(x) = −2x + 4 = 0 → x = 2\nf\'\'(x) = −2 < 0, so x = 2 is a maximum\nMaximum value: f(2) = −4 + 8 + 1 = 5',
    },
    practiceQuestion: {
      question: 'Find the stationary points of f(x) = x³ − 3x² − 9x + 5 and determine their nature.',
      hint: 'Set f\'(x) = 0 and solve, then use the second derivative to classify each point.',
    },
  },
  {
    id: 'calc-l3', title: 'Introduction to Integration', topicId: 'math-calculus', order: 3,
    content: [
      'Integration is the reverse process of differentiation. Given a derivative f\'(x), integration recovers the original function f(x). The indefinite integral of f(x) is written ∫f(x)dx and includes an arbitrary constant C, since any constant differentiates to zero.',
      'The power rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (for n ≠ −1). The definite integral ∫[a to b] f(x)dx calculates the net area between the curve y = f(x) and the x-axis between x = a and x = b.',
      'Integration is used to calculate areas, volumes, displacement from velocity, and accumulated quantities across many fields of science and engineering.',
    ],
    example: {
      title: 'Evaluating a Definite Integral',
      body: 'Evaluate ∫[1 to 3] (2x + 1)dx\nAntiderivative: x² + x\nApply limits: (9 + 3) − (1 + 1) = 12 − 2 = 10\nThe area under the curve from x=1 to x=3 is 10 square units.',
    },
    practiceQuestion: {
      question: 'Find ∫(3x² − 4x + 5)dx.',
      hint: 'Apply the power rule to each term and remember to add the constant C.',
    },
  },

  // ENGLISH GRAMMAR
  {
    id: 'gram-l1', title: 'Parts of Speech', topicId: 'eng-grammar', order: 1,
    content: [
      'Every word in the English language belongs to a word class, also called a part of speech. The main word classes are: nouns (naming words), pronouns (words replacing nouns), verbs (action or state words), adjectives (words describing nouns), adverbs (words modifying verbs, adjectives, or other adverbs), prepositions, conjunctions, and interjections.',
      'Understanding parts of speech is essential for grammatical analysis, correct sentence construction, and effective writing. A single word can sometimes belong to different classes depending on how it is used — for example, "run" can be a verb ("I run") or a noun ("a run in her stocking").',
      'Nouns can be classified as proper nouns (names of specific people, places, or things, always capitalised), common nouns (general names), abstract nouns (concepts or feelings), and collective nouns (names for groups).',
    ],
    example: {
      title: 'Identifying Parts of Speech',
      body: 'Sentence: "The young scientist quickly discovered a remarkable solution."\nThe (article/adjective), young (adjective), scientist (noun), quickly (adverb), discovered (verb), a (article), remarkable (adjective), solution (noun)',
    },
    practiceQuestion: {
      question: 'Identify the part of speech of each underlined word: "She (1) runs (2) every morning (3) before school."',
      hint: '(1) replaces a name, (2) describes an action, (3) tells when.',
    },
  },
  {
    id: 'gram-l2', title: 'Sentence Structure', topicId: 'eng-grammar', order: 2,
    content: [
      'A sentence is a group of words that expresses a complete thought. Every grammatically complete sentence must contain at least a subject (who or what the sentence is about) and a predicate (what the subject does or is). A sentence also requires a finite verb.',
      'Sentences can be classified by structure: simple sentences (one independent clause), compound sentences (two or more independent clauses joined by a coordinating conjunction or semicolon), complex sentences (one independent clause and at least one dependent clause), and compound-complex sentences.',
      'Phrases and clauses are the building blocks of sentences. A phrase is a group of words without a subject-verb pair. A clause contains both a subject and a verb. A dependent (subordinate) clause cannot stand alone as a sentence; it must be attached to an independent clause.',
    ],
    example: {
      title: 'Types of Sentences',
      body: 'Simple: The dog barked.\nCompound: The dog barked, and the cat hid.\nComplex: When the dog barked, the cat hid.\nCompound-Complex: When the dog barked, the cat hid, and the birds flew away.',
    },
    practiceQuestion: {
      question: 'Classify each sentence: (a) Although it was raining, we went for a walk. (b) She studied hard and passed the exam. (c) The results were announced.',
      hint: 'Look for dependent clauses (starting with subordinating conjunctions like "although") and coordinating conjunctions (FANBOYS).',
    },
  },
  {
    id: 'gram-l3', title: 'Punctuation and Common Errors', topicId: 'eng-grammar', order: 3,
    content: [
      'Punctuation marks guide the reader through text, indicating pauses, ends of sentences, and the relationship between ideas. The main punctuation marks are: full stop (.), comma (,), semicolon (;), colon (:), apostrophe (\'), quotation marks (" "), question mark (?), and exclamation mark (!).',
      'The comma is the most frequently misused punctuation mark. It is used to separate items in a list, to separate clauses in compound sentences, after introductory phrases, and to set off non-essential information. A comma splice (joining two independent clauses with only a comma) is a common error.',
      'The apostrophe serves two purposes: to indicate possession (the teacher\'s book) and to mark a contraction (don\'t = do not). It is never used to form plural nouns — "tomatoes" is correct, not "tomato\'s".',
    ],
    example: {
      title: 'Correcting Punctuation Errors',
      body: 'Error: "Its important that the students do there homework, they will fail otherwise."\nCorrected: "It\'s important that the students do their homework; they will fail otherwise."\nFixes: its→it\'s (contraction), there→their (possessive), comma splice→semicolon',
    },
    practiceQuestion: {
      question: 'Rewrite the following, correcting all punctuation errors: "the boys book was left on the table it belonged to john who lived on main street"',
      hint: 'Look for: missing capital letters, missing full stop, possessive apostrophe, and a run-on sentence.',
    },
  },

  // PHYSICS - MECHANICS
  {
    id: 'mech-l1', title: 'Forces and Newton\'s Laws', topicId: 'phy-mechanics', order: 1,
    content: [
      'A force is a push or pull that can change an object\'s shape, speed, or direction of motion. Forces are vector quantities — they have both magnitude and direction. The SI unit of force is the Newton (N). Common forces include gravity, friction, tension, and normal reaction.',
      'Newton\'s First Law (Law of Inertia): An object remains at rest or in uniform motion in a straight line unless acted upon by a resultant external force. This means a net force is required to change velocity — either its magnitude or direction.',
      'Newton\'s Second Law: The resultant force on an object equals its mass multiplied by its acceleration: F = ma. Newton\'s Third Law: For every action, there is an equal and opposite reaction. These forces act on different objects and never cancel each other.',
    ],
    example: {
      title: 'Applying Newton\'s Second Law',
      body: 'A 5 kg block is pushed by a net force of 20 N. What is its acceleration?\nF = ma → a = F ÷ m\na = 20 ÷ 5 = 4 m/s²',
    },
    practiceQuestion: {
      question: 'A car of mass 1200 kg accelerates from rest. If the engine provides a net force of 3600 N, find the acceleration.',
      hint: 'Use F = ma, rearranged to a = F/m.',
    },
  },
  {
    id: 'mech-l2', title: 'Motion and Kinematics', topicId: 'phy-mechanics', order: 2,
    content: [
      'Kinematics describes the motion of objects without considering the forces causing the motion. The key quantities are displacement (s), initial velocity (u), final velocity (v), acceleration (a), and time (t). These are related by the equations of uniform motion.',
      'The four equations of motion (SUVAT equations) apply when acceleration is constant: v = u + at; s = ut + ½at²; v² = u² + 2as; s = ½(u+v)t. These equations are the foundation of all mechanics problems involving uniformly accelerating objects.',
      'Velocity-time graphs are powerful tools for analysing motion. The gradient of a v-t graph gives acceleration, and the area under a v-t graph gives displacement.',
    ],
    example: {
      title: 'Using SUVAT Equations',
      body: 'A ball is thrown upward at 20 m/s. Find the maximum height. (g = 10 m/s²)\nu = 20, v = 0 (at max height), a = −10\nv² = u² + 2as → 0 = 400 + 2(−10)s\n20s = 400 → s = 20 m',
    },
    practiceQuestion: {
      question: 'A train accelerates from 10 m/s to 30 m/s over 20 seconds. Find (a) the acceleration and (b) the distance travelled.',
      hint: 'Use v = u + at for acceleration, and s = ½(u+v)t for distance.',
    },
  },
  {
    id: 'mech-l3', title: 'Energy, Work, and Power', topicId: 'phy-mechanics', order: 3,
    content: [
      'Work is done when a force moves an object in the direction of the force. Work (W) = Force (F) × Displacement (s), measured in Joules (J). If the force is applied at an angle θ to the direction of motion, W = Fs cos θ.',
      'Energy is the capacity to do work. Kinetic energy (KE = ½mv²) is the energy of motion. Gravitational potential energy (GPE = mgh) is stored energy due to height. The law of conservation of energy states that energy cannot be created or destroyed, only converted from one form to another.',
      'Power is the rate of doing work: P = W/t = Fv, measured in Watts (W). Efficiency is the ratio of useful energy output to total energy input, expressed as a percentage.',
    ],
    example: {
      title: 'Energy Conservation',
      body: 'A 2 kg ball is dropped from a height of 5 m. Find its speed just before hitting the ground. (g = 10 m/s²)\nGPE lost = KE gained\nmgh = ½mv²\n2 × 10 × 5 = ½ × 2 × v²\n100 = v² → v = 10 m/s',
    },
    practiceQuestion: {
      question: 'A 60 W motor lifts a 30 kg load. How long does it take to lift the load by 4 m? (g = 10 m/s²)',
      hint: 'Find the work done (W = mgh), then use t = W ÷ P.',
    },
  },

  // BIOLOGY - CELLS
  {
    id: 'cell-l1', title: 'Cell Structure and Function', topicId: 'bio-cells', order: 1,
    content: [
      'The cell is the basic structural and functional unit of all living organisms. Cells are classified as either prokaryotic (lacking a membrane-bound nucleus, e.g., bacteria) or eukaryotic (containing a nucleus and membrane-bound organelles, e.g., plant and animal cells).',
      'Key organelles in animal cells include the nucleus (controls cell activities and contains DNA), mitochondria (site of aerobic respiration), ribosomes (site of protein synthesis), and the cell membrane (controls what enters and leaves the cell). Plant cells additionally possess cell walls (made of cellulose), chloroplasts (site of photosynthesis), and a large permanent vacuole.',
      'Each organelle has a specific function that contributes to the overall functioning of the cell. Understanding the relationship between structure and function is a central theme throughout biology.',
    ],
    example: {
      title: 'Comparing Plant and Animal Cells',
      body: 'Feature          | Animal Cell | Plant Cell\nNucleus          |     ✓       |     ✓\nMitochondria     |     ✓       |     ✓\nCell Wall        |     ✗       |     ✓\nChloroplasts     |     ✗       |     ✓ (in green parts)\nLarge Vacuole    |     ✗       |     ✓',
    },
    practiceQuestion: {
      question: 'Explain why plant cells can photosynthesise but animal cells cannot.',
      hint: 'Think about which organelle is responsible for photosynthesis and which type of cell contains it.',
    },
  },
  {
    id: 'cell-l2', title: 'Cell Division: Mitosis', topicId: 'bio-cells', order: 2,
    content: [
      'Mitosis is a type of cell division that produces two genetically identical daughter cells from a single parent cell. It is the process used for growth, repair, and asexual reproduction in eukaryotic organisms. The daughter cells receive the same number of chromosomes as the parent cell.',
      'Mitosis is divided into four phases: Prophase (chromosomes condense and become visible, nuclear envelope breaks down), Metaphase (chromosomes align at the cell\'s equator), Anaphase (sister chromatids are pulled to opposite poles), and Telophase (nuclear envelopes reform, chromosomes decondense). Cytokinesis then divides the cytoplasm.',
      'The control of cell division is critical. When the mechanisms regulating mitosis malfunction, cells can divide uncontrollably, leading to tumours and cancer.',
    ],
    example: {
      title: 'Stages of Mitosis Memory Aid',
      body: 'PMAT — a common acronym:\nP — Prophase: chromosomes become visible\nM — Metaphase: chromosomes line up in the Middle\nA — Anaphase: chromatids move Apart\nT — Telophase: Two nuclei form',
    },
    practiceQuestion: {
      question: 'A cell has 46 chromosomes before it undergoes mitosis. How many chromosomes will each daughter cell contain, and why?',
      hint: 'Mitosis is designed to maintain the chromosome number — what does this tell you about the daughter cells?',
    },
  },
  {
    id: 'cell-l3', title: 'Diffusion and Osmosis', topicId: 'bio-cells', order: 3,
    content: [
      'Diffusion is the net movement of molecules from a region of high concentration to a region of low concentration — down a concentration gradient. It requires no energy (passive transport) and is driven by random molecular motion. Examples include oxygen entering cells and carbon dioxide leaving cells during respiration.',
      'Osmosis is a special case of diffusion involving water molecules across a partially permeable membrane. Water moves from a region of high water potential (dilute solution) to a region of low water potential (concentrated solution). This is crucial for how plant cells maintain turgor and how animal cells regulate their water content.',
      'Active transport is the movement of molecules against their concentration gradient, requiring energy from ATP. It allows cells to absorb substances even when concentrations are higher inside the cell, such as root hair cells absorbing mineral ions from the soil.',
    ],
    example: {
      title: 'Osmosis in Potato Cells',
      body: 'Potato pieces placed in distilled water gain mass (water enters by osmosis, from high to low water potential). Potato pieces placed in concentrated salt solution lose mass (water leaves by osmosis). This demonstrates that osmosis moves water from dilute to concentrated solutions.',
    },
    practiceQuestion: {
      question: 'A red blood cell is placed in a very concentrated salt solution. Predict what will happen and explain why, using your knowledge of osmosis.',
      hint: 'Compare the water potential inside the cell with the water potential of the salt solution.',
    },
  },

  // HISTORY - PRE-COLONIAL AFRICA
  {
    id: 'precolonial-l1', title: 'Great Kingdoms of Pre-Colonial Africa', topicId: 'hist-africa-precolonial', order: 1,
    content: [
      'Before European colonisation, Africa was home to sophisticated, powerful kingdoms and empires that engaged in extensive trade, developed complex governance structures, and produced remarkable cultural achievements. These states demonstrate that African societies had rich histories long before European contact.',
      'The Kingdom of Kongo (in present-day Central Africa) was a highly centralised state with a sophisticated administrative system. Mali and Songhai in West Africa were centres of trans-Saharan trade, scholarship, and Islamic learning — the city of Timbuktu was renowned throughout the Muslim world for its universities and libraries. In East Africa, city-states like Kilwa were key nodes in the Indian Ocean trade network.',
      'In the Great Lakes region of East Africa — the area that would become Uganda — the Buganda, Bunyoro, Toro, and Ankole kingdoms were well-organised states with monarchical rule, specialised occupational groups, and extensive agricultural systems.',
    ],
    example: {
      title: 'The Buganda Kingdom',
      body: 'The Kabaka (king) of Buganda ruled through a hierarchical system of chiefs (bakungu) who administered counties (ssaza). The kingdom had a standing army, a royal palace complex at Mengo, a tradition of oral history preserved by the Abakunta clan, and control over important trade routes around Lake Victoria.',
    },
    practiceQuestion: {
      question: 'Describe two features of the Buganda Kingdom that demonstrate it was a well-organised pre-colonial state.',
      hint: 'Think about governance structure, economic activity, or cultural achievements.',
    },
  },
  {
    id: 'precolonial-l2', title: 'Trade in Pre-Colonial Africa', topicId: 'hist-africa-precolonial', order: 2,
    content: [
      'Long-distance trade was a defining feature of African civilisations long before European arrival. Three major trade systems interconnected the continent: the trans-Saharan trade routes linking West and North Africa, the Indian Ocean trade connecting East Africa with Arabia, India, and China, and internal African trade networks.',
      'The trans-Saharan trade primarily exchanged West African gold, kola nuts, and enslaved people for North African salt, cloth, and manufactured goods. Cities such as Timbuktu, Djenné, and Kano grew wealthy as major trading centres. The Indian Ocean trade saw East African city-states such as Kilwa, Malindi, and Mombasa export gold, ivory, and enslaved people in exchange for silk, porcelain, and spices.',
      'The Swahili culture of East Africa emerged as a blend of Bantu African and Arab cultures due to centuries of Indian Ocean trade and Islamic influence. Swahili merchants built stone houses and mosques, and Swahili language became the lingua franca of the East African coast.',
    ],
    example: {
      title: 'Kilwa and the Indian Ocean Trade',
      body: 'The island city of Kilwa (in modern Tanzania) became the most powerful Swahili city-state between the 13th and 15th centuries. It controlled the export of gold from the Zimbabwe Plateau, taxing all trade. Ibn Battuta, the Moroccan traveller who visited in 1331, described it as one of the most beautiful cities in the world.',
    },
    practiceQuestion: {
      question: 'Explain how the Indian Ocean trade transformed the cultures of East African coastal societies.',
      hint: 'Consider the impact on religion, language, architecture, and social structure.',
    },
  },
  {
    id: 'precolonial-l3', title: 'Social Structures in Pre-Colonial Africa', topicId: 'hist-africa-precolonial', order: 3,
    content: [
      'Pre-colonial African societies were diverse in their organisation, but most shared certain common features: a strong emphasis on community and kinship, clearly defined roles based on age and gender, systems for managing land and resources collectively, and mechanisms for conflict resolution.',
      'Most African societies were organised around the extended family and the clan. Kinship ties determined access to land, shaped marriage patterns, and defined social obligations. Age-grade systems (groupings of people of similar age who move through life stages together) were common in many societies, particularly in East Africa, and served important social, economic, and military functions.',
      'Governance varied widely: from decentralised, stateless societies governed through councils of elders (such as the Igbo of Nigeria or many Nilotic groups in Uganda) to highly centralised monarchies. Both systems had mechanisms for accountability and legitimacy.',
    ],
    example: {
      title: 'Age-Grade Systems Among the Karamojong',
      body: 'The Karamojong of northeastern Uganda organised society through an age-grade system. Men passed through successive grades — junior warriors, senior warriors, and elders — each with distinct duties. Elders made collective political decisions, warriors defended cattle herds, and the system created social cohesion without a centralised monarchy.',
    },
    practiceQuestion: {
      question: 'Compare a centralised monarchy (like Buganda) with a stateless society governed by elders. What are the strengths and weaknesses of each system?',
      hint: 'Consider decision-making speed, stability, representation, and response to external threats.',
    },
  },

  // GEOGRAPHY - PHYSICAL
  {
    id: 'phygeo-l1', title: 'Plate Tectonics and Landforms', topicId: 'geo-physical', order: 1,
    content: [
      'The Earth\'s lithosphere is divided into large, rigid sections called tectonic plates that move slowly over the semi-molten asthenosphere. This movement, driven by convection currents in the mantle, shapes the Earth\'s major landforms and causes earthquakes and volcanic activity.',
      'There are three types of plate boundaries: convergent (plates move toward each other, forming mountains or ocean trenches), divergent (plates move apart, forming rift valleys and mid-ocean ridges), and transform (plates slide past each other, causing earthquakes). East Africa sits on the East African Rift System — a divergent boundary where the African Plate is slowly splitting apart.',
      'Major landforms created by plate tectonics include fold mountains (like the Alps and Himalayas), block mountains (horsts), rift valleys (grabens), volcanoes, and ocean trenches. Understanding tectonics explains the distribution of earthquakes and volcanoes across the globe.',
    ],
    example: {
      title: 'The East African Rift Valley',
      body: 'The East African Rift Valley stretches approximately 6,000 km from the Afar Triangle in Ethiopia to Mozambique. It formed as the African Plate is pulled apart by divergent forces. Features include: Lake Victoria, Lake Tanganyika (the world\'s second deepest lake), Mount Kilimanjaro and the Virunga volcanoes, and the Albertine Rift in western Uganda.',
    },
    practiceQuestion: {
      question: 'Explain how a rift valley is formed. Refer to plate movement in your answer.',
      hint: 'Think about what happens to the land between two plates that are moving apart.',
    },
  },
  {
    id: 'phygeo-l2', title: 'Weather and Climate', topicId: 'geo-physical', order: 2,
    content: [
      'Weather refers to the short-term atmospheric conditions at a specific place and time, while climate describes the average weather patterns of a region over a long period (typically 30 years). The main elements of weather and climate include temperature, precipitation, humidity, wind, and atmospheric pressure.',
      'Uganda has an equatorial climate characterised by high temperatures throughout the year (averaging 16–30°C depending on altitude), high rainfall (especially near Lake Victoria), and two rainy seasons in most parts of the country (March–May and September–November). The climate varies with altitude, distance from the equator, and proximity to large water bodies.',
      'Climate change is altering established weather patterns globally. Rising temperatures, changing rainfall patterns, increased frequency of extreme weather events, and rising sea levels are among the documented impacts. East Africa is particularly vulnerable, with changing rainfall affecting agriculture, water resources, and food security.',
    ],
    example: {
      title: 'Factors Affecting Uganda\'s Climate',
      body: 'Latitude: Uganda straddles the equator → high insolation year-round\nLake Victoria: moderates temperatures, increases rainfall on its shores\nAltitude: highlands like Rwenzori receive more rainfall and are cooler\nITCZ: the movement of the Inter-Tropical Convergence Zone drives Uganda\'s two rainy seasons',
    },
    practiceQuestion: {
      question: 'Explain why Kabale in southwestern Uganda is generally cooler than Kampala, despite both being in the same country.',
      hint: 'Consider the role of altitude in affecting temperature.',
    },
  },
  {
    id: 'phygeo-l3', title: 'Rivers and Drainage Systems', topicId: 'geo-physical', order: 3,
    content: [
      'A river system consists of the main river channel, its tributaries (smaller streams joining the main river), and its drainage basin (the entire land area drained by the river and its tributaries). The watershed or drainage divide is the boundary between adjacent drainage basins.',
      'Rivers shape the landscape through three processes: erosion (wearing away of rock and soil), transportation (carrying eroded material downstream), and deposition (dropping eroded material when the river slows down). A river\'s energy and therefore its ability to erode and transport material depends on its gradient and volume of water.',
      'In Uganda, the Nile River system is of great importance. The River Nile originates from Lake Victoria at Jinja and flows northward through Uganda, Sudan, and Egypt to the Mediterranean Sea. The construction of the Owen Falls (Nalubaale) Dam at Jinja harnessed the Nile for hydroelectric power generation.',
    ],
    example: {
      title: 'The River Nile in Uganda',
      body: 'Source: Lake Victoria at Jinja (called the Victoria Nile)\nFlow: northward through Lake Kyoga and Lake Albert\nFeatures: Murchison Falls (Kabalega Falls) — one of the world\'s most powerful waterfalls\nImportance: hydroelectric power (Nalubaale and Bujagali dams), irrigation, fishing, tourism',
    },
    practiceQuestion: {
      question: 'Describe how human activities in a river\'s drainage basin can affect the quality and quantity of water in the river.',
      hint: 'Consider deforestation, agriculture, urbanisation, and industrial activity.',
    },
  },
];

export const users: User[] = [
  {
    id: 'user-001',
    name: 'Amara Nakato',
    email: 'amara@example.com',
    role: 'independent',
    schoolId: null,
    classroomId: null,
    countryId: 'ug',
    curriculumId: 'ug-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-09-01',
  },
  {
    id: 'user-002',
    name: 'David Ochieng',
    email: 'david@example.com',
    role: 'independent',
    schoolId: null,
    classroomId: null,
    countryId: 'ug',
    curriculumId: 'ug-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-10-15',
  },
  {
    id: 'user-003',
    name: 'Grace Mwangi',
    email: 'grace@example.com',
    role: 'independent',
    schoolId: null,
    classroomId: null,
    countryId: 'zm',
    curriculumId: 'zm-secondary-cur',
    subscriptionStatus: 'inactive',
    joinedAt: '2025-01-10',
  },
  {
    id: 'user-007',
    name: 'GRIO Admin',
    email: 'superadmin@grio.ai',
    role: 'super_admin',
    schoolId: null,
    classroomId: null,
    countryId: 'ug',
    curriculumId: 'ug-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-01-01',
  },

  // ── KAMPALA HIGH SCHOOL ────────────────────────────────────────────
  {
    id: 'khs-admin',
    name: 'Peter Kato',
    email: 'admin@kampala-high.ug',
    role: 'school_admin',
    schoolId: 'school-khs',
    classroomId: null,
    countryId: 'ug',
    curriculumId: 'ug-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-02-01',
  },
  {
    id: 'khs-t1',
    name: 'James Ssekandi',
    email: 'james.teacher@kampala-high.ug',
    role: 'teacher',
    schoolId: 'school-khs',
    classroomId: 'cls-khs-s1a',
    countryId: 'ug',
    curriculumId: 'ug-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-02-10',
  },
  {
    id: 'khs-t2',
    name: 'Rose Achieng',
    email: 'rose.teacher@kampala-high.ug',
    role: 'teacher',
    schoolId: 'school-khs',
    classroomId: 'cls-khs-s2b',
    countryId: 'ug',
    curriculumId: 'ug-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-02-10',
  },
  { id: 'khs-s1', name: 'Aisha Nantongo', email: 'aisha@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s1a', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-02' },
  { id: 'khs-s2', name: 'Brian Mugisha', email: 'brian@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s1a', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-02' },
  { id: 'khs-s3', name: 'Claire Atuhaire', email: 'claire@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s1a', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-02' },
  { id: 'khs-s4', name: 'Daniel Ssewanyana', email: 'daniel@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s1a', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-02' },
  { id: 'khs-s5', name: 'Eve Nakawunde', email: 'eve@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s2b', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-03' },
  { id: 'khs-s6', name: 'Frank Oloka', email: 'frank@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s2b', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-03' },
  { id: 'khs-s7', name: 'Grace Atim', email: 'grace.atim@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s2b', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-03' },
  { id: 'khs-s8', name: 'Henry Ssali', email: 'henry@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s3c', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-04' },
  { id: 'khs-s9', name: 'Irene Nalubega', email: 'irene@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s3c', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-04' },
  { id: 'khs-s10', name: 'Joel Byarugaba', email: 'joel@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s3c', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-04' },
  { id: 'khs-s11', name: 'Kira Namukasa', email: 'kira@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s3c', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-05' },
  { id: 'khs-s12', name: 'Liam Okello', email: 'liam@kampala-high.ug', role: 'independent', schoolId: 'school-khs', classroomId: 'cls-khs-s1a', countryId: 'ug', curriculumId: 'ug-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-05' },

  // ── LUSAKA SECONDARY SCHOOL ────────────────────────────────────────
  {
    id: 'lss-admin',
    name: 'Chanda Phiri',
    email: 'admin@lusaka-secondary.zm',
    role: 'school_admin',
    schoolId: 'school-lss',
    classroomId: null,
    countryId: 'zm',
    curriculumId: 'zm-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-03-15',
  },
  {
    id: 'lss-t1',
    name: 'Mutale Banda',
    email: 'mutale.teacher@lusaka-secondary.zm',
    role: 'teacher',
    schoolId: 'school-lss',
    classroomId: 'cls-lss-g10a',
    countryId: 'zm',
    curriculumId: 'zm-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-03-20',
  },
  {
    id: 'lss-t2',
    name: 'Namwinga Zulu',
    email: 'namwinga.teacher@lusaka-secondary.zm',
    role: 'teacher',
    schoolId: 'school-lss',
    classroomId: 'cls-lss-g11b',
    countryId: 'zm',
    curriculumId: 'zm-secondary-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-03-20',
  },
  { id: 'lss-s1', name: 'Abena Chirwa', email: 'abena@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g10a', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-10' },
  { id: 'lss-s2', name: 'Bwalya Mwale', email: 'bwalya@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g10a', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-10' },
  { id: 'lss-s3', name: 'Chisomo Tembo', email: 'chisomo@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g10a', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-10' },
  { id: 'lss-s4', name: 'Daliso Nkosi', email: 'daliso@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g10a', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-11' },
  { id: 'lss-s5', name: 'Esther Phiri', email: 'esther@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g11b', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-11' },
  { id: 'lss-s6', name: 'Francis Lungu', email: 'francis@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g11b', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-11' },
  { id: 'lss-s7', name: 'Gina Mbewe', email: 'gina@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g11b', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-12' },
  { id: 'lss-s8', name: 'Hastings Sinkala', email: 'hastings@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g12c', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-12' },
  { id: 'lss-s9', name: 'Inonge Mutale', email: 'inonge@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g12c', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-12' },
  { id: 'lss-s10', name: 'Joseph Kaunda', email: 'joseph@lusaka-secondary.zm', role: 'independent', schoolId: 'school-lss', classroomId: 'cls-lss-g12c', countryId: 'zm', curriculumId: 'zm-secondary-cur', subscriptionStatus: 'active', joinedAt: '2024-09-13' },

  // ── INTERNATIONAL ACADEMY ─────────────────────────────────────────
  {
    id: 'ia-admin',
    name: 'Sophie Hartmann',
    email: 'admin@intl-academy.edu',
    role: 'school_admin',
    schoolId: 'school-ia',
    classroomId: null,
    countryId: 'int',
    curriculumId: 'int-igcse-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-06-01',
  },
  {
    id: 'ia-t1',
    name: 'Michael Chen',
    email: 'michael.teacher@intl-academy.edu',
    role: 'teacher',
    schoolId: 'school-ia',
    classroomId: 'cls-ia-y10',
    countryId: 'int',
    curriculumId: 'int-igcse-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-06-10',
  },
  {
    id: 'ia-t2',
    name: 'Priya Sharma',
    email: 'priya.teacher@intl-academy.edu',
    role: 'teacher',
    schoolId: 'school-ia',
    classroomId: 'cls-ia-y11',
    countryId: 'int',
    curriculumId: 'int-igcse-cur',
    subscriptionStatus: 'active',
    joinedAt: '2024-06-10',
  },
  { id: 'ia-s1', name: 'Alex Torres', email: 'alex@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y10', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-01' },
  { id: 'ia-s2', name: 'Bella Kim', email: 'bella@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y10', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-01' },
  { id: 'ia-s3', name: 'Carlos Diaz', email: 'carlos@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y10', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-01' },
  { id: 'ia-s4', name: 'Diana Osei', email: 'diana@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y11', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-02' },
  { id: 'ia-s5', name: 'Ethan Park', email: 'ethan@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y11', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-02' },
  { id: 'ia-s6', name: 'Fatima Al-Hassan', email: 'fatima@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y11', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-02' },
  { id: 'ia-s7', name: 'George Mensah', email: 'george@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y12', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-03' },
  { id: 'ia-s8', name: 'Hannah Müller', email: 'hannah@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y12', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-03' },
  { id: 'ia-s9', name: 'Ivan Petrov', email: 'ivan@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y12', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-03' },
  { id: 'ia-s10', name: 'Jasmine Nguyen', email: 'jasmine@intl-academy.edu', role: 'independent', schoolId: 'school-ia', classroomId: 'cls-ia-y10', countryId: 'int', curriculumId: 'int-igcse-cur', subscriptionStatus: 'active', joinedAt: '2024-09-04' },
];

export const progressRecords: ProgressRecord[] = [
  // User 001 (Amara) — 25% Mathematics, 10% English
  { userId: 'user-001', lessonId: 'alg-l1', completedAt: '2025-01-05T10:00:00Z' },
  { userId: 'user-001', lessonId: 'alg-l2', completedAt: '2025-01-06T11:30:00Z' },
  { userId: 'user-001', lessonId: 'alg-l3', completedAt: '2025-01-07T14:00:00Z' },
  { userId: 'user-001', lessonId: 'geo-l1', completedAt: '2025-01-08T09:00:00Z' },
  { userId: 'user-001', lessonId: 'gram-l1', completedAt: '2025-01-10T16:00:00Z' },

  // User 002 (David) — 60% Physics
  { userId: 'user-002', lessonId: 'mech-l1', completedAt: '2025-01-02T08:00:00Z' },
  { userId: 'user-002', lessonId: 'mech-l2', completedAt: '2025-01-03T09:00:00Z' },
  { userId: 'user-002', lessonId: 'mech-l3', completedAt: '2025-01-04T10:00:00Z' },
  { userId: 'user-002', lessonId: 'calc-l1', completedAt: '2025-01-05T11:00:00Z' },
  { userId: 'user-002', lessonId: 'calc-l2', completedAt: '2025-01-06T14:00:00Z' },
  { userId: 'user-002', lessonId: 'calc-l3', completedAt: '2025-01-07T15:00:00Z' },
  { userId: 'user-002', lessonId: 'cell-l1', completedAt: '2025-01-08T10:00:00Z' },
  { userId: 'user-002', lessonId: 'cell-l2', completedAt: '2025-01-09T11:00:00Z' },

  // User 003 (Grace) — 0% (new user, no progress)

  // ── KHS Students ──────────────────────────────────────────────────
  { userId: 'khs-s1', lessonId: 'alg-l1', completedAt: '2025-01-10T08:00:00Z' },
  { userId: 'khs-s1', lessonId: 'alg-l2', completedAt: '2025-01-11T09:00:00Z' },
  { userId: 'khs-s1', lessonId: 'alg-l3', completedAt: '2025-01-12T10:00:00Z' },
  { userId: 'khs-s1', lessonId: 'geo-l1', completedAt: '2025-01-13T11:00:00Z' },
  { userId: 'khs-s1', lessonId: 'geo-l2', completedAt: '2025-01-14T12:00:00Z' },
  { userId: 'khs-s2', lessonId: 'alg-l1', completedAt: '2025-01-10T08:00:00Z' },
  { userId: 'khs-s2', lessonId: 'alg-l2', completedAt: '2025-01-12T10:00:00Z' },
  { userId: 'khs-s2', lessonId: 'mech-l1', completedAt: '2025-01-13T14:00:00Z' },
  { userId: 'khs-s2', lessonId: 'mech-l2', completedAt: '2025-01-14T15:00:00Z' },
  { userId: 'khs-s2', lessonId: 'mech-l3', completedAt: '2025-01-15T09:00:00Z' },
  { userId: 'khs-s2', lessonId: 'calc-l1', completedAt: '2025-01-16T10:00:00Z' },
  { userId: 'khs-s2', lessonId: 'calc-l2', completedAt: '2025-01-17T11:00:00Z' },
  { userId: 'khs-s2', lessonId: 'calc-l3', completedAt: '2025-01-18T12:00:00Z' },
  { userId: 'khs-s3', lessonId: 'gram-l1', completedAt: '2025-01-11T09:00:00Z' },
  { userId: 'khs-s3', lessonId: 'gram-l2', completedAt: '2025-01-12T10:00:00Z' },
  { userId: 'khs-s4', lessonId: 'alg-l1', completedAt: '2025-01-15T08:00:00Z' },
  { userId: 'khs-s4', lessonId: 'cell-l1', completedAt: '2025-01-16T09:00:00Z' },
  { userId: 'khs-s4', lessonId: 'cell-l2', completedAt: '2025-01-17T10:00:00Z' },
  { userId: 'khs-s4', lessonId: 'cell-l3', completedAt: '2025-01-18T11:00:00Z' },
  { userId: 'khs-s5', lessonId: 'mech-l1', completedAt: '2025-01-10T14:00:00Z' },
  { userId: 'khs-s5', lessonId: 'mech-l2', completedAt: '2025-01-11T15:00:00Z' },
  { userId: 'khs-s5', lessonId: 'mech-l3', completedAt: '2025-01-12T09:00:00Z' },
  { userId: 'khs-s5', lessonId: 'alg-l1', completedAt: '2025-01-13T10:00:00Z' },
  { userId: 'khs-s5', lessonId: 'alg-l2', completedAt: '2025-01-14T11:00:00Z' },
  { userId: 'khs-s5', lessonId: 'alg-l3', completedAt: '2025-01-15T12:00:00Z' },
  { userId: 'khs-s5', lessonId: 'trig-l1', completedAt: '2025-01-16T08:00:00Z' },
  { userId: 'khs-s5', lessonId: 'trig-l2', completedAt: '2025-01-17T09:00:00Z' },
  { userId: 'khs-s6', lessonId: 'geo-l1', completedAt: '2025-01-12T08:00:00Z' },
  { userId: 'khs-s6', lessonId: 'geo-l2', completedAt: '2025-01-13T09:00:00Z' },
  { userId: 'khs-s6', lessonId: 'geo-l3', completedAt: '2025-01-14T10:00:00Z' },
  { userId: 'khs-s7', lessonId: 'phygeo-l1', completedAt: '2025-01-11T10:00:00Z' },
  { userId: 'khs-s7', lessonId: 'phygeo-l2', completedAt: '2025-01-12T11:00:00Z' },
  { userId: 'khs-s8', lessonId: 'alg-l1', completedAt: '2025-01-14T08:00:00Z' },
  { userId: 'khs-s8', lessonId: 'alg-l2', completedAt: '2025-01-15T09:00:00Z' },
  { userId: 'khs-s8', lessonId: 'alg-l3', completedAt: '2025-01-16T10:00:00Z' },
  { userId: 'khs-s8', lessonId: 'trig-l1', completedAt: '2025-01-17T11:00:00Z' },
  { userId: 'khs-s8', lessonId: 'trig-l2', completedAt: '2025-01-18T08:00:00Z' },
  { userId: 'khs-s8', lessonId: 'trig-l3', completedAt: '2025-01-19T09:00:00Z' },
  { userId: 'khs-s9', lessonId: 'gram-l1', completedAt: '2025-01-13T10:00:00Z' },
  { userId: 'khs-s9', lessonId: 'gram-l2', completedAt: '2025-01-14T11:00:00Z' },
  { userId: 'khs-s9', lessonId: 'gram-l3', completedAt: '2025-01-15T08:00:00Z' },
  { userId: 'khs-s9', lessonId: 'alg-l1', completedAt: '2025-01-16T09:00:00Z' },
  { userId: 'khs-s10', lessonId: 'mech-l1', completedAt: '2025-01-10T09:00:00Z' },
  { userId: 'khs-s10', lessonId: 'mech-l2', completedAt: '2025-01-11T10:00:00Z' },
  { userId: 'khs-s11', lessonId: 'cell-l1', completedAt: '2025-01-15T14:00:00Z' },
  { userId: 'khs-s11', lessonId: 'cell-l2', completedAt: '2025-01-16T15:00:00Z' },
  { userId: 'khs-s11', lessonId: 'cell-l3', completedAt: '2025-01-17T09:00:00Z' },
  { userId: 'khs-s11', lessonId: 'precolonial-l1', completedAt: '2025-01-18T10:00:00Z' },
  { userId: 'khs-s12', lessonId: 'prob-l1', completedAt: '2025-01-16T11:00:00Z' },
  { userId: 'khs-s12', lessonId: 'prob-l2', completedAt: '2025-01-17T12:00:00Z' },
  { userId: 'khs-s12', lessonId: 'prob-l3', completedAt: '2025-01-18T09:00:00Z' },

  // ── LSS Students ──────────────────────────────────────────────────
  { userId: 'lss-s1', lessonId: 'alg-l1', completedAt: '2025-01-12T09:00:00Z' },
  { userId: 'lss-s1', lessonId: 'alg-l2', completedAt: '2025-01-13T10:00:00Z' },
  { userId: 'lss-s2', lessonId: 'alg-l1', completedAt: '2025-01-12T10:00:00Z' },
  { userId: 'lss-s2', lessonId: 'alg-l2', completedAt: '2025-01-13T11:00:00Z' },
  { userId: 'lss-s2', lessonId: 'alg-l3', completedAt: '2025-01-14T09:00:00Z' },
  { userId: 'lss-s3', lessonId: 'gram-l1', completedAt: '2025-01-11T09:00:00Z' },
  { userId: 'lss-s4', lessonId: 'alg-l1', completedAt: '2025-01-13T14:00:00Z' },
  { userId: 'lss-s4', lessonId: 'prob-l1', completedAt: '2025-01-14T15:00:00Z' },
  { userId: 'lss-s5', lessonId: 'gram-l1', completedAt: '2025-01-10T09:00:00Z' },
  { userId: 'lss-s5', lessonId: 'gram-l2', completedAt: '2025-01-11T10:00:00Z' },
  { userId: 'lss-s5', lessonId: 'gram-l3', completedAt: '2025-01-12T11:00:00Z' },
  { userId: 'lss-s6', lessonId: 'alg-l1', completedAt: '2025-01-12T09:00:00Z' },
  { userId: 'lss-s6', lessonId: 'alg-l2', completedAt: '2025-01-13T10:00:00Z' },
  { userId: 'lss-s6', lessonId: 'alg-l3', completedAt: '2025-01-14T11:00:00Z' },
  { userId: 'lss-s6', lessonId: 'geo-l1', completedAt: '2025-01-15T09:00:00Z' },
  { userId: 'lss-s7', lessonId: 'prob-l1', completedAt: '2025-01-14T09:00:00Z' },
  { userId: 'lss-s7', lessonId: 'prob-l2', completedAt: '2025-01-15T10:00:00Z' },
  { userId: 'lss-s8', lessonId: 'alg-l1', completedAt: '2025-01-16T09:00:00Z' },
  { userId: 'lss-s9', lessonId: 'gram-l1', completedAt: '2025-01-15T14:00:00Z' },
  { userId: 'lss-s9', lessonId: 'gram-l2', completedAt: '2025-01-16T15:00:00Z' },
  { userId: 'lss-s10', lessonId: 'alg-l1', completedAt: '2025-01-13T10:00:00Z' },
  { userId: 'lss-s10', lessonId: 'mech-l1', completedAt: '2025-01-14T11:00:00Z' },
  { userId: 'lss-s10', lessonId: 'mech-l2', completedAt: '2025-01-15T12:00:00Z' },

  // ── IA Students (IGCSE — lessons from igcse subjects not yet fully built, use UG lessons as proxy) ──
  { userId: 'ia-s1', lessonId: 'alg-l1', completedAt: '2025-01-10T09:00:00Z' },
  { userId: 'ia-s1', lessonId: 'alg-l2', completedAt: '2025-01-11T10:00:00Z' },
  { userId: 'ia-s1', lessonId: 'alg-l3', completedAt: '2025-01-12T11:00:00Z' },
  { userId: 'ia-s1', lessonId: 'trig-l1', completedAt: '2025-01-13T09:00:00Z' },
  { userId: 'ia-s2', lessonId: 'alg-l1', completedAt: '2025-01-10T10:00:00Z' },
  { userId: 'ia-s2', lessonId: 'mech-l1', completedAt: '2025-01-11T11:00:00Z' },
  { userId: 'ia-s3', lessonId: 'cell-l1', completedAt: '2025-01-12T09:00:00Z' },
  { userId: 'ia-s3', lessonId: 'cell-l2', completedAt: '2025-01-13T10:00:00Z' },
  { userId: 'ia-s4', lessonId: 'geo-l1', completedAt: '2025-01-11T09:00:00Z' },
  { userId: 'ia-s4', lessonId: 'geo-l2', completedAt: '2025-01-12T10:00:00Z' },
  { userId: 'ia-s4', lessonId: 'geo-l3', completedAt: '2025-01-13T11:00:00Z' },
  { userId: 'ia-s5', lessonId: 'alg-l1', completedAt: '2025-01-14T09:00:00Z' },
  { userId: 'ia-s5', lessonId: 'alg-l2', completedAt: '2025-01-15T10:00:00Z' },
  { userId: 'ia-s6', lessonId: 'gram-l1', completedAt: '2025-01-13T14:00:00Z' },
  { userId: 'ia-s7', lessonId: 'alg-l1', completedAt: '2025-01-15T09:00:00Z' },
  { userId: 'ia-s7', lessonId: 'alg-l2', completedAt: '2025-01-16T10:00:00Z' },
  { userId: 'ia-s7', lessonId: 'alg-l3', completedAt: '2025-01-17T11:00:00Z' },
  { userId: 'ia-s7', lessonId: 'trig-l1', completedAt: '2025-01-18T09:00:00Z' },
  { userId: 'ia-s7', lessonId: 'trig-l2', completedAt: '2025-01-19T10:00:00Z' },
  { userId: 'ia-s8', lessonId: 'mech-l1', completedAt: '2025-01-14T09:00:00Z' },
  { userId: 'ia-s8', lessonId: 'mech-l2', completedAt: '2025-01-15T10:00:00Z' },
  { userId: 'ia-s9', lessonId: 'cell-l1', completedAt: '2025-01-16T09:00:00Z' },
  { userId: 'ia-s10', lessonId: 'alg-l1', completedAt: '2025-01-17T10:00:00Z' },
  { userId: 'ia-s10', lessonId: 'alg-l2', completedAt: '2025-01-18T11:00:00Z' },
];

export const DEMO_CREDENTIALS = [
  { label: 'Independent Learner (Active)', email: 'amara@example.com', password: 'demo123', role: 'independent' },
  { label: 'Independent Learner (Advanced)', email: 'david@example.com', password: 'demo123', role: 'independent' },
  { label: 'Inactive Subscription', email: 'grace@example.com', password: 'demo123', role: 'independent' },
  { label: 'Teacher — Kampala High', email: 'james.teacher@kampala-high.ug', password: 'demo123', role: 'teacher' },
  { label: 'School Admin — Kampala High', email: 'admin@kampala-high.ug', password: 'demo123', role: 'school_admin' },
  { label: 'School Admin — Lusaka Secondary', email: 'admin@lusaka-secondary.zm', password: 'demo123', role: 'school_admin' },
  { label: 'Super Admin', email: 'superadmin@grio.ai', password: 'admin123', role: 'super_admin' },
];
