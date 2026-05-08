'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronRight,
  ChevronLeft,
  Package,
  MapPin,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { useCart } from '@/app/(site)/components/CartProvider'

const addressSchema = z.object({
  firstName: z.string().min(2, 'Mindestens 2 Zeichen'),
  lastName: z.string().min(2, 'Mindestens 2 Zeichen'),
  street: z.string().min(3, 'Straße angeben'),
  houseNumber: z.string().min(1, 'Hausnummer angeben'),
  zip: z.string().regex(/^\d{5}$/, 'Gültige PLZ (5 Ziffern)'),
  city: z.string().min(2, 'Stadt angeben'),
  country: z.string().min(2, 'Land angeben'),
  email: z.string().email('Gültige E-Mail-Adresse'),
})

const paymentSchema = z.discriminatedUnion('method', [
  z.object({
    method: z.literal('card'),
    cardNumber: z
      .string()
      .regex(/^\d{4} \d{4} \d{4} \d{4}$/, 'Format: 1234 5678 9012 3456'),
    cardName: z.string().min(3, 'Name auf der Karte'),
    expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Format: MM/JJ'),
    cvc: z.string().regex(/^\d{3,4}$/, '3- oder 4-stelliger Code'),
  }),
  z.object({ method: z.literal('paypal') }),
  z.object({ method: z.literal('klarna') }),
])

type AddressData = z.infer<typeof addressSchema>
type PaymentData = z.infer<typeof paymentSchema>

type Step = 'cart' | 'address' | 'payment' | 'demo'

const STEPS: { id: Step; label: string; icon: React.ReactNode }[] = [
  { id: 'cart', label: 'Warenkorb', icon: <Package size={16} /> },
  { id: 'address', label: 'Lieferadresse', icon: <MapPin size={16} /> },
  { id: 'payment', label: 'Zahlung', icon: <CreditCard size={16} /> },
]

function StepIndicator({ current }: { current: Step }) {
  const order: Step[] = ['cart', 'address', 'payment', 'demo']
  const currentIdx = order.indexOf(current)

  return (
    <div className="flex items-center gap-0 mb-12">
      {STEPS.map((s, i) => {
        const idx = order.indexOf(s.id)
        const done = idx < currentIdx
        const active = idx === currentIdx
        return (
          <div key={s.id} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-500 ${
                active
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : done
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {done ? <CheckCircle2 size={14} /> : s.icon}
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 h-px transition-all duration-500 ${
                  done ? 'bg-emerald-400' : 'bg-border'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function InputField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/60">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
          <AlertTriangle size={11} />
          {error}
        </p>
      )}
    </div>
  )
}

function inputCls(hasError?: boolean) {
  return `w-full bg-muted/40 border-none rounded-2xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none ring-1 transition-all duration-300 focus:bg-white focus:shadow-lg focus:ring-primary/30 ${
    hasError ? 'ring-rose-400/60' : 'ring-black/5'
  }`
}

function CartStep({ onNext }: { onNext: () => void }) {
  const { items, updateQty, removeItem, totalPrice } = useCart()
  const shipping = totalPrice >= 49 ? 0 : 3.95
  const total = totalPrice + shipping

  if (items.length === 0) {
    return (
      <div className="space-y-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Dein Warenkorb</h2>
        <p className="text-muted-foreground">Dein Warenkorb ist leer.</p>
        <Link
          href="https://kofferklar.vercel.app/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
        >
          <ChevronLeft size={16} />
          Zum Produkt
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Dein Warenkorb</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.color} className="p-2 rounded-[2rem] bg-black/5 ring-1 ring-black/5">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0">
                  <Package size={28} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-sm mb-0.5">KofferKlar 8-teiliges Set</p>
                  <p className="text-sm text-muted-foreground mb-3">Farbe: {item.colorLabel}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQty(item.color, Math.max(1, item.qty - 1))}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors text-lg font-bold"
                      aria-label="Menge verringern"
                    >
                      −
                    </button>
                    <span className="text-base font-bold w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.color, Math.min(10, item.qty + 1))}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors text-lg font-bold"
                      aria-label="Menge erhöhen"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <p className="font-bold text-foreground text-lg">
                    {(item.price * item.qty).toFixed(2).replace('.', ',')} €
                  </p>
                  <p className="text-xs text-muted-foreground">inkl. MwSt.</p>
                  <button
                    onClick={() => removeItem(item.color)}
                    className="text-xs text-muted-foreground hover:text-rose-500 transition-colors mt-1"
                    aria-label={`${item.colorLabel} entfernen`}
                  >
                    × Entfernen
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-border pt-6">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Zwischensumme</span>
          <span>{totalPrice.toFixed(2).replace('.', ',')} €</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Truck size={14} />
            Versand
          </span>
          <span className={shipping === 0 ? 'text-emerald-600 font-bold' : ''}>
            {shipping === 0 ? 'Kostenlos' : `${shipping.toFixed(2).replace('.', ',')} €`}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground italic">
            Kostenloser Versand ab 49,00 €
          </p>
        )}
        <div className="flex justify-between font-bold text-foreground text-lg border-t border-border pt-4">
          <span>Gesamt</span>
          <span>{total.toFixed(2).replace('.', ',')} €</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Link
          href="https://kofferklar.vercel.app/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
        >
          <ChevronLeft size={16} />
          Zurück zum Produkt
        </Link>
        <button
          onClick={onNext}
          className="group bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-base hover:bg-primary/95 transition-all duration-300 active:scale-[0.97] shadow-xl shadow-primary/20 flex items-center gap-3"
        >
          Weiter zur Lieferadresse
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}

function AddressStep({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data: AddressData) => void
  onBack: () => void
  defaultValues?: Partial<AddressData>
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Lieferadresse</h2>

      <div className="p-2 rounded-[2rem] bg-black/5 ring-1 ring-black/5">
        <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Vorname" error={errors.firstName?.message}>
              <input {...register('firstName')} placeholder="Max" className={inputCls(!!errors.firstName)} />
            </InputField>
            <InputField label="Nachname" error={errors.lastName?.message}>
              <input {...register('lastName')} placeholder="Mustermann" className={inputCls(!!errors.lastName)} />
            </InputField>
          </div>

          <InputField label="E-Mail" error={errors.email?.message}>
            <input {...register('email')} type="email" placeholder="max@beispiel.de" className={inputCls(!!errors.email)} />
          </InputField>

          <div className="grid grid-cols-[1fr_auto] gap-5">
            <InputField label="Straße" error={errors.street?.message}>
              <input {...register('street')} placeholder="Musterstraße" className={inputCls(!!errors.street)} />
            </InputField>
            <InputField label="Nr." error={errors.houseNumber?.message}>
              <input {...register('houseNumber')} placeholder="12" className={`${inputCls(!!errors.houseNumber)} w-24`} />
            </InputField>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-5">
            <InputField label="PLZ" error={errors.zip?.message}>
              <input {...register('zip')} placeholder="12345" maxLength={5} className={`${inputCls(!!errors.zip)} w-32`} />
            </InputField>
            <InputField label="Stadt" error={errors.city?.message}>
              <input {...register('city')} placeholder="Berlin" className={inputCls(!!errors.city)} />
            </InputField>
          </div>

          <InputField label="Land" error={errors.country?.message}>
            <select {...register('country')} className={inputCls(!!errors.country)}>
              <option value="">Land wählen</option>
              <option value="Deutschland">Deutschland</option>
              <option value="Österreich">Österreich</option>
              <option value="Schweiz">Schweiz</option>
            </select>
          </InputField>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
        >
          <ChevronLeft size={16} />
          Zurück zum Warenkorb
        </button>
        <button
          type="submit"
          className="group bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-base hover:bg-primary/95 transition-all duration-300 active:scale-[0.97] shadow-xl shadow-primary/20 flex items-center gap-3"
        >
          Weiter zur Zahlung
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  )
}

type PaymentMethod = 'card' | 'paypal' | 'klarna'

function PaymentStep({
  onNext,
  onBack,
}: {
  onNext: (data: PaymentData) => void
  onBack: () => void
}) {
  const [method, setMethod] = useState<PaymentMethod>('card')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { method: 'card' } as PaymentData,
  })

  const handleMethodChange = (m: PaymentMethod) => {
    setMethod(m)
    setValue('method', m)
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }

  const METHODS: { id: PaymentMethod; label: string; logo: string }[] = [
    { id: 'card', label: 'Kreditkarte', logo: 'VISA / MC' },
    { id: 'paypal', label: 'PayPal', logo: 'PayPal' },
    { id: 'klarna', label: 'Klarna', logo: 'Klarna' },
  ]

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Zahlungsmethode</h2>

      <div className="grid grid-cols-3 gap-3">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => handleMethodChange(m.id)}
            className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
              method === m.id
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-border bg-white hover:border-primary/30'
            }`}
          >
            <span className="text-sm font-bold text-foreground">{m.logo}</span>
            <span className="text-xs text-muted-foreground">{m.label}</span>
          </button>
        ))}
      </div>

      <input type="hidden" {...register('method')} value={method} />

      <AnimatePresence mode="wait">
        {method === 'card' && (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-[2rem] bg-black/5 ring-1 ring-black/5"
          >
            <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 md:p-8 space-y-5">
              <InputField
                label="Kartennummer"
                error={(errors as { cardNumber?: { message?: string } }).cardNumber?.message}
              >
                <input
                  {...register('cardNumber')}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onChange={(e) => {
                    e.target.value = formatCardNumber(e.target.value)
                  }}
                  className={inputCls(!!(errors as { cardNumber?: unknown }).cardNumber)}
                />
              </InputField>
              <InputField
                label="Name auf der Karte"
                error={(errors as { cardName?: { message?: string } }).cardName?.message}
              >
                <input
                  {...register('cardName')}
                  placeholder="MAX MUSTERMANN"
                  className={inputCls(!!(errors as { cardName?: unknown }).cardName)}
                  style={{ textTransform: 'uppercase' }}
                />
              </InputField>
              <div className="grid grid-cols-2 gap-5">
                <InputField
                  label="Gültig bis"
                  error={(errors as { expiry?: { message?: string } }).expiry?.message}
                >
                  <input
                    {...register('expiry')}
                    placeholder="MM/JJ"
                    maxLength={5}
                    onChange={(e) => {
                      e.target.value = formatExpiry(e.target.value)
                    }}
                    className={inputCls(!!(errors as { expiry?: unknown }).expiry)}
                  />
                </InputField>
                <InputField
                  label="CVC"
                  error={(errors as { cvc?: { message?: string } }).cvc?.message}
                >
                  <input
                    {...register('cvc')}
                    placeholder="123"
                    maxLength={4}
                    type="password"
                    className={inputCls(!!(errors as { cvc?: unknown }).cvc)}
                  />
                </InputField>
              </div>
            </div>
          </motion.div>
        )}

        {method === 'paypal' && (
          <motion.div
            key="paypal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-2xl bg-[#003087]/5 border border-[#003087]/10 text-center"
          >
            <p className="text-[#003087] font-bold text-lg mb-2">PayPal</p>
            <p className="text-sm text-muted-foreground">
              Du wirst nach dem Absenden zu PayPal weitergeleitet. (Demo: kein echter Redirect)
            </p>
          </motion.div>
        )}

        {method === 'klarna' && (
          <motion.div
            key="klarna"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-2xl bg-[#FFB3C7]/20 border border-[#FFB3C7]/30 text-center"
          >
            <p className="text-[#17120E] font-bold text-lg mb-2">Klarna</p>
            <p className="text-sm text-muted-foreground">
              Jetzt kaufen, später bezahlen — Ratenzahlung oder Rechnung. (Demo: kein echter Prozess)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-4">
        <ShieldCheck size={16} className="text-emerald-500 flex-shrink-0" />
        <span>Alle Daten werden SSL-verschlüsselt übertragen. Wir speichern keine Zahlungsdaten.</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
        >
          <ChevronLeft size={16} />
          Zurück zur Adresse
        </button>
        <button
          type="submit"
          className="group bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-base hover:bg-primary/95 transition-all duration-300 active:scale-[0.97] shadow-xl shadow-primary/20 flex items-center gap-3"
        >
          Bestellung abschicken
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  )
}

function DemoStep({
  address,
  productName,
  total,
}: {
  address: AddressData
  productName: string
  total: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-10"
    >
      {/* Demo Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-amber-50 border-2 border-amber-300 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/40 rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle size={24} className="text-amber-700" />
          </div>
          <div>
            <h3 className="font-bold text-amber-900 text-xl mb-2">Demo-Website</h3>
            <p className="text-amber-800 text-base leading-relaxed">
              Dies ist eine Demonstration. <strong>Es wurde keine echte Bestellung aufgegeben</strong> und
              es wurden keine Zahlungsdaten verarbeitet. Auf der echten kofferklar.de würde Ihre
              Bestellung jetzt bearbeitet werden.
            </p>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-2 rounded-[2rem] bg-black/5 ring-1 ring-black/5">
        <div className="bg-white rounded-[calc(2rem-0.5rem)] p-6 md:p-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={28} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Bestellung simuliert!
              </h2>
              <p className="text-muted-foreground text-sm">So würde Ihre Bestellbestätigung aussehen.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Artikel
              </p>
              <p className="font-bold text-foreground">{productName}</p>
              <p className="text-muted-foreground text-sm mt-1">
                Gesamtbetrag: {total.toFixed(2).replace('.', ',')} €
              </p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Lieferadresse
              </p>
              <p className="text-foreground text-sm font-medium">
                {address.firstName} {address.lastName}
              </p>
              <p className="text-muted-foreground text-sm">
                {address.street} {address.houseNumber}<br />
                {address.zip} {address.city}<br />
                {address.country}
              </p>
              <p className="text-muted-foreground text-sm mt-1">{address.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="https://kofferklar.vercel.app/produkt?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
          className="px-10 py-4 rounded-full border-2 border-border font-bold text-base hover:bg-muted transition-all duration-300 text-center"
        >
          Zurück zum Produkt
        </Link>
        <Link
          href="https://kofferklar.vercel.app/?utm_source=website&utm_medium=navigation&utm_campaign=kofferklar-launch"
          className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base hover:bg-primary/95 transition-all duration-300 shadow-xl shadow-primary/20 text-center"
        >
          Zur Startseite
        </Link>
      </div>
    </motion.div>
  )
}

export default function CheckoutWizard({
  productName,
}: {
  productName: string
}) {
  const [step, setStep] = useState<Step>('cart')
  const [address, setAddress] = useState<AddressData | null>(null)
  const [confirmedTotal, setConfirmedTotal] = useState(0)
  const { totalPrice } = useCart()

  return (
    <div className="min-h-[calc(100vh-72px)] py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        {step !== 'demo' && <StepIndicator current={step} />}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 'cart' && (
              <CartStep
                onNext={() => setStep('address')}
              />
            )}
            {step === 'address' && (
              <AddressStep
                onNext={(data) => {
                  setAddress(data)
                  setStep('payment')
                }}
                onBack={() => setStep('cart')}
                defaultValues={address ?? undefined}
              />
            )}
            {step === 'payment' && (
              <PaymentStep
                onNext={() => {
                  const shipping = totalPrice >= 49 ? 0 : 3.95
                  setConfirmedTotal(totalPrice + shipping)
                  setStep('demo')
                }}
                onBack={() => setStep('address')}
              />
            )}
            {step === 'demo' && address && (
              <DemoStep address={address} productName={productName} total={confirmedTotal} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
