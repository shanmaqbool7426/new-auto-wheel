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
import Credentials from "next-auth/providers/credentials";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from 'axios';
// app secret==a72619f80aa9f320986a091635babec5
// app id = 874743337540967
// client token 8b2eb17676e71487b83cf3cf4b5deb24
const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: '',
      clientSecret: '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          // scope: "openid email profile https://www.googleapis.com/auth/contacts.readonly", // Add phone number scope
        },
      },
    }),
    FacebookProvider({
      clientId: '874743337540967',
      clientSecret: '8b2eb17676e71487b83cf3cf4b5deb24'
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
console.log('>>>>>>>>',credentials.type)
          // Call your API to verify OTP or perform sign-in based on the type
          const res = await axios.post(
             credentials.type === 'otp'
            ? API_ENDPOINTS.AUTH.VERIFY_OTP
            : API_ENDPOINTS.AUTH.LOGIN,
            {
              email: credentials.email,
      ...(credentials.type === 'otp'
        ? { otp: credentials.otp } // Include OTP if type is "otp"
        : { password: credentials.password } // Include password if it's a regular sign-in
      ),
    }
    );


  if(res.data && res.data.statusCode === 200) {
    console.log('>>>>>>> RESSSSS',res.data?.data)
    const userData = res.data?.data.user ? res.data?.data?.user : res.data?.data;
// Return all necessary user details for the session and JWT
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
  token:res.data?.data
};
          } else {
  throw new Error(credentials.type === 'otp' 
    ? "Failed to verify OTP. Please try again"
    : "Sign Up Failed"
  );
}
        } catch (error) {
  console.error("Auth Error: ", error);
  throw new Error(credentials.type === 'otp'
    ? "Failed to verify OTP. Please try again"
    : "Sign Up Error"
  );
}
      },
    }),

    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     phone: {},
    //     password: {},
    //   },
    //   async authorize(credentials) {
    //     const res = await axios.post<LoginResponse>(
    //       process.env.API_BASE_URL + "api/v1/auth/login",
    //       credentials,
    //       {
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     if (res.status === 200) {
    //       const { name, id, phone, role, picture } = res.data.user;
    //       const user = {
    //         id,
    //         name,
    //         phone,
    //         role,
    //         picture,
    //         token: res.data.token,
    //       };
    //       return user; // User interface we declared in next-auth.d.ts
    //     } else throw new Error("Login failed");
    //   },
    // })
  ],
secret: '739d95146513d67502b0ba4776a5cae8',
  callbacks: {
    //   async jwt({ token, account }) {
    //     if (account?.provider === "google") {
    //       token.id = account.providerAccountId;
    //       token.accessToken = account.access_token;

    //       // Fetch user info from Google People API
    //       const userInfoResponse = await fetch(
    //         `https://people.googleapis.com/v1/people/me?personFields=phoneNumbers`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${account.access_token}`,
    //           },
    //         }
    //       );
    //       const userInfo = await userInfoResponse.json();

    //       if (userInfo.phoneNumbers && userInfo.phoneNumbers.length > 0) {
    //         token.phoneNumber = userInfo.phoneNumbers[0].value; // Store phone number in token
    //       }
    //     }


    //     return token;
    //   },


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
      token.token=user.token
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
    session.user.token=token.token
    return session;
  },
    async redirect({ url, baseUrl }) {
    // Redirect to `/dashboard` after sign-in
    if (url.startsWith(baseUrl)) {
      return `${baseUrl}/`;
    }
    return `${baseUrl}`;
  }
}
}

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

