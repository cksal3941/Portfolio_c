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
      ko: '화면을 만들기 전에 먼저 흐름을 봅니다.\n정보의 순서와 사용자의 움직임을 생각하며,\n필요한 구조를 하나씩 정리해 구현합니다.',
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
    tg2Paragraphs: {
      ko: [
        'RE:BUILD는 저에게 단순히 "다시 시작한다"는 뜻이 아닙니다. 지나온 시간을 지우는 것이 아니라, 그 안에서 남길 수 있는 것들을 다시 보고 지금의 방향에 맞게 구성하는 과정에 가깝습니다.',
        '저는 한 가지 길을 곧게 이어온 사람은 아닙니다. 여러 환경을 지나왔고, 지금은 웹 퍼블리싱과 프론트엔드 개발을 배우고 있습니다. 겉으로 보면 다른 방향처럼 보일 수 있지만, 저는 그 과정 안에서 정보를 정리하고, 필요한 흐름을 파악하고, 이해하기 쉬운 형태로 만드는 일에 계속 관심을 두었습니다.',
        '저에게 RE:는 다시 보는 일입니다. 지나온 경험을 단절로만 두지 않고, 지금의 기준에서 다시 살펴보는 과정입니다. 무엇을 남기고, 무엇을 덜어내고, 어떤 방식으로 이어갈 수 있을지 정리하는 시간이기도 합니다.',
        '그리고 BUILD는 그 정리한 생각을 실제 결과물로 만드는 일입니다. 저는 아이디어를 화면으로 옮기고, 사용자가 이해할 수 있는 구조로 배치하며, 필요한 기능을 연결해 직접 구현하는 과정을 배우고 있습니다.',
        '저는 빠르게 완성하는 사람이라기보다, 먼저 오래 보고 구조를 잡는 편입니다. 여러 번 확인하고 다시 정리하면서 결과물로 만들어가는 방식이 저에게는 더 자연스럽습니다.',
        'AI 도구도 이 흐름 안에서 사용하고 있습니다. 저는 AI를 결과를 대신 만드는 수단이 아니라, 아이디어와 구현 사이의 간격을 줄이는 보조 도구로 활용합니다. 최종 화면과 기능은 직접 확인하고 수정하며 제 작업 방식에 맞게 다듬고 있습니다.',
        '이 포트폴리오는 그 RE:BUILD 과정에서 만든 작업들을 담은 기록입니다.',
      ],
      en: [
        'RE:BUILD does not simply mean "starting over" to me. It is not about erasing the past — it is closer to looking back at what can be kept, and reorganising it to fit the direction I am moving in now.',
        'I have not followed a single straight path. I have moved through different environments, and I am now learning web publishing and front-end development. On the surface it may look like a change of direction, but throughout that process I have consistently been drawn to organising information, understanding the necessary flow, and shaping things into a form that is easy to follow.',
        'RE: means looking again. It is the process of not treating past experience as a break, but revisiting it from where I stand today — deciding what to keep, what to let go, and how to carry things forward.',
        'And BUILD means turning those organised thoughts into real results. I am learning to move ideas onto screens, arrange them in structures users can understand, and connect the functions needed to bring them to life.',
        'I am not someone who rushes to finish. I prefer to look carefully first and establish structure. Checking, re-organising, and refining until the result takes shape feels more natural to me.',
        'I use AI tools within this same workflow — not as a means to produce results on my behalf, but as a support that bridges the gap between ideas and implementation. The final screens and functions are verified and adjusted by me, shaped to fit my way of working.',
        'This portfolio is a record of the work made through that RE:BUILD process.',
      ],
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
