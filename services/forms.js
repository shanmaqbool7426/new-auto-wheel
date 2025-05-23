export async function submitFormData(url, data) {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit the data. Please try again.');
    }
  
    return response.json();
  }
export async function submitUpdateFormData(url, data,token) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: data,
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit the data. Please try again.');
    }
  
    return response.json();
  }
  