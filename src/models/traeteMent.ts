export type Treatments = {
    id: string;
    status: "Draft" | "Completed" | "Cancel";
    create_date: Date;
    update_date: Date;
    patient_id: string;
    users_id: string;
    chief_complaint: string;
    present_illness: string;
    description?: string | null | undefined;
    physical_status?: string | null | undefined;
    triage_lavel?: string | null | undefined;
}