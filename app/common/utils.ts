export const getBaseDomain = () => {
    return process.env.NEXT_PUBLIC_VERCEL_ENV ? '' : process.env.VERCEL_URL;
};
