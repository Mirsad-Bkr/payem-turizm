import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "").toLowerCase().trim();
        const password = String(credentials?.password || "");
        if (!email || !password) return null;

        // Fallback admin when DB not configured (local demo)
        if (!process.env.DATABASE_URL?.trim()) {
          const adminEmail = (process.env.ADMIN_EMAIL || "admin@payemtravel.com").toLowerCase();
          const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
          if (email === adminEmail && password === adminPassword) {
            return { id: "local-admin", email: adminEmail, name: "Admin" };
          }
          return null;
        }

        const { db } = await import("@/db");
        const { admins } = await import("@/db/schema");
        const rows = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
        const admin = rows[0];
        if (!admin) return null;
        const ok = await bcrypt.compare(password, admin.passwordHash);
        if (!ok) return null;
        return { id: String(admin.id), email: admin.email, name: "Admin" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
