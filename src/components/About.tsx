import type { ReactNode } from 'react'
import { site } from '../data/site'
import { pad } from '../lib/cx'
import { PendingNote } from './PendingNote'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function About() {
  const { about } = site
  const process = about.process.filter((step) => step.trim())
  const differentials = about.differentials.filter((item) => item.trim())

  const blocks: { title: string; field: string; content: ReactNode }[] = [
    { title: 'A história', field: 'about.history', content: about.history.trim() && <Paragraph text={about.history} /> },
    { title: 'Visão criativa', field: 'about.vision', content: about.vision.trim() && <Paragraph text={about.vision} /> },
    {
      title: 'Processo',
      field: 'about.process',
      content: process.length > 0 && (
        <ol className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {process.map((step, index) => (
            <li key={step} className="flex gap-4 bg-bg p-5">
              <span className="label-mono pt-1 text-accent">{pad(index + 1)}</span>
              <span className="text-lg">{step}</span>
            </li>
          ))}
        </ol>
      ),
    },
    { title: 'Com quem queremos trabalhar', field: 'about.idealCreator', content: about.idealCreator.trim() && <Paragraph text={about.idealCreator} /> },
    {
      title: 'Diferenciais',
      field: 'about.differentials',
      content: differentials.length > 0 && (
        <ul className="border-t border-line">
          {differentials.map((item) => (
            <li key={item} className="border-b border-line py-4 text-lg">
              {item}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="container-page py-20 lg:py-32">
      <SectionHeading id="sobre-titulo" index="04" label="Sobre" sprite="heart" title={site.sections.about.title} />

      <Reveal className="mt-14 lg:mt-20 lg:grid lg:grid-cols-12">
        <p className="text-[clamp(1.5rem,3.2vw,3rem)] font-medium leading-[1.12] tracking-[-0.02em] text-balance lg:col-span-8 lg:col-start-4">
          {about.intro}
        </p>
      </Reveal>

      <div className="mt-16 lg:mt-24">
        {blocks.map((block) =>
          block.content ? (
            <Reveal key={block.title} className="grid gap-4 border-t border-line py-8 lg:grid-cols-12 lg:gap-6 lg:py-10">
              <h3 className="label-mono text-subtle lg:col-span-3 lg:col-start-1">{block.title}</h3>
              <div className="lg:col-span-7 lg:col-start-4">{block.content}</div>
            </Reveal>
          ) : (
            <PendingNote key={block.title} className="mt-3 lg:ml-[25%]">
              “{block.title}” em src/data/site.ts ({block.field})
            </PendingNote>
          ),
        )}
      </div>
    </section>
  )
}

function Paragraph({ text }: { text: string }) {
  return <p className="max-w-2xl whitespace-pre-line text-lg text-muted text-pretty">{text}</p>
}
