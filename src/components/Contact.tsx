import { editors } from '../data/editors'
import { quest } from '../data/memes'
import { site } from '../data/site'
import { getEmailLink, getInstagramDmLink, getInstagramLink, getOtherLinks, getWhatsAppLink, type ContactLink } from '../lib/contact'
import { PixelSprite } from './art/PixelSprite'
import { PendingNote } from './PendingNote'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  const { contact } = site
  const whatsapp = getWhatsAppLink(contact.whatsapp, contact.whatsappMessage)
  const email = getEmailLink(contact.email, contact.emailSubject)
  const instagram = getInstagramLink(contact.instagram)
  const links = [whatsapp, email, instagram, ...getOtherLinks(contact.others)].filter((link): link is ContactLink => Boolean(link))
  // "Solicitar orçamento" abre a DM do Instagram; sem Instagram, usa WhatsApp ou e-mail.
  const quoteLink = getInstagramDmLink(contact.instagram) ?? whatsapp ?? email

  const missing = [!whatsapp && 'whatsapp', !email && 'email', !instagram && 'instagram'].filter(Boolean)

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="relative overflow-hidden border-t border-line bg-surface">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-page relative py-20 lg:py-28">
        <SectionHeading id="contato-titulo" index="05" label="Contato" sprite="sword" title={contact.title} />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-5 lg:col-start-4">
            {/* Card de missão: o contato vira uma quest para aceitar */}
            <div className="relative border-2 border-accent bg-bg p-6 shadow-[8px_8px_0_rgb(0_0_0/0.55)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 font-pixel text-[13px] text-accent sm:text-[14px]">
                  <PixelSprite name="sword" className="size-4" />
                  {quest.label}
                </p>
                <span aria-hidden="true" className="bg-pop-pink px-2 py-1 font-pixel text-[12px] text-ink motion-safe:animate-blink">
                  Nova!
                </span>
              </div>

              <p className="mt-6 text-lg text-muted text-pretty">{contact.text}</p>

              <h3 className="label-mono mt-8 text-subtle">Objetivos</h3>
              <ol className="mt-3 space-y-3">
                {quest.objectives.map((objective) => (
                  <li key={objective} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1.5 size-2.5 shrink-0 rotate-45 border-2 border-accent" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-6 flex items-center gap-2 font-pixel text-[12px] leading-relaxed text-pop-yellow sm:text-[13px]">
                <PixelSprite name="coin" className="size-4 shrink-0" />
                {quest.reward}
              </p>

              {quoteLink && (
                <a
                  href={quoteLink.href}
                  target={quoteLink.external ? '_blank' : undefined}
                  rel={quoteLink.external ? 'noopener noreferrer' : undefined}
                  className="btn-primary mt-8"
                >
                  Aceitar missão: solicitar orçamento <span aria-hidden="true">→</span>
                  <span className="sr-only"> por {quoteLink.label}</span>
                </a>
              )}
              {links.length === 0 && <p className="mt-6 text-muted text-pretty">{contact.fallbackText}</p>}
            </div>
            {missing.length > 0 && (
              <PendingNote className="mt-6">
                {missing.map((field) => `contact.${field}`).join(', ')} em src/data/site.ts
              </PendingNote>
            )}
          </Reveal>

          <Reveal className="lg:col-span-3 lg:col-start-10" delay={100}>
            {links.length > 0 && (
              <>
                <h3 className="label-mono text-subtle">Fale com a gente</h3>
                <ul className="mt-4 border-t border-line">
                  {links.map((link) => (
                    <li key={link.id} className="border-b border-line">
                      <ContactRow link={link} />
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h3 className={links.length > 0 ? 'label-mono mt-12 text-subtle' : 'label-mono text-subtle'}>Canais dos editores</h3>
            <ul className="mt-4 border-t border-line">
              {editors.map((editor) => (
                <li key={editor.id} className="border-b border-line">
                  <ContactRow link={{ id: editor.id, label: 'YouTube', value: editor.handle, href: editor.channelUrl, external: true }} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ link }: { link: ContactLink }) {
  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      className="group flex items-baseline justify-between gap-4 py-4"
    >
      <span className="label-mono shrink-0 text-subtle">{link.label}</span>
      <span className="min-w-0 truncate text-lg text-fg transition-colors group-hover:text-accent">
        {link.value} <span aria-hidden="true">↗</span>
      </span>
    </a>
  )
}
