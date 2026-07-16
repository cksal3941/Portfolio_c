import { useEffect, useRef, useMemo, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layout, Layers, Sparkles, Wand2, Globe, Monitor } from 'lucide-react'
import aboutImage from '@/images/IMG_3572.png'
import cursorImg1 from '@/images/item.png'
import cursorImg2 from '@/images/item2.png'
import cursorImg3 from '@/images/item3.png'
import cursorImg4 from '@/images/item4.png'
import cursorImg5 from '@/images/item5.png'
import cursorImg6 from '@/images/item6.png'
import { useLang, type Lang } from '@/context/LangContext'
import { C } from '@/data/content'
import { useBreakpoint } from '@/hooks/useBreakpoint'

gsap.registerPlugin(ScrollTrigger)

/* ── brand SVG logos ──────────────────────────────────────── */
function HTMLIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  )
}
function CSSIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63"/>
    </svg>
  )
}
function JSIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  )
}
function TSIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
    </svg>
  )
}
function ReactIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
    </svg>
  )
}
function FigmaIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
    </svg>
  )
}
function PsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="4" fill="currentColor" />
      <text x="12" y="17" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">Ps</text>
    </svg>
  )
}
function GitIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z"/>
    </svg>
  )
}
function ChatGPTIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"/>
    </svg>
  )
}
function CodexIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z"/>
    </svg>
  )
}
function ClaudeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"/>
    </svg>
  )
}
function GeminiIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"/>
    </svg>
  )
}
function AntigravityIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.751 22.607c1.34 1.005 3.35.335 1.508-1.508C17.73 15.74 18.904 1 12.037 1 5.17 1 6.342 15.74.815 21.1c-2.01 2.009.167 2.511 1.507 1.506 5.192-3.517 4.857-9.714 9.715-9.714 4.857 0 4.522 6.197 9.714 9.715z"/>
    </svg>
  )
}

/* ── types ────────────────────────────────────────────────── */
type SkillIcon  = { icon: React.ReactNode; label: string }
type SkillCard  = { icon: React.ReactNode; label: string; level: string; desc: string }
type Principle  = { num: string; key: string; desc: string }
type Entry      = { name: string; sub?: string; period?: string }
type StatBlock  = { number: string; unit: string }

const FRONTEND_CARDS: SkillCard[] = [
  { icon: <HTMLIcon />,                              label: 'HTML5',       level: 'LEVEL 03', desc: '시맨틱 구조 작성 · 페이지 마크업' },
  { icon: <CSSIcon />,                               label: 'CSS3',        level: 'LEVEL 03', desc: '반응형 레이아웃 · 스타일링 · 기본 애니메이션' },
  { icon: <JSIcon />,                                label: 'JavaScript',  level: 'LEVEL 02', desc: 'DOM 제어 · 인터랙션 로직 구현' },
  { icon: <TSIcon />,                                label: 'TypeScript',  level: 'LEVEL 01', desc: '기본 타입 구조 이해 · 학습 중' },
  { icon: <ReactIcon />,                             label: 'React',       level: 'LEVEL 02', desc: '컴포넌트 기반 UI · 상태 흐름 관리' },
  { icon: <GitIcon />,                               label: 'Git',         level: 'LEVEL 02', desc: '버전 관리 · 브랜치 · 커밋 기록 관리' },
  { icon: <Monitor size={26} strokeWidth={1.3} />,   label: 'Responsive',  level: 'LEVEL 03', desc: 'PC · 태블릿 · 모바일 반응형 레이아웃' },
  { icon: <Globe   size={26} strokeWidth={1.3} />,   label: 'Publishing',  level: 'LEVEL 03', desc: '디자인 시안 → 웹 화면 구현' },
]
const DESIGN_CARDS: SkillCard[] = [
  { icon: <FigmaIcon />,                               label: 'Figma',         level: 'LEVEL 02', desc: '화면 구조 · 와이어프레임 · 사용자 흐름 정리' },
  { icon: <PsIcon />,                                  label: 'Photoshop',     level: 'LEVEL 01', desc: '기본 이미지 보정 · 시각 자료 정리' },
  { icon: <Layout   size={26} strokeWidth={1.3} />,    label: 'Wireframe',     level: 'LEVEL 02', desc: '페이지 정보 순서 · 화면 구성 설계' },
  { icon: <Layers   size={26} strokeWidth={1.3} />,    label: 'UX Flow',       level: 'LEVEL 02', desc: '사용자 이동 · 화면 전환 흐름 설계' },
  { icon: <Layout   size={26} strokeWidth={1.3} />,    label: 'Design System', level: 'LEVEL 01', desc: '색상 · 타이포 · 버튼 등 기본 UI 규칙' },
  { icon: <Sparkles size={26} strokeWidth={1.3} />,    label: 'AI Image',      level: 'LEVEL 02', desc: '레퍼런스 이미지 생성 · 화면 분위기 구체화' },
  { icon: <Wand2    size={26} strokeWidth={1.3} />,    label: 'AI Production', level: 'LEVEL 02', desc: '기획 · 디자인 · 코드 구현 과정 보조' },
]

const AI_CARDS: SkillCard[] = [
  { icon: <ChatGPTIcon />,     label: 'ChatGPT',     level: 'LEVEL 03', desc: '아이디어 정리 · 문장 구성 · 인터랙션 분석 · 프롬프트 설계 · 이미지 생성' },
  { icon: <CodexIcon />,       label: 'Codex',       level: 'LEVEL 02', desc: '코드 수정 · 오류 점검 · 컴포넌트 정리 · 구현 보조' },
  { icon: <ClaudeIcon />,      label: 'Claude',      level: 'LEVEL 02', desc: '섹션 구성 · 레이아웃 정리 · 애니메이션 방향 설정' },
  { icon: <GeminiIcon />,      label: 'Gemini',      level: 'LEVEL 01', desc: '자료 비교 · 아이디어 검토 · 대체 방향 탐색 · 이미지 생성' },
  { icon: <AntigravityIcon />, label: 'Antigravity', level: 'LEVEL 01', desc: '실험적 코드 흐름 · 작업 방식 테스트' },
]

/* ── panel data (lang-aware) ──────────────────────────────── */
function getPanels(lang: Lang) {
  const h = C.horizontal
  return [
    {
      label: h.about.label.en,
      title: h.about.title.en,
      lines: h.about.lines[lang],
      img: aboutImage, imgAlt: 'minimal workspace',
      icons: null, principles: null, stat: null, entries: null, skillCards: null,
    },
    {
      label: h.workStyle.label.en,
      title: h.workStyle.title.en,
      lines: [], img: null, imgAlt: '', icons: null, stat: null, entries: null, skillCards: null,
      principles: h.workStyle.principles[lang],
    },
    {
      label: h.frontend.label.en,
      title: h.frontend.title.en,
      lines: lang === 'ko'
        ? ['기본 구조를 설계하고,', '반응형 화면과 인터랙션을 구현합니다.']
        : ['Designing structure,', 'implementing responsive layouts and interactions.'],
      img: null, imgAlt: '', principles: null, stat: null, entries: null,
      icons: null,
      skillCards: FRONTEND_CARDS,
    },
    {
      label: h.design.label.en,
      title: h.design.title.en,
      lines: lang === 'ko'
        ? ['화면 흐름을 정리하고,', 'AI를 활용해 아이디어와', '구현 방향을 구체화합니다.']
        : ['Organising screen flows,', 'and shaping ideas and', 'implementation direction with AI.'],
      img: null, imgAlt: '', principles: null, stat: null, entries: null,
      icons: null,
      skillCards: DESIGN_CARDS,
    },
    {
      label: h.aiTools.label.en,
      title: h.aiTools.title.en,
      lines: lang === 'ko'
        ? ['AI는 결과물을 대신 만드는 도구가 아니라,', '기획·구조화·구현 점검을 돕는', '작업 보조 도구로 활용합니다.']
        : ['Not a tool to replace output,', 'but a workflow assistant for', 'planning, structuring, and review.'],
      img: null, imgAlt: '', principles: null, stat: null, entries: null,
      icons: null,
      skillCards: AI_CARDS,
    },
    {
      label: h.experience.label.en,
      title: h.experience.title.en,
      lines: [], img: null, imgAlt: '', icons: null, principles: null,
      stat: { number: '4', unit: h.experience.unit.en },
      entries: [
        { name: 'KT&G',                             sub: h.experience.subs[lang][0], period: '2024 — 2026' },
        { name: 'Geumsan Ginseng Institute',         sub: h.experience.subs[lang][1], period: '2022 — 2023' },
        { name: 'Chungcheongbuk-do Agri. Services', sub: h.experience.subs[lang][2], period: '2020 — 2021' },
        { name: 'MS Food',                           sub: h.experience.subs[lang][3], period: '2017 — 2018' },
      ],
    },
    {
      label: h.education.label.en,
      title: h.education.title.en,
      lines: [], img: null, imgAlt: '', icons: null, principles: null,
      stat: { number: '6', unit: h.education.unit.en },
      entries: [
        { name: 'Food Science & Biotechnology', sub: h.education.subs[lang][0] },
        { name: 'Food and Nutrition',           sub: h.education.subs[lang][1] },
        { name: 'Nutritionist',                 sub: h.education.subs[lang][2] },
        { name: 'GTQ',                          sub: h.education.subs[lang][3] },
        { name: 'GTQid',                        sub: h.education.subs[lang][4] },
        { name: 'ITQ',                          sub: h.education.subs[lang][5] },
      ],
    },
  ]
}

const CURSOR_IMAGES = [cursorImg1, cursorImg2, cursorImg3, cursorImg4, cursorImg5, cursorImg6]

/* ── sub-components ───────────────────────────────────────── */
const ANTON: React.CSSProperties = {
  fontFamily: "'Anton', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
}

function Line({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div
      className={className}
      style={{ display: 'block', width: '100%', wordBreak: 'break-word', overflowWrap: 'break-word', ...style }}
    >
      {children}
    </div>
  )
}

function IconGrid({ items }: { items: SkillIcon[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {items.map(({ icon, label }) => (
        <div key={label} style={{
          width: '72px', height: '72px', border: '1px solid #000',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxSizing: 'border-box',
        }} title={label}>
          {icon}
        </div>
      ))}
    </div>
  )
}

/* D — numbered principles */
function PrinciplesGrid({ items }: { items: Principle[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {items.map(({ num, key, desc }, i) => (
        <div key={num} style={{
          padding: '22px 0',
          borderTop: '1px solid #000',
          borderBottom: i === items.length - 1 ? '1px solid #000' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '10px' }}>
            <span style={{ fontSize: '16px', letterSpacing: '0.16em', color: '#000' }}>{num}</span>
            <span style={{ ...ANTON, fontSize: 'clamp(22px, 2.4vw, 36px)', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              {key}
            </span>
          </div>
          <p style={{ fontSize: '16px', lineHeight: 1.75, margin: 0, paddingLeft: '34px', color: '#000' }}>
            {desc}
          </p>
        </div>
      ))}
    </div>
  )
}

/* B — large stat number + entry list */
function StatList({ stat, entries }: { stat: StatBlock; entries: Entry[] }) {
  return (
    <div style={{ display: 'flex', gap: '5vw', alignItems: 'flex-start', width: '100%' }}>
      {/* big number */}
      <div style={{ flexShrink: 0 }}>
        <p style={{ ...ANTON, fontSize: 'clamp(72px, 7vw, 110px)', lineHeight: 1, letterSpacing: '-0.04em', margin: '0 0 4px' }}>
          {stat.number}
        </p>
        <p style={{ fontSize: '16px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0, color: '#000' }}>
          {stat.unit}
        </p>
      </div>

      {/* entry list */}
      <div style={{ flex: 1, borderTop: '1px solid #000' }}>
        {entries.map(({ name, sub, period }) => (
          <div key={name} style={{
            borderBottom: '1px solid #000',
            padding: '14px 0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px',
          }}>
            <div>
              <p style={{ ...ANTON, fontSize: 'clamp(16px, 1.5vw, 22px)', textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0 0 4px' }}>
                {name}
              </p>
              {sub && <p style={{ fontSize: '16px', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, color: '#000' }}>{sub}</p>}
            </div>
            {period && <p style={{ fontSize: '16px', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, color: '#000', flexShrink: 0 }}>{period}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillCardItem({ icon, label, level, desc, compact }: SkillCard & { compact?: boolean }) {
  const [hov, setHov] = useState(false)
  const sz = compact ? 72 : 148

  return (
    <div
      data-skill-card="true"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: `${sz}px`,
        height: `${sz}px`,
        border: '1px solid #000',
        boxSizing: 'border-box',
        position: 'relative',
        background: hov ? '#000' : 'transparent',
        transition: 'background 0.2s ease',
        cursor: 'default',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* 기본 상태 — 세로 중앙 정렬 */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: compact ? '6px' : '14px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: compact ? '4px' : '9px',
        opacity: hov ? 0 : 1,
        transition: 'opacity 0.15s ease',
      }}>
        <div style={{ color: '#000', lineHeight: 0, transform: compact ? 'scale(0.65)' : 'none' }}>{icon}</div>
        <span style={{
          fontFamily: "'Archivo', sans-serif",
          fontSize: compact ? '9px' : '13px', fontWeight: 700,
          letterSpacing: '0.04em', textTransform: 'uppercase',
          textAlign: 'center', color: '#000', lineHeight: 1.1,
        }}>{label}</span>
      </div>

      {/* 호버 설명 레이어 */}
      <div style={{
        position: 'absolute', inset: 0,
        padding: compact ? '6px' : '14px',
        display: 'flex', alignItems: 'center',
        opacity: hov ? 1 : 0,
        transition: 'opacity 0.15s ease',
      }}>
        <p style={{
          fontFamily: "'Archivo', sans-serif",
          fontSize: compact ? '9px' : '13px', lineHeight: 1.4,
          margin: 0, wordBreak: 'keep-all', color: '#fff',
          textAlign: 'center', width: '100%',
        }}>{desc}</p>
      </div>
    </div>
  )
}

function FrontendSkillGrid({ items, compact }: { items: SkillCard[]; compact?: boolean }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? '4px' : '10px', alignContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
      {items.map(card => <SkillCardItem key={card.label} {...card} compact={compact} />)}
    </div>
  )
}

/* ── main component ───────────────────────────────────────── */
export default function HorizontalSection() {
  const { lang }     = useLang()
  const { isMobile } = useBreakpoint()
  const PANELS       = useMemo(() => getPanels(lang), [lang])
  const containerRef = useRef<HTMLDivElement>(null)
  const tiltRef      = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const cursorRef    = useRef<HTMLDivElement>(null)
  const cursorImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    const activeIdx = { current: -1 }

    const ctx = gsap.context(() => {
      const panelCount    = PANELS.length
      // Each panel gets a "hold" segment where scrolling does not move the track,
      // giving the user time to read. Then a "slide" segment transitions to the next.
      const holdDuration  = 0.8   // timeline units (= proportion of total scroll)
      const slideDuration = 1.0
      const totalDuration = panelCount * holdDuration + (panelCount - 1) * slideDuration

      const panels = gsap.utils.toArray<HTMLElement>('.horizontal-panel')

      // Clear any stale GSAP transform from previous renders / HMR
      gsap.set(trackRef.current, { clearProps: 'transform' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:             containerRef.current,
          start:               'top top',
          end:                 () => `+=${totalDuration * window.innerHeight}`,
          pin:                 true,
          scrub:               1.2,
          anticipatePin:       1,
          invalidateOnRefresh: true,
          onUpdate: isTouchDevice ? undefined : (self) => {
            const idx = Math.round(self.progress * (panelCount - 1))
            if (idx === activeIdx.current) return
            activeIdx.current = idx
            const img = cursorImgRef.current
            if (!img) return
            gsap.to(img, {
              opacity: 0, scale: 0.85, duration: 0.12, ease: 'power2.in',
              onComplete: () => {
                img.src = CURSOR_IMAGES[idx % CURSOR_IMAGES.length]
                gsap.to(img, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' })
              },
            })
          },
        },
      })

      // Helper — track position for panel i in vw-string form.
      // x uses vw so GSAP translates by exactly one viewport per step,
      // independent of the track's own total width (which would break xPercent).
      const panelX = (i: number) => (i === 0 ? '0vw' : `-${i * 100}vw`)

      // ── hold panel 0 ────────────────────────────────────────
      tl.to(trackRef.current, { x: panelX(0), duration: holdDuration, ease: 'none' })

      // ── for each remaining panel: slide in → hold ───────────
      for (let i = 0; i < panelCount - 1; i++) {
        tl.to(trackRef.current, {
          x:        panelX(i + 1),
          duration: slideDuration,
          ease:     'power2.inOut',
        })
        tl.to(trackRef.current, {
          x:        panelX(i + 1),
          duration: holdDuration,
          ease:     'none',
        })
      }

      // ── text reveals: staggered y+opacity when each panel's hold begins ──
      // t0 = the timeline position where panel i becomes the active panel.
      // Labels → titles → body arrive in quick succession; visual block
      // fades in alongside titles for an editorial, layered feel.
      panels.forEach((panelEl, i) => {
        const t0 = i * (holdDuration + slideDuration)

        const label  = panelEl.querySelector<HTMLElement>('.p-label')
        const titles = panelEl.querySelectorAll<HTMLElement>('.p-title')
        const bodies = panelEl.querySelectorAll<HTMLElement>('.p-body')
        const visual = panelEl.querySelector<HTMLElement>('.p-visual')

        if (label)
          tl.from(label,  { y: 20, opacity: 0, duration: 0.28, ease: 'power2.out' }, t0)
        if (titles.length)
          tl.from(titles, { y: 40, opacity: 0, duration: 0.32, ease: 'power2.out', stagger: 0.05 }, t0 + 0.04)
        if (bodies.length)
          tl.from(bodies, { y: 25, opacity: 0, duration: 0.28, ease: 'power2.out', stagger: 0.04 }, t0 + 0.10)
        if (visual)
          tl.from(visual, { y: 20, opacity: 0, duration: 0.36, ease: 'power2.out' }, t0 + 0.06)
      })
    }, containerRef)

    if (isTouchDevice || !cursorRef.current) return () => ctx.revert()

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85 })
    const xTo   = gsap.quickTo(cursorRef.current, 'x',       { duration: 0.12, ease: 'power2.out' })
    const yTo   = gsap.quickTo(cursorRef.current, 'y',       { duration: 0.12, ease: 'power2.out' })
    const tiltX = gsap.quickTo(tiltRef.current,   'rotateX', { duration: 0.7,  ease: 'power3.out' })
    const tiltY = gsap.quickTo(tiltRef.current,   'rotateY', { duration: 0.7,  ease: 'power3.out' })

    const el = containerRef.current!
    let overSkillCard = false
    const onMouseMove  = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      tiltY( (e.clientX - cx) / cx * 6)
      tiltX(-(e.clientY - cy) / cy * 4)

      const isOverCard = !!(e.target as HTMLElement).closest('[data-skill-card]')
      if (isOverCard !== overSkillCard) {
        overSkillCard = isOverCard
        if (isOverCard) {
          el.style.cursor = ''
          gsap.to(cursorRef.current, { opacity: 0, scale: 0.75, duration: 0.45, ease: 'power3.out' })
        } else {
          el.style.cursor = 'none'
          gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' })
        }
      }
    }
    const onMouseEnter = () => {
      el.style.cursor = 'none'
      gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' })
    }
    const onMouseLeave = () => {
      el.style.cursor = ''
      gsap.to(cursorRef.current, { opacity: 0, scale: 0.85, duration: 0.2, ease: 'power2.in' })
      // gsap.to()로 매번 새 tween을 만들면 mouseleave가 반복될 때 누적됨.
      // 기존 quickTo 인스턴스를 재사용해서 누적 방지.
      tiltX(0)
      tiltY(0)
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      ctx.revert()
      el.style.cursor = ''
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <>
    <div
      ref={cursorRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '220px', height: '220px',
        pointerEvents: 'none', zIndex: 9999,
      }}
    >
      <img
        ref={cursorImgRef}
        src={cursorImg1}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>

    {/*
     * Container: width/height match the viewport exactly.
     * overflow:hidden clips any part of the track that is outside panel 0.
     * max-width:100% prevents horizontal body overflow (scrollbar pages).
     */}
    <div ref={containerRef} style={{
      width: '100vw', maxWidth: '100%', height: '100vh',
      overflow: 'hidden', position: 'relative',
      perspective: '1200px',
    }}>
      {/* tiltRef: receives rotateX/Y from mouse — sits between container and track */}
      <div ref={tiltRef} style={{ width: '100%', height: '100%' }}>
      {/*
       * Track: a flat flex row of panels, no gap, no margin, anchored at left:0.
       * GSAP only modifies `x` (translate), never layout properties.
       */}
      <div
        ref={trackRef}
        className="horizontal-track"
        style={{
          display:    'flex',
          flexWrap:   'nowrap',
          width:      `${PANELS.length * 100}vw`,
          height:     '100%',
          willChange: 'transform',
          /* no position/left override — GSAP transform handles movement */
        }}
      >
        {PANELS.map((panel, i) => {
          const isWide = !!(panel.icons || panel.stat || panel.skillCards)

          return (
            <div
              key={panel.label}
              className="horizontal-panel"
              style={{
                /* each panel is exactly one viewport wide */
                flex:          '0 0 100vw',
                width:         '100vw',
                height:        '100vh',
                background:    '#efefed',
                boxShadow:     i < PANELS.length - 1 ? 'inset -1px 0 0 0 #000' : 'none',
                display:       'flex',
                flexDirection: 'column',
                boxSizing:     'border-box',
                overflow:      'hidden',
                /* NO padding here — applied per-row so borders run edge-to-edge */
              }}
            >
              {/* header — border runs full panel width; text inset by 8vw */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '3.2vh 8vw', borderBottom: '1px solid #000',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '16px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>RE:BUILD — ABOUT</span>
                <span style={{ fontSize: '16px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  {String(i + 1).padStart(2, '0')} / {String(PANELS.length).padStart(2, '0')}
                </span>
              </div>

              {/* body — 8vw safe area on both sides; content cannot reach edges */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                flex: 1,
                gap: isMobile ? '3vh' : '6vw',
                alignItems: isMobile ? 'flex-start' : 'center',
                padding: isMobile ? '3vh 6vw' : '5vh 8vw',
                minHeight: 0,
                overflowY: isMobile ? 'auto' : 'visible',
              }}>

                {/* left — always: label + title */}
                <div style={{ flex: isMobile ? '0 0 auto' : isWide ? '0 0 34%' : '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Line className="p-label" style={{ fontSize: '18px', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '24px' }}>
                    {panel.label}
                  </Line>
                  {panel.title.map((t, j) => (
                    <Line key={j} className="p-title" style={{
                      ...ANTON,
                      fontSize: isMobile ? 'clamp(26px, 7vw, 36px)' : 'clamp(36px, 4.2vw, 72px)',
                      lineHeight: 1.08, letterSpacing: '-0.025em', textTransform: 'uppercase',
                      marginBottom: j < panel.title.length - 1 ? '4px' : isMobile ? '14px' : '26px',
                    }}>{t}</Line>
                  ))}

                  {/* text-only panels: body lines in left col */}
                  {panel.lines.map((line, j) => (
                    <Line key={j} className="p-body" style={{ fontSize: '18px', lineHeight: 1.85, letterSpacing: '0.01em' }}>{line}</Line>
                  ))}

                  {/* level legend — frontend panel only, hidden on mobile */}
                  {panel.skillCards && !isMobile && (
                    <div className="p-body" style={{ marginTop: '28px', borderTop: '1px solid #000', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {[
                        { level: 'LEVEL 01', meaning: lang === 'ko' ? '기본 이해' : 'Basic understanding' },
                        { level: 'LEVEL 02', meaning: lang === 'ko' ? '프로젝트 적용 가능' : 'Project-ready' },
                        { level: 'LEVEL 03', meaning: lang === 'ko' ? '주력 활용' : 'Core skill' },
                      ].map(({ level, meaning }) => (
                        <div key={level} style={{ display: 'flex', gap: '14px', alignItems: 'baseline' }}>
                          <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', flexShrink: 0 }}>{level}</span>
                          <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: '13px' }}>{meaning}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* right — varies by panel type; entire block fades in together */}
                <div className="p-visual" style={{ flex: isMobile ? '0 0 auto' : 1, display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', width: isMobile ? '100%' : undefined }}>
                  {panel.skillCards && <FrontendSkillGrid items={panel.skillCards} compact={isMobile} />}

                  {panel.icons && <IconGrid items={panel.icons} />}

                  {panel.principles && <PrinciplesGrid items={panel.principles} />}

                  {panel.stat && panel.entries && (
                    <StatList stat={panel.stat} entries={panel.entries} />
                  )}

                  {!panel.skillCards && !panel.icons && !panel.principles && !panel.stat && panel.img && (
                    <img src={panel.img} alt={panel.imgAlt}
                      style={{
                        width: isMobile ? '80%' : '55%',
                        height: isMobile ? '30vh' : '58vh',
                        objectFit: 'cover', objectPosition: 'top',
                        display: 'block', marginLeft: 'auto', filter: 'grayscale(1)',
                      }}
                    />
                  )}
                </div>

              </div>

              {/* footer — border runs full panel width; text inset by 8vw */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '3vh 8vw', borderTop: '1px solid #000',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '16px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  {i < PANELS.length - 1 ? 'Continue →' : 'End'}
                </span>
                <div style={{ width: '6px', height: '6px', background: '#000' }} />
              </div>
            </div>
          )
        })}
      </div>
      </div>{/* end tiltRef */}
    </div>
    </>
  )
}
