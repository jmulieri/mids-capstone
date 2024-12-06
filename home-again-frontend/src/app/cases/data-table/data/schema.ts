import { z } from "zod"

export const caseSchema = z.object({
  id: z.number(),
  name: z.string(),
  entered_at: z.string(),
  program_name: z.string().nullable().optional(),
  program_type: z.string(),
})

export type Task = z.infer<typeof caseSchema>
