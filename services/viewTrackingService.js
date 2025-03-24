// services/viewTrackingService.js
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

class ViewTrackingService {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.viewedVehicles = new Set(); // In-memory tracking for current session
    this.observers = new Map(); // Store observers by vehicle ID
    this.pendingListingViews = []; // Store pending listing views for batch processing
    this.batchTimeout = null; // Timeout for batch processing
  }
  
  getOrCreateSessionId() {
    if (typeof window === 'undefined') return null;
    
    try {
      let sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = this.generateUUID();
        localStorage.setItem('session_id', sessionId);
      }
      return sessionId;
    } catch (error) {
      // localStorage not available (incognito mode)
      return this.generateUUID();
    }
  }
  
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  async trackView(vehicleId, page = 'detail') {
    if (!vehicleId || typeof window === 'undefined') return;
    
    // First check in-memory set
    if (this.viewedVehicles.has(vehicleId)) {
      return; // Already viewed in this session
    }
    
    // Try to check sessionStorage as a fallback
    let hasBeenViewedRecently = false;
    try {
      const viewedVehiclesData = JSON.parse(sessionStorage.getItem('viewedVehiclesData') || '{}');
      const now = Date.now();
      const thirtyMinutesInMs = 30 * 60 * 1000;
      
      const lastViewedTime = viewedVehiclesData[vehicleId];
      hasBeenViewedRecently = lastViewedTime && (now - lastViewedTime < thirtyMinutesInMs);
      
      if (!hasBeenViewedRecently) {
        // Update viewed vehicles with current timestamp
        viewedVehiclesData[vehicleId] = now;
        sessionStorage.setItem('viewedVehiclesData', JSON.stringify(viewedVehiclesData));
      }
    } catch (error) {
      // sessionStorage not available (incognito mode)
      // Continue with API call since we haven't seen this vehicle yet in this session
    }
    
    if (!hasBeenViewedRecently) {
      try {
        // Add to in-memory set
        this.viewedVehicles.add(vehicleId);
        
        // For listing views, add to batch queue
        if (page === 'listing') {
          this.addToBatchQueue(vehicleId, page);
        } else {
          // For detail views, send immediately
          await axios.post(API_ENDPOINTS.VEHICLE.TRACK_VIEW(vehicleId), {
            sessionId: this.sessionId,
            vehicleId: vehicleId,
            page: page
          });
        }
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    }
  }
  
  // Add a view to the batch queue and schedule processing
  addToBatchQueue(vehicleId, page) {
    this.pendingListingViews.push({vehicleId});
    
    // Clear existing timeout if any
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }
    
    // Schedule batch processing after a short delay (300ms)
    // This allows multiple cards becoming visible at once to be batched together
    this.batchTimeout = setTimeout(() => {
      this.processBatchQueue();
    }, 300);
  }
  
  // Process the batch queue
  async processBatchQueue() {
    if (this.pendingListingViews.length === 0) return;
    
    try {
      const views = [...this.pendingListingViews];
      this.pendingListingViews = []; // Clear the queue
      
      // Send batch request
      await axios.post(API_ENDPOINTS.VEHICLE.BATCH_TRACK_VIEWS, {
        sessionId: this.sessionId,
        views: views
      });
      
      console.log(`Batch processed ${views.length} vehicle views`);
    } catch (error) {
      console.error('Error processing batch views:', error);
    }
  }
  
  // Track views in listings using Intersection Observer
  trackCardView(element, vehicleId) {
    if (!vehicleId || !element || typeof window === 'undefined') return;
    
    // First check in-memory set
    if (this.viewedVehicles.has(vehicleId)) {
      return; // Already viewed in this session
    }
    
    // Create an observer for this card if it doesn't exist
    if (!this.observers.has(vehicleId)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Card is visible, track the view
              this.trackView(vehicleId, 'listing');
              
              // Disconnect observer after tracking
              observer.disconnect();
              this.observers.delete(vehicleId);
            }
          });
        },
        { threshold: 0.5 } // Card must be 50% visible
      );
      
      // Store the observer
      this.observers.set(vehicleId, observer);
      
      // Start observing
      observer.observe(element);
    }
  }
  
  // Clean up observers when component unmounts
  cleanupObservers() {
    // Process any pending views before cleaning up
    if (this.pendingListingViews.length > 0) {
      this.processBatchQueue();
    }
    
    // Clear any pending timeout
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
      this.batchTimeout = null;
    }
    
    // Disconnect all observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}

export default new ViewTrackingService();