from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from datetime import datetime
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os
import certifi

app = Flask(__name__)
app.secret_key = 'super-secure-key-123'

@app.before_request
def get_real_ip():
    if request.headers.get('X-Forwarded-For'):
        ip_list = request.headers.get('X-Forwarded-For').split(',')
        ip = ip_list[0].strip()
    else:
        ip = request.remote_addr
    print(f"Real Public IP: {ip} | Path: {request.path} | Time: {datetime.now()}")

# MongoDB Setup
try:
    mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000, tlsCAFile=certifi.where())
    db = client['college_app']
    users_collection = db['users']
    colleges_collection = db['colleges']
    
    # Initialize DB with Colleges if empty
    if colleges_collection.count_documents({}) == 0:
        COLLEGES = [
            { "name": "IIT Bombay", "type": "IIT", "percentile": 99.98, "rank": 50, "avgPkg": "26.5 LPA", "placement": 99, "reputation": "10/10", "fields": ["CSE", "ECE", "Electrical", "Mechanical"], "hobbies": ["Coding", "Robotics", "Startups"], "lat": 19.1334, "lon": 72.9133 },
            { "name": "IIT Delhi", "type": "IIT", "percentile": 99.95, "rank": 150, "avgPkg": "24.8 LPA", "placement": 98, "reputation": "9.9/10", "fields": ["CSE", "Mathematics", "Textile", "Mechanical"], "hobbies": ["Robotics", "Design", "Music"], "lat": 28.5450, "lon": 77.1926 },
            { "name": "IIT Madras", "type": "IIT", "percentile": 99.92, "rank": 250, "avgPkg": "23.5 LPA", "placement": 97, "reputation": "10/10 (NIRF #1)", "fields": ["Aerospace", "CSE", "Electrical", "Civil"], "hobbies": ["Sailing", "Quizzing"], "lat": 12.9915, "lon": 80.2336 },
            { "name": "IIT Kanpur", "type": "IIT", "percentile": 99.91, "rank": 350, "avgPkg": "22.5 LPA", "placement": 96, "reputation": "9.8/10", "fields": ["CSE", "Economics", "Mechanical"], "hobbies": ["Rock", "Sports"], "lat": 26.5123, "lon": 80.2329 },
            { "name": "IIT Kharagpur", "type": "IIT", "percentile": 99.88, "rank": 600, "avgPkg": "21.0 LPA", "placement": 95, "reputation": "9.7/10", "fields": ["Mining", "Agriculture", "CSE", "Mechanical"], "hobbies": ["Social", "Arts"], "lat": 22.3149, "lon": 87.3105 },
            { "name": "IIT Roorkee", "type": "IIT", "percentile": 99.85, "rank": 800, "avgPkg": "20.5 LPA", "placement": 94, "reputation": "9.6/10", "fields": ["CSE", "ECE", "Civil", "Architecture"], "hobbies": ["Photography", "Fine Arts"], "lat": 29.8649, "lon": 77.8965 },
            { "name": "IIT Guwahati", "type": "IIT", "percentile": 99.82, "rank": 1000, "avgPkg": "19.8 LPA", "placement": 93, "reputation": "9.5/10", "fields": ["CSE", "Design", "Biotech", "Mechanical"], "hobbies": ["Nature", "Trekking"], "lat": 26.1873, "lon": 91.6917 },
            { "name": "IIT Hyderabad", "type": "IIT", "percentile": 99.80, "rank": 1200, "avgPkg": "21.2 LPA", "placement": 95, "reputation": "9.4/10", "fields": ["CSE", "AI", "ECE"], "hobbies": ["Innovation", "Gaming"], "lat": 17.5947, "lon": 78.1230 },
            { "name": "NIT Trichy", "type": "NIT", "percentile": 99.75, "rank": None, "avgPkg": "15.8 LPA", "placement": 94, "reputation": "9.2/10", "fields": ["CSE", "ECE", "Production", "Chemical"], "hobbies": ["Festivals", "Sports"], "lat": 10.7589, "lon": 78.8132 },
            { "name": "NIT Surathkal", "type": "NIT", "percentile": 99.55, "rank": None, "avgPkg": "14.2 LPA", "placement": 92, "reputation": "9.0/10", "fields": ["IT", "CSE", "Mechanical", "Civil"], "hobbies": ["Surfing", "Tech"], "lat": 13.0108, "lon": 74.7943 },
            { "name": "NIT Rourkela", "type": "NIT", "percentile": 99.30, "rank": None, "avgPkg": "13.5 LPA", "placement": 91, "reputation": "8.9/10", "fields": ["CSE", "ECE", "Ceramic", "Mining"], "hobbies": ["Sports", "Social"], "lat": 22.2533, "lon": 84.9011 },
            { "name": "NIT Warangal", "type": "NIT", "percentile": 99.60, "rank": None, "avgPkg": "15.2 LPA", "placement": 93, "reputation": "9.1/10", "fields": ["CSE", "ECE", "Electrical", "Mechanical"], "hobbies": ["Quizzing", "Coding"], "lat": 17.9839, "lon": 79.5312 },
            { "name": "NIT Jaipur", "type": "NIT", "percentile": 99.10, "rank": None, "avgPkg": "12.8 LPA", "placement": 89, "reputation": "8.7/10", "fields": ["CSE", "ECE", "Civil", "Architecture"], "hobbies": ["Arts", "Music"], "lat": 26.8615, "lon": 75.8118 },
            { "name": "NIT Allahabad", "type": "NIT", "percentile": 99.40, "rank": None, "avgPkg": "14.8 LPA", "placement": 92, "reputation": "8.8/10", "fields": ["CSE", "IT", "ECE", "Production"], "hobbies": ["Tech", "Startups"], "lat": 25.4920, "lon": 81.8665 },
            { "name": "NIT Patna", "type": "NIT", "percentile": 97.80, "rank": None, "avgPkg": "10.5 LPA", "placement": 86, "reputation": "8.1/10", "fields": ["CSE", "Electrical", "Mechanical", "Civil"], "hobbies": ["Gaming", "Cultural"], "lat": 25.6208, "lon": 85.1720 },
            { "name": "NIT Jamshedpur", "type": "NIT", "percentile": 98.50, "rank": None, "avgPkg": "11.2 LPA", "placement": 88, "reputation": "8.3/10", "fields": ["CSE", "Mechanical", "Production", "ECE"], "hobbies": ["Sports", "Coding"], "lat": 22.7766, "lon": 86.1425 },
            { "name": "NIT Kurukshetra", "type": "NIT", "percentile": 98.90, "rank": None, "avgPkg": "12.0 LPA", "placement": 90, "reputation": "8.5/10", "fields": ["CSE", "IT", "Electrical", "Mechanical"], "hobbies": ["Debating", "Music"], "lat": 29.9452, "lon": 76.8166 },
            { "name": "IIIT Hyderabad", "type": "IIIT", "percentile": 99.85, "rank": None, "avgPkg": "31.2 LPA", "placement": 100, "reputation": "9.6/10", "fields": ["CSE", "ECE"], "hobbies": ["Coding", "AI", "Gaming"], "lat": 17.4448, "lon": 78.3498 },
            { "name": "IIIT Bangalore", "type": "IIIT", "percentile": 99.70, "rank": None, "avgPkg": "28.5 LPA", "placement": 99, "reputation": "9.5/10", "fields": ["CSE", "Data Science"], "hobbies": ["Hackathons", "Innovation"], "lat": 12.8448, "lon": 77.6632 },
            { "name": "IIIT Gwalior", "type": "IIIT", "percentile": 99.20, "rank": None, "avgPkg": "22.5 LPA", "placement": 96, "reputation": "9.0/10", "fields": ["IT", "Management", "ECE"], "hobbies": ["Business", "Tech"], "lat": 26.2495, "lon": 78.1738 },
            { "name": "IIIT Lucknow", "type": "IIIT", "percentile": 98.80, "rank": None, "avgPkg": "20.8 LPA", "placement": 95, "reputation": "8.7/10", "fields": ["CSE", "AI", "Data Science"], "hobbies": ["Startups", "Gaming"], "lat": 26.9124, "lon": 81.0247 },
            { "name": "BIT Mesra", "type": "NIT", "percentile": 95.8, "rank": None, "avgPkg": "11.5 LPA", "placement": 87, "reputation": "8.4/10", "fields": ["CSE", "Mechanical", "ECE", "Civil"], "hobbies": ["Space", "Cultural"], "lat": 23.4123, "lon": 85.4399 },
            { "name": "DTU Delhi", "type": "NIT", "percentile": 98.2, "rank": None, "avgPkg": "16.5 LPA", "placement": 90, "reputation": "8.9/10", "fields": ["Software", "Mechanical", "ECE", "Electrical"], "hobbies": ["Automotive", "Drama"], "lat": 28.7501, "lon": 77.1177 },
            { "name": "NSUT Delhi", "type": "NIT", "percentile": 98.1, "rank": None, "avgPkg": "15.8 LPA", "placement": 89, "reputation": "8.8/10", "fields": ["CSE", "IT", "ECE", "ICE"], "hobbies": ["Robotics", "Festivals"], "lat": 28.6091, "lon": 77.0351 },
            { "name": "BITS Pilani", "type": "IIT", "percentile": 99.1, "rank": None, "avgPkg": "19.5 LPA", "placement": 97, "reputation": "9.7/10", "fields": ["CSE", "Mechanical", "ECE", "Economics"], "hobbies": ["Leadership", "Innovation"], "lat": 28.3639, "lon": 75.5870 },
            { "name": "VIT Vellore", "type": "IIIT", "percentile": 90.5, "rank": None, "avgPkg": "9.2 LPA", "placement": 85, "reputation": "7.8/10", "fields": ["CSE", "IT", "Mechanical", "ECE"], "hobbies": ["Gaming", "Hackathons"], "lat": 12.9692, "lon": 79.1559 },
            { "name": "PEC Chandigarh", "type": "NIT", "percentile": 97.5, "rank": None, "avgPkg": "11.8 LPA", "placement": 88, "reputation": "8.2/10", "fields": ["CSE", "Aero", "Mechanical", "Civil"], "hobbies": ["Flying", "Aero"], "lat": 30.7674, "lon": 76.7865 },
            { "name": "COEP Pune", "type": "NIT", "percentile": 98.5, "rank": None, "avgPkg": "11.2 LPA", "placement": 90, "reputation": "8.8/10", "fields": ["CSE", "Mechanical", "Electrical", "Civil"], "hobbies": ["Tech", "History"], "lat": 18.5293, "lon": 73.8565 },
            { "name": "VNIT Nagpur", "type": "NIT", "percentile": 98.8, "rank": None, "avgPkg": "11.5 LPA", "placement": 88, "reputation": "8.6/10", "fields": ["CSE", "Mechanical", "ECE", "Chemical"], "hobbies": ["Social", "Arts"], "lat": 21.1275, "lon": 79.0514 },
            { "name": "MANIT Bhopal", "type": "NIT", "percentile": 98.4, "rank": None, "avgPkg": "10.8 LPA", "placement": 87, "reputation": "8.4/10", "fields": ["CSE", "Electrical", "ECE", "Architecture"], "hobbies": ["Design", "Drama"], "lat": 23.2173, "lon": 77.4069 },
            { "name": "NIT Delhi", "type": "NIT", "percentile": 98.6, "rank": None, "avgPkg": "11.2 LPA", "placement": 88, "reputation": "8.3/10", "fields": ["CSE", "ECE", "Electrical"], "hobbies": ["Coding", "Robotics"], "lat": 28.8427, "lon": 77.1049 }
        ]
        colleges_collection.insert_many(COLLEGES)
except Exception as e:
    print(f"MongoDB Connection Error: {e}")

@app.route('/')
def index():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template('index.html', user=session['user'])

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = users_collection.find_one({"email": email})
        if user and check_password_hash(user['password'], password):
            session['user'] = {"email": user['email'], "name": user.get('name', 'User')}
            return redirect(url_for('index'))
        else:
            return render_template('login.html', error="Invalid email or password")
            
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if users_collection.find_one({"email": email}):
            return render_template('login.html', register_error="Email already exists!", mode='register')
            
        hashed_pw = generate_password_hash(password)
        users_collection.insert_one({"name": name, "email": email, "password": hashed_pw})
        
        session['user'] = {"email": email, "name": name}
        return redirect(url_for('index'))
        
    return render_template('login.html', mode='register')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

@app.route('/api/colleges', methods=['GET'])
def get_colleges():
    # Fetch from Mongo, exclude _id since JS can't easily parse ObjectId without string conversion
    colleges = list(colleges_collection.find({}, {"_id": 0}))
    return jsonify(colleges)

if __name__ == '__main__':
    app.run(debug=True)