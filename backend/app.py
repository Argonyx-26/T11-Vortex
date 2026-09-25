"""
VORTEX Edge Fusion Server (Python 3 / OpenCV / face_recognition / SQLite)
RV University • ARGONYX'26 Hackathon
"""
import os
import json
import sqlite3
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

DB_FILE = os.path.join(os.path.dirname(__file__), "vortex_security.db")

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS authorized_personnel (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT,
            department TEXT,
            encoding_json TEXT NOT NULL,
            registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def compute_fusion_score(is_authorized, object_type, subject_name="Subject"):
    identity_modifier = 0 if is_authorized else 15
    identity_label = f"Face: authorized ({subject_name}) (+0)" if is_authorized else "Face: unauthorized/unrecognized (+15)"

    object_weights = {
        'gun': (90, 'gun, concealed/drawn (+90)'),
        'knife': (60, 'knife, blade exposed (+60)'),
        'box_cutter': (35, 'box cutter (+35)'),
        'scissors': (10, 'small sharp item, low risk (+10)'),
        'small_sharp': (10, 'small sharp item, low risk (+10)'),
        'none': (0, 'no weapon detected (+0)')
    }

    weight, label = object_weights.get(object_type, (0, 'clean sweep (+0)'))
    total_score = min(100, max(0, identity_modifier + weight))

    status = "NORMAL"
    if total_score >= 65:
        status = "CRITICAL"
    elif total_score >= 30:
        status = "SUSPICIOUS"

    return {
        "score": total_score,
        "status": status,
        "identity_modifier": identity_modifier,
        "object_weight": weight,
        "reasoning": [
            identity_label,
            f"Object: {label}",
            f"Total Fusion Score: {total_score}/100 -> {status}"
        ]
    }

init_db()
print("VORTEX SQLite database initialized.")
