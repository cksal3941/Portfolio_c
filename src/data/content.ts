export type Lang = 'ko' | 'en'

export const C = {
  hero: {
    tagline:    { ko: 'WEB · DESIGN · FRONT-END', en: 'WEB · DESIGN · FRONT-END' },
    indexLabel: { ko: 'INTRO',                    en: 'INTRO'                    },
    indexNum:   '01',
    body: {
      ko: '기획과 디자인, 구현 사이의 흐름을 고민하는 주니어 웹 개발자입니다.\n빠르게 만들기보다 먼저 구조를 이해하고,\n사용자가 보기 쉬운 화면으로 정리하는 작업을 배우고 있습니다.',
      en: 'A junior web developer thinking through the flow between planning, design, and implementation.\nRather than building quickly, I focus on understanding structure first, then organising it into screens that are easy to read.',
    },
    exploreBtn: { ko: '[ VIEW PROJECTS ]', en: '[ VIEW PROJECTS ]' },
    aboutHeader: { ko: 'ABOUT ME', en: 'ABOUT ME' },
    aboutBody: {
      ko: '화면을 만들기 전에 먼저 흐름을 봅니다.\n정보의 순서와 사용자의 움직임을\n생각하며,\n필요한 구조를 하나씩 정리해 구현합니다.',
      en: 'Before building a screen, I look at the flow first.\nI consider the order of information and how users move, then organise and implement the structure step by step.',
    },
    tg2Lines: {
      ko: ['직접 기획하고,', '디자인하고,', '코드로 완성합니다.'],
      en: ['PLAN IT.', 'DESIGN IT.', 'BUILD IT.'],
    },
    tg2Label: { ko: '작업물', en: 'PROJECTS' },
    tg2Body: {
      ko: 'After.9, Hancom Academy, WEEF — 기획부터 코드 구현까지 모두 직접 진행한 프로젝트들입니다.',
      en: 'After.9, Hancom Academy, WEEF — each project planned, designed, and built from scratch.',
    },
  },

  aboutSection: {
    titleLines: {
      ko: ['설계하고', '직접 만듭니다'],
      en: ['DESIGN AND', 'BUILD IT MYSELF'],
    },
    emphasis: {
      ko: '기획한 아이디어를 화면으로 만들고 구현합니다.',
      en: 'I THINK THROUGH PLANNING, DESIGN, AND IMPLEMENTATION TO SHAPE COMPLETE SCREEN FLOWS.',
    },
    body: {
      ko: [
        'Figma로 화면 구조와 디자인 방향을 정리하고, React와 AI 도구를 활용해 실제 웹사이트로 구현하는 과정을 배우고 있습니다.',
        '화면뿐 아니라 사용자가 이동하고 이해하는 흐름까지 함께 고려하려고 합니다.',
      ],
      en: [
        'I started in food research and now work toward web publishing and front-end development.',
        'I structure screens in Figma and implement them with React and AI-assisted coding.',
        'My goal: think through planning and design together, then prove it through the work.',
      ],
    },
  },

  darkTransition: {
    p1: {
      ko: '실험실 노트에 기록하고 관찰하던 방식은\n이제 화면을 구성하고 기능을 구현하는 작업으로 이어지고 있습니다.',
      en: 'From laboratory notebooks to browser tabs. The discipline built through research now drives how I build.',
    },
    p2: {
      ko: '이 아카이브의 모든 작업은 그 전환의 기록입니다.',
      en: 'Every project in this archive is a record of that shift.',
    },
    cta: { ko: '[ 아카이브 살펴보기 ]', en: '[ EXPLORE THE ARCHIVE ]' },
  },

  horizontal: {
    about: {
      label: { ko: '소개',       en: 'ABOUT'      },
      title: { ko: ['식품 연구에서', '웹으로'], en: ['FROM FOOD RESEARCH', 'TO WEB EXPERIENCE'] },
      lines: {
        ko: [
          '식품개발, 품질 분석, 연구 등 다양한 실무에서 시작했습니다.',
          '그 경험을 웹 퍼블리싱, 프론트엔드 개발,',
          '디지털 인터페이스 설계로 옮기고 있습니다.',
        ],
        en: [
          'I started in food, nutrition, and research-based work.',
          'Now I am translating that experience into web publishing,',
          'front-end development, and digital interface design.',
        ],
      },
    },
    workStyle: {
      label: { ko: '작업 방식',   en: 'WORK STYLE' },
      title: { ko: ['구조를 이해하고', '직접 만듭니다'], en: ['I BUILD AFTER', 'UNDERSTANDING STRUCTURE'] },
      principles: {
        ko: [
          { num: '01', key: '구조',   desc: '화면을 만들기 전, 정보 순서와 사용자 흐름을 먼저 잡습니다' },
          { num: '02', key: '연결',   desc: '모든 요소가 전체 안에서 의미 있게 연결되도록 합니다' },
          { num: '03', key: '디테일', desc: '결과물이 스스로 말할 때까지 다듬습니다' },
        ],
        en: [
          { num: '01', key: 'STRUCTURE',  desc: 'Information order and user flow before any screen' },
          { num: '02', key: 'CONNECTION', desc: 'Every element linked and purposeful in the whole'  },
          { num: '03', key: 'DETAIL',     desc: 'Refine until the result speaks for itself'          },
        ],
      },
    },
    frontend: {
      label: { ko: '프론트엔드',    en: 'FRONT-END'        },
      title: { ko: ['프론트엔드', '퍼블리싱'], en: ['FRONT-END', 'AND PUBLISHING'] },
    },
    design: {
      label: { ko: '디자인 & AI',  en: 'DESIGN & AI'      },
      title: { ko: ['디자인에서 코드로', 'AI와 함께'], en: ['DESIGN TO CODE', 'WITH AI'] },
    },
    aiTools: {
      label: { ko: 'AI 도구',      en: 'AI TOOLS'         },
      title: { ko: ['AI 기반', '작업 방식'], en: ['AI-ASSISTED', 'PRODUCTION'] },
    },
    experience: {
      label: { ko: '경력',         en: 'EXPERIENCE'       },
      title: { ko: ['연구 기반', '경력 사항'], en: ['RESEARCH-BASED', 'EXPERIENCE'] },
      unit:  { ko: '경력',         en: 'ROLES'            },
      subs:  {
        ko: ['생물학적 품질 분석', '식품 이화학 분석', '식품 개발 연구', '영양 관리'],
        en: ['Biological Quality Analysis', 'Physicochemical Food Analysis', 'Food Development Research', 'Nutrition Management'],
      },
    },
    education: {
      label: { ko: '학력',         en: 'EDUCATION'        },
      title: { ko: ['학력 및', '자격증'], en: ['EDUCATION', 'AND CERTIFICATES'] },
      unit:  { ko: '자격',         en: 'CREDENTIALS'      },
      subs:  {
        ko: ['학사 학위', '학사 학위', '국가 면허', '자격증', '자격증', '자격증'],
        en: ['B.S. Degree', 'B.S. Degree', 'National License', 'Certificate', 'Certificate', 'Certificate'],
      },
    },
  },

  footer: {
    cta:       { ko: '함께\n만들어요',                  en: "LET'S BUILD\nWHAT'S NEXT"            },
    role:      { ko: '프론트엔드 개발자 · 웹 퍼블리셔', en: 'FRONT-END DEVELOPER · WEB PUBLISHER' },
    scrollTop: { ko: '맨 위로 ↑',                       en: 'SCROLL TO TOP ↑'                     },
  },

  menu: {
    items: [
      { label: { ko: '홈',  en: 'Home'    }, target: 'home'    as const },
      { label: { ko: '작업', en: 'Work'   }, target: 'work'    as const },
      { label: { ko: '소개', en: 'About'  }, target: 'about'   as const },
      { label: { ko: '연락', en: 'Contact'}, target: 'contact' as const },
    ],
    contact: { ko: '연락하기 ↗', en: 'Contact ↗' },
  },

  about: {
    eyebrow:  { ko: '프론트엔드 개발자 · 웹 퍼블리셔', en: 'Front-End Developer · Web Publisher' },
    oneliner: {
      ko: '기획과 디자인, 구현을 함께 고민하는 주니어 웹 개발자입니다.',
      en: 'A junior developer who thinks through planning, design, and implementation together.',
    },
    body: {
      ko: [
        '식품 개발·품질 분석·연구 현장에서 쌓은 경험이 지금의 작업 방식을 만들었습니다.',
        'Figma로 화면을 설계하고 React와 AI 기반 코딩으로 직접 구현합니다.',
        '서두르기보다 구조를 먼저 잡고, 결과물로 증명하는 방식을 지향합니다.',
      ],
      en: [
        'Years in food development, quality analysis, and research taught me how to organise information and understand process.',
        'I am now learning to design and implement screen flows using AI-assisted coding, Figma, and React.',
        'Rather than rushing to finish, I prefer to think deeply, establish structure first, and let the work speak for itself.',
      ],
    },
    caption: {
      ko: 'After.9 프로젝트 브랜드 비주얼 — 디자인부터 구현까지.',
      en: 'Brand visuals from the After.9 project — design to production.',
    },
  },
}
