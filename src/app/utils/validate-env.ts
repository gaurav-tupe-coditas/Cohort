import z from "zod";





const envSchema = z.object({
    PORT: z.coerce.number("PORT MUST BE A NUMERIC VALUE"),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    SECRET_KEY:z.string(),
   
});

export const env = envSchema.parse(process.env);