import { z } from 'zod';

// Validation schema yo kwinjira
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email ni ngombwa')
    .email('Injiza email nyayo'),
  ijambobanga: z
    .string()
    .min(6, 'Ijambobanga rigomba kuba rifite byibura inyuguti 6')
});

// Validation schema yo guhanga konti
export const registerSchema = z.object({
  amazina: z
    .string()
    .min(2, 'Amazina agomba kuba afite byibura inyuguti 2')
    .max(50, 'Amazina ntashobora kurenza inyuguti 50'),
  email: z
    .string()
    .min(1, 'Email ni ngombwa')
    .email('Injiza email nyayo'),
  telefoni: z
    .string()
    .min(10, 'Nimero ya telefoni igomba kuba ifite byibura imibare 10')
    .regex(/^(\+250|0)[0-9]{9}$/, 'Injiza nimero ya telefoni nyayo y\'u Rwanda'),
  ijambobanga: z
    .string()
    .min(6, 'Ijambobanga rigomba kuba rifite byibura inyuguti 6')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Ijambobanga rigomba kuba rifite inyuguti nto, nini, n\'umubare'),
  kwemezaIjambobanga: z.string(),
  urwego: z.enum(['umuyobozi', 'umukozi', 'umukoresha'], {
    errorMap: () => ({ message: 'Hitamo urwego rwawe' })
  })  
}).refine((data) => data.ijambobanga === data.kwemezaIjambobanga, {
  message: 'Amajambobanga ntabwo ahura',
  path: ['kwemezaIjambobanga']
});

// Validation schema y'ubucuruzi
export const businessSchema = z.object({
  izina: z
    .string()
    .min(2, 'Izina ry\'ubucuruzi rigomba kuba rifite byibura inyuguti 2')
    .max(100, 'Izina ry\'ubucuruzi ntarishobora kurenza inyuguti 100'),
  ubwoko: z
    .string()
    .min(1, 'Hitamo ubwoko bw\'ubucuruzi'),
  ifaranga: z
    .string()
    .min(1, 'Hitamo ifaranga rikoreshwa'),
  aderesi: z
    .string()
    .min(5, 'Aderesi igomba kuba ifite byibura inyuguti 5'),
  numeroYumusanzu: z
    .string()
    .optional()
});

// Validation schema y'icyicuruzwa
export const productSchema = z.object({
  izina: z
    .string()
    .min(2, 'Izina ry\'icyicuruzwa rigomba kuba rifite byibura inyuguti 2')
    .max(100, 'Izina ry\'icyicuruzwa ntarishobora kurenza inyuguti 100'),
  icyiciro: z
    .string()
    .min(1, 'Hitamo icyiciro cy\'icyicuruzwa'),
  kode: z
    .string()
    .min(1, 'Kode y\'icyicuruzwa ni ngombwa')
    .max(20, 'Kode ntaishobora kurenza inyuguti 20'),
  igiciroKugura: z
    .number()
    .min(0, 'Igiciro cyo kugura ntikishobora kuba munsi ya 0')
    .max(999999999, 'Igiciro kinini cyane'),
  igiciroKugurisha: z
    .number()
    .min(0, 'Igiciro cyo kugurisha ntikishobora kuba munsi ya 0')
    .max(999999999, 'Igiciro kinini cyane'),
  umubare: z
    .number()
    .min(0, 'Umubare ntushobora kuba munsi ya 0')
    .max(999999, 'Umubare munini cyane'),
  ibisobanuro: z
    .string()
    .max(500, 'Ibisobanuro ntabishobora kurenza inyuguti 500')
    .optional(),
  uwatanga: z
    .string()
    .min(1, 'Izina ry\'uwatanga ni ngombwa')
    .max(100, 'Izina ry\'uwatanga ntarishobora kurenza inyuguti 100')
}).refine((data) => data.igiciroKugurisha > data.igiciroKugura, {
  message: 'Igiciro cyo kugurisha kigomba kuba kinini kuruta icyo kugura',
  path: ['igiciroKugurisha']
});

// Validation schema y'amafaranga yasohotse
export const expenseSchema = z.object({
  icyiciro: z
    .string()
    .min(1, 'Hitamo icyiciro cy\'amafaranga yasohotse'),
  ibisobanuro: z
    .string()
    .min(5, 'Ibisobanuro bigomba kuba bifite byibura inyuguti 5')
    .max(200, 'Ibisobanuro ntabishobora kurenza inyuguti 200'),
  amafaranga: z
    .number()
    .min(1, 'Amafaranga agomba kuba munini ya 0')
    .max(999999999, 'Amafaranga menshi cyane'),
  itariki: z
    .string()
    .min(1, 'Itariki ni ngombwa'),
  uburyoKwishyura: z
    .string()
    .min(1, 'Hitamo uburyo bwo kwishyura')
});

// Validation schema y'igikorwa
export const transactionSchema = z.object({
  ubwoko: z.enum(['igurisha', 'kugura'], {
    errorMap: () => ({ message: 'Hitamo ubwoko bw\'igikorwa' })
  }),
  icyicuruzwaId: z
    .string()
    .min(1, 'Hitamo icyicuruzwa'),
  umubare: z
    .number()
    .min(1, 'Umubare ugomba kuba munini ya 0')
    .max(999999, 'Umubare munini cyane'),
  igiciroKimwe: z
    .number()
    .min(0, 'Igiciro ntikishobora kuba munsi ya 0')
    .max(999999999, 'Igiciro kinini cyane'),
  izinayUmukiriya: z
    .string()
    .optional(),
  izinayUwatanga: z
    .string()
    .optional()
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type BusinessFormData = z.infer<typeof businessSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type ExpenseFormData = z.infer<typeof expenseSchema>;
export type TransactionFormData = z.infer<typeof transactionSchema>;