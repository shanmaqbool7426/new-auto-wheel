export const fetchFooterLinks = async () => {
  try {
    const response = await fetch(`https://auto-wheel-be.vercel.app/api/footer`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching footer links:", error);
    return [];
  }
};
