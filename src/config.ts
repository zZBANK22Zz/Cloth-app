export const config = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",

    PAGE_SIZE: Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 20)
}