
// import NextAuth from "next-auth";
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
// import Credentials from "next-auth/providers/credentials";
// import { API_ENDPOINTS } from "@/constants/api-endpoints";
// import CredentialsProvider from "next-auth/providers/credentials";

// import axios from 'axios';

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: '1090899538284-74f4i841j0ascsgk84i743bpriebu7d5.apps.googleusercontent.com',
//       clientSecret: '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',
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//           scope: "openid email profile https://www.googleapis.com/auth/contacts.readonly", // Add phone number scope
//         },
//       },
//     }),
//     FacebookProvider({
//       clientId: '3674373226209921',
//       clientSecret: '3cfafde1642c14d2f16721e243c63fad'
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

//           console.log('payload>>>>>>>>>', credentials)
//           // Call your API to verify OTP or perform sign-in based on the type
//           const res = await axios.post(
//             credentials.type === 'otp' ? API_ENDPOINTS.VERIFY_OTP : API_ENDPOINTS.LOGIN,
//             {
//               email: credentials.email,
//               ...(credentials.type === 'otp'
//                 ? { otp: credentials.otp } // Include OTP if type is "otp"
//                 : { password: credentials.password } // Include password if it's a regular sign-in
//               ),
//             }
//           );


//           if (res.data && res.data.statusCode === 200) {
//             const userData =  res.data?.data.user ?  res.data?.data?.user : res.data?.data;
//             console.log('userData>>>>>>>1', userData)
//             // Return all necessary user details for the session and JWT
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
//           console.error("Sign Up Error: ", error);
//           throw new Error("Sign Up Error");
//         }
//       },
//     }),

//     // EmailProvider({
//     //   server: {
//     //     host: process.env.EMAIL_SERVER_HOST,
//     //     port: process.env.EMAIL_SERVER_PORT,
//     //     auth: {
//     //       user: process.env.EMAIL_SERVER_USER,
//     //       pass: process.env.EMAIL_SERVER_PASSWORD
//     //     }
//     //   },
//     //   from: process.env.EMAIL_FROM
//     // }),
//     // Credentials({
//     //   name: "Credentials",
//     //   credentials: {
//     //     phone: {},
//     //     password: {},
//     //   },
//     //   async authorize(credentials) {
//     //     const res = await axios.post<LoginResponse>(
//     //       process.env.API_BASE_URL + "api/v1/auth/login",
//     //       credentials,
//     //       {
//     //         headers: {
//     //           Accept: "application/json",
//     //           "Content-Type": "application/json",
//     //         },
//     //       }
//     //     );
//     //     if (res.status === 200) {
//     //       const { name, id, phone, role, picture } = res.data.user;
//     //       const user = {
//     //         id,
//     //         name,
//     //         phone,
//     //         role,
//     //         picture,
//     //         token: res.data.token,
//     //       };
//     //       return user; // User interface we declared in next-auth.d.ts
//     //     } else throw new Error("Login failed");
//     //   },
//     // })
//   ],
//   secret: '739d95146513d67502b0ba4776a5cae8',
//   callbacks: {
//     //   async jwt({ token, account }) {
//     //     if (account?.provider === "google") {
//     //       token.id = account.providerAccountId;
//     //       token.accessToken = account.access_token;

//     //       // Fetch user info from Google People API
//     //       const userInfoResponse = await fetch(
//     //         `https://people.googleapis.com/v1/people/me?personFields=phoneNumbers`,
//     //         {
//     //           headers: {
//     //             Authorization: `Bearer ${account.access_token}`,
//     //           },
//     //         }
//     //       );
//     //       const userInfo = await userInfoResponse.json();

//     //       console.log('>>>> userInfo',userInfo)
//     //       if (userInfo.phoneNumbers && userInfo.phoneNumbers.length > 0) {
//     //         token.phoneNumber = userInfo.phoneNumbers[0].value; // Store phone number in token
//     //       }
//     //     }


//     // console.log('<<<<<<<<<<<<<<',account)
//     //     return token;
//     //   },


//     async jwt({ token, user }) {

//       console.log('useruser', user)
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

//       console.log('token', token)
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

//       console.log('Session Data:', session);
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // Redirect to `/dashboard` after sign-in
//       if (url.startsWith(baseUrl)) {
//         return `${baseUrl}/`;
//       }
//       return baseUrl;
//     }
//   }
// }

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };



import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import { API_ENDPOINTS } from "@/constants/api-endpoints";

 const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/contacts.readonly", 
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
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
          const res = await axios.post(
            credentials.type === 'otp' ? API_ENDPOINTS.VERIFY_OTP : API_ENDPOINTS.LOGIN,
            {
              email: credentials.email,
              ...(credentials.type === 'otp'
                ? { otp: credentials.otp }
                : { password: credentials.password }
              ),
            }
          );

          if (res.data && res.data.statusCode === 200) {
            const userData = res.data?.data?.user || res.data?.data;
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
            };
          } else {
            throw new Error("Sign Up Failed");
          }
        } catch (error) {
          throw new Error("Sign Up Error");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.email = user.email;
        token.phone = user.phone;
        token.rating = user.rating;
        token.isVerified = user.isVerified;
        token.reports = user.reports;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
        token.verificationCode = user.verificationCode;
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
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/`;
      }
      return baseUrl;
    }
  }
};

// Correctly export the handler for both GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

