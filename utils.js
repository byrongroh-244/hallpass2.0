/**
 * CLASSROOM MANAGEMENT SYSTEM - UTILITIES
 * Reusable functions used across all pages
 */

import { schedules } from '../config/config.js';

// ============================================
// TIME & PERIOD UTILITIES
// ============================================

/**
 * Get current period based on schedule type and time
 */
export function getCurrentPeriod(scheduleType, startType) {
    if (!scheduleType || !startType || !schedules[scheduleType] || !schedules[scheduleType][startType]) {
        return null;
    }

    const schedule = schedules[scheduleType][startType];
    const now = new Date();
    const currentTime = formatTimeForComparison(now);

    for (const period of schedule) {
        if (currentTime >= period.startTime && currentTime < period.endTime) {
            return period;
        }
    }

    return null;
}

/**
 * Format time for comparison (HH:MM)
 */
export function formatTimeForComparison(date) {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/**
 * Check if current time is past period end
 */
export function isPastPeriodEnd(periodEndTime) {
    const now = new Date();
    const currentTime = formatTimeForComparison(now);
    return currentTime >= periodEndTime;
}

// ============================================
// STUDENT ID GENERATION
// ============================================

/**
 * Generate unique student ID
 * Format: {scheduleType}_{startType}_{qrCode}_{period}
 */
export function generateStudentId(qrCode, period, scheduleType, startType) {
    return `${scheduleType}_${startType}_${qrCode}_${period.replace(/\s+/g, '_')}`;
}

/**
 * Parse student ID back into components
 */
export function parseStudentId(studentId) {
    const parts = studentId.split('_');
    if (parts.length < 4) return null;
    
    return {
        scheduleType: parts[0],
        startType: parts[1],
        qrCode: `${parts[2]}_${parts[3]}`,
        period: parts.slice(4).join('_').replace(/_/g, ' ')
    };
}

/**
 * Get student information from QR code and current time
 */
export function getStudentInfo(qrCode, scheduleType, startType) {
    const currentPeriod = getCurrentPeriod(scheduleType, startType);
    
    if (!currentPeriod) {
        return {
            error: 'No active class period right now',
            qrCode: qrCode
        };
    }
    
    const studentName = currentPeriod.students[qrCode];
    
    if (!studentName) {
        return {
            error: `QR code ${qrCode} not registered for ${currentPeriod.name}`,
            qrCode: qrCode
        };
    }
    
    const uniqueId = generateStudentId(qrCode, currentPeriod.name, scheduleType, startType);
    
    return {
        uniqueId: uniqueId,
        studentName: studentName,
        qrCode: qrCode,
        periodName: currentPeriod.name,
        periodStartTime: currentPeriod.startTime,
        periodEndTime: currentPeriod.endTime,
        schedule: `${scheduleType}_${startType}`
    };
}

// ============================================
// FORMATTING UTILITIES
// ============================================

/**
 * Format duration in milliseconds to readable string (MM:SS)
 */
export function formatDuration(ms) {
    if (!ms || ms < 0) return '0:00';
    
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Format duration in milliseconds to hours/minutes
 */
export function formatDurationHours(ms) {
    if (!ms || ms < 0) return '0m';
    
    const totalMinutes = Math.floor(ms / 60000);
    
    if (totalMinutes < 60) {
        return `${totalMinutes}m`;
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}

/**
 * Format timestamp to readable time
 */
export function formatTime(timestamp) {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp).toLocaleTimeString();
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp) {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp).toLocaleDateString();
}

/**
 * Get ISO date string for today
 */
export function getTodayDateString() {
    return new Date().toISOString().split('T')[0];
}

// ============================================
// AUDIO FEEDBACK
// ============================================

/**
 * Play success beep sound
 */
export function playSuccessBeep() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
        console.log('Audio not available:', error);
    }
}

/**
 * Play error buzz sound
 */
export function playErrorBuzz() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Audio not available:', error);
    }
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate QR code format
 */
export function isValidQRCode(qrCode) {
    return /^qr_\d{2}$/.test(qrCode);
}

/**
 * Validate schedule type
 */
export function isValidScheduleType(scheduleType) {
    return scheduleType === 'red' || scheduleType === 'black';
}

/**
 * Validate start type
 */
export function isValidStartType(startType) {
    return startType === 'regular' || startType === 'late';
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

/**
 * Save schedule selection to localStorage
 */
export function saveScheduleSelection(scheduleType, startType, context = 'default') {
    try {
        localStorage.setItem(`${context}_scheduleType`, scheduleType);
        localStorage.setItem(`${context}_startType`, startType);
    } catch (error) {
        console.error('Failed to save schedule selection:', error);
    }
}

/**
 * Load schedule selection from localStorage
 */
export function loadScheduleSelection(context = 'default') {
    try {
        return {
            scheduleType: localStorage.getItem(`${context}_scheduleType`),
            startType: localStorage.getItem(`${context}_startType`) || 'regular'
        };
    } catch (error) {
        console.error('Failed to load schedule selection:', error);
        return { scheduleType: null, startType: 'regular' };
    }
}

/**
 * Clear schedule selection from localStorage
 */
export function clearScheduleSelection(context = 'default') {
    try {
        localStorage.removeItem(`${context}_scheduleType`);
        localStorage.removeItem(`${context}_startType`);
    } catch (error) {
        console.error('Failed to clear schedule selection:', error);
    }
}
