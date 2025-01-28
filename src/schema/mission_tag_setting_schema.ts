import { z } from "zod";

export const MissionTagSettingSchema = z.object({
    label: z.string().min(1, 'กรุณากรอก ขั้นตอนการปฎิบัติการ'),
    is_default: z.boolean().optional().nullable()
})

export type TMissionTagSettingsFrom = z.infer<typeof MissionTagSettingSchema>;