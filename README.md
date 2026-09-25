# 🛡️ VORTEX — The Zero Trust Line
### Security Operations Control-Room Dashboard • ARGONYX'26 Hackathon
**RV University • Viksha • E-Cell • IEEE**

> *"We eliminate false alarms and blind spots for high-risk facilities by making every sensor cross-verify every threat. Identity is necessary, but never sufficient."*

---

## 🚀 NEW: Face Enrollment & Rebalanced Fusion Scoring

### 1. Live Face Registration Flow
- Accessible from the **"Register"** button in the header toolbar.
- **Form Fields:** Full Name (required), Assigned Role (optional), Department Wing.
- **Live 3-Frame Capture:** Uses live webcam (or high-fidelity biometric simulation) to capture 3 successive facial landmark frames (`Frame 1/3`, `Frame 2/3`, `Frame 3/3`).
- **Persistent Biometric Store:** Generates a 128-dimensional biometric embedding vector and persists it to `backend/authorized_personnel.json` (and SQLite database `backend/vortex_security.db`).
- **Instant Recognition:** Displays confirmation banner `"[Name] registered as authorized"` and immediately updates the live checkpoint detection loop without requiring a server or browser restart.
- **Unenrolled Faces:** Any entrant not found in this store is automatically classified as **UNAUTHORIZED** (`+15 penalty modifier`).

---

### 2. Rebalanced Fusion Scoring Logic: Object Danger Outweighs Identity

The scoring engine has been rebalanced so **identity status is a small modifier (`+0` or `+15`)**, ensuring that **object danger decisively outweighs identity**:

$$\text{Fusion Score} = \text{Identity Modifier} + \text{Object Risk Weight}$$

#### Factor 1: Biometric Identity Status
- **Authorized Personnel (in store):** `+0` to score
- **Unauthorized / Unrecognized Entrant:** `+15` to score

#### Factor 2: Detected Object Risk Weights
- **Gun / Concealed Firearm:** `+90`
- **Knife / Blade Exposed:** `+60`
- **Box Cutter:** `+35`
- **Scissors / Small Sharp Object:** `+10`
- **Clean / No Object:** `+0`

#### Classification Thresholds
- **0 – 29:** `NORMAL` (Cleared silently, turnstiles open)
- **30 – 64:** `SUSPICIOUS` (Onsite security guard alerted)
- **65 – 100:** `CRITICAL` (Auto-lockdown & Police/EMS dispatched)

---

### 3. Clear AI Reasoning Log & Demonstrable Proof

The **AI Reasoning Log** explicitly breaks down both factors side-by-side:

| Scenario | Identity Factor | Object Factor | Total Score | Verdict | Judge Takeaway |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **Case A (Authorized + Knife)** | `Face: authorized (Tanvi) (+0)` | `Object: knife, blade exposed (+60)` | **60 / 100** | **SUSPICIOUS** | Object danger (+60) heavily outweighs authorized status (+0). |
| **Case B (Unauthorized + Scissors)** | `Face: unauthorized/unrecognized (+15)` | `Object: small sharp item (+10)` | **25 / 100** | **NORMAL** | Proportional response: unauthorized visitor without high danger remains Normal. |

> **Score Difference:** Authorized knife-holder scores **35 points higher** (60 vs 25) than the unauthorized visitor with small scissors, proving that object danger outweighs identity!

---

## 🧪 Verification Results

Automated headless browser test suite (`verify-enrollment.js`):
```
[Backend stdout]: [VORTEX API BACKEND] Face Enrollment & Fusion Score Server active on http://localhost:3001
--- Step 1: Registering Face 1 (Sanidhya) ---
[Success Banner 1]: SANIDHYA REGISTERED AS AUTHORIZED
--- Step 2: Registering Face 2 (Marcus Thorne) ---
[Success Banner 2]: MARCUS THORNE REGISTERED AS AUTHORIZED
--- Step 3: Test Case A (Authorized Person + Knife) ---
[Case A Results]: Score = 60, Status = SUSPICIOUS
--- Step 4: Test Case B (Unauthorized Person + Small Sharp Object) ---
[Case B Results]: Score = 25, Status = NORMAL
--- Step 5: Comparative Fusion Scoring Verification ---
Case A (Authorized + Knife): Score 60 (SUSPICIOUS)
Case B (Unauthorized + Scissors): Score 25 (NORMAL)
✓ SUCCESS: Authorized person with knife decisively outscores unauthorized person with small sharp item (+35 points higher)!
Total Console Errors: 0
✓ ZERO console errors confirmed!
```

---

## 🎥 Real-Time Identity Tracking & Phone CCTV Extension

### 1. Live Continuous Identity Labeling
- The label and bounding box overlay refresh dynamically on every detection cycle (~500ms–1s).
- **Instant Out-of-Frame Clearing:** When a subject moves out of camera range, their bounding box and identity label disappear within 1 detection cycle (<800ms) with zero lingering or stale tags. The camera HUD displays `NO FACE IN FRAME — Scanning perimeter...` and `STATUS: FRAME EMPTY`.
- **Zero Fake / Random Names:** Completely removed all random name generation pools (`Dr. Liam Zhao` and `Maya Chen` eradicated). The system matches strictly against real enrolled personnel in `authorized_personnel.json`.
- **Sequential Unknown Assignment:** Any unrecognized face is assigned a clean sequential label: `"Unknown User 1"`, `"Unknown User 2"`, etc. Facial feature distance caching ensures that when an unrecognized individual steps out of frame and re-enters, their original sequential identifier (`"Unknown User 1"`) is preserved without generating redundant IDs.

---

### 2. Live Personnel Roster & In-Frame Monitor
- Positioned in the left control panel above the event ingress feed.
- Shows all authorized team members (`Tanvi P G`, `Sanidhya`, `Krupanjali`, `Sagarika`) with real-time status badges:
  - `● IN FRAME` (pulsing emerald badge) when present in front of the camera.
  - `○ NOT IN FRAME` (slate badge) when off-camera.
- **Active Unauthorized In-Frame Alert:** When an unrecognized entrant (`Unknown User 1`) is in frame, an elevated red alert banner appears: `Unknown User 1 • UNAUTHORIZED • IN FRAME AT CAM-01 (+15 PENALTY)`.

---

### 3. Multi-Camera CCTV & Phone Transmitter (`CAM-02`)
- **Camera Selection Toolbar:** Switch between `CAM-01 (Laptop)` and `CAM-02 (Phone CCTV)` in the Risk Center header.
- **Dedicated Mobile Feed Route (`/camera-feed`):** Open this route on any phone connected to the same Wi-Fi network. It provides a full mobile transmitter UI with rear/front camera flipping, FPS selector (5/8/12/15 FPS), real-time transmission counter, and low-latency WebSocket streaming directly into the control room.
- **"Connect Phone QR" Modal:** Click the gold QR button in the camera toolbar to open a high-contrast QR code modal displaying the local Wi-Fi URL (`http://<local-ip>:4176/camera-feed`), one-click Copy and Open buttons, and 3-step setup instructions.

---

## 🧪 Verification Results

Automated headless browser test suite (`verify-live-tracking.js`):
```
===========================================================
  STARTING VORTEX LIVE TRACKING & ROSTER VERIFICATION
===========================================================
[1/10] Starting Vortex backend server...
 - Local Address: http://localhost:3001
 - Network Address: http://10.17.4.226:3001
 - Remote Phone CCTV Link: http://10.17.4.226:5173/camera-feed
[2/10] Test frontend server running at http://localhost:4176
[3/10] Launching Chrome browser...
[4/10] Navigating to http://localhost:4176

--- Step 1: Verifying Initial In-Frame State & Bounding Box ---
[Initial Bounding Box Status]: IDENTITY | AUTHORIZED (+0) | TANVI P G | OBJECT: | NONE
Verified initial face in frame.

--- Step 2: Verifying Move Out of Frame ---
Clicked "Move Out of Frame". Waiting 800ms for cycle update...
[Out of Frame Feed Status]: CAM-01 • CHECKPOINT OPTICAL / RADAR | NO FACE IN FRAME | FRAME EMPTY
[Roster IN FRAME badges count]: 0 (expected 0)

--- Step 3: Verifying Person Switch to Sanidhya (Auth) ---
[Sanidhya Bounding Box Status]: IDENTITY | AUTHORIZED (+0) | SANIDHYA | OBJECT: | NONE
[Roster Sanidhya is IN FRAME]: true

--- Step 4: Verifying Unrecognized Face → Sequential "Unknown User 1" ---
[Unknown User 1 Box Status]: IDENTITY | UNAUTHORIZED (+15) | UNKNOWN USER 1 | OBJECT: | NONE
Verified: NO random fake names exist. Strictly sequential Unknown User 1.
[Roster Unauthorized Alert Active]: true

--- Step 5: Verifying Second Unrecognized Face → "Unknown User 2" ---
[Unknown User 2 Box Status]: IDENTITY | UNAUTHORIZED (+15) | UNKNOWN USER 2 | OBJECT: | NONE

--- Step 6: Verifying Re-introducing First Face Retains "Unknown User 1" ---
[Retained Unknown User 1 Box Status]: IDENTITY | UNAUTHORIZED (+15) | UNKNOWN USER 1 | OBJECT: | NONE

--- Step 7: Verifying /camera-feed Route for Phone CCTV ---
[Camera Feed Header / Title]: VORTEX CCTV SENSOR CAM-02 Mobile Optical Node • Zone B Ingress LIVE Dashboard

--- Step 8: Verifying Phone CCTV QR Modal on Main Dashboard ---
[Phone QR Modal Content]: CCTV MULTI-CAMERA EXTENSION CAM-02 CONNECT PHONE AS REMOTE CCTV FEED VX http://10.17.4.226:4176/camera-feed

--- Step 9: Verifying Zero Console Errors ---
✓ PERFECT: Zero console errors recorded across all steps!

===========================================================
  ALL LIVE TRACKING & ROSTER VERIFICATIONS PASSED 100%!
===========================================================
```

---

## 👥 RV University Project Team

| Name | Role | USN | Email |
| :--- | :--- | :--- | :--- |
| **Tanvi P G** | Team Lead / AI Architect | `RVCE26BAS038` | `tanvigokul08@gmail.com` |
| **Sanidhya** | Sensor Fusion Engineer | `RVCE26BAI088` | `saniiiidhya@gmail.com` |
| **Krupanjali** | Threat Logic Specialist | `RVCE26BAI000` | `krupanjali.bheemappa@gmail.com` |
| **Sagarika** | Security Ops Lead | `RVCE26BAS003` | `sagarikaj1608@gmail.com` |

---

## 🏃 Running the Application

### 1. Launch Dashboard (Offline / Standalone)
Double-click `launch.bat` or open `dist/index.html` in Chrome/Edge/Brave.

### 2. Run Backend & Phone CCTV Server
Double-click `start_backend.bat` or run:
```bash
node backend/server.js
```

### 3. Re-run Verification Suites
```bash
# Verify enrollment and fusion scoring balance:
node verify-enrollment.js

# Verify continuous live tracking, roster sync, and phone camera feed:
node verify-live-tracking.js
```
