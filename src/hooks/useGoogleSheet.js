import { useState, useEffect } from 'react';

const CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRcDEPWwmHYL7lGuavLHa--h60dmRkR_1d6XbZPkarpOOMLzx2_Di_NXBbKIE3NW2WLX3fL97gRRg9V/pub?gid=0&single=true&output=csv';

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());

  return lines.slice(1).map((line, idx) => {
    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });

    // Collect all image columns
    const images = [];
    for (let i = 1; i <= 5; i++) {
      const key = `image ${i}`;
      if (row[key] && row[key].trim()) {
        images.push(convertDriveLink(row[key].trim()));
      }
    }
    // Fallback: single "image" column
    if (images.length === 0 && row['image'] && row['image'].trim()) {
      images.push(convertDriveLink(row['image'].trim()));
    }

    return {
      id: idx + 1,
      name: row['product name'] || '',
      price: row['price'] || '',
      description: row['description'] || '',
      badge: row['badge'] || null,
      images,
      video: row['video'] ? row['video'].trim() : null,
    };
  }).filter((p) => p.name); // skip empty rows
}

// Convert Google Drive share links to direct image URLs
function convertDriveLink(url) {
  // Format: https://drive.google.com/file/d/FILE_ID/view...
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
  }
  // Format: https://drive.google.com/open?id=FILE_ID
  const match2 = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (match2) {
    return `https://drive.google.com/thumbnail?id=${match2[1]}&sz=w800`;
  }
  return url;
}

const useGoogleSheet = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(CSV_URL);
        if (!res.ok) throw new Error('Failed to load products');
        const text = await res.text();
        const parsed = parseCSV(text);
        if (!cancelled) {
          setProducts(parsed);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
};

export default useGoogleSheet;
