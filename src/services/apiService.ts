// src/services/apiService.ts
import { ref } from 'vue';

// Utility function to format date as YYYY-MM-DD
const formatDate = (dateString: string): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
};

// Utility function to convert form data to query string
const toQueryString = (params: Record<string, string | null | undefined>): string => {
  return Object.keys(params)
    .filter(key => params[key] !== null && params[key] !== undefined) // Only include non-null parameters
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key] as string))
    .join('&');
};

// Function to fetch the access token
export const getAccessToken = async (): Promise<string | null> => {
  const tokenApiUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';  // Replace with actual token endpoint

  // Prepare the body parameters for x-www-form-urlencoded format
  const bodyParams = new URLSearchParams();
  bodyParams.append('client_id', '7KOXHS8i358cGsv51Yfi988X4B3s0LyI');   // Replace with actual client_id
  bodyParams.append('client_secret', '3PlUEXSEGV8Wiy7E');             // Replace with actual client_secret
  bodyParams.append('grant_type', 'client_credentials');                // Ensure this is correct

  try {
    // Fetch access token
    const tokenResponse = await fetch(tokenApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),  // Send the parameters as x-www-form-urlencoded body
    });

    // Check if the response is successful
    if (!tokenResponse.ok) {
      throw new Error(`Token API error! Status: ${tokenResponse.status}`);
    }

    // Parse the response JSON
    const tokenData = await tokenResponse.json();

    // Return the access token from the response
    return tokenData.access_token || null;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
};

// Function to find tickets
export const findTicket = async (
  formData: Record<string, string | null>,
  filterData: any,   // Adjust as needed for your filter data type
  accessToken: string,
  departureDate: string,
  returnDate: string | null,
  show: boolean,
  flightListSection: any,
  flightOffers: any,
  dictionaries: any,
  meta: any,
  loading: any
) => {
  const apiEndpoint = 'https://test.api.amadeus.com/v2/shopping/flight-offers';

  // Add return date if it's not a one-way trip
  if (!show && returnDate) {
    formData.returnDate = formatDate(returnDate);
  }

  // If filterData is provided, update formData with additional filter parameters
  if (filterData) {
    formData.maxPrice = filterData.maxPrice ? String(filterData.maxPrice) : null;
    formData.selectedAirlines = filterData.selectedAirlines;
  }

  const queryString = toQueryString(formData);
  const fullUrl = `${apiEndpoint}?${queryString}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);

    flightOffers.value = data.data || [];
    dictionaries.value = data.dictionaries || {};
    meta.value = data.meta || {};

    if (flightListSection.value) {
      flightListSection.value.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;  // Stop loading after request completes
  }
};
