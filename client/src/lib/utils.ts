import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getImageUrl(imageName: string): string {
  const baseUrl = 'https://images.unsplash.com/';
  
  // Map of image IDs for different categories
  const imageMap: Record<string, string> = {
    // Temple exteriors
    "temple-exterior-1": "photo-1558437340-5d17a387d7fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "temple-exterior-2": "photo-1558437077-c8a0a0808f68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-exterior-3": "photo-1609953904431-788acf381fd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-exterior-4": "photo-1609953904524-23b5ee0f5134?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-exterior-5": "photo-1584551882459-958567c1f797?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-exterior-6": "photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-exterior-7": "photo-1606166325683-e6deb697d301?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    "temple-exterior-8": "photo-1600160912863-552f83cc9caa?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    
    // Temple sculptures
    "temple-sculpture-1": "photo-1591017775537-d4ebdfe091a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "temple-sculpture-2": "photo-1623065691913-e9a650810efd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-sculpture-3": "photo-1571536802807-30451e456c4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-sculpture-4": "photo-1584647317801-68160873a750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "temple-sculpture-5": "photo-1579027989536-b7b1f875659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-sculpture-6": "photo-1520997097692-1904009cc6cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-sculpture-7": "photo-1566490595356-4f7be609a4c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "temple-sculpture-8": "photo-1591017775537-d4ebdfe091a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    
    // Aerial views
    "aerial-view-1": "photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "aerial-view-2": "photo-1558437340-5d17a387d7fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "aerial-view-3": "photo-1584647317801-68160873a750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "aerial-view-4": "photo-1584551882459-958567c1f797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    
    // Local cuisine
    "cuisine-1": "photo-1567337710282-00832b415979?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "cuisine-2": "photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "cuisine-3": "photo-1618449840665-9ed506d73a34?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "cuisine-4": "photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    "cuisine-5": "photo-1567337710282-00832b415979?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "cuisine-6": "photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    
    // Accommodation
    "accommodation-1": "photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "accommodation-2": "photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "accommodation-3": "photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "accommodation-4": "photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  };
  
  return imageMap[imageName] ? baseUrl + imageMap[imageName] : '';
}
