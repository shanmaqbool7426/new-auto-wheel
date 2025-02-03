export const fetchFooterLinks = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/footer`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching footer links:", error);
    return [];
  }
};
