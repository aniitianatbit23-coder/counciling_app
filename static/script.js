const COLLEGES = [
    { name: "IIT Bombay", type: "IIT", percentile: 99.98, rank: 50, avgPkg: "26.5 LPA", placement: 99, reputation: "10/10", fields: ["CSE", "ECE", "Electrical", "Mechanical"], hobbies: ["Coding", "Robotics", "Startups"] },
    { name: "IIT Delhi", type: "IIT", percentile: 99.95, rank: 150, avgPkg: "24.8 LPA", placement: 98, reputation: "9.9/10", fields: ["CSE", "Mathematics", "Textile", "Mechanical"], hobbies: ["Robotics", "Design", "Music"] },
    { name: "IIT Madras", type: "IIT", percentile: 99.92, rank: 250, avgPkg: "23.5 LPA", placement: 97, reputation: "10/10 (NIRF #1)", fields: ["Aerospace", "CSE", "Electrical", "Civil"], hobbies: ["Sailing", "Quizzing"] },
    { name: "IIT Kanpur", type: "IIT", percentile: 99.91, rank: 350, avgPkg: "22.5 LPA", placement: 96, reputation: "9.8/10", fields: ["CSE", "Economics", "Mechanical"], hobbies: ["Rock", "Sports"] },
    { name: "IIT Kharagpur", type: "IIT", percentile: 99.88, rank: 600, avgPkg: "21.0 LPA", placement: 95, reputation: "9.7/10", fields: ["Mining", "Agriculture", "CSE", "Mechanical"], hobbies: ["Social", "Arts"] },
    { name: "IIT Roorkee", type: "IIT", percentile: 99.85, rank: 800, avgPkg: "20.5 LPA", placement: 94, reputation: "9.6/10", fields: ["CSE", "ECE", "Civil", "Architecture"], hobbies: ["Photography", "Fine Arts"] },
    { name: "IIT Guwahati", type: "IIT", percentile: 99.82, rank: 1000, avgPkg: "19.8 LPA", placement: 93, reputation: "9.5/10", fields: ["CSE", "Design", "Biotech", "Mechanical"], hobbies: ["Nature", "Trekking"] },
    { name: "IIT Hyderabad", type: "IIT", percentile: 99.80, rank: 1200, avgPkg: "21.2 LPA", placement: 95, reputation: "9.4/10", fields: ["CSE", "AI", "ECE"], hobbies: ["Innovation", "Gaming"] },
    { name: "NIT Trichy", type: "NIT", percentile: 99.75, rank: null, avgPkg: "15.8 LPA", placement: 94, reputation: "9.2/10", fields: ["CSE", "ECE", "Production", "Chemical"], hobbies: ["Festivals", "Sports"] },
    { name: "NIT Surathkal", type: "NIT", percentile: 99.55, rank: null, avgPkg: "14.2 LPA", placement: 92, reputation: "9.0/10", fields: ["IT", "CSE", "Mechanical", "Civil"], hobbies: ["Surfing", "Tech"] },
    { name: "NIT Rourkela", type: "NIT", percentile: 99.30, rank: null, avgPkg: "13.5 LPA", placement: 91, reputation: "8.9/10", fields: ["CSE", "ECE", "Ceramic", "Mining"], hobbies: ["Sports", "Social"] },
    { name: "NIT Warangal", type: "NIT", percentile: 99.60, rank: null, avgPkg: "15.2 LPA", placement: 93, reputation: "9.1/10", fields: ["CSE", "ECE", "Electrical", "Mechanical"], hobbies: ["Quizzing", "Coding"] },
    { name: "NIT Jaipur", type: "NIT", percentile: 99.10, rank: null, avgPkg: "12.8 LPA", placement: 89, reputation: "8.7/10", fields: ["CSE", "ECE", "Civil", "Architecture"], hobbies: ["Arts", "Music"] },
    { name: "NIT Allahabad", type: "NIT", percentile: 99.40, rank: null, avgPkg: "14.8 LPA", placement: 92, reputation: "8.8/10", fields: ["CSE", "IT", "ECE", "Production"], hobbies: ["Tech", "Startups"] },
    { name: "NIT Patna", type: "NIT", percentile: 97.80, rank: null, avgPkg: "10.5 LPA", placement: 86, reputation: "8.1/10", fields: ["CSE", "Electrical", "Mechanical", "Civil"], hobbies: ["Gaming", "Cultural"] },
    { name: "NIT Jamshedpur", type: "NIT", percentile: 98.50, rank: null, avgPkg: "11.2 LPA", placement: 88, reputation: "8.3/10", fields: ["CSE", "Mechanical", "Production", "ECE"], hobbies: ["Sports", "Coding"] },
    { name: "NIT Kurukshetra", type: "NIT", percentile: 98.90, rank: null, avgPkg: "12.0 LPA", placement: 90, reputation: "8.5/10", fields: ["CSE", "IT", "Electrical", "Mechanical"], hobbies: ["Debating", "Music"] },
    { name: "IIIT Hyderabad", type: "IIIT", percentile: 99.85, rank: null, avgPkg: "31.2 LPA", placement: 100, reputation: "9.6/10", fields: ["CSE", "ECE"], hobbies: ["Coding", "AI", "Gaming"] },
    { name: "IIIT Bangalore", type: "IIIT", percentile: 99.70, rank: null, avgPkg: "28.5 LPA", placement: 99, reputation: "9.5/10", fields: ["CSE", "Data Science"], hobbies: ["Hackathons", "Innovation"] },
    { name: "IIIT Gwalior", type: "IIIT", percentile: 99.20, rank: null, avgPkg: "22.5 LPA", placement: 96, reputation: "9.0/10", fields: ["IT", "Management", "ECE"], hobbies: ["Business", "Tech"] },
    { name: "IIIT Lucknow", type: "IIIT", percentile: 98.80, rank: null, avgPkg: "20.8 LPA", placement: 95, reputation: "8.7/10", fields: ["CSE", "AI", "Data Science"], hobbies: ["Startups", "Gaming"] },
    { name: "BIT Mesra", type: "NIT", percentile: 95.8, rank: null, avgPkg: "11.5 LPA", placement: 87, reputation: "8.4/10", fields: ["CSE", "Mechanical", "ECE", "Civil"], hobbies: ["Space", "Cultural"] },
    { name: "DTU Delhi", type: "NIT", percentile: 98.2, rank: null, avgPkg: "16.5 LPA", placement: 90, reputation: "8.9/10", fields: ["Software", "Mechanical", "ECE", "Electrical"], hobbies: ["Automotive", "Drama"] },
    { name: "NSUT Delhi", type: "NIT", percentile: 98.1, rank: null, avgPkg: "15.8 LPA", placement: 89, reputation: "8.8/10", fields: ["CSE", "IT", "ECE", "ICE"], hobbies: ["Robotics", "Festivals"] },
    { name: "BITS Pilani", type: "IIT", percentile: 99.1, rank: null, avgPkg: "19.5 LPA", placement: 97, reputation: "9.7/10", fields: ["CSE", "Mechanical", "ECE", "Economics"], hobbies: ["Leadership", "Innovation"] },
    { name: "VIT Vellore", type: "IIIT", percentile: 90.5, rank: null, avgPkg: "9.2 LPA", placement: 85, reputation: "7.8/10", fields: ["CSE", "IT", "Mechanical", "ECE"], hobbies: ["Gaming", "Hackathons"] },
    { name: "PEC Chandigarh", type: "NIT", percentile: 97.5, rank: null, avgPkg: "11.8 LPA", placement: 88, reputation: "8.2/10", fields: ["CSE", "Aero", "Mechanical", "Civil"], hobbies: ["Flying", "Aero"] },
    { name: "COEP Pune", type: "NIT", percentile: 98.5, rank: null, avgPkg: "11.2 LPA", placement: 90, reputation: "8.8/10", fields: ["CSE", "Mechanical", "Electrical", "Civil"], hobbies: ["Tech", "History"] },
    { name: "VNIT Nagpur", type: "NIT", percentile: 98.8, rank: null, avgPkg: "11.5 LPA", placement: 88, reputation: "8.6/10", fields: ["CSE", "Mechanical", "ECE", "Chemical"], hobbies: ["Social", "Arts"] },
    { name: "MANIT Bhopal", type: "NIT", percentile: 98.4, rank: null, avgPkg: "10.8 LPA", placement: 87, reputation: "8.4/10", fields: ["CSE", "Electrical", "ECE", "Architecture"], hobbies: ["Design", "Drama"] },
    { name: "NIT Delhi", type: "NIT", percentile: 98.6, rank: null, avgPkg: "11.2 LPA", placement: 88, reputation: "8.3/10", fields: ["CSE", "ECE", "Electrical"], hobbies: ["Coding", "Robotics"] }
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
            return { ...c, matchScore: score };
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
            card.innerHTML = `
                <span class="badge badge-${c.type.toLowerCase()}">${c.type}</span>
                <h4 style="margin-top:1rem">${c.name}</h4>
                <p style="font-size:0.8rem; color:var(--text-dim); margin-bottom:1rem">${c.reputation}</p>
                <div style="font-size:0.9rem; margin-bottom:0.5rem"><b>Package:</b> ${c.avgPkg}</div>
                <div style="font-size:0.9rem; margin-bottom:0.5rem"><b>Fields:</b> ${c.fields.slice(0, 2).join(', ')}</div>
                <div style="margin-top:1rem">
                    ${c.hobbies.map(h => `<span class="advantage-pill">${h}</span>`).join('')}
                </div>
            `;
            recList.appendChild(card);
        });
    }
});
