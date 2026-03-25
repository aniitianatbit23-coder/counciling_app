const COLLEGES = [
    { name: "IIT Bombay", type: "IIT", percentile: 99.98, rank: 50, avgPkg: "26.5 LPA", placement: 99, reputation: "10/10", fields: ["CSE", "ECE", "Electrical", "Mechanical"], hobbies: ["Coding", "Robotics", "Startups"], lat: 19.1334, lon: 72.9133 },
    { name: "IIT Delhi", type: "IIT", percentile: 99.95, rank: 150, avgPkg: "24.8 LPA", placement: 98, reputation: "9.9/10", fields: ["CSE", "Mathematics", "Textile", "Mechanical"], hobbies: ["Robotics", "Design", "Music"], lat: 28.5450, lon: 77.1926 },
    { name: "IIT Madras", type: "IIT", percentile: 99.92, rank: 250, avgPkg: "23.5 LPA", placement: 97, reputation: "10/10 (NIRF #1)", fields: ["Aerospace", "CSE", "Electrical", "Civil"], hobbies: ["Sailing", "Quizzing"], lat: 12.9915, lon: 80.2336 },
    { name: "IIT Kanpur", type: "IIT", percentile: 99.91, rank: 350, avgPkg: "22.5 LPA", placement: 96, reputation: "9.8/10", fields: ["CSE", "Economics", "Mechanical"], hobbies: ["Rock", "Sports"], lat: 26.5123, lon: 80.2329 },
    { name: "IIT Kharagpur", type: "IIT", percentile: 99.88, rank: 600, avgPkg: "21.0 LPA", placement: 95, reputation: "9.7/10", fields: ["Mining", "Agriculture", "CSE", "Mechanical"], hobbies: ["Social", "Arts"], lat: 22.3149, lon: 87.3105 },
    { name: "IIT Roorkee", type: "IIT", percentile: 99.85, rank: 800, avgPkg: "20.5 LPA", placement: 94, reputation: "9.6/10", fields: ["CSE", "ECE", "Civil", "Architecture"], hobbies: ["Photography", "Fine Arts"], lat: 29.8649, lon: 77.8965 },
    { name: "IIT Guwahati", type: "IIT", percentile: 99.82, rank: 1000, avgPkg: "19.8 LPA", placement: 93, reputation: "9.5/10", fields: ["CSE", "Design", "Biotech", "Mechanical"], hobbies: ["Nature", "Trekking"], lat: 26.1873, lon: 91.6917 },
    { name: "IIT Hyderabad", type: "IIT", percentile: 99.80, rank: 1200, avgPkg: "21.2 LPA", placement: 95, reputation: "9.4/10", fields: ["CSE", "AI", "ECE"], hobbies: ["Innovation", "Gaming"], lat: 17.5947, lon: 78.1230 },
    { name: "NIT Trichy", type: "NIT", percentile: 99.75, rank: null, avgPkg: "15.8 LPA", placement: 94, reputation: "9.2/10", fields: ["CSE", "ECE", "Production", "Chemical"], hobbies: ["Festivals", "Sports"], lat: 10.7589, lon: 78.8132 },
    { name: "NIT Surathkal", type: "NIT", percentile: 99.55, rank: null, avgPkg: "14.2 LPA", placement: 92, reputation: "9.0/10", fields: ["IT", "CSE", "Mechanical", "Civil"], hobbies: ["Surfing", "Tech"], lat: 13.0108, lon: 74.7943 },
    { name: "NIT Rourkela", type: "NIT", percentile: 99.30, rank: null, avgPkg: "13.5 LPA", placement: 91, reputation: "8.9/10", fields: ["CSE", "ECE", "Ceramic", "Mining"], hobbies: ["Sports", "Social"], lat: 22.2533, lon: 84.9011 },
    { name: "NIT Warangal", type: "NIT", percentile: 99.60, rank: null, avgPkg: "15.2 LPA", placement: 93, reputation: "9.1/10", fields: ["CSE", "ECE", "Electrical", "Mechanical"], hobbies: ["Quizzing", "Coding"], lat: 17.9839, lon: 79.5312 },
    { name: "NIT Jaipur", type: "NIT", percentile: 99.10, rank: null, avgPkg: "12.8 LPA", placement: 89, reputation: "8.7/10", fields: ["CSE", "ECE", "Civil", "Architecture"], hobbies: ["Arts", "Music"], lat: 26.8615, lon: 75.8118 },
    { name: "NIT Allahabad", type: "NIT", percentile: 99.40, rank: null, avgPkg: "14.8 LPA", placement: 92, reputation: "8.8/10", fields: ["CSE", "IT", "ECE", "Production"], hobbies: ["Tech", "Startups"], lat: 25.4920, lon: 81.8665 },
    { name: "NIT Patna", type: "NIT", percentile: 97.80, rank: null, avgPkg: "10.5 LPA", placement: 86, reputation: "8.1/10", fields: ["CSE", "Electrical", "Mechanical", "Civil"], hobbies: ["Gaming", "Cultural"], lat: 25.6208, lon: 85.1720 },
    { name: "NIT Jamshedpur", type: "NIT", percentile: 98.50, rank: null, avgPkg: "11.2 LPA", placement: 88, reputation: "8.3/10", fields: ["CSE", "Mechanical", "Production", "ECE"], hobbies: ["Sports", "Coding"], lat: 22.7766, lon: 86.1425 },
    { name: "NIT Kurukshetra", type: "NIT", percentile: 98.90, rank: null, avgPkg: "12.0 LPA", placement: 90, reputation: "8.5/10", fields: ["CSE", "IT", "Electrical", "Mechanical"], hobbies: ["Debating", "Music"], lat: 29.9452, lon: 76.8166 },
    { name: "IIIT Hyderabad", type: "IIIT", percentile: 99.85, rank: null, avgPkg: "31.2 LPA", placement: 100, reputation: "9.6/10", fields: ["CSE", "ECE"], hobbies: ["Coding", "AI", "Gaming"], lat: 17.4448, lon: 78.3498 },
    { name: "IIIT Bangalore", type: "IIIT", percentile: 99.70, rank: null, avgPkg: "28.5 LPA", placement: 99, reputation: "9.5/10", fields: ["CSE", "Data Science"], hobbies: ["Hackathons", "Innovation"], lat: 12.8448, lon: 77.6632 },
    { name: "IIIT Gwalior", type: "IIIT", percentile: 99.20, rank: null, avgPkg: "22.5 LPA", placement: 96, reputation: "9.0/10", fields: ["IT", "Management", "ECE"], hobbies: ["Business", "Tech"], lat: 26.2495, lon: 78.1738 },
    { name: "IIIT Lucknow", type: "IIIT", percentile: 98.80, rank: null, avgPkg: "20.8 LPA", placement: 95, reputation: "8.7/10", fields: ["CSE", "AI", "Data Science"], hobbies: ["Startups", "Gaming"], lat: 26.9124, lon: 81.0247 },
    { name: "BIT Mesra", type: "NIT", percentile: 95.8, rank: null, avgPkg: "11.5 LPA", placement: 87, reputation: "8.4/10", fields: ["CSE", "Mechanical", "ECE", "Civil"], hobbies: ["Space", "Cultural"], lat: 23.4123, lon: 85.4399 },
    { name: "DTU Delhi", type: "NIT", percentile: 98.2, rank: null, avgPkg: "16.5 LPA", placement: 90, reputation: "8.9/10", fields: ["Software", "Mechanical", "ECE", "Electrical"], hobbies: ["Automotive", "Drama"], lat: 28.7501, lon: 77.1177 },
    { name: "NSUT Delhi", type: "NIT", percentile: 98.1, rank: null, avgPkg: "15.8 LPA", placement: 89, reputation: "8.8/10", fields: ["CSE", "IT", "ECE", "ICE"], hobbies: ["Robotics", "Festivals"], lat: 28.6091, lon: 77.0351 },
    { name: "BITS Pilani", type: "IIT", percentile: 99.1, rank: null, avgPkg: "19.5 LPA", placement: 97, reputation: "9.7/10", fields: ["CSE", "Mechanical", "ECE", "Economics"], hobbies: ["Leadership", "Innovation"], lat: 28.3639, lon: 75.5870 },
    { name: "VIT Vellore", type: "IIIT", percentile: 90.5, rank: null, avgPkg: "9.2 LPA", placement: 85, reputation: "7.8/10", fields: ["CSE", "IT", "Mechanical", "ECE"], hobbies: ["Gaming", "Hackathons"], lat: 12.9692, lon: 79.1559 },
    { name: "PEC Chandigarh", type: "NIT", percentile: 97.5, rank: null, avgPkg: "11.8 LPA", placement: 88, reputation: "8.2/10", fields: ["CSE", "Aero", "Mechanical", "Civil"], hobbies: ["Flying", "Aero"], lat: 30.7674, lon: 76.7865 },
    { name: "COEP Pune", type: "NIT", percentile: 98.5, rank: null, avgPkg: "11.2 LPA", placement: 90, reputation: "8.8/10", fields: ["CSE", "Mechanical", "Electrical", "Civil"], hobbies: ["Tech", "History"], lat: 18.5293, lon: 73.8565 },
    { name: "VNIT Nagpur", type: "NIT", percentile: 98.8, rank: null, avgPkg: "11.5 LPA", placement: 88, reputation: "8.6/10", fields: ["CSE", "Mechanical", "ECE", "Chemical"], hobbies: ["Social", "Arts"], lat: 21.1275, lon: 79.0514 },
    { name: "MANIT Bhopal", type: "NIT", percentile: 98.4, rank: null, avgPkg: "10.8 LPA", placement: 87, reputation: "8.4/10", fields: ["CSE", "Electrical", "ECE", "Architecture"], hobbies: ["Design", "Drama"], lat: 23.2173, lon: 77.4069 },
    { name: "NIT Delhi", type: "NIT", percentile: 98.6, rank: null, avgPkg: "11.2 LPA", placement: 88, reputation: "8.3/10", fields: ["CSE", "ECE", "Electrical"], hobbies: ["Coding", "Robotics"], lat: 28.8427, lon: 77.1049 }
];

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('counsel-form');
    const advCleared = document.getElementById('adv_cleared');
    const rankDiv = document.getElementById('rank-input-div');
    const app = {
        inputStep: document.getElementById('input-step'),
        resultsStep: document.getElementById('results-step'),
        loading: document.getElementById('loading'),
        resultsContent: document.getElementById('results-content')
    };

    let userLocation = null;

    // Capture User Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                console.log("User Location Captured:", userLocation);
            },
            (error) => {
                console.warn("Geolocation Error:", error.message);
            }
        );
    }

    advCleared.addEventListener('change', () => {
        rankDiv.style.display = advCleared.checked ? 'flex' : 'none';
        document.getElementById('rank').required = advCleared.checked;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        app.inputStep.classList.remove('active');
        app.resultsStep.classList.add('active');
        app.loading.classList.remove('hidden');
        app.resultsContent.classList.add('hidden');

        await new Promise(r => setTimeout(r, 1800));

        const user = {
            perc: parseFloat(document.getElementById('percentile').value),
            rank: parseInt(document.getElementById('rank').value) || null,
            field: document.getElementById('interested_field').value,
            hobbies: document.getElementById('hobbies').value.toLowerCase(),
            dream: document.getElementById('desired_college').value.trim().toLowerCase(),
            adv: advCleared.checked
        };

        console.log('Processing for:', user);
        processRecommendations(user);
        app.loading.classList.add('hidden');
        app.resultsContent.classList.remove('hidden');
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        app.resultsStep.classList.remove('active');
        app.inputStep.classList.add('active');
    });

    // Haversine formula to calculate distance in km
    function getDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return null;
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    function calculateProbability(userValue, targetValue, isRank = false) {
        if (isRank) {
            if (!userValue) return 0;
            const ratio = targetValue / userValue;
            if (ratio >= 1) return 95 + Math.min(4, ratio * 2);
            if (ratio > 0.5) return Math.round(ratio * 90);
            return Math.max(5, Math.round(ratio * 150));
        } else {
            const diff = userValue - targetValue;
            if (diff >= 0) return Math.min(99, 90 + Math.round(diff * 5));
            if (diff > -2) return Math.round(50 + (diff * 20));
            return Math.max(5, Math.round(10 + (diff * 5)));
        }
    }

    function processRecommendations(user) {
        const dreamCol = COLLEGES.find(c => c.name.toLowerCase().includes(user.dream) && user.dream.length > 2);
        let dreamProb = 0;
        if (dreamCol) {
            dreamProb = calculateProbability(
                dreamCol.type === 'IIT' ? user.rank : user.perc,
                dreamCol.type === 'IIT' ? dreamCol.rank : dreamCol.percentile,
                dreamCol.type === 'IIT'
            );
        }

        let eligible = COLLEGES.filter(c => {
            if (c.type === 'IIT') return user.adv && user.rank && user.rank <= (c.rank * 1.8);
            return user.perc >= (c.percentile - 3.5);
        });

        eligible = eligible.map(c => {
            let score = c.fields.some(f => f.includes(user.field) || user.field.includes(f)) ? 40 : 0;
            score += c.hobbies.filter(h => user.hobbies.includes(h.toLowerCase())).length * 10;
            score += (c.placement / 10);
            
            // Add Proximity Score
            let distance = null;
            if (userLocation) {
                distance = getDistance(userLocation.lat, userLocation.lon, c.lat, c.lon);
                if (distance !== null) {
                    // Maximum 20 points for proximity (closer is better)
                    // 0km = 20pts, 500km = 10pts, 2000km+ = 0pts
                    const proximityBonus = Math.max(0, 20 - (distance / 100));
                    score += proximityBonus;
                }
            }
            
            return { ...c, matchScore: score, distance: distance };
        }).sort((a, b) => b.matchScore - a.matchScore);

        const bestMatch = eligible[0] || COLLEGES[COLLEGES.length - 1];
        const bestProb = calculateProbability(
            bestMatch.type === 'IIT' ? user.rank : user.perc,
            bestMatch.type === 'IIT' ? bestMatch.rank : bestMatch.percentile,
            bestMatch.type === 'IIT'
        );

        renderUI(dreamCol, dreamProb, bestMatch, bestProb, eligible.slice(1, 4), user.field);
    }

    function renderUI(dream, dreamProb, ai, aiProb, alternatives, field) {
        const probContainer = document.getElementById('prob-container');
        const getStatus = p => p > 70 ? 'high' : (p > 30 ? 'med' : 'low');
        const getLabel = p => p > 85 ? 'Safe Match' : (p > 60 ? 'Good Target' : (p > 30 ? 'Reach' : 'High Reach'));
        
        probContainer.innerHTML = `
            <div class="prob-card glass-card">
                <h4>AI Strategy Choice</h4>
                <h3>${ai.name}</h3>
                <div class="prob-circle ${getStatus(aiProb)}">${aiProb}%</div>
                <p style="margin-top:1rem; font-size:0.8rem; color:var(--text-dim)">${getLabel(aiProb)}</p>
            </div>
            <div class="prob-card glass-card">
                <h4>Your Dream Choice</h4>
                <h3>${dream ? dream.name : 'Not in Database'}</h3>
                <div class="prob-circle ${dream ? getStatus(dreamProb) : ''}">${dream ? dreamProb + '%' : '--'}</div>
                <p style="margin-top:1rem; font-size:0.8rem; color:var(--text-dim)">${dream ? getLabel(dreamProb) : 'Waitlist/Data Pending'}</p>
            </div>
        `;

        const table = document.getElementById('comp-table');
        const dreamName = dream ? dream.name : 'Unknown Choice';
        table.innerHTML = `
            <tr><th>Parameter</th><th>${ai.name} (AI)</th><th>${dreamName}</th></tr>
            <tr><td class="feature">Chances</td><td>${getLabel(aiProb)} (${aiProb}%)</td><td>${dream ? getLabel(dreamProb) + ' (' + dreamProb + '%)' : 'Insufficient Data'}</td></tr>
            <tr><td class="feature">Avg Package</td><td>${ai.avgPkg}</td><td>${dream ? dream.avgPkg : 'Pending'}</td></tr>
            <tr><td class="feature">Placement</td><td>${ai.placement}%</td><td>${dream ? dream.placement + '%' : 'N/A'}</td></tr>
            <tr><td class="feature">Reputation</td><td>${ai.reputation}</td><td>${dream ? dream.reputation : 'High (Est.)'}</td></tr>
            <tr><td class="feature">Best For</td><td>${ai.fields.slice(0, 2).join(', ')}</td><td>${dream ? dream.fields.slice(0, 2).join(', ') : 'Requested Field'}</td></tr>
        `;

        const recList = document.getElementById('rec-list');
        recList.innerHTML = '';
        alternatives.forEach(c => {
            const card = document.createElement('div');
            card.className = 'college-card';
            const distInfo = c.distance ? `<div class="distance-tag">📍 ${c.distance.toFixed(1)} km away</div>` : '';
            const nearbyBadge = (c.distance && c.distance < 300) ? `<span class="badge badge-nearby">Nearby</span>` : '';
            
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <span class="badge badge-${c.type.toLowerCase()}">${c.type}</span>
                    ${nearbyBadge}
                </div>
                <h4 style="margin-top:1rem">${c.name}</h4>
                <p style="font-size:0.8rem; color:var(--text-dim); margin-bottom:1rem">${c.reputation}</p>
                ${distInfo}
                <div style="font-size:0.9rem; margin-bottom:0.5rem; margin-top:0.5rem"><b>Package:</b> ${c.avgPkg}</div>
                <div style="font-size:0.9rem; margin-bottom:0.5rem"><b>Fields:</b> ${c.fields.slice(0, 2).join(', ')}</div>
                <div style="margin-top:1rem">
                    ${c.hobbies.map(h => `<span class="advantage-pill">${h}</span>`).join('')}
                </div>
            `;
            recList.appendChild(card);
        });
    }
});
