/**
 * CLASSROOM MANAGEMENT SYSTEM - CONFIGURATION
 * Single source of truth for all system settings
 * 
 * SETUP INSTRUCTIONS:
 * 1. Replace firebaseConfig with your Firebase project credentials
 * 2. Update schedules with your actual student rosters
 * 3. Adjust timing settings if needed
 */

// ============================================
// FIREBASE CONFIGURATION
// ============================================
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ============================================
// SYSTEM TIMING SETTINGS
// ============================================
export const timingConfig = {
    scanDebounce: 2000,        // Prevent duplicate scans within 2 seconds
    studentCooldown: 5000,      // Silent period after scan (prevents toggle errors)
    autoResetInterval: 30000,   // Check for period-end auto-resets every 30 seconds
    timerUpdateInterval: 1000,  // Update dashboard timers every second
    periodCheckInterval: 60000  // Check for period changes every minute
};

// ============================================
// SCHEDULE DEFINITIONS
// ============================================
export const schedules = {
    red: {
        regular: [
            {
                name: "P1",
                startTime: "07:45",
                endTime: "09:13",
                students: {
                    "qr_01": "Student A1",
                    "qr_02": "Student A2",
                    "qr_03": "Student A3",
                    "qr_04": "Student A4",
                    "qr_05": "Student A5",
                    "qr_06": "Student A6",
                    "qr_07": "Student A7",
                    "qr_08": "Student A8",
                    "qr_09": "Student A9",
                    "qr_10": "Student A10"
                }
            },
            {
                name: "P2",
                startTime: "09:18",
                endTime: "10:41",
                students: {
                    "qr_11": "Student B1",
                    "qr_12": "Student B2",
                    "qr_13": "Student B3",
                    "qr_14": "Student B4",
                    "qr_15": "Student B5",
                    "qr_16": "Student B6",
                    "qr_17": "Student B7",
                    "qr_18": "Student B8",
                    "qr_19": "Student B9",
                    "qr_20": "Student B10"
                }
            },
            {
                name: "P3",
                startTime: "11:14",
                endTime: "12:37",
                students: {
                    "qr_21": "Student C1",
                    "qr_22": "Student C2",
                    "qr_23": "Student C3",
                    "qr_24": "Student C4",
                    "qr_25": "Student C5",
                    "qr_26": "Student C6",
                    "qr_27": "Student C7",
                    "qr_28": "Student C8",
                    "qr_29": "Student C9",
                    "qr_30": "Student C10"
                }
            },
            {
                name: "P4",
                startTime: "12:42",
                endTime: "14:05",
                students: {
                    "qr_01": "Student D1",
                    "qr_02": "Student D2",
                    "qr_03": "Student D3",
                    "qr_04": "Student D4",
                    "qr_05": "Student D5",
                    "qr_06": "Student D6",
                    "qr_07": "Student D7",
                    "qr_08": "Student D8",
                    "qr_09": "Student D9",
                    "qr_10": "Student D10"
                }
            }
        ],
        late: [
            {
                name: "P1",
                startTime: "08:50",
                endTime: "09:59",
                students: {
                    "qr_01": "Student A1",
                    "qr_02": "Student A2",
                    "qr_03": "Student A3",
                    "qr_04": "Student A4",
                    "qr_05": "Student A5",
                    "qr_06": "Student A6",
                    "qr_07": "Student A7",
                    "qr_08": "Student A8",
                    "qr_09": "Student A9",
                    "qr_10": "Student A10"
                }
            },
            {
                name: "P2",
                startTime: "10:04",
                endTime: "11:08",
                students: {
                    "qr_11": "Student B1",
                    "qr_12": "Student B2",
                    "qr_13": "Student B3",
                    "qr_14": "Student B4",
                    "qr_15": "Student B5",
                    "qr_16": "Student B6",
                    "qr_17": "Student B7",
                    "qr_18": "Student B8",
                    "qr_19": "Student B9",
                    "qr_20": "Student B10"
                }
            },
            {
                name: "P3",
                startTime: "11:41",
                endTime: "12:45",
                students: {
                    "qr_21": "Student C1",
                    "qr_22": "Student C2",
                    "qr_23": "Student C3",
                    "qr_24": "Student C4",
                    "qr_25": "Student C5",
                    "qr_26": "Student C6",
                    "qr_27": "Student C7",
                    "qr_28": "Student C8",
                    "qr_29": "Student C9",
                    "qr_30": "Student C10"
                }
            },
            {
                name: "P4",
                startTime: "12:50",
                endTime: "13:54",
                students: {
                    "qr_01": "Student D1",
                    "qr_02": "Student D2",
                    "qr_03": "Student D3",
                    "qr_04": "Student D4",
                    "qr_05": "Student D5",
                    "qr_06": "Student D6",
                    "qr_07": "Student D7",
                    "qr_08": "Student D8",
                    "qr_09": "Student D9",
                    "qr_10": "Student D10"
                }
            }
        ]
    },
    black: {
        regular: [
            {
                name: "P1",
                startTime: "07:45",
                endTime: "09:13",
                students: {
                    "qr_11": "Student E1",
                    "qr_12": "Student E2",
                    "qr_13": "Student E3",
                    "qr_14": "Student E4",
                    "qr_15": "Student E5",
                    "qr_16": "Student E6",
                    "qr_17": "Student E7",
                    "qr_18": "Student E8",
                    "qr_19": "Student E9",
                    "qr_20": "Student E10"
                }
            },
            {
                name: "P2",
                startTime: "09:18",
                endTime: "10:41",
                students: {
                    "qr_21": "Student F1",
                    "qr_22": "Student F2",
                    "qr_23": "Student F3",
                    "qr_24": "Student F4",
                    "qr_25": "Student F5",
                    "qr_26": "Student F6",
                    "qr_27": "Student F7",
                    "qr_28": "Student F8",
                    "qr_29": "Student F9",
                    "qr_30": "Student F10"
                }
            },
            {
                name: "P3",
                startTime: "11:14",
                endTime: "12:37",
                students: {
                    "qr_01": "Student G1",
                    "qr_02": "Student G2",
                    "qr_03": "Student G3",
                    "qr_04": "Student G4",
                    "qr_05": "Student G5",
                    "qr_06": "Student G6",
                    "qr_07": "Student G7",
                    "qr_08": "Student G8",
                    "qr_09": "Student G9",
                    "qr_10": "Student G10"
                }
            },
            {
                name: "P4",
                startTime: "12:42",
                endTime: "14:05",
                students: {
                    "qr_11": "Student H1",
                    "qr_12": "Student H2",
                    "qr_13": "Student H3",
                    "qr_14": "Student H4",
                    "qr_15": "Student H5",
                    "qr_16": "Student H6",
                    "qr_17": "Student H7",
                    "qr_18": "Student H8",
                    "qr_19": "Student H9",
                    "qr_20": "Student H10"
                }
            }
        ],
        late: [
            {
                name: "P1",
                startTime: "08:50",
                endTime: "09:59",
                students: {
                    "qr_11": "Student E1",
                    "qr_12": "Student E2",
                    "qr_13": "Student E3",
                    "qr_14": "Student E4",
                    "qr_15": "Student E5",
                    "qr_16": "Student E6",
                    "qr_17": "Student E7",
                    "qr_18": "Student E8",
                    "qr_19": "Student E9",
                    "qr_20": "Student E10"
                }
            },
            {
                name: "P2",
                startTime: "10:04",
                endTime: "11:08",
                students: {
                    "qr_21": "Student F1",
                    "qr_22": "Student F2",
                    "qr_23": "Student F3",
                    "qr_24": "Student F4",
                    "qr_25": "Student F5",
                    "qr_26": "Student F6",
                    "qr_27": "Student F7",
                    "qr_28": "Student F8",
                    "qr_29": "Student F9",
                    "qr_30": "Student F10"
                }
            },
            {
                name: "P3",
                startTime: "11:41",
                endTime: "12:45",
                students: {
                    "qr_01": "Student G1",
                    "qr_02": "Student G2",
                    "qr_03": "Student G3",
                    "qr_04": "Student G4",
                    "qr_05": "Student G5",
                    "qr_06": "Student G6",
                    "qr_07": "Student G7",
                    "qr_08": "Student G8",
                    "qr_09": "Student G9",
                    "qr_10": "Student G10"
                }
            },
            {
                name: "P4",
                startTime: "12:50",
                endTime: "13:54",
                students: {
                    "qr_11": "Student H1",
                    "qr_12": "Student H2",
                    "qr_13": "Student H3",
                    "qr_14": "Student H4",
                    "qr_15": "Student H5",
                    "qr_16": "Student H6",
                    "qr_17": "Student H7",
                    "qr_18": "Student H8",
                    "qr_19": "Student H9",
                    "qr_20": "Student H10"
                }
            }
        ]
    }
};

// ============================================
// UI CONFIGURATION
// ============================================
export const uiConfig = {
    scheduleLabels: {
        red: "🔴 Red Day",
        black: "⚫ Black Day"
    },
    startTypeLabels: {
        regular: "⏰ Regular Start",
        late: "🌅 Late Start"
    },
    statusLabels: {
        in: "✓ In Classroom",
        out: "⚠ Out of Room"
    }
};

// ============================================
// AUDIO FEEDBACK SETTINGS
// ============================================
export const audioConfig = {
    successBeep: {
        frequency: 800,
        duration: 150,
        volume: 0.3
    },
    errorBuzz: {
        frequency: 200,
        duration: 300,
        volume: 0.2
    }
};
