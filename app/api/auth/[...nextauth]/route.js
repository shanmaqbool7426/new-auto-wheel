// import NextAuth from "next-auth";
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
// import CredentialsProvider from "next-auth/providers/credentials";
// import { API_ENDPOINTS } from "@/constants/api-endpoints";
// import axios from 'axios';

// const handleAuthResponse = async (response) => {
//   if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {

//     const userData = response.data?.data.user ? response.data?.data?.user : response.data?.data;
//     return {
//       id: userData._id,
//       fullName: userData.fullName,
//       email: userData.email,
//       phone: userData.phone,
//       rating: userData.rating,
//       isVerified: userData.isVerified,
//       reports: userData.reports,
//       createdAt: userData.createdAt,
//       updatedAt: userData.updatedAt,
//       verificationCode: userData.verificationCode,
//       token:response.data?.data
//     };
//   }
//   throw new Error(response.data?.message || "Authentication failed");
// };

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//     FacebookProvider({
//       clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
//       clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET || ''
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//         phone: { label: "Phone", type: "text" },
//         fullName: { label: "Name", type: "text" },
//       },
//       async authorize(credentials) {
//         try {
//           // Handle OTP verification
//           if (credentials.type === 'otp') {
//             const res = await axios.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
//               email: credentials.email,
//               otp: credentials.otp
//             });
//             return handleAuthResponse(res);
//           }

//           // Handle regular login
//           const res = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
//             email: credentials.email,
//             password: credentials.password
//           });
//           return handleAuthResponse(res);

//         } catch (error) {
//           console.error("Auth Error:", error);
//           throw new Error(error.response?.data?.message || "Authentication failed");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account.provider === 'google' || account.provider === 'facebook') {
//         try {
//           // Send social login data to your backend
//           const res = await axios.post(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, {
//             provider: account.provider,
//             accessToken: account.access_token,
//             email: profile.email,
//             name: profile.name,
//             image: profile.image
//           });
          
//           const socialUser = await handleAuthResponse(res);
//           Object.assign(user, socialUser);
//           return true;
//         } catch (error) {
//           console.error("Social login error:", error);
//           return false;
//         }
//       }
//       return true;
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.fullName = user.fullName;
//         token.email = user.email;
//         token.phone = user.phone;
//         token.rating = user.rating;
//         token.isVerified = user.isVerified;
//         token.reports = user.reports;
//         token.createdAt = user.createdAt;
//         token.updatedAt = user.updatedAt;
//         token.verificationCode = user.verificationCode;
//         token.token = user.token;
//       }
//       return token;
//     },

//     async session({ session, token }) {

//         session.user._id = token.id;
//         session.user.fullName = token.fullName;
//         session.user.email = token.email;
//         session.user.phone = token.phone;
//         session.user.rating = token.rating;
//         session.user.isVerified = token.isVerified;
//         session.user.reports = token.reports;
//         session.user.createdAt = token.createdAt;
//         session.user.updatedAt = token.updatedAt;
//         session.user.verificationCode = token.verificationCode;
//         session.user.token=token.token
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       return url.startsWith(baseUrl) ? `${baseUrl}/` : baseUrl;
//     }
//   }
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


//newed code







import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from "next-auth/providers/credentials";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import axios from 'axios';


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        phone: { label: "Phone", type: "text" },
        fullName: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        try {
          // Call your API to verify OTP or perform sign-in based on the type
          const res = await axios.post(
            credentials.type === 'otp'
              ? API_ENDPOINTS.AUTH.VERIFY_OTP
              : API_ENDPOINTS.AUTH.LOGIN,
            {
              email: credentials.email,
              ...(credentials.type === 'otp'
                ? { otp: credentials.otp }
                : { password: credentials.password }
              ),
            }
          );

          if (res.data && res.data.statusCode === 200) {
            const userData = res.data?.data.user ? res.data?.data?.user : res.data?.data;
            return {
              id: userData._id,
              fullName: userData.fullName,
              email: userData.email,
              phone: userData.phone,
              rating: userData.rating,
              isVerified: userData.isVerified,
              reports: userData.reports,
              createdAt: userData.createdAt,
              updatedAt: userData.updatedAt,
              verificationCode: userData.verificationCode,
              token: res.data?.data
            };
          } else {
            throw new Error(credentials.type === 'otp'
              ? "Failed to verify OTP. Please try again"
              : "Sign Up Error"
            );
          }
        } catch (error) {
          console.error("Auth Error: ", error);
          throw new Error(error.response?.data?.message || "Authentication failed");
        }
      },
    }),
  ],
  secret:  process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && (account.provider === 'google' || account.provider === 'facebook')) {
        try {
          // Send social login data to your backend
          const res = await axios.post(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, {
            provider: account.provider,
            accessToken: account.access_token,
            email: profile.email,
            name: profile.name || `${profile.given_name} ${profile.family_name}`,
            image: profile.picture || profile.image
          });
          
          if (res.data && (res.data.statusCode === 200 || res.data.statusCode === 201)) {
            const userData = res.data?.data.user ? res.data?.data?.user : res.data?.data;
            
            user.id = userData._id;
            user.fullName = userData.fullName;
            user.email = userData.email;
            user.phone = userData.phone;
            user.rating = userData.rating;
            user.isVerified = userData.isVerified;
            user.reports = userData.reports;
            user.createdAt = userData.createdAt;
            user.updatedAt = userData.updatedAt;
            user.verificationCode = userData.verificationCode;
            user.token = res.data?.data.token || res.data?.data;
            
            return true;
          }
          return false;
        } catch (error) {
          console.error("Social login error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          rating: user.rating,
          isVerified: user.isVerified,
          reports: user.reports,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          verificationCode: user.verificationCode,
          token: user.token
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user._id = token.id;
      session.user.fullName = token.fullName;
      session.user.email = token.email;
      session.user.phone = token.phone;
      session.user.rating = token.rating;
      session.user.isVerified = token.isVerified;
      session.user.reports = token.reports;
      session.user.createdAt = token.createdAt;
      session.user.updatedAt = token.updatedAt;
      session.user.verificationCode = token.verificationCode;
      session.user.token = token.token;
      
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/`;
      }
      return `${baseUrl}`;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



// import NextAuth from "next-auth";
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from 'axios';
// import { API_ENDPOINTS } from "@/constants/api-endpoints";

//  const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//           scope: "openid email profile https://www.googleapis.com/auth/contacts.readonly", 
//         },
//       },
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//         phone: { label: "Phone", type: "text" },
//         fullName: { label: "Name", type: "text" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await axios.post(
//             credentials.type === 'otp' ? API_ENDPOINTS.VERIFY_OTP : API_ENDPOINTS.LOGIN,
//             {
//               email: credentials.email,
//               ...(credentials.type === 'otp'
//                 ? { otp: credentials.otp }
//                 : { password: credentials.password }
//               ),
//             }
//           );

//           if (res.data && res.data.statusCode === 200) {
//             const userData = res.data?.data?.user || res.data?.data;
//             return {
//               id: userData._id,
//               fullName: userData.fullName,
//               email: userData.email,
//               phone: userData.phone,
//               rating: userData.rating,
//               isVerified: userData.isVerified,
//               reports: userData.reports,
//               createdAt: userData.createdAt,
//               updatedAt: userData.updatedAt,
//               verificationCode: userData.verificationCode,
//             };
//           } else {
//             throw new Error("Sign Up Failed");
//           }
//         } catch (error) {
//           throw new Error("Sign Up Error");
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.fullName = user.fullName;
//         token.email = user.email;
//         token.phone = user.phone;
//         token.rating = user.rating;
//         token.isVerified = user.isVerified;
//         token.reports = user.reports;
//         token.createdAt = user.createdAt;
//         token.updatedAt = user.updatedAt;
//         token.verificationCode = user.verificationCode;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user._id = token.id;
//       session.user.fullName = token.fullName;
//       session.user.email = token.email;
//       session.user.phone = token.phone;
//       session.user.rating = token.rating;
//       session.user.isVerified = token.isVerified;
//       session.user.reports = token.reports;
//       session.user.createdAt = token.createdAt;
//       session.user.updatedAt = token.updatedAt;
//       session.user.verificationCode = token.verificationCode;
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       if (url.startsWith(baseUrl)) {
//         return `${baseUrl}/`;
//       }
//       return baseUrl;
//     }
//   }
// };

// // Correctly export the handler for both GET and POST requests
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

