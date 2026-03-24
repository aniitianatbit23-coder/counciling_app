from flask import Flask, render_template, request, jsonify
from datetime import datetime


app = Flask(__name__)

@app.before_request
def get_real_ip():
    if request.headers.get('X-Forwarded-For'):
        ip = request.headers.get('X-Forwarded-For').split(',')[-1].strip()
    else:
        ip = request.remote_addr

    print(f"Real IP: {ip} | Path: {request.path} | Time: {datetime.now()}")


# Detailed Database
COLLEGES = [
    {
        "name": "IIT Bombay",
        "type": "IIT",
        "min_adv_rank": 3000,
        "avg_package": "23.5 LPA",
        "placement_rate": 99,
        "reputation": "1st (NIRF)",
        "fields": ["CSE", "Mechanical Engineering", "ECE", "Electrical", "Civil"]
    },
    {
        "name": "NIT Trichy",
        "type": "NIT",
        "min_percentile": 99.1,
        "avg_package": "16.4 LPA",
        "placement_rate": 94,
        "reputation": "Top NIT",
        "fields": ["CSE", "Mechanical Engineering", "ECE", "Electrical", "Civil"]
    },
    {
        "name": "BIT Mesra",
        "type": "Private/GFTI",
        "min_percentile": 95.5,
        "avg_package": "12.0 LPA",
        "placement_rate": 88,
        "reputation": "High Merit",
        "fields": ["CSE", "Mechanical Engineering", "ECE", "Electrical", "Civil"]
    },
    {
        "name": "DTU Delhi",
        "type": "State",
        "min_percentile": 97.8,
        "avg_package": "15.5 LPA",
        "placement_rate": 91,
        "reputation": "Premier State",
        "fields": ["CSE", "Mechanical Engineering", "ECE", "Electrical"]
    }
]

def calculate_probability(score, cutoff, is_advanced=False):
    if not score: return 0
    if is_advanced:
        if score <= cutoff: return 95
        ratio = cutoff / score
        return max(5, min(90, int(ratio * 80)))
    else:
        diff = score - cutoff
        if diff >= 0: return min(99, int(90 + (diff * 5)))
        if diff > -3: return max(10, int(50 + (diff * 15)))
        return 5

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    percentile = float(data.get('percentile', 0))
    adv_rank = int(data.get('adv_rank')) if data.get('adv_rank') else None
    field = data.get('field')
    dream_name = data.get('interested_colleges', '').lower()

    # Find AI Choice (Best eligible based on stats)
    eligible = [c for c in COLLEGES if (c['type'] != 'IIT' and percentile >= c['min_percentile'] - 2) or 
                (c['type'] == 'IIT' and adv_rank and adv_rank <= c['min_adv_rank'] + 1000)]
    
    ai_col = max(eligible, key=lambda x: x['placement_rate']) if eligible else COLLEGES[1]
    
    # Find Dream Choice
    dream_col = next((c for c in COLLEGES if c['name'].lower() in dream_name), None)

    # Probabilities
    ai_prob = calculate_probability(adv_rank if ai_col['type'] == 'IIT' else percentile,
                                    ai_col['min_adv_rank'] if ai_col['type'] == 'IIT' else ai_col['min_percentile'],
                                    ai_col['type'] == 'IIT')
    
    dream_prob = 0
    if dream_col:
        dream_prob = calculate_probability(adv_rank if dream_col['type'] == 'IIT' else percentile,
                                          dream_col['min_adv_rank'] if dream_col['type'] == 'IIT' else dream_col['min_percentile'],
                                          dream_col['type'] == 'IIT')

    return jsonify({
        "success": True,
        "ai": ai_col, "ai_prob": ai_prob,
        "dream": dream_col, "dream_prob": dream_prob,
        "field": field
    })

if __name__ == '__main__':
    app.run(debug=True)