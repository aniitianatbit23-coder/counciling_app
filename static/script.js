let COLLEGES = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/colleges');
        if (response.ok) {
            COLLEGES = await response.json();
        } else {
            console.error('Failed to fetch colleges: HTTP status', response.status);
        }
    } catch (err) {
        console.error('Failed to fetch colleges from MongoDB:', err);
    }

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
        const dreamCol = user.dream.length > 0 
            ? COLLEGES.find(c => c.name.toLowerCase().includes(user.dream) || user.dream.includes(c.name.toLowerCase())) 
            : null;
        
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
                <h3>${dream ? dream.name : (field ? 'No Match Found' : 'Not Selected')}</h3>
                <div class="prob-circle ${dream ? getStatus(dreamProb) : ''}">${dream ? dreamProb + '%' : '--'}</div>
                <p style="margin-top:1rem; font-size:0.8rem; color:var(--text-dim)">${dream ? getLabel(dreamProb) : (field ? 'Check database names' : 'Enter a college above')}</p>
            </div>
        `;

        const table = document.getElementById('comp-table');
        const dreamName = dream ? dream.name : (field ? 'No Match' : 'None');
        table.innerHTML = `
            <tr><th>Parameter</th><th>${ai.name} (AI)</th><th>${dreamName}</th></tr>
            <tr><td class="feature">Chances</td><td>${getLabel(aiProb)} (${aiProb}%)</td><td>${dream ? getLabel(dreamProb) + ' (' + dreamProb + '%)' : 'N/A'}</td></tr>
            <tr><td class="feature">Avg Package</td><td>${ai.avgPkg}</td><td>${dream ? dream.avgPkg : '--'}</td></tr>
            <tr><td class="feature">Placement</td><td>${ai.placement}%</td><td>${dream ? dream.placement + '%' : '--'}</td></tr>
            <tr><td class="feature">Reputation</td><td>${ai.reputation}</td><td>${dream ? dream.reputation : '--'}</td></tr>
            <tr><td class="feature">Best For</td><td>${ai.fields.slice(0, 2).join(', ')}</td><td>${dream ? dream.fields.slice(0, 2).join(', ') : '--'}</td></tr>
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
