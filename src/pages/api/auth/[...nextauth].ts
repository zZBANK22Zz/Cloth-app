import { config } from "../../../config";
import NextAuth, { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: config.NEXTAUTH_SECRET,
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ account, token }) {
      if ( account ) {
        token.accessToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT}) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);