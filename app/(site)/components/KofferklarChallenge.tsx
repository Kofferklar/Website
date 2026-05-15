'use client'

import { useState } from 'react'
import { Camera, CheckCircle2, Gift, ImagePlus, Upload } from 'lucide-react'

export default function KofferklarChallenge() {
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="kofferklar-challenge" className="py-20 md:py-28 bg-white border-y border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
              Community
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-[1.08] mb-6">
              Mach mit bei der #kofferklarChallenge
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              Zeig, wie du deinen Koffer für Wochenendtrip, Sommerurlaub oder Städtetrip mit
              Kofferklar packst. Lade deinen Packmoment hoch und nimm am monatlichen Gewinnspiel
              teil.
            </p>

            <div className="mt-8 rounded-3xl bg-primary/5 p-5 ring-1 ring-primary/10">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary ring-1 ring-primary/10">
                  <Gift className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Kleiner Anreiz</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Monatlich verlosen wir ein kleines Reiseaccessoire unter allen Beiträgen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            className="rounded-[2rem] bg-muted/40 p-2 ring-1 ring-black/5"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <div className="rounded-[calc(2rem-0.5rem)] bg-white p-6 md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-primary text-[10px] font-bold tracking-[0.24em] uppercase mb-3">
                    Jetzt mitmachen
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                    Packmoment hochladen
                  </h3>
                </div>
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Camera className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <label className="mt-6 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-primary/25 bg-primary/5 px-6 py-8 text-center transition-colors hover:bg-primary/10">
                <ImagePlus className="h-8 w-8 text-primary" aria-hidden="true" />
                <span className="mt-4 text-sm font-bold text-foreground">
                  Bild auswählen oder hier ablegen
                </span>
                <span className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  JPG oder PNG, maximal 5 MB. Dieses Formular ist ein Mockup und sendet keine Daten.
                </span>
                {fileName && (
                  <span className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary ring-1 ring-primary/10">
                    {fileName}
                  </span>
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="sr-only"
                  onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
                />
              </label>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    Name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Dein Name"
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    E-Mail
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="name@mail.de"
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
              </div>

              <label className="mt-5 flex items-start gap-3 rounded-2xl bg-muted/50 p-4">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-black/20 text-primary focus:ring-primary"
                />
                <span className="text-xs leading-relaxed text-muted-foreground">
                  Ich akzeptiere, dass mein hochgeladenes Bild im Rahmen der #kofferklarChallenge
                  auf der Website und auf Social Media genutzt werden darf. Die Teilnahme ist ein
                  Demo-Prozess und ersetzt kein echtes Upload-System.
                </span>
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/95 active:scale-[0.98]"
                >
                  <Upload className="h-4 w-4" aria-hidden="true" />
                  Jetzt mitmachen
                </button>
                {submitted && (
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Danke, dein Demo-Beitrag wurde erfasst.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
