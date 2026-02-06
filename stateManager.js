/**
 * CLASSROOM MANAGEMENT SYSTEM - STATE MANAGER
 * Single interface for all Firebase operations
 */

import { firebaseConfig } from '../config/config.js';
import { getTodayDateString } from './utils.js';

class StateManager {
    constructor() {
        this.database = null;
        this.initialized = false;
        this.listeners = new Map();
    }

    /**
     * Initialize Firebase connection
     */
    async initialize() {
        if (this.initialized) return;

        try {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            this.database = firebase.database();
            this.initialized = true;
            console.log('✅ Firebase initialized successfully');
        } catch (error) {
            console.error('❌ Firebase initialization failed:', error);
            throw new Error('Failed to connect to database. Please check your configuration.');
        }
    }

    /**
     * Ensure Firebase is initialized before operations
     */
    ensureInitialized() {
        if (!this.initialized) {
            throw new Error('StateManager not initialized. Call initialize() first.');
        }
    }

    // ============================================
    // STUDENT STATUS OPERATIONS
    // ============================================

    /**
     * Get student current status
     */
    async getStudent(studentId) {
        this.ensureInitialized();
        try {
            const snapshot = await this.database.ref(`students/${studentId}`).once('value');
            return snapshot.val();
        } catch (error) {
            console.error('Error getting student:', error);
            throw error;
        }
    }

    /**
     * Update student status to OUT
     */
    async markStudentOut(studentInfo) {
        this.ensureInitialized();
        try {
            const data = {
                name: studentInfo.studentName,
                qrCode: studentInfo.qrCode,
                period: studentInfo.periodName,
                schedule: studentInfo.schedule,
                status: 'out',
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                outTimestamp: firebase.database.ServerValue.TIMESTAMP
            };

            await this.database.ref(`students/${studentInfo.uniqueId}`).set(data);
            
            // Log the event
            await this.logEvent({
                studentName: studentInfo.studentName,
                qrCode: studentInfo.qrCode,
                period: studentInfo.periodName,
                schedule: studentInfo.schedule,
                action: 'out',
                outTime: Date.now(),
                inTime: null,
                duration: null
            });

            return data;
        } catch (error) {
            console.error('Error marking student out:', error);
            throw error;
        }
    }

    /**
     * Update student status to IN
     */
    async markStudentIn(studentInfo, outTimestamp) {
        this.ensureInitialized();
        try {
            const inTime = Date.now();
            const duration = outTimestamp ? (inTime - outTimestamp) : null;

            const data = {
                name: studentInfo.studentName,
                qrCode: studentInfo.qrCode,
                period: studentInfo.periodName,
                schedule: studentInfo.schedule,
                status: 'in',
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                outTimestamp: null
            };

            await this.database.ref(`students/${studentInfo.uniqueId}`).set(data);
            
            // Log the event
            await this.logEvent({
                studentName: studentInfo.studentName,
                qrCode: studentInfo.qrCode,
                period: studentInfo.periodName,
                schedule: studentInfo.schedule,
                action: 'in',
                outTime: outTimestamp,
                inTime: inTime,
                duration: duration
            });

            return data;
        } catch (error) {
            console.error('Error marking student in:', error);
            throw error;
        }
    }

    /**
     * Batch update multiple students (used for auto-reset)
     */
    async batchUpdateStudents(updates, logs) {
        this.ensureInitialized();
        try {
            // Perform all updates in a single transaction
            if (Object.keys(updates).length > 0) {
                await this.database.ref().update(updates);
            }
            
            // Log all events
            await Promise.all(logs);
            
            return Object.keys(updates).length;
        } catch (error) {
            console.error('Error batch updating students:', error);
            throw error;
        }
    }

    /**
     * Subscribe to student changes
     */
    subscribeToStudents(callback) {
        this.ensureInitialized();
        const ref = this.database.ref('students');
        
        ref.on('value', (snapshot) => {
            callback(snapshot.val() || {});
        });

        // Store listener for cleanup
        this.listeners.set('students', ref);
    }

    /**
     * Unsubscribe from student changes
     */
    unsubscribeFromStudents() {
        const ref = this.listeners.get('students');
        if (ref) {
            ref.off();
            this.listeners.delete('students');
        }
    }

    // ============================================
    // LOGGING OPERATIONS
    // ============================================

    /**
     * Log an event to Firebase
     */
    async logEvent(eventData) {
        this.ensureInitialized();
        try {
            const logRef = this.database.ref('logs').push();
            await logRef.set({
                studentName: eventData.studentName,
                qrCode: eventData.qrCode,
                period: eventData.period,
                schedule: eventData.schedule,
                action: eventData.action,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                date: getTodayDateString(),
                outTime: eventData.outTime || null,
                inTime: eventData.inTime || null,
                duration: eventData.duration || null
            });
        } catch (error) {
            console.error('Error logging event:', error);
            // Don't throw - logging failures shouldn't break the app
        }
    }

    /**
     * Get all logs within date range
     */
    async getLogs(startDate, endDate) {
        this.ensureInitialized();
        try {
            const snapshot = await this.database.ref('logs')
                .orderByChild('date')
                .startAt(startDate)
                .endAt(endDate)
                .once('value');
            
            const logs = [];
            snapshot.forEach((child) => {
                logs.push({
                    id: child.key,
                    ...child.val()
                });
            });
            
            return logs;
        } catch (error) {
            console.error('Error getting logs:', error);
            throw error;
        }
    }

    /**
     * Subscribe to logs
     */
    subscribeToLogs(callback) {
        this.ensureInitialized();
        const ref = this.database.ref('logs');
        
        ref.on('value', (snapshot) => {
            const logs = [];
            snapshot.forEach((child) => {
                logs.push({
                    id: child.key,
                    ...child.val()
                });
            });
            callback(logs);
        });

        this.listeners.set('logs', ref);
    }

    /**
     * Unsubscribe from logs
     */
    unsubscribeFromLogs() {
        const ref = this.listeners.get('logs');
        if (ref) {
            ref.off();
            this.listeners.delete('logs');
        }
    }

    /**
     * Delete all logs (used for reset)
     */
    async deleteAllLogs() {
        this.ensureInitialized();
        try {
            await this.database.ref('logs').remove();
        } catch (error) {
            console.error('Error deleting logs:', error);
            throw error;
        }
    }

    // ============================================
    // UTILITY OPERATIONS
    // ============================================

    /**
     * Get connection state
     */
    async checkConnection() {
        this.ensureInitialized();
        try {
            const connectedRef = this.database.ref('.info/connected');
            const snapshot = await connectedRef.once('value');
            return snapshot.val() === true;
        } catch (error) {
            console.error('Error checking connection:', error);
            return false;
        }
    }

    /**
     * Clean up all listeners
     */
    cleanup() {
        this.listeners.forEach((ref, key) => {
            ref.off();
        });
        this.listeners.clear();
    }
}

// Export singleton instance
export const stateManager = new StateManager();
