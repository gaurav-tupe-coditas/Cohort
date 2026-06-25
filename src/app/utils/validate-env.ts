import z from "zod";





const envSchema = z.object({
    PORT: z.coerce.number("PORT MUST BE A NUMERIC VALUE"),
    DB_NAME: z.string("Database name must be a string"),
    DB_USER: z.string("Database User Name must be a string"),
    DB_PASSWORD: z.string("Database password must be a string"),
    SECRET_KEY:z.string("Valid secret key should be provided"),
   
    AMAZON_ACCESSKEYID:z.string(),
    AMAZON_SECRETACCESSKEY:z.string(),
    SQS_QUEUEURL:z.string(),
    AWS_REGION:z.string(),
    TEST_SEND_EMAIL:z.email(),
});

export const env = envSchema.parse(process.env);